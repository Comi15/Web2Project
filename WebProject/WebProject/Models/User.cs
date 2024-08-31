using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using static WebProject.Models.VerifyStatus;

namespace WebProject.Models
{
    public class User
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }
        public DateTime BirthDate { get; set; }

        public string Adress { get; set; }

        public List<Drive> Drives { get; set; }
        public List<Rating> Ratings { get; set; }
        public float AverageRating { get; set; }

        public Verify Verified { get; set; }
        public bool Blocked { get; set; }
        public User()
        {
            Verified = Verify.Pending;
            Blocked = false;
        }


    }
}
