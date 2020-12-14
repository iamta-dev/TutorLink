package com.startup.tutorlink.repository;

import com.startup.tutorlink.entity.Tag_Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface Tag_PostRepository extends JpaRepository<Tag_Post,Long> {
    public Optional<Tag_Post> findById(Long id);
//    public Collection<Tag_Post> findAllByTag(Tag tag);
}
