package com.startup.tutorlink.repository.auth;


import com.startup.tutorlink.entity.auth.ERole;
import com.startup.tutorlink.entity.auth.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}

