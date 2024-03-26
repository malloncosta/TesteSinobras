namespace Webapi.Domain.DTOs
{
    public class EmployeeDTO
    {
        public int Id { get; set; }

        public required string NameEmployee { get; set; }

        public int Age { get; set; }

        public int Registration {  get; set; }

        public required string Position { get; set; }

        public float Salary { get; set; }

        public string? Photo
        {
            get; set;
        }
    }
}
