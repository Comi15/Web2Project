using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebProject.Models;

namespace WebProject.Infrastructure.Configurations
{
    public class RatingConfiguration : IEntityTypeConfiguration<Rating>
    {
        public void Configure(EntityTypeBuilder<Rating> builder)
        {
            builder.HasKey(x => x.Id); //Podesavam primarni kljuc tabele

            builder.Property(x => x.Id).ValueGeneratedOnAdd(); //Kazem da ce se primarni kljuc
                                                               //automatski generisati prilikom dodavanja,
                                                               //redom 1 2 3...


            builder.HasOne(x => x.User) //Kazemo da svaka ocena ima jednog vozaca
                   .WithMany(x => x.Ratings) // A jedan vozac vise ocena
                   .HasForeignKey(x => x.UserId); // Strani kljuc  je UserId

        }
    }
}
