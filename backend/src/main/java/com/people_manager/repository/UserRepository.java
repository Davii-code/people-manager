package com.people_manager.repository;

import com.people_manager.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    Boolean existsByLogin(String login);
    Boolean existsByEmail(String email);
    User findByLogin(String login);
    User findByEmail(String email);
}
