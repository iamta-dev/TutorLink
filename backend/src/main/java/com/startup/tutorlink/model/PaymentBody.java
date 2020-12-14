package com.startup.tutorlink.model;

public class PaymentBody {
    private String payDate;
    private Float Amount;
    private Long postTutorUserId;

    public String getPayDate() {
        return payDate;
    }

    public void setPayDate(String payDate) {
        this.payDate = payDate;
    }

    public Float getAmount() {
        return Amount;
    }

    public void setAmount(Float amount) {
        Amount = amount;
    }

    public Long getPostTutorUserId() {
        return postTutorUserId;
    }

    public void setPostTutorUserId(Long postTutorUserId) {
        this.postTutorUserId = postTutorUserId;
    }
}
