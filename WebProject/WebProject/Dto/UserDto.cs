using Microsoft.AspNetCore.Http;
using System;

namespace WebProject.Dto
{
    public class UserDto
    {
       
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Adress { get; set; }
        public string Role { get; set; }
        public DateTime BirthDate { get; set; }
        public string Verified { get; set; }
        public bool Blocked { get; set; }
        

        
    }
}
