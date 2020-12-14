package com.startup.tutorlink.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Collection;

@Entity
public class Tag {

    public Tag(String name){
        this.setName(name);
    }

    public Tag(){}

    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(unique = true)
    private String name;

    @JsonIgnore
    @OneToMany
    private Collection<Tag_Post> tag_posts;

    // Getter Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Collection<Tag_Post> getTag_posts() {
        return tag_posts;
    }

    public void setTag_posts(Collection<Tag_Post> tag_posts) {
        this.tag_posts = tag_posts;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
