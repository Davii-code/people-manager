package com.people_manager.mapper;

import com.people_manager.base.mapper.GenericMapper;
import com.people_manager.dto.list.UserListDTO;
import com.people_manager.dto.request.UserRequestDTO;
import com.people_manager.dto.response.UserResponseDTO;
import com.people_manager.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface UserMapper extends GenericMapper<UserRequestDTO, UserResponseDTO, UserListDTO, User, Long> {
}
