using System;

namespace WebProject.Dto
{
    public class DriveDto
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public long DriverId { get; set; }
        public string StartDestination { get; set; }
        public string EndDestination { get; set; }
        public string Status { get; set; }
        public DateTime UntilDriverAccept { get; set; }
        public DateTime UntilEndOfDrive { get; set; }
        public int EstimatedPrice { get; set; }
    }
}
