namespace ContactsAPI.Model
{
    public class ContactInfo
    {
        public int? ContactInfoId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public ContactCategory ContactCategory { get; set; }
        public string? ContactCategoryCustomText { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime BirthDate { get; set; }
    }
}
