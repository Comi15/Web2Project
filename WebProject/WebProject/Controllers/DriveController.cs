using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebProject.Dto;
using WebProject.Interfaces;
using WebProject.Models;
using WebProject.Services;

namespace WebProject.Controllers
{
    [Route("api/drives")]
    [ApiController]
    public class DriveController : ControllerBase
    {
        private readonly IDriveService _driveService;

        public DriveController(IDriveService driveService)
        {
            _driveService = driveService;
        }
        [HttpPost]
        [Route("add")]
        [Authorize(Roles = "user")]
        public IActionResult AddDrive([FromBody] DriveDto driveDto)
        {
            return Ok(_driveService.AddDrive(driveDto));
        }


        [HttpGet]
        [Authorize]
        public IActionResult GetDrives()
        {
            var res = _driveService.GetDrives();
            if (res != null)
                return Ok(res);
            else
                return BadRequest("Couldn't fetch the drives.");
        }


        [HttpGet("{id}")]
        [Authorize(Roles = "user")]
        public IActionResult GetDriverId(long id)
        {
            return Ok(_driveService.GetDriverId(id));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "driver")]
        public IActionResult ChangeUserProfile(long id, [FromBody] DriveAcceptDto driverId)
        {
            _driveService.AcceptDrive(id,driverId);
            return Ok();
        }


        [HttpPut("/rating/{driverId}")]
        [Authorize(Roles = "user")]
        public IActionResult RateDriver(long driverId, [FromBody] RatingDto rating)
        {
            _driveService.RateDriver(driverId,rating);
            return Ok();
        }

        [HttpGet("/estimated-time/{driveId}")]
        [Authorize]
        public IActionResult GetEstimatedTime(long driveId)
        {
            return Ok(_driveService.GetEstimatedTime(driveId));
        }

        [HttpPut("/drive/finished/{driveId}")]
        [Authorize]
        public IActionResult FinishDrive(long driveId)
        {
            _driveService.FinishDrive(driveId);
            return Ok();
        }
    }
}
