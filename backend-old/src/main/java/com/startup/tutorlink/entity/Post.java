package com.startup.tutorlink.entity;

import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;

@Entity
@NoArgsConstructor
public class Post {
    @Id
    @SequenceGenerator(name="POST_SEQ",sequenceName="POST_SEQ")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="POST_SEQ")
    @Column(name = "POST_ID", nullable = false, unique = true)
    private @NonNull Long id;

    private String topic;
    private String description;
    private Date postDate;

    @ManyToOne
    private User user;

    @OneToMany
    private Collection<Department> departments;

    @OneToMany(mappedBy = "post")
    private Collection<Tag_Post> tag_posts;

    private Integer tutorCount = 0;

    private Date updateDate;

    // Methods
    @PreUpdate
    public void onUpdate() {
        updateDate = new Date();
    }
    @PrePersist
    public void onCreate(){
        postDate = new Date();
    }
    
    // Getter Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getPostDate() {
        return postDate;
    }

    public void setPostDate(Date postDate) {
        this.postDate = postDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Collection<Tag_Post> getTag_posts() {
        return tag_posts;
    }

    public void setTag_posts(Collection<Tag_Post> tag_posts) {
        this.tag_posts = tag_posts;
    }

    public Integer getTutorCount() {
        return tutorCount;
    }

    public void setTutorCount(Integer tutorCount) {
        this.tutorCount = tutorCount;
    }
}
