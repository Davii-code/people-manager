package com.people_manager.service;

import com.people_manager.base.service.IAbstractService;
import com.people_manager.dto.request.UserRequestDTO;
import com.people_manager.entities.User;

public interface IUserService extends IAbstractService<UserRequestDTO, User, Long> {
}
