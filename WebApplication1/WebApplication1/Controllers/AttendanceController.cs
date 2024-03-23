using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Domain.Model;

namespace WebApplication1.Controllers
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
        [Route("{employeeId}/entry")]
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
        [Route("{employeeId}/exit")]
        public IActionResult RegisterExit(int employeeId)
        {
            var employee = _employeeRepository.Get(employeeId);
            if (employee == null)
            {
                return NotFound("Employee not found");
            }

            var now = DateTime.UtcNow;

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
            var attendances = _attendanceRepository.Get();
            return Ok(attendances);
        }

        [HttpGet]
        [Route("{employeeId}")]

        public IActionResult GetAttendancesByEmployeeId(int employeeId)
        {
            var attendances = _attendanceRepository.GetbyEmployeeId(employeeId);
            return Ok(attendances);
        }

    }
}
