package com.startup.tutorlink.controller;

import com.startup.tutorlink.entity.Post;
import com.startup.tutorlink.entity.Tag;
import com.startup.tutorlink.entity.Tag_Post;
import com.startup.tutorlink.entity.User;
import com.startup.tutorlink.model.PostBody;
import com.startup.tutorlink.model.PostSearchBody;
import com.startup.tutorlink.repository.PostRepository;
import com.startup.tutorlink.repository.TagRepository;
import com.startup.tutorlink.repository.Tag_PostRepository;
import com.startup.tutorlink.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.Date;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/api/post")
public class PostController {

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    TagRepository tagRepository;

    @Autowired
    Tag_PostRepository tag_postRepository;

    @GetMapping("")
    public Collection<Post> getAllPost(@RequestParam final Integer page,@RequestParam Integer size) {
        if(size > 10){
            size = 10;
        }
        final Pageable pageable = PageRequest.of(page, size);
        return postRepository.findAllByOrderByUpdateDateDesc(pageable);
    }

    @GetMapping("search")
    public Collection<Post> searchPost(@Valid @RequestBody final PostSearchBody postSearchBody) {
        final Pageable pageable = PageRequest.of(postSearchBody.getPage(), postSearchBody.getSize());
        return postRepository.findByContent(postSearchBody.getContent(), pageable);
    }

    // @GetMapping("/users/{_id}")
    // public Collection<Post> getAllPostByUser(@PathVariable final Long _id, @RequestParam final Integer page) {
    //     final Pageable pageable = PageRequest.of(page, 10);
    //     return postRepository.findAllByUserOrderByIdDesc(userRepository.findById(_id)
    //             .orElseThrow(() -> new UsernameNotFoundException("No user found with id " + _id)), pageable);
    // }

    @GetMapping("/{id}")
    public Optional<Post> getPostById(@PathVariable final Long id) {
        final Optional<Post> getPostById = postRepository.findById(id);
        return getPostById;
    }

    @GetMapping("/users/{_username}")
    public Collection<Post> getPostsByUsername(@PathVariable final String _username) {
        Optional<User> user = userRepository.findByUsername(_username);
        return postRepository.findAllByUser(user.orElseThrow(() -> new UsernameNotFoundException("No user found with username: " + _username)));
    }

    @PostMapping("")
    public Long createdPost(@Valid @RequestBody final PostBody postBody, final Authentication authentication) {
        Post post = new Post();
        post.setTopic(postBody.getTopic());
        post.setDescription(postBody.getDescription());
        post.setPostDate(new Date());
        post.setUser(userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("")));

        post = postRepository.save(post);

        for (final String tagName : postBody.getTags()) {
            Tag tag;
            try {
                tag = tagRepository.findByName(tagName).get();
            } catch (final NoSuchElementException ex) {
                tag = tagRepository.save(new Tag(tagName));
                System.out.println("Add Tag " + tag.getName());
            }
            tag_postRepository.save(new Tag_Post(post, tag));
        }

        return post.getId();
    }
}
