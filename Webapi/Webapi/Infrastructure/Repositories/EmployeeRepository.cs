using Microsoft.EntityFrameworkCore;
using Webapi.Domain.DTOs;
using Webapi.Domain.Model;

namespace Webapi.Infrastructure.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly ConnectionContext _context = new ConnectionContext();
        public void Add(Employee employee)
        {
            _context.Employees.Add(employee);
            _context.SaveChanges();
        }

        public List<EmployeeDTO> Get()
        {
            return _context.Employees
                .Select(b =>
                    new EmployeeDTO()
                    {
                        Id = b.id,
                        NameEmployee = b.name,
                        Age = b.age,
                        Registration = b.registration,
                        Position = b.position,
                        Salary = b.salary,
                        Photo = b.photo
                    }
                ).ToList();
        }

        public Employee? Get(int id)
        {
            return _context.Employees.Find(id);
        }

        public void Update(Employee employee)
        {
            _context.Employees.Update(employee);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var employeeToDelete = _context.Employees.Find(id);

            var attendancesToDelete = _context.Attendances.Where(a => a.employeeId == id);
            _context.Attendances.RemoveRange(attendancesToDelete);

            if (employeeToDelete != null)
            {
                _context.Employees.Remove(employeeToDelete);
                _context.SaveChanges();
            }
        }
    }
}
