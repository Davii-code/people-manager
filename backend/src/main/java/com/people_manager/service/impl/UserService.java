package com.people_manager.service.impl;

import com.people_manager.base.exception.Message;
import com.people_manager.base.service.impl.AbstractService;
import com.people_manager.dto.list.UserListDTO;
import com.people_manager.dto.request.UserRequestDTO;
import com.people_manager.dto.response.UserResponseDTO;
import com.people_manager.entities.User;
import com.people_manager.entities.UserGroup;
import com.people_manager.enums.ErrorEnum;
import com.people_manager.mapper.UserMapper;
import com.people_manager.reflection.ReflectionUtil;
import com.people_manager.repository.UserGroupRepository;
import com.people_manager.repository.UserRepository;
import com.people_manager.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserService extends AbstractService<UserRequestDTO, UserResponseDTO, UserListDTO, User, UserRepository, UserMapper, Long>
        implements IUserService {

    @Autowired
    private UserGroupRepository userGroupRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void prepareToCreate(User data) {
        data.setLogin(data.getEmail());
        data.setPassword(encryptPassword(data.getPassword()));
        UserGroup userGroup = new UserGroup();
        userGroup = userGroupRepository.findByName("admin");
        data.setUserGroup(userGroup);
    }

    @Override
    protected void prepareToUpdate(User dataDB) {

        User existingUser = userRepository.findById(dataDB.getId()).orElse(null);
        if(dataDB.getPassword()==null || dataDB.getPassword().isBlank()) {
            dataDB.setPassword(encryptPassword(existingUser.getPassword()));
        }else {
            dataDB.setPassword(encryptPassword(dataDB.getPassword()));
        }

    }

    @Override
    protected void prepareToDelete(User dataDB) {

    }

    @Override
    protected void validateToMapCreate(UserRequestDTO dto, List<Message> messagesToThrow) {
        this.validateAnnotations(dto, messagesToThrow);
    }

    @Override
    protected void validateToMapUpdate(UserRequestDTO dto, List<Message> messagesToThrow) {
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

    private String encryptPassword(String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.encode(password);
    }

}
