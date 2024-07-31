package com.project2.ayurcare.ayurcare_backend.jpaResource;

import com.project2.ayurcare.ayurcare_backend.DTO.PatientDTO;
import com.project2.ayurcare.ayurcare_backend.Service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PatientJpaResource {

    @Autowired
    private PatientService patientService;

    @PostMapping("/patient/addpatient")
    public void addPatient(@RequestBody PatientDTO patientDTO) {
        patientService.SavePatient(patientDTO);
    }

}
