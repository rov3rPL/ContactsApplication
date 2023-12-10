import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../Models/Contact';
import { ContactCategory } from '../Models/ContactDetails';
import config from '../../assets/config/config.json'

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor(private http: HttpClient) { }
  
  //TODO: change to dictionary item
  getContactCategories(): Observable<ContactCategory[]> {
    return this.http.get<ContactCategory[]>(config.apiServer.url + 'dict/ContactCategories');
  }


}