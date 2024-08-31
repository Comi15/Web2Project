using Microsoft.AspNetCore.Http;

namespace WebProject.Dto
{
    public class ProfilePictureDto
    {
        public string UsernamePicture { get; set; }
        public string FileName { get; set; }
        public IFormFile FormFile { get; set; }
    }
}
