package com.project2.ayurcare.ayurcare_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project2.ayurcare.ayurcare_backend.entity.Medicaluser;

import java.util.List;
import java.util.Optional;

public interface MedicalUserRepository extends JpaRepository<Medicaluser, String>{

	@Query(value = "SELECT * FROM medicaluser WHERE medicaluser_email=?", nativeQuery = true)
	Medicaluser getUserByEmail(String medicaluserEmail);

	Optional<Medicaluser> findByMedicaluserEmail(String medicaluserEmail);

	@Query(value = "SELECT COUNT(*) FROM medicaluser WHERE role = 'USER'", nativeQuery = true)
	int countUsersByRole();

	@Query(value = "SELECT * FROM medicaluser WHERE role = 'USER' ORDER BY medicaluser_id DESC LIMIT 5", nativeQuery = true)
	List<Medicaluser> findLast5UsersByRole();
}
