package com.project2.ayurcare.ayurcare_backend.jpaResource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project2.ayurcare.ayurcare_backend.DTO.BookingDTO;
import com.project2.ayurcare.ayurcare_backend.DTO.PatientDTO;
import com.project2.ayurcare.ayurcare_backend.Service.BookingSerrvice;

import java.time.LocalDate;

@RestController
@RequestMapping("/booking")
public class BookingJpaResource {

	@Autowired
	private BookingSerrvice bookingService;
	
	@PostMapping("/book")
	private BookingDTO makeAnAppoinment(@RequestBody BookingDTO bookingDTO) {
		return bookingService.appointment(bookingDTO);
	}
	
	@GetMapping("/patient/{medicaluserId}")
	private PatientDTO patientInfo(@PathVariable String medicaluserId) {
		return bookingService.retrievePatientByMedicaluserId(medicaluserId);
	}

}
