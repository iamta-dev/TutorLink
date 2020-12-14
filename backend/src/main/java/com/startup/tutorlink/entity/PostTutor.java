package com.startup.tutorlink.entity;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import java.util.Date;

@Entity
@NoArgsConstructor
@Table(	name = "POST_TUTOR",
        uniqueConstraints=@UniqueConstraint(columnNames={"POST_ID", "USER_ID"})
)
public class PostTutor {
    @Id
    @SequenceGenerator(name="POST_TUTOR_SEQ",sequenceName="POST_TUTOR_SEQ")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="POST_TUTOR_SEQ")
    @Column(name = "POST_TUTOR_ID", nullable = false, unique = true)
    private @NonNull Long id;

    private float price;

    private String description;

    private Date postDate;

    // tutor
    @ManyToOne
    @JoinColumn(name="USER_ID")
    private User user;

    @JsonIgnore
    @ManyToOne
    private PostTutorUser postTutorUser;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name="POST_ID")
    private Post post;

    //Setter Getter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public PostTutorUser getPostTutorUser() {
        return postTutorUser;
    }

    public void setPostTutorUser(PostTutorUser postTutorUser) {
        this.postTutorUser = postTutorUser;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
