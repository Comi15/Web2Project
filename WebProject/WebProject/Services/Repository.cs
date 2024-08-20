using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using WebProject.Dto;
using WebProject.Infrastructure;
using WebProject.Interfaces;
using WebProject.Models;
using static WebProject.Models.DriveStatus;

namespace WebProject.Services
{
    public class Repository : IRepository
    {
        private readonly IMapper _mapper;
        private readonly DriveDbContext _db;
        public Repository(IMapper mapper, DriveDbContext db)
        {
            _mapper = mapper;
            _db = db;
        }

        public void AcceptDrive(long id, DriveAcceptDto driverId)
        {
            Drive drive = _db.Drives.FirstOrDefault(d => d.Id == id);
            drive.DriveStatus = Status.In_Progress;
            drive.DriverId = driverId.DriverId;
            drive.UntilEndOfDrive = driverId.UntilEndOfDrive.ToLocalTime();
            _db.SaveChanges();
        }

        public DriveDto AddDrive(DriveDto driveDto)
        {
            Drive drive = _mapper.Map<Drive>(driveDto);
            _db.Drives.Add(drive);
            _db.SaveChanges();
            return _mapper.Map<DriveDto>(drive);

        }

        public DriveDto GetDriveById(long id)
        {
            var drive = _db.Drives.FirstOrDefault(x => x.Id == id);
            var driveDto = _mapper.Map<DriveDto>(drive);
            driveDto.Status = drive.DriveStatus.ToString();

            return driveDto;
        }

        public void AddRating(RatingDto rating)
        {
            _db.Ratings.Add(_mapper.Map<Rating>(rating));
            _db.SaveChanges();
        }

        public void AddUser(UserDto userDto)
        {
            User user = _mapper.Map<User>(userDto);
            var addedUser = _db.Users.Add(user);
            _db.SaveChanges();
            
            
            
        }

        public User FindUSerByEmail(string email)
        {
            return _db.Users.FirstOrDefault(u => u.Email == email);
        }

        public User FindUserById(long id)
        {
            
          return  _db.Users.Find(id);
        }

        public List<DriveDto> GetAllDrives()
        {
            List<Drive> drives = _db.Drives.ToList();
            List<DriveDto> drivesDto = new List<DriveDto>();

            foreach(var drive in drives)
            {
                drivesDto.Add(new DriveDto()
                {
                    Id = drive.Id,
                    UserId = drive.UserId,
                    DriverId = drive.DriverId,
                    StartDestination = drive.StartDestination,
                    EndDestination = drive.EndDestination,
                    EstimatedPrice = drive.EstimatedPrice,
                    Status = drive.DriveStatus.ToString()
                });
            }

            return drivesDto;
        }

        public List<UserProfilePicture> GetAllImages()
        {
            return _db.Pictures.ToList();
        }

        public List<RatingDto> GetAllRatings()
        {
            return _mapper.Map<List<RatingDto>>(_db.Ratings.ToList());
        }

        public List<User> GetAllUsers()
        {
            return _db.Users.ToList();
        }

        public long GetDriverIdFromDrive(long id)
        {
           Drive drive = _db.Drives.FirstOrDefault(u => u.Id == id);
            return drive.DriverId;
        }

        public UserProfilePicture GetPictureByUser(string username)
        {
            return _db.Pictures.FirstOrDefault(x=> x.UsernamePicture == username);
        }

        public LoginDto GoogleAdd(GoogleLoginDto googleDto)
        {
            var users = _db.Users.ToList();
            User user = users.FirstOrDefault(x => x.Email == googleDto.Email);

            long id;


            if (user == null)
            {
                User newUser = new User()
                {
                    Email = googleDto.Email,
                    Username = googleDto.Email.Split('@')[0],
                    LastName = googleDto.LastName,
                    Name = googleDto.Name,
                    Role = "user"
                };

                var addedUser = _db.Users.Add(newUser);
                _db.SaveChanges();

                id = addedUser.Entity.Id;
            }
            else
            {
                id = user.Id;
            }

            LoginDto loginDto = new LoginDto()
            {
                Email = googleDto.Email,
                Role = "user",
                Id = id
            };

            return loginDto;
        }

        public void SaveChanges()
        {
            _db.SaveChanges();
        }

        public double UpdateDriverAverageRating(long id, float averageRating)
        {
            User driver = _db.Users.FirstOrDefault(x => x.Id == id);
            driver.AverageRating = averageRating;
            _db.SaveChanges();
            return driver.AverageRating;
        }

        public UserUpdateDto UpdateUser(long id, UserUpdateDto userDto)
        {
            User user = _db.Users.Find(id);

            if (user == null)
                return null;
            if (user.Name != userDto.Name && user.Name != null)
                user.Name = userDto.Name;
            if (user.LastName != userDto.LastName && user.LastName != null)
                user.LastName = userDto.LastName;
            if (userDto.CurrentPassword != null && userDto.NewPassword != null && userDto.CurrentPassword != "")
            {
                if (BCrypt.Net.BCrypt.Verify(userDto.CurrentPassword, user.Password))
                {
                    var passHash = BCrypt.Net.BCrypt.HashPassword(userDto.NewPassword);
                    user.Password = passHash;
                    userDto.Error = "You have changed your password";
                }
                else
                {
                    userDto.Error = "Your current password is incorrect";
                }
            }
            else if ((userDto.CurrentPassword == null || userDto.CurrentPassword == "") && userDto.NewPassword != "" && userDto.NewPassword != null)

            {
                userDto.Error = "Your must type in your current password.";
            }


            if (user.Adress != userDto.Adress)
                user.Adress = userDto.Adress;

            if (user.BirthDate != userDto.BirthDate)
                user.BirthDate = userDto.BirthDate;

            _db.SaveChanges();
            return userDto;
        }

        public void UploadPicture(UserProfilePicture picture)
        {
            _db.Pictures.Add(picture);
            _db.SaveChanges();
        }

        public void FinishDrive(long driveId)
        {
            Drive drive = _db.Drives.FirstOrDefault(d => d.Id == driveId);
            drive.DriveStatus = Status.Finished;
            _db.SaveChanges();
        }
    }
}
