package com.startup.tutorlink.model;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

public class PageBody {

    @Min(0)
    @Max(100)
    private Integer page;

    @Min(1)
    @Max(10)
    private Integer size = 10;

    public Integer getPage() {
        return page;
    }

    public Integer getSize() {
        return size;
    }
}
