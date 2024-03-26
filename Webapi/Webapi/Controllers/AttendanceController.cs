using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Webapi.Domain.Model;

namespace Webapi.Controllers
{
    [ApiController]
    [Route("api/v1/attendance")]
    public class AttendanceController : Controller
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IAttendanceRepository _attendanceRepository;
        private readonly ILogger<EmployeeController> _logger;
        private readonly IMapper _mapper;

        public AttendanceController(IEmployeeRepository employeeRepository, IAttendanceRepository attendanceRepository, ILogger<EmployeeController> logger, IMapper mapper)
        {
            _employeeRepository = employeeRepository ?? throw new ArgumentNullException(nameof(employeeRepository));
            _attendanceRepository = attendanceRepository ?? throw new ArgumentNullException(nameof(attendanceRepository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }
        [HttpPost]
        [Route("entry/{employeeId}")]
        public IActionResult RegisterAttendance(int employeeId)
        {
            var employee = _employeeRepository.Get(employeeId);
            if (employee == null)
            {
                return NotFound("Employee not found");
            }

            //var now = DateTime.Now;
            var now = DateTime.UtcNow;
            //if (now.DayOfWeek == DayOfWeek.Saturday || now.DayOfWeek == DayOfWeek.Sunday)
            //{
            //    return BadRequest("Cannot register attendance on weekends");
            //}

            var startWorkingHours = new DateTime(now.Year, now.Month, now.Day, 8, 0, 0);
            var endWorkingHours = new DateTime(now.Year, now.Month, now.Day, 18, 0, 0);

            //if (now < startWorkingHours || now > endWorkingHours)
            //{
            //    return BadRequest("Cannot register attendance outside of working hours (08:00 to 18:00).");
            //}

            var todayAttendance = _attendanceRepository.GetByDate(employeeId, now.Date);
            if (todayAttendance != null)
            {
                return BadRequest("Attendance already registered for today");
            }


            var attendance = new Attendance(employeeId, DateTime.UtcNow.Date, now, null);

            _attendanceRepository.Add(attendance);

            return Ok("Attendance registered successfully");
        }

        [HttpPost]
        [Route("exit/{employeeId}")]
        public IActionResult RegisterExit(int employeeId)
        {
            var employee = _employeeRepository.Get(employeeId);
            if (employee == null)
            {
                return NotFound("Employee not found");
            }

            var now = DateTime.UtcNow;

            //var startWorkingHours = new DateTime(now.Year, now.Month, now.Day, 8, 0, 0);
            //var endWorkingHours = new DateTime(now.Year, now.Month, now.Day, 18, 0, 0);

            //if (now < startWorkingHours || now > endWorkingHours)
            //{
            //    return BadRequest("Cannot register attendance outside of working hours (08:00 to 18:00).");
            //}

            var todayAttendance = _attendanceRepository.GetByDate(employeeId, now.Date);
            if (todayAttendance == null || todayAttendance.exitTime != null)
            {
                return BadRequest("No matching entry record found or exit already registered for today");
            }

            todayAttendance.exitTime = now;
            _attendanceRepository.Update(todayAttendance);

            return Ok("Exit registered successfully");
        }

        [HttpGet]
        public IActionResult GetAttendances()
        {
            var attendancesWithEmployee = _attendanceRepository.Get()
                .Where(attendance => attendance.EmployeeId != 0)
                .Select(attendance => new {
                    AttendanceId = attendance.Id,
                    Date = attendance.Date,
                    EntryTime = attendance.EntryTime,
                    ExitTime = attendance.ExitTime,
                    Employee = _employeeRepository.Get(attendance.EmployeeId)
                })
                .ToList();

            return Ok(attendancesWithEmployee);
        }



        [HttpGet]
        [Route("employeeId/{employeeId}")]

        public IActionResult GetAttendancesByEmployeeId(int employeeId)
        {
            var attendances = _attendanceRepository.GetbyEmployeeId(employeeId);
            return Ok(attendances);
        }

        [HttpGet]
        [Route("year/{year}/month/{month}")]
        public IActionResult GetAttendancesByMonth(int year, int month)
        {

            if (month < 1 || month > 12)
            {
                return BadRequest("Invalid month");
            }

            var employeesWithAttendance = _employeeRepository.Get()
                .Select(employee => new {
                EmployeeId = employee.Id,
                Name = employee.NameEmployee,
                Age = employee.Age,
                Position = employee.Position,
                Salary = employee.Salary,
                Registration = employee.Registration,
                Photo = employee.Photo,
                Attendance = _attendanceRepository.GetByYearMonth(year, month, employee.Id)
                })
                .ToList();

            return Ok(employeesWithAttendance);
        }

    }
}
