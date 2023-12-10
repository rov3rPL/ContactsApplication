using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ContactsAPI.Migrations
{
    public partial class SampleData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(table: "ContactInfos", 
                columns: new[] { "FirstName", "LastName", "Email", "Password", "ContactCategoryId", "PhoneNumber", "BirthDate" },
                values: new object[] { "Pierwszy", "Testowy", "email@1", "***", 1, "123456", DateTime.Now });

            migrationBuilder.InsertData(table: "ContactInfos",
                columns: new[] { "FirstName", "LastName", "Email", "Password", "ContactCategoryId", "ContactCategoryCustomText", "PhoneNumber", "BirthDate" },
                values: new object[] { "Drugi", "Testowy", "email@2", "***", 3, "networking", "876543", DateTime.Now });

            
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
