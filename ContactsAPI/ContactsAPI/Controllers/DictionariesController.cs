using ContactsAPI.Data;
using ContactsAPI.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContactsAPI.Controllers
{
    [Route("api/dict")]
    [ApiController]
    public class DictionariesController : ControllerBase
    {
        private readonly ContactInfoDbContext _context;

        public DictionariesController(ContactInfoDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("ContactCategories")]
        public async Task<ActionResult<IEnumerable<ContactCategory>>> Get()
        {
            return await _context.ContactCategories.ToListAsync();
        }

    }
}
