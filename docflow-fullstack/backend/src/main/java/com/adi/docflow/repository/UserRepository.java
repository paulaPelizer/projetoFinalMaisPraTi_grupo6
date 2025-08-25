package com.adi.docflow.repository;

import com.adi.docflow.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUuid(String uuid);
    boolean existsByEmail(String email);
}
