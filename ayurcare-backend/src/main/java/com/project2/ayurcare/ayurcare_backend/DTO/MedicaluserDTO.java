package com.project2.ayurcare.ayurcare_backend.DTO;

public class MedicaluserDTO {

	private String medicaluserId;
    private String medicaluserFirstname;
    private String medicaluserLastname;
    private String medicaluserEmail;
    private String medicaluserPhoneno;
    private byte[] medicaluserPhoto;
    private String medicaluserAddress;
    private String medicaluserRole;
    private String medicaluserIntreatment;
    
	public MedicaluserDTO() {

	}

	public MedicaluserDTO(String medicaluserId, String medicaluserFirstname, String medicaluserLastname,
			String medicaluserEmail, String medicaluserPhoneno, byte[] medicaluserPhoto, String medicaluserAddress,
			String medicaluserRole, String medicaluserIntreatment) {
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
    
    
}
