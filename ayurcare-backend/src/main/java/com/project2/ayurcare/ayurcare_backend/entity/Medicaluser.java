package com.project2.ayurcare.ayurcare_backend.entity;

import java.util.List;

import com.project2.ayurcare.ayurcare_backend.entity.listener.UserEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "medicaluser")
@EntityListeners(UserEntityListener.class)
public class Medicaluser {

	@Id
	@Column(name = "medicaluser_id", nullable = false, length = 100)
	private String medicaluserId;

	@Column(name = "medicaluser_firstname", nullable = false, length = 100)
	private String medicaluserFirstname;

	@Column(name = "medicaluser_lastname", nullable = false, length = 100)
	private String medicaluserLastname;

	@Column(name = "medicaluser_email", nullable = false, length = 255)
	private String medicaluserEmail;

	@Column(name = "medicaluser_phoneno", nullable = false, length = 10)
	private String medicaluserPhoneno;

	@Lob
	@Column(name = "medicaluser_photo", nullable = true)
	private byte[] medicaluserPhoto;

	@Column(name = "medicaluser_address", nullable = false, length = 255)
	private String medicaluserAddress;

	@Column(name = "medicaluser_role", nullable = false, length = 255)
	private String medicaluserRole = "Patient";

	@Column(name = "medicaluser_Intreatment", nullable = false, length = 5)
	private String medicaluserIntreatment;

	@OneToMany(mappedBy = "medicaluser")
	private List<Patient> patients;

	@OneToMany(mappedBy = "medicaluser")
	private List<Payment> payments;

	public Medicaluser() {

	}

	public String getUserId() {
		return medicaluserId;
	}

	public void setUserId(String medicaluserId) {
		this.medicaluserId = medicaluserId;
	}

	public String getUserFirstname() {
		return medicaluserFirstname;
	}

	public void setUserFirstname(String medicaluserFirstname) {
		this.medicaluserFirstname = medicaluserFirstname;
	}

	public String getUserLastname() {
		return medicaluserLastname;
	}

	public void setUserLastname(String medicaluserLastname) {
		this.medicaluserLastname = medicaluserLastname;
	}

	public String getUserEmail() {
		return medicaluserEmail;
	}

	public void setUserEmail(String medicaluserEmail) {
		this.medicaluserEmail = medicaluserEmail;
	}

	public String getUserPhoneno() {
		return medicaluserPhoneno;
	}

	public void setUserPhoneno(String medicaluserPhoneno) {
		this.medicaluserPhoneno = medicaluserPhoneno;
	}

	public byte[] getUserPhoto() {
		return medicaluserPhoto;
	}

	public void setUserPhoto(byte[] medicaluserPhoto) {
		this.medicaluserPhoto = medicaluserPhoto;
	}

	public String getUserAddress() {
		return medicaluserAddress;
	}

	public void setUserAddress(String medicaluserAddress) {
		this.medicaluserAddress = medicaluserAddress;
	}

	public String getUserRole() {
		return medicaluserRole;
	}

	public void setUserRole(String medicaluserRole) {
		this.medicaluserRole = medicaluserRole;
	}

	public String getUserIntreatment() {
		return medicaluserIntreatment;
	}

	public void setUserIntreatment(String medicaluserIntreatment) {
		this.medicaluserIntreatment = medicaluserIntreatment;
	}

	public List<Patient> getPatients() {
		return patients;
	}

	public void setPatients(List<Patient> patients) {
		this.patients = patients;
	}

	public List<Payment> getPayments() {
		return payments;
	}

	public void setPayments(List<Payment> payments) {
		this.payments = payments;
	}

}
