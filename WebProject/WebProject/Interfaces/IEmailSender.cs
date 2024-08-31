using System.Threading.Tasks;

namespace WebProject.Interfaces
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email,string subject,string message);
    }
}
