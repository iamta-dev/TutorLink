package com.startup.tutorlink.controller;

import com.startup.tutorlink.entity.*;
import com.startup.tutorlink.model.PostTutorBody;
import com.startup.tutorlink.model.auth.response.MessageResponse;
import com.startup.tutorlink.repository.*;
import org.hibernate.validator.internal.engine.messageinterpolation.parser.MessageDescriptorFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/post-tutor")
public class PostTutorController {
    @Autowired
    PostTutorRepository postTutorRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PostTutorUserRepository postTutorUserRepository;

    @Autowired
    PostRepository postRepository;

    @GetMapping("")
    public Collection<PostTutor> getAllPostTutor() {
    //return All PostTutor
        return postTutorRepository.findAll();
    }

    @GetMapping("/{id}")
    //return PostTutor by Post_id
    public Collection<PostTutor> getPostTutorById(@PathVariable Long id){
        Post post = postRepository.findById(id).orElseThrow(()->new MessageDescriptorFormatException("Not Founded by this id"));

        return postTutorRepository.findAllByPost(post);
    }

    @GetMapping("/join/getAll")
    //return All user join post tutor
    public List<PostTutorUser> getAllUserJoin() {
        return postTutorUserRepository.findAll();
    }

    @GetMapping("/join/get/{id}")
    //return All user join post tutor by postTutorId
        public Collection<PostTutorUser> getUserJoinById(@PathVariable final Long id) {
        final PostTutor postTutor = postTutorRepository.findById(id).get();
        return postTutorUserRepository.findByPostTutor(postTutor);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createTutorRequest(@Valid @RequestBody PostTutorBody postTutorBody, Authentication authentication) {
        try{
            PostTutor postTutor = new PostTutor();
            postTutor.setDescription(postTutorBody.getDescription());
            postTutor.setPrice(postTutorBody.getPrice());
            postTutor.setUser(userRepository.findByUsername(authentication.getName()).orElseThrow(() -> new UsernameNotFoundException("Can not found username")));
            postTutor.setPostDate(new Date());
            Post studentPost = postRepository.findById(postTutorBody.getPostId()).orElseThrow(()->new MessageDescriptorFormatException("Can not find Post id "));
            postTutor.setPost(studentPost);
            postTutor = postTutorRepository.save(postTutor);
            // Add tutor count
            studentPost.setTutorCount(studentPost.getTutorCount() + 1);
            postRepository.save(studentPost);
            return ResponseEntity.ok(new MessageResponse("OK: Join Post Success!"));
        }catch (Exception ex){
            System.out.println("Error can not join same post from user " + authentication.getName());
            //System.out.println("With Exception :" + ex.getMessage());
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: can not join same post!"));
        }

    }

    @PostMapping("/join/{id}")
    // student join room by post_tutor_id
    public PostTutorUser joinTutor(@PathVariable Long id,Authentication authentication){
        PostTutorUser postTutorUser = new PostTutorUser();
        postTutorUser.setPostTutor(postTutorRepository.findById(id).orElseThrow(() -> new MessageDescriptorFormatException("Can not find TutorRoom Id")));
        postTutorUser.setUser(userRepository.findByUsername(authentication.getName()).orElseThrow(() -> new UsernameNotFoundException("Can not found username")));
        postTutorUser = postTutorUserRepository.save(postTutorUser);

        return postTutorUserRepository.save(postTutorUser);
    }
}
