import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/AppointmentForm.css";
import { ToastContainer } from "react-toastify";
import logo from "../Assets/logo.png";
import {
  retriveMedicalUserDetails,
  retrivePatientDetails,
  retriveDates,
  retriveAvailableTimeSlots,
} from "./api/AyurcareApiService";

function AppointmentForm() {
  const [medicaluserId, setMedicaluserId] = useState(null);
  const [patientId, setPatientId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [symptoms, setSymptoms] = useState("A");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const [symptomsFilled, setSymptomsFilled] = useState(true);
  const [dateFilled, setDateFilled] = useState(false);
  const [timeFilled, setTimeFilled] = useState(false);

  const [availableDates, setAvailableDates] = useState([]); // State to store available dates
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]); // State to store available time slots
  const [isFormFilled, setIsFormFilled] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  useEffect(() => {
    retriveMedicalUserDetails("jane.smith@example.com")
      .then((response) => {
        setMedicaluserId(response.data.medicaluserId);
        return retrivePatientDetails(response.data.medicaluserId); // Chain the patient details retrieval
      })
      .then((response) => {
        setPatientId(response.data.patientId);
        return retriveDates();
      })
      .then((response) => {
        setAvailableDates(response.data); // Set available dates
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after all data is fetched or if there's an error
      });
  }, []);

  const handleSymptomsChange = (e) => {
    setSymptoms(e.target.value);
    setAvailableTimeSlots([]); // Reset available time slots when symptoms change
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setAppointmentDate(selectedDate);
    setDateFilled(selectedDate.trim() !== "");

    if (symptomsFilled && selectedDate.trim() !== "") {
      retriveAvailableTimeSlots(symptoms, selectedDate)
        .then((response) => {
          setAvailableTimeSlots(response.data); // Set available time slots
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleTimeChange = (e) => {
    setAppointmentTime(e.target.value);
    setTimeFilled(e.target.value.trim() !== "");
  };

  const formatDate = (time) => {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    setIsFormFilled(symptomsFilled && dateFilled && timeFilled);
  }, [symptomsFilled, dateFilled, timeFilled]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="appointment-form-section">
      <div className="nav">
        <Link to="/">
          <div className="nav-logo">
            <img src={logo} alt="Logo" />
          </div>
        </Link>
      </div>

      <div className="form-container">
        <h2 className="form-title">
          <span>Book Appointment Online</span>
        </h2>

        <form className="form-content">
          <label>
            Please select your symptoms:
            <input
              type="text"
              value={symptoms}
              onChange={handleSymptomsChange}
              required
            />
          </label>

          <br />
          <label>
            Preferred Appointment Date:
            <select
              value={appointmentDate}
              onChange={handleDateChange}
              disabled={!symptomsFilled}
              required
            >
              <option value="default">Select</option>
              {availableDates.map((date, index) => (
                <option key={index} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </label>

          <br />

          <label>
            Preferred Appointment Time Slot:
            <select
              value={appointmentTime}
              onChange={handleTimeChange}
              disabled={!dateFilled}
              required
            >
              <option value="default">Select</option>
              {availableTimeSlots.map((slot, index) => (
                <option key={index} value={`${appointmentDate}T${formatDate(slot.startTime)}`}>
                  {`${formatDate(slot.startTime)} to ${formatDate(slot.endTime)}`}
                </option>
              ))}
            </select>
          </label>

          <br />

          <div className="button-container">
          <Link to="/">
              <button type="button" className="text-appointment-btn back-button">
                Back
              </button>
            </Link>
            <button type="submit" className="text-appointment-btn" disabled={!isFormFilled}>
              Confirm Appointment
            </button>
          </div>
        </form>
      </div>

      <div className="legal-footer">
        <p>© 2013-2024 AyurCare. All rights reserved.</p>
      </div>

      <ToastContainer autoClose={5000} limit={1} closeButton={false} />
    </div>
  );
}

export default AppointmentForm;
