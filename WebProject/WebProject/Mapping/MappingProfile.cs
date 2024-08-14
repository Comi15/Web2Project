using AutoMapper;
using WebProject.Dto;
using WebProject.Models;

namespace WebProject.Mapping
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();
        }
    }
}
