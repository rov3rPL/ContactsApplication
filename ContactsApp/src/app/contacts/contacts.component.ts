import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../Models/Contact';
import { AuthorizationService } from '../services/authorization.service';
import { ContactService } from "../services/contact.service"

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  ContactList?: Observable<Contact[]>;
  public selectedContactId?: number;
  isContactDetailsFormVisible: boolean = false;  
  
  constructor(private contactService: ContactService, private authorizationService: AuthorizationService) {}

  ngOnInit() {
    this.getContactList();
  }

  getContactList() {
    
    this.ContactList = this.contactService.getContactList();

  }

  isLogged = () => { return this.authorizationService.isUserAuthenticated(); };

  selectContact(contactId: any) { 
    this.selectedContactId = contactId;
    this.isContactDetailsFormVisible = true;
  }
  
  removeContact(contactId: any) { 
    alert("TODO: remove contact, id: " + contactId); 
  }

  closeContactDetails(refresh: boolean) {
    this.isContactDetailsFormVisible = false;
    this.selectedContactId = undefined;

    if(refresh)
      this.getContactList();
  }

  openContactDetails() {
    this.isContactDetailsFormVisible = true;
  }

}
