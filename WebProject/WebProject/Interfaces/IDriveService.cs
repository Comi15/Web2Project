using System;
using System.Collections.Generic;
using WebProject.Dto;
using WebProject.Models;

namespace WebProject.Interfaces
{
    public interface IDriveService
    {
        DriveDto AddDrive(DriveDto drive);
        List <DriveDto> GetDrives();

        void AcceptDrive(long id, DriveAcceptDto driverId);

        long GetDriverId (long id);

        void RateDriver(long id,RatingDto rating);
        EstimatedTimeDto GetEstimatedTime(long driveId);
        void FinishDrive(long driveId);
    }
}
