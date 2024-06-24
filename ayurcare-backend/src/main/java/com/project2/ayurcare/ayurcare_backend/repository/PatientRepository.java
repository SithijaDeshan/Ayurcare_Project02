package com.project2.ayurcare.ayurcare_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project2.ayurcare.ayurcare_backend.entity.Patient;

public interface PatientRepository extends JpaRepository<Patient, String>{

	Optional<Patient> findByMedicaluserMedicaluserId(String medicaluserId);
}
