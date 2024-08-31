using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebProject.Models;

namespace WebProject.Infrastructure.Configurations
{
    public class UserProfilePictureConfiguration : IEntityTypeConfiguration<UserProfilePicture>
    {
        public void Configure(EntityTypeBuilder<UserProfilePicture> builder)
        {
            builder.HasKey(x => x.Id); //Podesavam primarni kljuc tabele

            builder.Property(x => x.Id).ValueGeneratedOnAdd(); //Kazem da ce se primarni kljuc
                                                               //automatski generisati prilikom dodavanja,
                                                               //redom 1 2 3...



           
        }
    }
}
