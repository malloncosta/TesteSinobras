﻿using WebApplication1.Domain.DTOs;
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


        public Attendance? GetbyEmployeeId(int employeeId)
        {
            return _context.Attendances.Find(employeeId);
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

        public List<AttendanceDTO> GetByMonth(int month)
        {
            return _context.Attendances
                .Where(b => b.date.Month == month)
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
