package com.startup.tutorlink.model;

public class PostSearchBody extends PageBody{
    private String content;
    private String[] tagNames;
    private Integer page;

    //Getter Setter
    public String[] getTagNames() {
        return tagNames;
    }

    public String getContent() {
        return content;
    }

    public Integer getPage() {
        return page;
    }
}
