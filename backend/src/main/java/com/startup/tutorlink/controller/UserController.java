package com.startup.tutorlink.controller;

import java.util.Collection;
import java.util.stream.Collectors;

import com.startup.tutorlink.entity.User;
import com.startup.tutorlink.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("{_id}")
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    public User getUserById(@PathVariable Long _id) {
        return userRepository.findById(_id)
                .orElseThrow(() -> new UsernameNotFoundException("No user found with id " + _id));
    }

    @GetMapping("/getAllUser")
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    public Collection<User> getAllUser(@RequestParam final Integer page) {
        final Pageable pageable = PageRequest.of(page, 10);
        return userRepository.findAllByOrderByIdDesc(pageable);
    }

    @GetMapping("/current")
    //@PreAuthorize("hasRole('ROLE_MEMBER')")
    public User getCurrentUser(Authentication authentication) {
        return userRepository.findByUsername(authentication.getName()).get();
    }

    @GetMapping("/username/{_username}")
    //@PreAuthorize("hasRole('ROLE_MEMBER')")
    public User getUserByUsername(@PathVariable final String _username) {
        return userRepository.findByUsername(_username)
                .orElseThrow(() -> new UsernameNotFoundException("No user found with Username " + _username));
    }

    @GetMapping("/firstname/{_firstName}")
    //@PreAuthorize("hasRole('ROLE_MEMBER')")
    public User getUserByFirstName(@PathVariable final String _firstName) {
        return userRepository.findByFirstName(_firstName)
                .orElseThrow(() -> new UsernameNotFoundException("No user found with FristName " + _firstName));
    }

    @GetMapping("/email/{_email}")
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    public User getUserByEmail(@PathVariable final String _email) {
        return userRepository.findByEmail(_email)
                .orElseThrow(() -> new UsernameNotFoundException("No user found with Email " + _email));
    }

    @GetMapping("/phone/{_phone}")
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    public User getUserByPhone(@PathVariable final String _phone) {
        return userRepository.findByPhone(_phone)
                .orElseThrow(() -> new UsernameNotFoundException("No user found with Phone " + _phone));
    }

    @GetMapping("/name/{first}/{last}")
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    public User getUserByPhone(@PathVariable final String first, @PathVariable final String last) {
        return userRepository.findByName(first, last)
                .orElseThrow(() -> new UsernameNotFoundException("No user found with Name " + first + " " + last));
    }
}               