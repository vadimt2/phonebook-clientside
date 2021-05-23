import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Contact } from '../interfaces';
import { PhoneBookService } from '../services/phone-book.service';
import { Update } from '../store/actions';
import { AppState, selectError, selectPhoneBookById } from '../store/selectors';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  contact: Contact;
  phoneBookSubscription: Subscription;
  pbGetByIdSubscription: Subscription;
  titleAlert: string = 'This field is required';
  error$: Observable<string>;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private phoneBookService: PhoneBookService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    debugger
    this.createForm();
    this.route.paramMap.subscribe((params) => {
      debugger
      const paramsId = params.get('id');
      const id = Number.parseInt(paramsId);
      if(id)
      this.phoneBookSubscription = this.store
        .select(selectPhoneBookById(id))
        .subscribe((data) => {
          if(!data) {
            // This is SPA, When you refresh the page data would die, So making a get req and i don't want to store in the state managment
            this.pbGetByIdSubscription = this.phoneBookService.getContactById(id).subscribe(newData => {
              this.formGroup.patchValue(newData);
            });
          }

          this.contact = data;
          this.formGroup.patchValue(data);
        });
    });
  }

  createForm(): void {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let phoneregex: RegExp = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{3,4})$/
    this.formGroup = this.formBuilder.group({
      'id': [null],
      'firstName': [null],
      'lastName': [null],
      'streetAddress': [null],
      'city': [null],
      'zipCode': [null, 
        Validators.required],
        'phoneNumber': [null, [Validators.required, Validators.pattern(phoneregex)]],
        'email': [null, [Validators.required, Validators.pattern(emailregex)],],
    });
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getErrorEmail(): string {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  isNumberKey(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
      return charCode != 46 && charCode != 45 && charCode > 31
      && (charCode < 48 || charCode > 57) ? false : true;
  }

  onSubmit(contact: Contact): void {
    debugger
    if(this.formGroup.invalid)
    return;

    this.store.dispatch(Update({contact: contact}))
    this.error$ = this.store.pipe(select(selectError));
  }

  ngOnDestroy(): void {
    if(this.phoneBookSubscription)
    this.phoneBookSubscription.unsubscribe();

    if(this.pbGetByIdSubscription)
    this.pbGetByIdSubscription.unsubscribe();
  }

}
