package com.project2.ayurcare.ayurcare_backend.entity;

import java.sql.Date;

import com.project2.ayurcare.ayurcare_backend.entity.listener.PaymentEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "payment")
@EntityListeners(PaymentEntityListener.class)
public class Payment {

	@Id
	@Column(name = "payment_id", nullable = false, length = 100)
	private String paymentId;

	@Column(name = "invoice_id", nullable = false, length = 100)
	private String invoiceId;

	@Column(name = "payment_date", nullable = false)
	@Temporal(TemporalType.DATE)
	private Date paymentDate;

	@Column(name = "payment_amount", nullable = false, length = 100)
	private String paymentAmount;

	@ManyToOne
	@JoinColumn(name = "medicaluser_id", nullable = false)
	private Medicaluser medicaluser;

	public Payment() {

	}

	public String getPaymentId() {
		return paymentId;
	}

	public void setPaymentId(String paymentId) {
		this.paymentId = paymentId;
	}

	public String getInvoiceId() {
		return invoiceId;
	}

	public void setInvoiceId(String invoiceId) {
		this.invoiceId = invoiceId;
	}

	public Date getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
	}

	public String getPaymentAmount() {
		return paymentAmount;
	}

	public void setPaymentAmount(String paymentAmount) {
		this.paymentAmount = paymentAmount;
	}

	public Medicaluser getUser() {
		return medicaluser;
	}

	public void setUser(Medicaluser medicaluser) {
		this.medicaluser = medicaluser;
	}

}
