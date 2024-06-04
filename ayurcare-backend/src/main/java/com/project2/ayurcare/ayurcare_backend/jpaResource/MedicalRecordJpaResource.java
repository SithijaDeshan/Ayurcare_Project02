package com.project2.ayurcare.ayurcare_backend.jpaResource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project2.ayurcare.ayurcare_backend.DTO.MedicalRecordDTO;
import com.project2.ayurcare.ayurcare_backend.Service.MedicalRecordService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class MedicalRecordJpaResource {
	
	@Autowired
    private MedicalRecordService medicalRecordService;

    @GetMapping("/{medicaluserId}/medical-records")
    public List<MedicalRecordDTO> retrieveMedicalRecordsForUser(@PathVariable String medicaluserId) {
        return medicalRecordService.getMedicalRecordsForUser(medicaluserId);
    }
    
    
//    @PostMapping(
//    		path = "/{medicalId}/image/upload",
//    		consumes = org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE,
//    		produces = org.springframework.http.MediaType.APPLICATION_JSON_VALUE
//    		)
//    public void uploadUserMedicalRecord(@PathVariable("medicalId") UUID medicalId, @RequestParam("file")MultipartFile file) {
//    	medicalRecordService.uploadUserMedicalRecord(medicalId, file);
//    }
    
    @PostMapping(
    	    path = "/{medicalId}/image/upload",
    	    consumes = org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE,
    	    produces = org.springframework.http.MediaType.APPLICATION_JSON_VALUE
    	)
    	public ResponseEntity<String> uploadUserMedicalRecord(@PathVariable("medicalId") String medicalId, @RequestParam("file") MultipartFile file) {
    	    if (file.isEmpty()) {
    	        return ResponseEntity.badRequest().body("File is missing");
    	    }
    	    medicalRecordService.uploadUserMedicalRecord(medicalId, file);
    	    return ResponseEntity.ok("File uploaded successfully");
    	}
    
    @GetMapping("/{medicalId}/image/download")
    public byte[] downloadUserMedicalRecord(@PathVariable("medicalId") String medicalId) {
    	return medicalRecordService.downloadUserMedicalRecord(medicalId);
    }

}
