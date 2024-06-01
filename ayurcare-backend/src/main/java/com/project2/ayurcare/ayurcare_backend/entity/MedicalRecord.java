package com.project2.ayurcare.ayurcare_backend.entity;

import java.sql.Date;

import com.project2.ayurcare.ayurcare_backend.entity.listener.MedicalRecordEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "medicalrecord")
@EntityListeners(MedicalRecordEntityListener.class)
public class MedicalRecord {

	@Id
	@Column(name = "medical_id", nullable = false, length = 10)
	private String medicalId;

	@ManyToOne
	@JoinColumn(name = "patient_id", nullable = false)
	private Patient patient;

	@Column(name = "prescription_issuedate", nullable = false)
	@Temporal(TemporalType.DATE)
	private Date prescriptionIssueDate;

	@Lob
	@Column(name = "medical_record", nullable = false)
	private byte[] medicalRecord;

	public MedicalRecord() {

	}

	public String getMedicalId() {
		return medicalId;
	}

	public void setMedicalId(String medicalId) {
		this.medicalId = medicalId;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	public Date getPrescriptionIssueDate() {
		return prescriptionIssueDate;
	}

	public void setPrescriptionIssueDate(Date prescriptionIssueDate) {
		this.prescriptionIssueDate = prescriptionIssueDate;
	}

	public byte[] getMedicalRecord() {
		return medicalRecord;
	}

	public void setMedicalRecord(byte[] medicalRecord) {
		this.medicalRecord = medicalRecord;
	}

}
