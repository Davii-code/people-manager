package com.people_manager.service.validations.user;

import com.people_manager.base.enums.ValidationActionsEnum;
import com.people_manager.base.exception.Message;
import com.people_manager.base.validation.IValidations;
import com.people_manager.entities.User;
import com.people_manager.enums.ErrorEnum;
import com.people_manager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserExistEmail implements IValidations<User> {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void validate(User data, ValidationActionsEnum action, List<Message> messagesToThrow) {
        if (action.equals(ValidationActionsEnum.CREATE)) {

            if (data.getEmail() != null && userRepository.existsByEmail(data.getEmail())) {
                messagesToThrow.add(new Message(ErrorEnum.EMAIL_EXISTS));
            }
        }
        if (action.equals(ValidationActionsEnum.UPDATE)){
            User existingUser = userRepository.findById(data.getId()).orElse(null);
            if (existingUser != null && !existingUser.getEmail().equals(data.getEmail())) {
                messagesToThrow.add(new Message(ErrorEnum.EMAIL_EXISTS));
            }
        }
    }
}
