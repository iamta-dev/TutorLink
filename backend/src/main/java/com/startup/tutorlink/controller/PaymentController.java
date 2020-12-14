package com.startup.tutorlink.controller;

import com.startup.tutorlink.entity.EPaymentStatus;
import com.startup.tutorlink.entity.Payment;
import com.startup.tutorlink.model.PaymentBody;
import com.startup.tutorlink.repository.PaymentRepository;
import com.startup.tutorlink.repository.PaymentStatusRepository;
import com.startup.tutorlink.repository.PostTutorUserRepository;
import org.hibernate.validator.internal.engine.messageinterpolation.parser.MessageDescriptorFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    PaymentRepository paymentRepository;

    @Autowired
    PostTutorUserRepository postTutorUserRepository;

    @Autowired
    PaymentStatusRepository paymentStatusRepository;

    @PostMapping("/create")
    //@PreAuthorize("hasRole('MEMBER')")
    public Payment createPayment(@Valid @RequestBody PaymentBody paymentBody) throws ParseException {
        Date payDate = new SimpleDateFormat("yyyy-MM-dd HH:mm").parse(paymentBody.getPayDate());
        Payment payment = new Payment(payDate,paymentBody.getAmount());
        payment.setPaymentStatus(paymentStatusRepository.findByName(EPaymentStatus.PENDING));
        payment.setPostTutorUser(postTutorUserRepository.findById(paymentBody.getPostTutorUserId()).orElseThrow(()->new MessageDescriptorFormatException("PostTutorId not founded")));
        return paymentRepository.save(payment);
    }

    /// Admin zone
    @GetMapping("")
    //@PreAuthorize("hasRole('ADMIN')")
    public Collection<Payment> getAllPayment(@RequestParam final Integer page){
        final Pageable pageable = PageRequest.of(page, 10);
        return paymentRepository.findAllByOrderByIdDesc(pageable);
    }

    @GetMapping("/unApprove")
    //@PreAuthorize("hasRole('ADMIN')")
    public Collection<Payment> getUnApprovePayment(@RequestParam final Integer page){
        final Pageable pageable = PageRequest.of(page, 10);
        return paymentRepository.findAllByPaymentStatus(paymentStatusRepository.findByName(EPaymentStatus.PENDING),pageable); //return all payment status unApprove
    }
    @GetMapping("/approve")
    //@PreAuthorize("hasRole('ADMIN')")
    public Collection<Payment> getApprovePayment(@RequestParam final Integer page){
        final Pageable pageable = PageRequest.of(page, 10);
        return paymentRepository.findAllByPaymentStatus(paymentStatusRepository.findByName(EPaymentStatus.APPROVE),pageable); //return all payment status Approve
    }
    @GetMapping("/reject")
    //@PreAuthorize("hasRole('ADMIN')")
    public Collection<Payment> getRejectPayment(@RequestParam final Integer page){
        final Pageable pageable = PageRequest.of(page, 10);
        return paymentRepository.findAllByPaymentStatus(paymentStatusRepository.findByName(EPaymentStatus.REJECT),pageable); //return all payment status Reject
    }

    @PutMapping("/approve/{payment_id}")
    //@PreAuthorize("hasRole('ADMIN')")
    public Payment approvePayment(@PathVariable Long payment_id){
        Payment payment = paymentRepository.findById(payment_id).orElseThrow(()->new MessageDescriptorFormatException("Id not founded"));
        payment.setApproveDate(new Date());
        payment.setPaymentStatus(paymentStatusRepository.findByName(EPaymentStatus.APPROVE));
        return paymentRepository.save(payment);
    }

    @PutMapping("/reject/{payment_id}")
    //@PreAuthorize("hasRole('ADMIN')")
    public Payment rejectPayment(@PathVariable Long payment_id){
        Payment payment = paymentRepository.findById(payment_id).orElseThrow(()->new MessageDescriptorFormatException("Id not founded"));
        payment.setApproveDate(new Date());
        payment.setPaymentStatus(paymentStatusRepository.findByName(EPaymentStatus.REJECT));
        return paymentRepository.save(payment);
    }
}
