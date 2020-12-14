package com.startup.tutorlink.repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import com.startup.tutorlink.entity.Post;
import com.startup.tutorlink.entity.PostTutorUser;
import com.startup.tutorlink.entity.PostTutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface PostTutorUserRepository extends JpaRepository<PostTutorUser,Long> {
    public Optional<PostTutorUser> findById(Long id);
    public Collection<PostTutorUser> findByPostTutor(PostTutor postTutor);
}
