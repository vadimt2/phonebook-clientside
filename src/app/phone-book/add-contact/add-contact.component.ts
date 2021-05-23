import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Contact } from '../interfaces';
import { Add } from '../store/actions';
import { AppState, selectError } from '../store/selectors';

@Component({
  selector: 'add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  error$: Observable<string>;
  messages:Array<any> = [];

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let phoneregex: RegExp = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{3,4})$/

    this.formGroup = this.formBuilder.group({
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

  getErrorEmail(): string {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  getErrorMessage(error: any) {
    switch (error.errorName) {
      case 'required':
        return this.messages[error.controlName];
      default:
        return 'unknown error ' + error.errorName;
    }
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
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
    // const newContact = {...contact, id: 0};
    this.store.dispatch(Add({contact: contact}));
  }

}
