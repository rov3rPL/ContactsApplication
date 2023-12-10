using ContactsAPI.Data;
using ContactsAPI.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContactsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[ApiController, Authorize]
    public class ContactInfoController : ControllerBase
    {
        private readonly ContactInfoDbContext _context;

        public ContactInfoController(ContactInfoDbContext context)
        {
            _context = context;
        }

        //nieużywany przez aplikację
        [HttpGet]
        [Authorize]
        [Route("Contacts")]
        public async Task<ActionResult<IEnumerable<ContactInfo>>> Get()
        {
            return await _context.ContactInfos.Include(ci => ci.ContactCategory).ToListAsync();
        }

        [HttpGet]
        [Route("ContactList")]
        public async Task<ActionResult<IEnumerable<ContactListItem>>> GetContactList()
        {
            return await _context.ContactList.ToListAsync();
        }

        //[HttpGet]
        //[Route("ContactCategoryList")]
        //public async Task<ActionResult<IEnumerable<ContactCategory>>> GetContactCategoryList()
        //{
        //    return await _context.ContactCategories.ToListAsync();
        //}


        [HttpGet]
        [Route("Contact")]
        public async Task<ActionResult<ContactInfo>> Get(int id)
        {
            return await _context.ContactInfos.Include(ci => ci.ContactCategory)
                .FirstOrDefaultAsync(ci => ci.ContactInfoId == id);
        }

        [HttpPost]
        [Authorize]
        [Route("Contact")]
        public async Task<ActionResult<ContactInfo>> Post(ContactInfo contact)
        {
            try
            {
                //TODO: walidacja
                //return BadRequest();

                _context.ContactInfos.Add(contact);

                _context.Entry(contact.ContactCategory).State = EntityState.Unchanged;

                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(Get), new { id = contact.ContactInfoId }, contact);
            }
            catch (Exception ex)
            {
                //TODO: log error

                return BadRequest(ex.Message);
            }
        }

        [HttpPatch]
        [Authorize]
        [Route("Contact")]
        public async Task<ActionResult<IEnumerable<ContactInfo>>> Update(ContactInfo contact)
        {
            try
            {
                //TODO: walidacja
                //return BadRequest();

                var contactData = await _context.ContactInfos.FindAsync(contact.ContactInfoId);
                if (contactData == null)
                {
                    return NotFound();
                }

                contactData.FirstName = contact.FirstName;
                contactData.LastName = contact.LastName;
                contactData.BirthDate = contact.BirthDate;
                contactData.PhoneNumber = contact.PhoneNumber;
                contactData.Email = contact.Email;
                contactData.Password = contact.Password;
                contactData.ContactCategoryCustomText = contact.ContactCategoryCustomText;
                contactData.ContactCategory = contact.ContactCategory;
                _context.Entry(contactData.ContactCategory).State = EntityState.Unchanged;

                await _context.SaveChangesAsync();
                return await _context.ContactInfos.ToListAsync();            
            }
            catch (Exception ex)
            {
                //TODO: log error

                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("Contact")]
        public async Task<ActionResult<IEnumerable<ContactInfo>>> Delete(int id)
        {
            var contact = await _context.ContactInfos.FindAsync(id);
            if (contact == null)
            {
                return NotFound();
            }

            _context.ContactInfos.Remove(contact);
            await _context.SaveChangesAsync();

            return await _context.ContactInfos.ToListAsync();
        }
    }
}
