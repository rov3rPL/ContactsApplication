import { Component, Input, SimpleChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { AuthorizationService } from '../services/authorization.service';
import { ContactCategory, ContactDetails } from '../Models/ContactDetails';
import { DictionaryService } from '../services/dictionary.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  @Input() contactId?: number;
  public contact!: ContactDetails;
  @Output() closingEvent = new EventEmitter<boolean>();

  constructor(private contactService: ContactService,
     private authorizationService: AuthorizationService,
     private dictionaryService: DictionaryService) {}

    
  ngOnChanges(changes: SimpleChanges) {
    
    //TODO:
    alert('ngOnChanges!');

    if(this.contactId) {

      this.contactService.getContact(this.contactId).subscribe(data => {
        console.log("pobranie kontaktu");
        console.log(data);

        this.contact = data;
        this.setFormValues(data);
        
      }, err => {
        alert("błąd podczas pobierania kontaktu!");
      });

    }
  }

  setFormValues(data: ContactDetails) {
    this.contactDetailsForm.setValue({
      "contactFirstName": data.firstName,
      "contactLastName": data.lastName,
      //TODO: fix those fields       
      "contactCategory": data.contactCategory?.contactCategoryId,
      "categoryCustomText": data.contactCategoryCustomText,
      "contactEmail": data.email,
      "contactPhoneNumber": data.phoneNumber,
      "contactBirthdate": data.birthDate?.split('T')[0],
      "contactPassword": data.password
    });
  }

  getFormValues(): ContactDetails {
    return {
      firstName: this.contactDetailsForm.value['contactFirstName'],
      lastName: this.contactDetailsForm.value['contactLastName'],
      contactCategory: {
        contactCategoryId: this.contactDetailsForm.value['contactCategory'],
        contactCategoryText: ''
      },
      contactCategoryCustomText : this.isCategoryCustomTextInputVisible() ? this.contactDetailsForm.value['categoryCustomText']: null,
      email: this.contactDetailsForm.value['contactEmail'],
      phoneNumber: this.contactDetailsForm.value['contactPhoneNumber'],
      birthDate: this.contactDetailsForm.value['contactBirthdate'],
      password: this.contactDetailsForm.value['contactPassword']
    };
  }

  //TODO: change to solution with 'letCustomText' property
  isCategoryCustomTextInputVisible() {
    let categoryValue = this.contactDetailsForm.get("contactCategory");
    console.log(categoryValue);
    return categoryValue?.value == 3;
  }

  contactDetailsForm!: FormGroup;

  contactCategories? : ContactCategory[];

  ngOnInit() {

    this.dictionaryService.getContactCategories().subscribe(data => {
      console.log("ContactCategories");
      console.log(data);

      this.contactCategories = data;
    });


    this.initializeForm();
  }

  private initializeForm() {
    this.contactDetailsForm = new FormGroup({
      'contactFirstName': new FormControl("", Validators.required),
      'contactLastName': new FormControl(null),
      'contactCategory': new FormControl(null),
      'categoryCustomText': new FormControl(null, Validators.nullValidator),
      'contactEmail': new FormControl(null),
      'contactPhoneNumber': new FormControl(null),
      'contactBirthdate': new FormControl(null),
      'contactPassword': new FormControl(null)
    });
  }

  public isSaveActionAllowed() {
    return this.authorizationService.isUserAuthenticated()
  }

  onSubmit() {    

    if(this.contactId) {

      let newContact = this.getFormValues();
      newContact.contactInfoId = this.contactId;

      this.contactService.updateContact(newContact).subscribe(data => {
        
        //TODO: użyć toastr
        alert('Pomyślnie zaktualizowano kontakt');
        this.onClose(true);

      }, err => {
        alert("Błąd podczas aktualizowania kontaktu")
      })

    }
    else {

      let newContact = this.getFormValues();

      this.contactService.postContact(newContact).subscribe(data => {
        
        //TODO: użyć toastr
        alert('Pomyślnie zapisano kontakt');
        this.onClose(true);

      }, err => {
        alert("Błąd podczas zapisywania nowego kontaktu")
      })

    }   

  }

  onClose(refresh: boolean) {
    this.closingEvent.emit(refresh);
  }
}
