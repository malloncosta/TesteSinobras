using AutoMapper;
using WebApplication1.Domain.DTOs;
using WebApplication1.Domain.Model;

namespace WebApplication1.Application.Mapping
{
    public class DomainToDTOMapping : Profile
    {
        public DomainToDTOMapping() { 
            CreateMap<Employee, EmployeeDTO>()
                .ForMember(dest => dest.NameEmployee, m => m.MapFrom(orig => orig.name));

            CreateMap<Attendance, AttendanceDTO>()
                .ForMember(dest => dest.EmployeeId, m => m.MapFrom(orig => orig.employeeId));
        }
    }
}
