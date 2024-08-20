using Microsoft.EntityFrameworkCore;
using WebProject.Models;

namespace WebProject.Infrastructure
{
    public class DriveDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        //Ovde definisemo DbSetove (tabele)
        public Microsoft.EntityFrameworkCore.DbSet<User> Users { get; set; }
        public Microsoft.EntityFrameworkCore.DbSet<UserProfilePicture> Pictures { get; set; }
        public Microsoft.EntityFrameworkCore.DbSet<Drive> Drives { get; set; }
        public Microsoft.EntityFrameworkCore.DbSet<Rating> Ratings { get; set; }
        public DriveDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //Kazemo mu da pronadje sve konfiguracije u Assembliju i da ih primeni nad bazom
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(DriveDbContext).Assembly);
        }
    }
}
