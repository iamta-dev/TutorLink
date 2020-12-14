package com.startup.tutorlink.repository;

import com.startup.tutorlink.entity.EPaymentStatus;
import com.startup.tutorlink.entity.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface PaymentStatusRepository extends JpaRepository<PaymentStatus,Long> {
    public PaymentStatus findByName(EPaymentStatus name);
}
