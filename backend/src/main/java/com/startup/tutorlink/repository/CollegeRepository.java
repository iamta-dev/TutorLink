package com.startup.tutorlink.repository;

import com.startup.tutorlink.entity.College;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface CollegeRepository extends JpaRepository<College,Long> {
}
