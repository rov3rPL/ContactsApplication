using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ContactsAPI.Migrations
{
    public partial class ContactListView : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sql = @"
            CREATE OR ALTER VIEW [dbo].[vContactList] AS
                SELECT ci.ContactInfoId, ci.FirstName, ci.LastName
                FROM dbo.ContactInfos ci";

            migrationBuilder.Sql(sql);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"DROP VIEW [dbo].[vContactList]");
        }
    }
}
