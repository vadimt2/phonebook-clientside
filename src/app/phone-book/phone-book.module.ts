import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddContactComponent } from './add-contact/add-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MaterialModule } from '../material-module.ts/material-module';
import { StoreModule } from '@ngrx/store';
import * as fromPhoneBook from './store/reducer';
import { ReactiveComponentModule } from '@ngrx/component';
import { PhoneBookRoutingModule } from './phone-book-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AddContactComponent,
    EditContactComponent,
    ContactListComponent,
  ],
  imports: [
    CommonModule,
    PhoneBookRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    ReactiveComponentModule,
    FlexLayoutModule,
    // MatTableModule, 
    // MatPaginatorModule,
    // MatSortModule
    StoreModule.forFeature(fromPhoneBook.featureKey, fromPhoneBook.phoneBookReducer),
  ],
  exports: [
    ContactListComponent,
    AddContactComponent
  ]
})
export class PhoneBookModule {}
