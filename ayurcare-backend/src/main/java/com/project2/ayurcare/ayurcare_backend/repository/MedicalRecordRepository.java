package com.project2.ayurcare.ayurcare_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project2.ayurcare.ayurcare_backend.entity.MedicalRecord;

public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Integer>{

}
