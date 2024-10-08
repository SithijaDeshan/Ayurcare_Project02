package com.project2.ayurcare.ayurcare_backend.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.project2.ayurcare.ayurcare_backend.entity.Token;
import com.project2.ayurcare.ayurcare_backend.repository.TokenRepository;
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

    @Autowired
    private TokenRepository tokenRepository;


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
        existingUser.setMedicaluserIntreatment(medicaluserDTO.getMedicaluserIntreatment());
        
        // Save the updated user
        Medicaluser updatedUser = medicalUserRepository.save(existingUser);
        return modelMapperConfig.map(updatedUser, MedicaluserDTO.class);
    }


    public void deleteUser(String medicalId) {
        // Find the Medicaluser entity
        Medicaluser medicaluser = medicalUserRepository.findById(medicalId)
                .orElseThrow(() -> new ResourceNotFoundException("Medical user not found with id: " + medicalId));

        // Delete associated tokens
        List<Token> tokens = tokenRepository.findAllTokenByUser(medicalId);
        if (tokens != null && !tokens.isEmpty()) {
            tokenRepository.deleteAll(tokens);
        }

        // Delete the user
        medicalUserRepository.delete(medicaluser);
    }

    // Geting the all registered useres whose role == USER

    public int registeredPatientCount(){
        try {
            return medicalUserRepository.countUsersByRole();
        }catch (Exception e){
            throw new ResourceNotFoundException("Patient count not found");
        }
    }

    public List<MedicaluserDTO> lastFiveUsers() throws Exception {
        try{List<Medicaluser> medicalusers = medicalUserRepository.findLast5UsersByRole();
            return medicalusers.stream()
                    .map(user -> modelMapperConfig.map(user, MedicaluserDTO.class))
                    .collect(Collectors.toList());
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }

    }
}
