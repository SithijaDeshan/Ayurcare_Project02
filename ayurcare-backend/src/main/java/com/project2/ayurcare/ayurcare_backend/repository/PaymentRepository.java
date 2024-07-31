package com.project2.ayurcare.ayurcare_backend.repository;

import com.project2.ayurcare.ayurcare_backend.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, String> {


}
