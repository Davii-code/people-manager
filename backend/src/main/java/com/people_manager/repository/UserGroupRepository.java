package com.people_manager.repository;

import com.people_manager.entities.UserGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserGroupRepository extends JpaRepository<UserGroup, Long> {
    UserGroup findByName(String name);
}
