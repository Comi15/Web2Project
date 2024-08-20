using System;
using System.Collections.Generic;
using WebProject.Dto;
using WebProject.Interfaces;
using WebProject.Models;

namespace WebProject.Services
{
    public class DriveService : IDriveService
    {
        private readonly IRepository _repository;

        public DriveService(IRepository repository)
        {
                _repository = repository;
        }

        public void AcceptDrive(long id, DriveAcceptDto driverId)
        {
            _repository.AcceptDrive(id, driverId);
        }

        public DriveDto AddDrive(DriveDto driveDto)
        {
            driveDto.UntilDriverAccept = driveDto.UntilDriverAccept.ToLocalTime();
            return _repository.AddDrive(driveDto);
           
        }

        public long GetDriverId(long id)
        {
            return _repository.GetDriverIdFromDrive(id);
        }

        public List<DriveDto> GetDrives()
        {
            return _repository.GetAllDrives();
        }

        public void RateDriver(long driverId,RatingDto rating)
        {
            int sum = 0;
            float averageRating;
            List<RatingDto> driverRatings = new List<RatingDto>();
            _repository.AddRating(rating);
            var ratings = _repository.GetAllRatings();
            foreach (var rat in ratings)
            {
                if(rat.UserId == driverId)
                {
                    driverRatings.Add(rat);
                }
            }

            foreach(var driverRating in  driverRatings)
            {
                sum += driverRating.RatingNumber;
            }

            averageRating = (float)sum / driverRatings.Count;

            _repository.UpdateDriverAverageRating(driverId, averageRating);


        }

        public EstimatedTimeDto GetEstimatedTime(long driveId)
        {
            DriveDto drive = _repository.GetDriveById(driveId);
            EstimatedTimeDto etDto = new EstimatedTimeDto();
            etDto.DriveState = drive.Status.ToString();

            if (drive.Status == DriveStatus.Status.In_Progress.ToString())
                etDto.Time = drive.UntilEndOfDrive;

            etDto.Time = drive.UntilDriverAccept;

            return etDto;
        }

        public void FinishDrive(long driveId)
        {
            _repository.FinishDrive(driveId);
        }
    }
}
