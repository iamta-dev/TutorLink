package com.startup.tutorlink.repository;

import com.startup.tutorlink.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag,Long> {
    public Optional<Tag> findByName(String name);
}
