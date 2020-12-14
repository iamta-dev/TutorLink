package com.startup.tutorlink.repository;

import com.startup.tutorlink.entity.Major;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface MajorRepository extends JpaRepository<Major,Long> {
}
