import React, { useEffect, useState } from 'react';
import "./doctorWidgetLg.css";
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { retrivePatientBookingDetailsForDate, doctorCancelation } from "../../../Components/api/AyurcareApiService"

function DoctorAppointments() {
    const [startDate, setStartDate] = useState(new Date());
    const [patientData, setPatientData] = useState([]);
    const formattedDate = format(startDate, 'yyyy/MM/dd');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (startDate) {
            retrievePatientData(startDate);
        }
    }, [startDate]);

    const retrievePatientData = async (startDate) => {
        try {
            const response = await retrivePatientBookingDetailsForDate(startDate, token);
            setPatientData(response.data); // Update state with the fetched patient data
        } catch (e) {
            console.log(e);
        }
    }

    const handleStatusChange = async (index, newStatus) => {
        const patient = patientData[index];
        const bookingId = patient.bookingId;
        const decisionPayload = { "status": newStatus === "Cancel" ? "Cancel" : "Booked" };
        console.log(decisionPayload)
        try {
            await doctorCancelation(bookingId, decisionPayload, token);
            setPatientData(prevData =>
                prevData.map((patient, i) =>
                    i === index ? { ...patient, status: newStatus } : patient
                )
            );
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <div className="doctorAppointment">
            <div className="doctorAppointmentDatePickerWrapper">
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(format(date, 'yyyy-MM-dd'))}
                    dateFormat="yyyy/MM/dd"
                    className="doctorAppointmentDatePicker"
                />
            </div>
            <h3 className="doctorAppointmentTitle">Appointments for Selected Date</h3>
            <table className="doctorAppointmentTable">
                <thead>
                <tr className="doctorAppointmentTr">
                    <th className="doctorAppointmentTh">Patient Name</th>
                    <th className="doctorAppointmentTh">Date</th>
                    <th className="doctorAppointmentTh">Time Slot</th>
                    <th className="doctorAppointmentTh">Category</th>
                    <th className="doctorAppointmentTh">Status</th>
                </tr>
                </thead>
                <tbody>
                {patientData.map((patient, index) => (
                    <tr className="doctorAppointmentTr" key={index}>
                        <td className="doctorAppointmentUser">
                            <img
                                src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                                alt=""
                                className="doctorAppointmentImg"
                            />
                            <span className="doctorAppointmentName">
                                    {patient.patientFirstName} {patient.patientLastName}
                                </span>
                        </td>
                        <td className="doctorAppointmentDate">{formattedDate}</td>
                        <td className="doctorAppointmentTimeSlot">
                            {patient.timeSlotStartTime} - {patient.timeSlotEndTime}
                        </td>
                        <td className="doctorAppointmentCategory">{patient.categoryName}</td>

                        <td className="doctorAppointmentStatus">
                            <select
                                value={patient.status || "Booked"} // Default to "Booked"
                                onChange={(e) => handleStatusChange(index, e.target.value)}
                                className={`doctorAppointmentSelect ${patient.status || "Booked"}`}
                            >
                                <option value="Booked">Booked</option>
                                <option value="Cancel">Cancel</option>
                            </select>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default DoctorAppointments;
