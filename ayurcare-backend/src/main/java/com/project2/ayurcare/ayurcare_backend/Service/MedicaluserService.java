package com.project2.ayurcare.ayurcare_backend.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project2.ayurcare.ayurcare_backend.DTO.MedicaluserDTO;
import com.project2.ayurcare.ayurcare_backend.entity.Medicaluser;
import com.project2.ayurcare.ayurcare_backend.exceptions.ResourceNotFoundException;
import com.project2.ayurcare.ayurcare_backend.repository.MedicalUserRepository;

@Service
public class MedicaluserService {

    @Autowired
    private MedicalUserRepository medicalUserRepository;

    @Autowired
    private ModelMapper modelMapperConfig;

    public List<MedicaluserDTO> getAllUsers() {
        return medicalUserRepository.findAll().stream()
                .map(user -> modelMapperConfig.map(user, MedicaluserDTO.class))
                .collect(Collectors.toList());
    }

    public MedicaluserDTO getUserById(String medicalId) {
        Medicaluser medicaluser = medicalUserRepository.findById(medicalId)
                .orElseThrow(() -> new ResourceNotFoundException("Medical user not found with id: " + medicalId));
        return modelMapperConfig.map(medicaluser, MedicaluserDTO.class);
    }
    
    public MedicaluserDTO getUserByEmail(String medicaluserEmail) {
        Medicaluser medicaluser = medicalUserRepository.getUserByEmail(medicaluserEmail);
        return modelMapperConfig.map(medicaluser, MedicaluserDTO.class);
    }
    
    

    public MedicaluserDTO createUser(MedicaluserDTO medicaluserDTO) {
        Medicaluser medicaluser = modelMapperConfig.map(medicaluserDTO, Medicaluser.class);
        // Ensure the ID is null for new entries
        medicaluser.setMedicaluserId(null); // Corrected method name
        Medicaluser savedUser = medicalUserRepository.save(medicaluser);
        return modelMapperConfig.map(savedUser, MedicaluserDTO.class);
    }

//    public MedicaluserDTO updateUser(String medicalId, MedicaluserDTO medicaluserDTO) {
//        Medicaluser existingUser = medicalUserRepository.findById(medicalId)
//                .orElseThrow(() -> new ResourceNotFoundException("Medical user not found with id: " + medicalId));
//        // Update the fields of the existing user with DTO data
//        modelMapperConfig.map(medicaluserDTO, existingUser);
//        // Save the updated user
//        Medicaluser updatedUser = medicalUserRepository.save(existingUser);
//        return modelMapperConfig.map(updatedUser, MedicaluserDTO.class);
//    }
    
    public MedicaluserDTO updateUser(String medicalId, MedicaluserDTO medicaluserDTO) {
        Medicaluser existingUser = medicalUserRepository.findById(medicalId)
                .orElseThrow(() -> new ResourceNotFoundException("Medical user not found with id: " + medicalId));
        
        // Update only the fields of the existing user without changing the ID
        existingUser.setMedicaluserFirstname(medicaluserDTO.getMedicaluserFirstname());
        existingUser.setMedicaluserLastname(medicaluserDTO.getMedicaluserLastname());
        existingUser.setMedicaluserEmail(medicaluserDTO.getMedicaluserEmail());
        existingUser.setMedicaluserPhoneno(medicaluserDTO.getMedicaluserPhoneno());
        existingUser.setMedicaluserPhoto(medicaluserDTO.getMedicaluserPhoto());
        existingUser.setMedicaluserAddress(medicaluserDTO.getMedicaluserAddress());
        existingUser.setMedicaluserRole(medicaluserDTO.getMedicaluserRole());
        existingUser.setMedicaluserIntreatment(medicaluserDTO.getMedicaluserIntreatment());
        
        // Save the updated user
        Medicaluser updatedUser = medicalUserRepository.save(existingUser);
        return modelMapperConfig.map(updatedUser, MedicaluserDTO.class);
    }


    public void deleteUser(String medicalId) {
        medicalUserRepository.deleteById(medicalId);
    }
}
