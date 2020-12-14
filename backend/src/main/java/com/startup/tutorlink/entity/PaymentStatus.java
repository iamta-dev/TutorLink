package com.startup.tutorlink.entity;

import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Collection;

@Entity
public class PaymentStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private EPaymentStatus name;

    @OneToMany
    private Collection<Payment> payments;

    public PaymentStatus(){}

    public PaymentStatus(EPaymentStatus name){
        this.name = name;
    }

    public EPaymentStatus getName() {
        return name;
    }

    public void setName(EPaymentStatus name) {
        this.name = name;
    }
}
