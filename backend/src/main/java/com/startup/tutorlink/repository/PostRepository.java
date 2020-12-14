package com.startup.tutorlink.repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import com.startup.tutorlink.entity.Post;
import com.startup.tutorlink.entity.User;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface PostRepository extends JpaRepository<Post, Long> {

  public Optional<Post> findById(Long id);
  
  public Collection<Post> findAllByUser(User user);

  public List<Post> findAllByOrderByUpdateDateDesc(Pageable pageable);

  public List<Post> findAllByUserOrderByUpdateDateDesc(User user, Pageable pageable);

  @Query("select p from Post p where p.description like %?1% or p.topic like %?1% ORDER BY p.id desc")
  public List<Post> findByContent(String content, Pageable pageable);
  // public Optional<Post> findByTag_posts(Tag_Post tag_post);
}
