using AutoMapper;
using Webapi.Domain.DTOs;
using Webapi.Domain.Model;

namespace Webapi.Application.Mapping
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
