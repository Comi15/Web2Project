using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebProject.Dto;
using WebProject.Interfaces;

namespace WebProject.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IEmailSender _emailSender;


        public UserController(IUserService service,IEmailSender emailSender)
        {
            _userService = service;
            _emailSender = emailSender;
        }

        [HttpPost]
        [Route("register")]
        public IActionResult Register([FromBody] UserDto user)
        {
            if (user == null)
            {
                return BadRequest();
            }

            return Ok(_userService.AddUser(user));
        }

        [HttpPost]
        [Route("picture")]
        public async Task<IActionResult> UploadPicture([FromForm] ProfilePictureDto picture)
        {
            return Ok(await _userService.UploadPicture(picture));
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] LoginDto dto)
        {
            var res = _userService.Login(dto);
            if (res != null)
                return Ok(res);
            else
                return BadRequest("Incorrect email or password.");
        }

        [HttpPost]
        [Route("google-login")]
        public IActionResult GoogleLogin([FromBody] GoogleLoginDto googleDto)
        {
            return Ok(_userService.GoogleLogin(googleDto));
        }

        
        [HttpGet("{id}")]
        [Authorize]
        public IActionResult Get(long id)
        {
            var res = _userService.GetUserById(id);
            if (res != null)
                return Ok(res);
            else
                return BadRequest("User with the given Id does not exist");
        }

        [HttpGet("/picture/{username}")]
        [Authorize]
        public IActionResult Get(string username)
        {
            var res = _userService.GetPictureName(username);
            if (res != null)
                return Ok(res);
            else
                return BadRequest("User with the given Id does not exist");
        }

        [HttpPut("{id}")]
        [Authorize]
        public IActionResult ChangeUserProfile(long id, [FromBody] UserUpdateDto userDto)
        {
            return Ok(_userService.ChangeUserProfile(id, userDto));
        }

        [HttpPut]
        [Route("/update/picture")]
        [Authorize]
        public async Task<IActionResult> UpdatePicture([FromForm] ProfilePictureDto picture)
        {
            return Ok(await _userService.UpdatePicture(picture));
        }


        [HttpGet]
        [Authorize(Roles = "admin")]
        public IActionResult GetUsers()
        {
            var res = _userService.GetUsers();
            if (res != null)
                return Ok(res);
            else
                return BadRequest("Couldn't fetch the users.");
        }


        [HttpPut("/verify/{email}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> VerifyDriver(string email)
        {
            _userService.VerifyDriver(email);
            await _emailSender.SendEmailAsync(email, "Verification", "The administrator verified your account.");
            return Ok();
            
        }

        [HttpPut("/verify/decline/{email}")]
        [Authorize(Roles = "admin")]
        public  async Task<IActionResult> VerifyDecline(string email)
        {
            _userService.VerifyDecline(email);
            await _emailSender.SendEmailAsync(email, "Verification", "The administrator did not verify your account.");
            return Ok();
        }


        [HttpPut("/block/{email}")]
        [Authorize(Roles = "admin")]
        public IActionResult BlockDriver(string email)
        {
            _userService.Block(email);
            return Ok();
        }


        [HttpPut("/unblock/{email}")]
        [Authorize(Roles = "admin")]
        public IActionResult UnBlockDriver(string email)
        {
            _userService.UnBlock(email);
            return Ok();
        }

    }
}
