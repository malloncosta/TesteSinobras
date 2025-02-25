﻿using WebApplication1.Domain.DTOs;

namespace WebApplication1.Domain.Model
{
    public interface IEmployeeRepository
    {
        void Add(Employee employee);

        List<EmployeeDTO> Get(int pageNumber, int pageQuantity);

        Employee? Get(int id);
    }
}
