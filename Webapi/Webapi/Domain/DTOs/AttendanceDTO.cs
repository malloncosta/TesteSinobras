namespace Webapi.Domain.DTOs
{
    public class AttendanceDTO
    {
        public int Id { get; set; }

        public int EmployeeId { get; set; }

        public DateTime Date { get; set; }

        public DateTime EntryTime { get; set; }

        public DateTime? ExitTime { get; set; }
    }
}
