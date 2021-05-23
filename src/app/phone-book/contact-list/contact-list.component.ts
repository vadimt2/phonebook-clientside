import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Contact } from '../interfaces';
import { select, Store } from '@ngrx/store';
import { AppState, selectError, selectPhoneBooks } from '../store/selectors';
import { Observable, Subscription } from 'rxjs';
import { LoadContacts, Remove } from '../store/actions';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit, AfterViewInit, OnDestroy {
  contactList: MatTableDataSource<Contact>;
  phoneBookListSubscription: Subscription;
  error$: Observable<string>;

  displayedColumns: string[] = [
    "index",
    'firstName',
    'lastName',
    'streetAddress',
    'city',
    'zipCode',
    'phoneNumber',
    'email',
    "operation"
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    debugger
    this.phoneBookListSubscription = this.store.pipe(select(selectPhoneBooks)).subscribe(contacts => this.initializeData(contacts));
    this.store.dispatch(LoadContacts());
    this.error$ = this.store.pipe(select(selectError));
  }

  initializeData(contacts: Array<Contact>): void {
    debugger
    this.contactList = new MatTableDataSource<Contact>(contacts);
      this.contactList.paginator = this.paginator;
      this.contactList.sort = this.sort;

      this.contactList.filterPredicate = (
        data: {
          firstName: string;
          city: string;
          // zipCode: number;
          zipCode: string;
          phoneNumber: string;
        },
        filterValue: string
      ) =>
        data.firstName.trim().toLowerCase().indexOf(filterValue) !== -1 ||
        data.city.trim().toLowerCase().indexOf(filterValue) !== -1 ||
        data.zipCode.trim().toLowerCase().indexOf(filterValue) !== -1 ||
        data.phoneNumber.trim().toLowerCase().indexOf(filterValue) !== -1;
  }

  ngAfterViewInit() {}

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.contactList.filter = filterValue.trim().toLowerCase();

    if (this.contactList.paginator) {
      this.contactList.paginator.firstPage();
    }
  }

  get PageIndexSize() {
    const calcPage = this.paginator?.pageIndex * this.paginator?.pageSize;
    return calcPage ? calcPage : 0;
  }

  onRemove(id: number): void {
    this.store.dispatch(Remove({ id: id }));
  }

  ngOnDestroy(): void {
    if(this.phoneBookListSubscription)
    this.phoneBookListSubscription.unsubscribe();
  }


}
