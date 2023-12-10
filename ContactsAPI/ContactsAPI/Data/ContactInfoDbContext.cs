using ContactsAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace ContactsAPI.Data
{
    public class ContactInfoDbContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public ContactInfoDbContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<ContactListItem>()
                .ToView("vContactList")
                .HasKey(t => t.ContactInfoId);
        }

        public DbSet<ContactInfo> ContactInfos { get; set; }
        public DbSet<ContactCategory> ContactCategories { get; set; }

        public DbSet<ContactListItem> ContactList { get; set; }
    }
}
