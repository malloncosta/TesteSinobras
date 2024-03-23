using WebApplication1.Domain.DTOs;


namespace WebApplication1.Domain.Model
{
    public interface IAttendanceRepository
    {
        void Add(Attendance attendance);

        List<AttendanceDTO> Get(int pageNumber, int pageQuantity);

        //Attendance? GetById(int id);

        Attendance? GetByDate(int employeeId, DateTime date); // Adicionando o método GetByDate

    }
}
