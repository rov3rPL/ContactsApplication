using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ContactsAPI.Migrations
{
    public partial class SeedDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(table: "ContactCategories", column: "ContactCategoryText", value: "Szef");
            migrationBuilder.InsertData(table: "ContactCategories", column: "ContactCategoryText", value: "Klient");
            migrationBuilder.InsertData(table: "ContactCategories", column: "ContactCategoryText", value: "Inny");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
