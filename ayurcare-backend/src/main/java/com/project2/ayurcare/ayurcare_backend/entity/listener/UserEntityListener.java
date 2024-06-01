package com.project2.ayurcare.ayurcare_backend.entity.listener;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project2.ayurcare.ayurcare_backend.entity.Medicaluser;
import com.project2.ayurcare.ayurcare_backend.util.CustomIdGenerator;

import jakarta.persistence.PrePersist;

@Component
public class UserEntityListener {
	private static CustomIdGenerator idGenerator;

	@Autowired
	public void setIdGenerator(CustomIdGenerator idGenerator) {
		UserEntityListener.idGenerator = idGenerator;
	}

	@PrePersist
	public void prePersist(Medicaluser medicaluser) {
		if (medicaluser.getUserId() == null || medicaluser.getUserId().isEmpty()) {
			medicaluser.setUserId(idGenerator.generateId("ACU", "Medicaluser", "medicaluserId"));
		}
	}
}
