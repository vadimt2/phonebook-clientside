import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PhoneBookService {
  constructor(private http: HttpClient) {}

  getContacts(): Observable<Array<Contact>> {
    return this.http.get<Array<Contact>>('api/Contacts');
  }

  getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`api/Contacts/${id}`);
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>("api/Contacts", contact);
  }

  removeContact(contactId: number): Observable<any> {
    return this.http.delete<any>(
      `api/Contacts/${contactId}`
    );
  }

  updateContact(contact: Contact): Observable<Contact> {
    debugger
    return this.http.put<Contact>(
      `api/Contacts/${contact.id}`,
      contact
    );
  }
}
