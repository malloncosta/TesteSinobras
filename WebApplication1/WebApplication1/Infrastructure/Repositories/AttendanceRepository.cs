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

        public List<AttendanceDTO> Get(int pageNumber, int pageQuantity)
        {
            return _context.Attendances.Skip(pageNumber * pageQuantity)
               .Take(pageQuantity)
               .Select(b =>
                   new AttendanceDTO()
                   {
                       Id = b.id,
                       EmployeeId = b.employeeId,
                       Date = b.date,
                       EntryTime = b.entryTime,
                   }
               ).ToList();
        }

        //public Attendance? GetbyId(int id)
        //{
        //    return _context.Attendances.Find(id);
        //}

        public Attendance? GetByDate(int employeeId, DateTime date)
        {
            return _context.Attendances
                .FirstOrDefault(a => a.employeeId == employeeId && a.date == date);
        }
    }
}
