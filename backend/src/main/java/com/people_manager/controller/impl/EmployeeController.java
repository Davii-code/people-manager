package com.people_manager.controller.impl;

import com.people_manager.base.controller.impl.AbstractCrudController;
import com.people_manager.controller.IEmployeeController;
import com.people_manager.dto.list.EmployeeListDto;
import com.people_manager.dto.request.EmployeeRequestDto;
import com.people_manager.dto.response.EmployeeResponseDto;
import com.people_manager.entities.Employee;
import com.people_manager.mapper.EmployeeMapper;
import com.people_manager.service.impl.EmployeeService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "${api.version}/employee")
public class EmployeeController  extends AbstractCrudController<EmployeeRequestDto, EmployeeResponseDto, EmployeeListDto, Employee, EmployeeService, EmployeeMapper, Long>
        implements IEmployeeController {
}
