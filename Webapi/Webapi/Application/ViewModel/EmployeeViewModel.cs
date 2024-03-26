namespace Webapi.Application.ViewModel
{
    public class EmployeeViewModel
    {
        public string Name { get; set; }
        public int Age { get; set; }

        public int Registration {  get; set; }

        public string Position { get; set; }

        public float Salary { get; set; }

        public IFormFile Photo { get; set; }
    }
}
