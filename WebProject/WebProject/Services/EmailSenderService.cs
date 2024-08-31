using Microsoft.Extensions.Configuration;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using WebProject.Interfaces;

namespace WebProject.Services
{
    public class EmailSenderService : IEmailSender
    {
        private readonly IConfigurationSection _pass;

        public EmailSenderService(IConfiguration config)
        {
            _pass = config.GetSection("EmailPassword");
        }

        public async Task SendEmailAsync(string email, string subject, string message)
        {
            var mail = "test15133@outlook.com"; 
            var pw = _pass.Value;

            var client = new SmtpClient("smtp-mail.outlook.com", 587)
            {
                EnableSsl = true,
                Credentials =   new NetworkCredential(mail,pw)
                
            };

                 await client.SendMailAsync
                (
                    new MailMessage
                        (
                            from:mail,
                            to:email,
                            subject,
                            message
                        )
                );
        }
    }
}
