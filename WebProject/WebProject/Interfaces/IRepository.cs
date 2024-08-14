using System.Collections.Generic;
using WebProject.Dto;
using WebProject.Models;

namespace WebProject.Interfaces
{
    public interface IRepository
    {
        void AddUser(UserDto userDto);
        void UploadPicture(UserProfilePicture picture);
        List<User> GetAllUsers();

        User FindUserById(long id);
        List<UserProfilePicture> GetAllImages();
        LoginDto GoogleAdd(GoogleLoginDto googleLoginDto);

        UserUpdateDto UpdateUser(long id, UserUpdateDto userUpdateDto);
        UserProfilePicture GetPictureByUser(string username);
        User FindUSerByEmail(string email);
        void SaveChanges();
    }
}
