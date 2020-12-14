package com.startup.tutorlink.repository;

import com.startup.tutorlink.entity.Post;
import com.startup.tutorlink.entity.PostTutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Collection;
import java.util.Optional;

@RepositoryRestResource
public interface PostTutorRepository extends JpaRepository<PostTutor,Long> {
    public Collection<PostTutor> findAllByPost(Post post);
    public Optional<PostTutor> findById(Long id);
}
