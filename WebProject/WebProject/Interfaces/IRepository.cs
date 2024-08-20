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
        DriveDto AddDrive(DriveDto drive);
        List<DriveDto> GetAllDrives();
        void AcceptDrive(long id, DriveAcceptDto driverId);
        long GetDriverIdFromDrive(long id);
        void AddRating(RatingDto rating);
        List<RatingDto> GetAllRatings();
        double UpdateDriverAverageRating(long id,float averageRating);
        void SaveChanges();
        DriveDto GetDriveById(long id);
        void FinishDrive(long driveId);
    }
}
