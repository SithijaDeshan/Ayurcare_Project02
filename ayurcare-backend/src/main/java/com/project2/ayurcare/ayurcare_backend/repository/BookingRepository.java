package com.project2.ayurcare.ayurcare_backend.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project2.ayurcare.ayurcare_backend.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, String>{

	@Query("SELECT b FROM Booking b JOIN b.timeSlotId t WHERE b.patient.patientId = :patientId AND t.date = :date")
    List<Booking> findByPatientIdAndDate(@Param("patientId") String patientId, @Param("date") LocalDate date);
	//use jpql query for operate on the entity objects

    @Query("SELECT b FROM Booking b WHERE b.patient.patientId = :patientId AND b.bookingDate BETWEEN :startOfDay AND :endOfDay")
    List<Booking> findByPatientIdAndDate(@Param("patientId") String patientId, @Param("startOfDay") LocalDateTime startOfDay, @Param("endOfDay") LocalDateTime endOfDay);
	
}
