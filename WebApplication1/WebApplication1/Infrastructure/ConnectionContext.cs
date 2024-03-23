using Microsoft.EntityFrameworkCore;
using WebApplication1.Domain.Model;

namespace WebApplication1.Infrastructure
{
    public class ConnectionContext : DbContext
    {
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Attendance> Attendances { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
          => optionsBuilder.UseNpgsql(
              "Server=localhost;" +
              "Port=5432;Database=employee_sample;" +
              "User Id=postgres;" +
              "Password=123;");
    }
}
