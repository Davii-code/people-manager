package com.people_manager.service;

import com.people_manager.base.service.IAbstractService;
import com.people_manager.dto.request.EmployeeRequestDto;
import com.people_manager.entities.Employee;

public interface IEmployeeService extends IAbstractService<EmployeeRequestDto, Employee, Long> {
}
