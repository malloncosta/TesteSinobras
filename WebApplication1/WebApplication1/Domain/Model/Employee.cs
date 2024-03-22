using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Domain.Model
{
    [Table("employee")]
    public class Employee
    {
        [Key]

        public int id { get; set; }

        public string name { get; set; }

        public int age { get; set; }

        public string? photo { get; set; }

        public Employee(string name, int age, string photo)
        {
            this.name = name ?? throw new ArgumentNullException(nameof(name));
            this.age = age;
            this.photo = photo;
        }
    }
}
