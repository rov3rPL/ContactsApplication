import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../Models/Contact';
import { ContactDetails } from '../Models/ContactDetails';
import config from '../../assets/config/config.json'

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }
  
  getContactList(): Observable<Contact[]> {
    return this.http.get<Contact[]>(config.apiServer.url + 'ContactInfo/ContactList');
  }

  getContact(id: any): Observable<ContactDetails> {
    return this.http.get<ContactDetails>(config.apiServer.url + 'ContactInfo/Contact?id=' + id);
  }

  postContact(contact: ContactDetails): Observable<ContactDetails> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<ContactDetails>(config.apiServer.url + 'ContactInfo/Contact', contact, httpHeaders);
  }

  updateContact(contact: ContactDetails): Observable<ContactDetails> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.patch<ContactDetails>(config.apiServer.url + 'ContactInfo/Contact', contact, httpHeaders);
  }

}