package com.project2.ayurcare.ayurcare_backend.jpaResource;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project2.ayurcare.ayurcare_backend.entity.Medicaluser;
import com.project2.ayurcare.ayurcare_backend.exceptions.ResourceNotFoundException;
import com.project2.ayurcare.ayurcare_backend.repository.MedicalUserRepository;

@RestController
public class medicaluserJpaResource {

	private MedicalUserRepository medicalUserRepository;

	public medicaluserJpaResource(MedicalUserRepository medicalUserRepository) {
		this.medicalUserRepository = medicalUserRepository;
	}
	
	@GetMapping("/users")
	public List<Medicaluser> retrieveUsers() {
		return medicalUserRepository.findAll();
	}
	
	@GetMapping("/users/{medical_id}")
	public Medicaluser retrieveUser(@PathVariable String medical_id) {
		return medicalUserRepository.findById(medical_id).orElseThrow(() -> new ResourceNotFoundException("Medical user not found with id: " + medical_id));
	}
	
	@DeleteMapping("/users/{medical_id}")
	public ResponseEntity<Void> deleteUser(@PathVariable String medical_id) {
		medicalUserRepository.deleteById(medical_id);
		return ResponseEntity.noContent().build();
	}
	
	@PostMapping("/users")
	public Medicaluser createUser(@RequestBody Medicaluser medicaluser) {
		medicaluser.setUserId(null);
		return medicalUserRepository.save(medicaluser);
	}
	
	@PutMapping("/users/{medical_id}")
	public Medicaluser createUser(@PathVariable String medical_id,@RequestBody Medicaluser medicaluser) {
		medicalUserRepository.save(medicaluser);
		return medicaluser;
	}
	
}
