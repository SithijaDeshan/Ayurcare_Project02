package com.project2.ayurcare.ayurcare_backend.DTO;

import java.time.LocalDateTime;

public class BookingDTO {
	
	private String bookingId;
    private String timeSlotId; 
    private String patientId;  
    private LocalDateTime bookingDate;

    public BookingDTO() {
    }

    public BookingDTO(String bookingId, String timeSlotId, String patientId, LocalDateTime bookingDate) {
        this.bookingId = bookingId;
        this.timeSlotId = timeSlotId;
        this.patientId = patientId;
        this.bookingDate = bookingDate;
    }

    public String getBookingId() {
        return bookingId;
    }

    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
    }

    public String getTimeSlotId() {
        return timeSlotId;
    }

    public void setTimeSlotId(String timeSlotId) {
        this.timeSlotId = timeSlotId;
    }

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }

}
