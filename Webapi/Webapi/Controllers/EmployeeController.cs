using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.IO;
using Webapi.Application.ViewModel;
using Webapi.Domain.DTOs;
using Webapi.Domain.Model;

namespace Webapi.Controllers
{
    [ApiController]
    [Route("api/v1/employee")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IAttendanceRepository _attendanceRepository;
        private readonly ILogger<EmployeeController> _logger;
        private readonly IMapper _mapper;

        public EmployeeController(IEmployeeRepository employeeRepository, IAttendanceRepository attendanceRepository, ILogger<EmployeeController> logger, IMapper mapper)
        {
            _employeeRepository = employeeRepository ?? throw new ArgumentNullException(nameof(employeeRepository));
            _attendanceRepository = attendanceRepository ?? throw new ArgumentNullException(nameof(attendanceRepository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        //[Authorize]
        [HttpPost]
        public IActionResult Add([FromForm] EmployeeViewModel employeeView)
        {
            var filePath = Path.Combine("Storage", employeeView.Photo.FileName);

            using Stream fileStream = new FileStream(filePath, FileMode.Create);
            employeeView.Photo.CopyTo(fileStream);

            var employee = new Employee(
                employeeView.Name, 
                employeeView.Age, 
                employeeView.Registration, 
                employeeView.Position, 
                employeeView.Salary, 
                filePath
            );

            _employeeRepository.Add(employee);

            return Ok("Employee created");
        }

        //[Authorize]
        [HttpPost]
        [Route("image/{id}")]
        public IActionResult DownloadPhoto(int id)
        {
            var employee = _employeeRepository.Get(id);

            var dataByte = System.IO.File.ReadAllBytes(employee.photo);

            return File(dataByte, "image/png");
        }

        [HttpGet]
        public IActionResult Get()
        {
            var employeesWithAttendance = _employeeRepository.Get()
                .Select(employee => new {
                    EmployeeId = employee.Id,
                    Name = employee.NameEmployee,
                    Age = employee.Age,
                    Position = employee.Position,
                    Salary = employee.Salary,
                    Registration = employee.Registration,
                    Photo = employee.Photo,
                    Attendance = _attendanceRepository.GetbyEmployeeId(employee.Id),
                    HasEntryToday = _attendanceRepository.HasEntryToday(employee.Id),
                    HasExitToday = _attendanceRepository.HasExitToday(employee.Id)
                }) 
                .ToList();

            return Ok(employeesWithAttendance);
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult Search(int id)
        {
            var employees = _employeeRepository.Get(id);

            var employeesDTOS = _mapper.Map<EmployeeDTO>(employees);

            return Ok(employeesDTOS);
        }

        [HttpPut]
        [Route("update/{id}")]
        public IActionResult Update(int id, [FromForm] EmployeeViewModel employeeView)
        {
            var existingEmployee = _employeeRepository.Get(id);
            if (existingEmployee == null)
            {
                return NotFound("Employee not found");
            }

            if (employeeView.Photo != null)
            {
                var filePath = Path.Combine("Storage", employeeView.Photo.FileName);

                using Stream fileStream = new FileStream(filePath, FileMode.Create);
                employeeView.Photo.CopyTo(fileStream);

                existingEmployee.photo = filePath;
            }

            existingEmployee.name = employeeView.Name;
            existingEmployee.age = employeeView.Age;
            existingEmployee.registration = employeeView.Registration;
            existingEmployee.position = employeeView.Position;
            existingEmployee.salary = employeeView.Salary;

            _employeeRepository.Update(existingEmployee);

            return Ok("Employee updated successfully");
        }


        [HttpDelete]
        [Route("delete/{id}")]
        public IActionResult Delete(int id)
        {
            var existingEmployee = _employeeRepository.Get(id);
            if (existingEmployee == null)
            {
                return NotFound("Employee not found");
            }

            _employeeRepository.Delete(id);

            return Ok("Employee deleted successfully");
        }


    }
}
