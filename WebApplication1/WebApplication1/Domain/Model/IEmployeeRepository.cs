using WebApplication1.Domain.DTOs;

namespace WebApplication1.Domain.Model
{
    public interface IEmployeeRepository
    {
        void Add(Employee employee);

        List<EmployeeDTO> Get();

        Employee? Get(int id);

        void Update(Employee employee);

        public void Delete(int id);

    }
}
