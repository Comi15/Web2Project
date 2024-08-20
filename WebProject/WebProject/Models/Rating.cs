namespace WebProject.Models
{
    public class Rating
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public  int RatingNumber { get; set; }
        public User User { get; set; }
    }
}
