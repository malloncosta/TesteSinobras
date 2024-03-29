﻿using WebApplication1.Domain.DTOs;


namespace WebApplication1.Domain.Model
{
    public interface IAttendanceRepository
    {
        void Add(Attendance attendance);

        List<AttendanceDTO> Get();

        List<Attendance>? GetbyEmployeeId(int employeeId);

        Attendance? GetByDate(int employeeId, DateTime date);

        void Update(Attendance attendance);

        List<AttendanceDTO> GetByYearMonth(int year, int month, int employeeId);

        bool HasEntryToday(int employeeId);

        bool HasExitToday(int employeeId);

    }
}
