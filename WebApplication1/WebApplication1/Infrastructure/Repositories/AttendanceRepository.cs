using WebApplication1.Domain.DTOs;
using WebApplication1.Domain.Model;

namespace WebApplication1.Infrastructure.Repositories
{
    public class AttendanceRepository : IAttendanceRepository
    {
        private readonly ConnectionContext _context = new ConnectionContext();

        public void Add(Attendance attendance)
        {
            _context.Attendances.Add(attendance);
            _context.SaveChanges();
        }

        public List<AttendanceDTO> Get()
        {
            return _context.Attendances
               .Select(b =>
                   new AttendanceDTO()
                   {
                       Id = b.id,
                       EmployeeId = b.employeeId,
                       Date = b.date,
                       EntryTime = b.entryTime,
                       ExitTime = b.exitTime
                   }
               ).ToList();
        }


        public List<Attendance> GetbyEmployeeId(int employeeId)
        {
            return _context.Attendances.Where(a => a.employeeId == employeeId).ToList();
        }


        public Attendance? GetByDate(int employeeId, DateTime date)
        {
            return _context.Attendances
                .FirstOrDefault(a => a.employeeId == employeeId && a.date == date);
        }

        public void Update(Attendance attendance)
        {
            _context.Attendances.Update(attendance);
            _context.SaveChanges();
        }

        public List<AttendanceDTO> GetByYearMonth(int year, int month)
        {
            return _context.Attendances
                .Where(b => b.date.Year == year && b.date.Month == month)
                .Select(b =>
                    new AttendanceDTO()
                    {
                        Id = b.id,
                        EmployeeId = b.employeeId,
                        Date = b.date,
                        EntryTime = b.entryTime,
                        ExitTime = b.exitTime
                    }
                ).ToList();
        }


    }
}
