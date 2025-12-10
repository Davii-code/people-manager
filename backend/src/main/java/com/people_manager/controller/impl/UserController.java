package com.people_manager.controller.impl;

import com.people_manager.base.controller.impl.AbstractCrudController;
import com.people_manager.controller.IUserController;
import com.people_manager.dto.list.UserListDTO;
import com.people_manager.dto.request.UserRequestDTO;
import com.people_manager.dto.response.UserResponseDTO;
import com.people_manager.entities.User;
import com.people_manager.mapper.UserMapper;
import com.people_manager.service.impl.UserService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "${api.version}/user")
public class UserController extends AbstractCrudController<UserRequestDTO, UserResponseDTO, UserListDTO, User, UserService, UserMapper, Long>
        implements IUserController {
}
