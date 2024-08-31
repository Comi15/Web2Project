using System;
using static WebProject.Models.DriveStatus;

namespace WebProject.Models
{
    public class Drive
    {
        public long Id { get; set; }
        public string StartDestination { get; set; }
        public string EndDestination { get; set; }
        public long DriverId { get; set; }
        public long UserId { get; set; }
        public User User { get; set; }
        public Status DriveStatus { get; set; }
        public DateTime UntilDriverAccept { get; set; }
        public DateTime UntilEndOfDrive { get; set; }
        public int EstimatedPrice { get; set; }

        public Drive()
        {
            DriveStatus = Status.No_Driver;
        }

    }
}
