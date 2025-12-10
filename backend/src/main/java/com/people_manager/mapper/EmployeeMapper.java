package com.people_manager.mapper;

import com.people_manager.base.mapper.GenericMapper;
import com.people_manager.dto.list.EmployeeListDto;
import com.people_manager.dto.request.EmployeeRequestDto;
import com.people_manager.dto.response.EmployeeResponseDto;
import com.people_manager.entities.Employee;
import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface EmployeeMapper extends GenericMapper<EmployeeRequestDto, EmployeeResponseDto, EmployeeListDto, Employee, Long> {
}
