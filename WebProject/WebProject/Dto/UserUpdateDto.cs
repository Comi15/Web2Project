using System;

namespace WebProject.Dto
{
    public class UserUpdateDto
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }

        public string Name { get; set; }
        public string LastName { get; set; }
        public string Adress { get; set; }
        public string Role { get; set; }
        public DateTime BirthDate { get; set; }
        public string Error { get; set; }
    }
}
