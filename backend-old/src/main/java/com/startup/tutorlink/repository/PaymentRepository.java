package com.startup.tutorlink.repository;

import com.startup.tutorlink.entity.Payment;
import com.startup.tutorlink.entity.PaymentStatus;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RepositoryRestResource
public interface PaymentRepository extends JpaRepository<Payment,Long> {
    public List<Payment> findAllByPaymentStatus(PaymentStatus paymentStatus,Pageable pageable);
    public Optional<Payment> findById(Long id);
    public List<Payment> findAllByOrderByIdDesc(Pageable pageable);
}
