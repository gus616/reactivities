using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Value",
                table: "Activities",
                newName: "Venue");

            migrationBuilder.RenameColumn(
                name: "Ttile",
                table: "Activities",
                newName: "Title");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Venue",
                table: "Activities",
                newName: "Value");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Activities",
                newName: "Ttile");
        }
    }
}
