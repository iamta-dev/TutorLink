package com.startup.tutorlink.repository;

import com.startup.tutorlink.entity.User;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByUsername(String username);

    @Query("SELECT u FROM User u WHERE u.firstName = :first and u.lastName = :last")
    Optional<User> findByName(@Param("first") String firstName, @Param("last") String lastName);

    Optional<User> findByFirstName(String firstName);

    Optional<User> findByEmail(String email);

    Optional<User> findByPhone(String phone);
    
    List<User> findAllByOrderByIdDesc(Pageable pageable);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
