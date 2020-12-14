package com.startup.tutorlink.entity;

import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Collection;

@Entity
public class Major {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany
    private Collection<Department> departments;

    @ManyToOne
    private College college;

    public Major(){}
    public Major(String name,College college){
        this.name = name;
        this.college = college;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Collection<Department> getDepartments() {
        return departments;
    }

    public void setDepartments(Collection<Department> departments) {
        this.departments = departments;
    }

    public College getCollege() {
        return college;
    }

    public void setCollege(College college) {
        this.college = college;
    }
}
