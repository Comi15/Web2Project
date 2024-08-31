using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebProject.Models;

namespace WebProject.Infrastructure.Configurations
{
    public class DrivesConfiguration : IEntityTypeConfiguration<Drive>
    {
        public void Configure(EntityTypeBuilder<Drive> builder)
        {
            builder.HasKey(x => x.Id); //Podesavam primarni kljuc tabele

            builder.Property(x => x.Id).ValueGeneratedOnAdd(); //Kazem da ce se primarni kljuc
                                                               //automatski generisati prilikom dodavanja,
                                                               //redom 1 2 3...


            builder.HasOne(x => x.User) //Kazemo da voznja ima jednog korisnika
                   .WithMany(x => x.Drives) // A jedan korisnik vise voznji
                   .HasForeignKey(x => x.UserId); // Strani kljuc  je UserId


            
        }
    }
}
