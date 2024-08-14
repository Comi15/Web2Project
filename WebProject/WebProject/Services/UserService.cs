using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebProject.Dto;
using WebProject.Infrastructure;
using WebProject.Interfaces;
using WebProject.Models;
using static WebProject.Models.VerifyStatus;

namespace WebProject.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;       
        private readonly IConfigurationSection _secretKey;
        private readonly IRepository _repository;
        public long LastUserId { get; set; }

        public UserService(IMapper mapper, IConfiguration config,IRepository repository)
        {
            _mapper = mapper;
            _secretKey = config.GetSection("SecretKey");
            _repository = repository;   

        }
        public UserDto AddUser(UserDto newUser)
        {
            newUser.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password);

             _repository.AddUser(newUser);

             return newUser;
        }



        public List<UserDto> GetUsers()
        {
            List<User> users = _repository.GetAllUsers();
            List<UserDto> usersDto = new List<UserDto>();
            foreach (var user in users)
            {
                usersDto.Add(new UserDto
                {
                    Username = user.Username,
                    Email = user.Email,
                    Verified = user.Verified.ToString(),
                    Password = user.Password,
                    Role  = user.Role,
                    Blocked = user.Blocked,
                    Name = user.Name,
                    LastName = user.LastName,
                    Adress = user.Adress,
                    BirthDate = user.BirthDate
                    
                }); 
            }
            return usersDto;
        }

        public async Task<bool> UploadPicture(ProfilePictureDto picture)
        {
            if (picture.FileName == null || picture.FileName.Length == 0)
            {
                return false;
            }
            var path = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\Images", picture.FileName);

            using (FileStream stream = new FileStream(path, FileMode.Create))
            {
                await picture.FormFile.CopyToAsync(stream);
                stream.Close();
            }

            var userProfilePicture = new UserProfilePicture
            {
                UsernamePicture = picture.UsernamePicture,
                UserId = LastUserId,
                ImageName = picture.FileName,
                ImagePath = path
            };
            _repository.UploadPicture(userProfilePicture);

            return true;
        }

        public LoginDto Login(LoginDto dto)
        {
            //var users = _dbContext.Users.ToList();
            var users = _repository.GetAllUsers();
            try
            {
                User user = users.First(x => x.Email == dto.Email);
                if (user == null)
                    return null;


                if (BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))//Uporedjujemo hes pasvorda iz baze i unetog pasvorda
                {
                    dto.Id = user.Id;
                    dto.Username = user.Username;
                    dto.Password = user.Password;
                    dto.Role = user.Role;
                    dto.Token = GenerateToken(dto.Role);
                    return dto;
                }
                else
                {
                    return null;
                }
            }

            catch(Exception ex)
            {
                return null;
            }
           
        }

        public LoginDto GoogleLogin(GoogleLoginDto googleDto)
        {
            
            LoginDto loginDto = null;
            loginDto = _repository.GoogleAdd(googleDto);

            loginDto.Token = GenerateToken(loginDto.Role);
            return loginDto;
        }

        private string GenerateToken(string role)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Role, role),
            };

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));

            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: "https://localhost:44336", //url servera koji je izdao token
                claims: claims, //claimovi
                expires: DateTime.Now.AddMinutes(20), //vazenje tokena u minutama
                signingCredentials: signinCredentials //kredencijali za potpis
            );
            return new JwtSecurityTokenHandler().WriteToken(tokeOptions);
        }

        public UserDto GetUserById(long id)
        {
            
            User user = _repository.FindUserById(id);
            if (user == null)
            {
                return null;
            }
            UserDto userDto = new UserDto()
            {
                Username = user.Username,
                Email = user.Email,
                Name = user.Name,
                Role = user.Role,
                LastName = user.LastName,
                Verified = user.Verified.ToString(),
                Blocked = user.Blocked,
                BirthDate = user.BirthDate,
                Adress = user.Adress

            };

            return userDto;
        }

        public string GetPictureName(string username)
        {
            List<UserProfilePicture> pictureList = new List<UserProfilePicture>();
            pictureList = _repository.GetAllImages();
            string pictureName = string.Empty;
            foreach (UserProfilePicture picture in pictureList)
            {
                if(picture.UsernamePicture == username)
                {
                    pictureName = picture.ImageName;
                }
            }

            return pictureName;
        }

        public UserUpdateDto ChangeUserProfile(long id, UserUpdateDto userDto)
        {
           UserUpdateDto userUpdate = null;
           userUpdate = _repository.UpdateUser(id, userDto);

           return userUpdate;

        }

        public async Task<bool> UpdatePicture(ProfilePictureDto picture)
        {
            if (picture.FileName == null || picture.FileName.Length == 0)
            {
                return false;
            }

            UserProfilePicture pic = _repository.GetPictureByUser(picture.UsernamePicture);

            var pathDelete = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\Images", pic.ImageName);
            File.Delete(pathDelete);
            var pathAdd = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\Images", picture.FileName);

            using (FileStream stream = new FileStream(pathAdd, FileMode.Create))
            {
                await picture.FormFile.CopyToAsync(stream);
                stream.Close();
            }

            pic.ImageName = picture.FileName;
            pic.ImagePath = pathAdd;

            _repository.SaveChanges();

            return true;
        }

        public void VerifyDriver(string email)
        {
            User user = _repository.FindUSerByEmail(email);
            user.Verified = Verify.Verified;
            _repository.SaveChanges();
        }

        public void VerifyDecline(string email)
        {
            User user = _repository.FindUSerByEmail(email);
            user.Verified = Verify.Not_Verified;
            _repository.SaveChanges();
        }

        public void Block(string email)
        {
            User user = _repository.FindUSerByEmail(email);
            user.Blocked = true;
            _repository.SaveChanges();
        }

        public void UnBlock(string email)
        {
            User user = _repository.FindUSerByEmail(email);
            user.Blocked = false;
            _repository.SaveChanges();
        }
    }
}
