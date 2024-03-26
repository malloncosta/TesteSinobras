using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Webapi.Domain.Model
{
    [Table("employee")]
    public class Employee
    {
        [Key]

        public int id { get; set; }

        public string name { get; set; }

        public int age { get; set; }

        public int registration { get; set; }

        public string position { get; set; }

        public float salary { get; set; }

        public string? photo { get; set; }

        public Employee(string name, int age, int registration, string position, float salary, string photo)
        {
            this.name = name ?? throw new ArgumentNullException(nameof(name));
            this.age = age;
            this.registration = registration;
            this.position = position;
            this.salary = salary;
            this.photo = photo;
        }
    }
}
