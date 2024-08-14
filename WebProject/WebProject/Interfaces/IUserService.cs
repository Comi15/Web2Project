using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebProject.Dto;

namespace WebProject.Interfaces
{
    public interface IUserService
    {
        List<UserDto> GetUsers();
        UserDto AddUser(UserDto newUser);
        Task<bool> UploadPicture(ProfilePictureDto picture);

        Task<bool> UpdatePicture(ProfilePictureDto picture);
        LoginDto Login(LoginDto dto);
        LoginDto GoogleLogin(GoogleLoginDto googleDto);

        UserDto GetUserById(long id);
        String GetPictureName(string username);
        UserUpdateDto ChangeUserProfile(long id, UserUpdateDto userDto);
        void VerifyDriver(string email);
        void VerifyDecline(string email);
        void Block(string email);
        void UnBlock(string email);
    }
}
