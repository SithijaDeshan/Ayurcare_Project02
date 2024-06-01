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

	public Medicaluser(String medicaluserId, String medicaluserFirstname, String medicaluserLastname,
			String medicaluserEmail, String medicaluserPhoneno, byte[] medicaluserPhoto, String medicaluserAddress,
			String medicaluserRole, String medicaluserIntreatment, List<Patient> patients, List<Payment> payments) {
		super();
		this.medicaluserId = medicaluserId;
		this.medicaluserFirstname = medicaluserFirstname;
		this.medicaluserLastname = medicaluserLastname;
		this.medicaluserEmail = medicaluserEmail;
		this.medicaluserPhoneno = medicaluserPhoneno;
		this.medicaluserPhoto = medicaluserPhoto;
		this.medicaluserAddress = medicaluserAddress;
		this.medicaluserRole = medicaluserRole;
		this.medicaluserIntreatment = medicaluserIntreatment;
		this.patients = patients;
		this.payments = payments;
	}

	public String getMedicaluserId() {
		return medicaluserId;
	}

	public void setMedicaluserId(String medicaluserId) {
		this.medicaluserId = medicaluserId;
	}

	public String getMedicaluserFirstname() {
		return medicaluserFirstname;
	}

	public void setMedicaluserFirstname(String medicaluserFirstname) {
		this.medicaluserFirstname = medicaluserFirstname;
	}

	public String getMedicaluserLastname() {
		return medicaluserLastname;
	}

	public void setMedicaluserLastname(String medicaluserLastname) {
		this.medicaluserLastname = medicaluserLastname;
	}

	public String getMedicaluserEmail() {
		return medicaluserEmail;
	}

	public void setMedicaluserEmail(String medicaluserEmail) {
		this.medicaluserEmail = medicaluserEmail;
	}

	public String getMedicaluserPhoneno() {
		return medicaluserPhoneno;
	}

	public void setMedicaluserPhoneno(String medicaluserPhoneno) {
		this.medicaluserPhoneno = medicaluserPhoneno;
	}

	public byte[] getMedicaluserPhoto() {
		return medicaluserPhoto;
	}

	public void setMedicaluserPhoto(byte[] medicaluserPhoto) {
		this.medicaluserPhoto = medicaluserPhoto;
	}

	public String getMedicaluserAddress() {
		return medicaluserAddress;
	}

	public void setMedicaluserAddress(String medicaluserAddress) {
		this.medicaluserAddress = medicaluserAddress;
	}

	public String getMedicaluserRole() {
		return medicaluserRole;
	}

	public void setMedicaluserRole(String medicaluserRole) {
		this.medicaluserRole = medicaluserRole;
	}

	public String getMedicaluserIntreatment() {
		return medicaluserIntreatment;
	}

	public void setMedicaluserIntreatment(String medicaluserIntreatment) {
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
