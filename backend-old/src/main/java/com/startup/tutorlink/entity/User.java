package com.startup.tutorlink.entity;

import com.startup.tutorlink.entity.auth.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NonNull;
import org.springframework.format.annotation.NumberFormat;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(	name = "USERS",
uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email")
})
public class User {
    @Id
    @SequenceGenerator(name="USER_SEQ",sequenceName="USER_SEQ")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="USER_SEQ")
    @Column(name = "USER_ID", nullable = false, unique = true)
    @JsonIgnore
    private @NonNull Long id;

    @Column(length = 10)
    private @NumberFormat String phone;

    private String firstName;
    private String lastName;

    @NotBlank
    @Size(max = 20)
    private String username;

    @Size(max = 50)
    @Email
    @NotBlank
    private String email;

    @JsonIgnore
    @NotBlank
    @Size(max = 120)
    private String password;

    private Date regDate;

    private String userImg;
    
    private String shortDetail;

    @OneToMany
    private Collection<Post> posts;

    @OneToMany
    private Collection<PostTutorUser> postTutorUsers;
    
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(	name = "USER_ROLES",
            joinColumns = @JoinColumn(name = "USER_ID"),
            inverseJoinColumns = @JoinColumn(name = "ROLE_ID"))
    private Set<Role> roles = new HashSet<>();

    @JsonIgnore
    @OneToMany
    private Collection<PostTutor> postTutors;

    //setter getter construct
    public User() {
    }

    public User(String username, String email, String password,String phone,String firstName,String lastName) {
        this.setUsername(username);
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.setFirstName(firstName);
        this.setLastName(lastName);
    }
    
    // Methods
    @PrePersist
    public void onCreate() {
        this.regDate = new Date();
    }

    // Getter Setter

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getRegDate() {
        return regDate;
    }

    public void setRegDate(Date regDate) {
        this.regDate = regDate;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Collection<Post> getPosts() {
        return posts;
    }

    public void setPosts(Collection<Post> posts) {
        this.posts = posts;
    }

    public Collection<PostTutorUser> getPostTutorUsers() {
        return postTutorUsers;
    }

    public void setPostTutorUsers(Collection<PostTutorUser> postTutorUsers) {
        this.postTutorUsers = postTutorUsers;
    }
}
