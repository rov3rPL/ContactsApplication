import { Contact } from "./Contact";

export class ContactCategory {
  contactCategoryId?: number;
  contactCategoryText?: string;
}

export class ContactDetails extends Contact {
    email?: string;
    phoneNumber?: string;
    birthDate?: string;
    password?: string;

    contactCategory?: ContactCategory
    contactCategoryCustomText?: string;
    
    // public string Email { get; set; }
    // public string Password { get; set; }
    // public ContactCategory ContactCategory { get; set; }
    // public string? ContactCategoryCustomText { get; set; }
    // public string PhoneNumber { get; set; }
    // public DateTime BirthDate { get; set; }
}