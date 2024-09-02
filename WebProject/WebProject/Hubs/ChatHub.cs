using Microsoft.AspNetCore.SignalR;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebProject.Models;

namespace WebProject.Hubs
{
    public class ChatHub : Hub
    {
        private readonly string _botUser;
        private readonly IDictionary<string,UserConnection> _connections;

        public ChatHub(IDictionary<string,UserConnection> connections)
        {
            _connections = connections;
            _botUser = "MyChat Bot";
        }



        public async Task SendMessage(string message)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", userConnection.User, message);
            }
        }


        public async Task JoinRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.User);

            
            

            var userRole = userConnection.Role;

            _connections[Context.ConnectionId] = userConnection;
            await Clients.Group(userConnection.User).SendAsync("ReceiveMessage", _botUser,$" Welcome {userConnection.User}");
            if (userRole == "driver")
            {
                await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, "The driver has accpeted the drive, feel free to chat.");
            }
        }
    }
}
