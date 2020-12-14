package com.startup.tutorlink.entity;

import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private @NonNull Date payDate;
    private @NonNull Float amount;

    private Date approveDate;

    @ManyToOne
    private @NonNull PaymentStatus paymentStatus;

    @OneToOne
    private @NonNull  PostTutorUser postTutorUser;

    public Payment(){}
    public Payment(Date payDate,Float amount){
        this.payDate = payDate;
        this.amount = amount;
    }

    // getter setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getPayDate() {
        return payDate;
    }

    public void setPayDate(Date payDate) {
        this.payDate = payDate;
    }

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public Date getApproveDate() {
        return approveDate;
    }

    public void setApproveDate(Date approveDate) {
        this.approveDate = approveDate;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public PostTutorUser getPostTutorUser() {
        return postTutorUser;
    }

    public void setPostTutorUser(PostTutorUser postTutorUser) {
        this.postTutorUser = postTutorUser;
    }
}
