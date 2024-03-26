using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Webapi.Domain.Model
{
    [Table("attendance")]
    public class Attendance
    {

        [Key]

        public int id { get; set; }

        public int employeeId { get; set; }

        public DateTime date { get; set; }

        public DateTime entryTime { get; set; }

        public DateTime? exitTime { get; set; }

        public Attendance() { }

        public Attendance(int employeeId, DateTime date, DateTime entryTime, DateTime? exitTime)
        {
            this.employeeId = employeeId;
            this.date = date;
            this.entryTime = entryTime;
            this.exitTime = exitTime;
        }

    }
}
