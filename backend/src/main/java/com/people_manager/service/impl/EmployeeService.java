package com.people_manager.service.impl;

import com.people_manager.base.exception.Message;
import com.people_manager.base.service.impl.AbstractService;
import com.people_manager.dto.list.EmployeeListDto;
import com.people_manager.dto.request.EmployeeRequestDto;
import com.people_manager.dto.request.UserRequestDTO;
import com.people_manager.dto.response.EmployeeResponseDto;
import com.people_manager.entities.Employee;
import com.people_manager.enums.ErrorEnum;
import com.people_manager.mapper.EmployeeMapper;
import com.people_manager.reflection.ReflectionUtil;
import com.people_manager.repository.EmployeeRepository;
import com.people_manager.service.IEmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class EmployeeService extends AbstractService<EmployeeRequestDto, EmployeeResponseDto, EmployeeListDto, Employee, EmployeeRepository, EmployeeMapper, Long>
        implements IEmployeeService {
    @Override
    protected void prepareToCreate(Employee data) {

    }

    @Override
    protected void prepareToUpdate(Employee dataDB) {

    }

    @Override
    protected void prepareToDelete(Employee dataDB) {

    }

    @Override
    protected void validateToMapCreate(EmployeeRequestDto dto, List<Message> messagesToThrow) {
        this.validateAnnotations(dto, messagesToThrow);
    }

    @Override
    protected void validateToMapUpdate(EmployeeRequestDto dto, List<Message> messagesToThrow){
        this.validateAnnotations(dto, messagesToThrow);
    }


    private void validateAnnotations(Object object, List<Message> messagesToThrow) {
        Map<String, List<ErrorEnum>> mapErrors = ReflectionUtil.validateAnnotations(object);
        if (!mapErrors.isEmpty()) {
            for (String fieldKey : mapErrors.keySet()) {
                for (ErrorEnum errorEnum : mapErrors.get(fieldKey)) {
                    messagesToThrow.add(new Message(errorEnum, fieldKey));
                }
            }
        }
    }
}
