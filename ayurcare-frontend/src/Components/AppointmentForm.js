import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import "../Styles/AppointmentForm.css";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../Assets/logo.png";
import Footer from "./Footer";
import {
    retriveMedicalUserDetails,
    retrivePatientDetails,
    retriveDates,
    retriveAvailableTimeSlots,
    payment,
    paymentDetails,
    getCategory,
    saveNewPatient,
    makeReservation, checkBeforeBooking, email,
} from "./api/AyurcareApiService";
import ModalComponent from "./ModalComponent";
import getSpecialtyRecommendation from "./api/ModelApiService";
import "../Styles/customToast.css";
import pymentimage from "../Assets/ayurcareBanner.png";
import {formatDate} from "../Components/FormatDateForEmail";

function AppointmentForm() {
    const [medicaluserId, setMedicaluserId] = useState(null);
    const [patientId, setPatientId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState(null);
    const [phone, setMedicaluserPhoneno] = useState(null);

    const [symptoms, setSymptoms] = useState([]);
    const [appointmentDate, setAppointmentDate] = useState("");
    const [appointmentTime, setAppointmentTime] = useState("");
    const [timeSlotResult, setTimeSlotResult] = useState("");

    const [symptomsFilled, setSymptomsFilled] = useState(false);
    const [dateFilled, setDateFilled] = useState(false);
    const [timeFilled, setTimeFilled] = useState(false);

    const [availableDates, setAvailableDates] = useState([]);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const [isFormFilled, setIsFormFilled] = useState(false);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [mlSpecialtyResult, setMlSpecialtyResult] = useState(null); // Store ML result here
    const [mlError, setMlError] = useState("");

    const navigate = useNavigate();

    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    //All the symptoms available from the model

    const symptomOptions = [
        "abdominal_pain",
        "abnormal_menstruation",
        "acidity",
        "acute_liver_failure",
        "altered_sensorium",
        "anxiety",
        "back_pain",
        "belly_pain",
        "blackheads",
        "bladder_discomfort",
        "blister",
        "blood_in_sputum",
        "bloody_stool",
        "blurred_and_distorted_vision",
        "breathlessness",
        "brittle_nails",
        "bruising",
        "burning_micturition",
        "chest_pain",
        "chills",
        "cold_hands_and_feets",
        "coma",
        "congestion",
        "constipation",
        "continuous_feel_of_urine",
        "continuous_sneezing",
        "cough",
        "cramps",
        "dark_urine",
        "dehydration",
        "depression",
        "diarrhoea",
        "dischromic _patches",
        "distention_of_abdomen",
        "dizziness",
        "drying_and_tingling_lips",
        "enlarged_thyroid",
        "excessive_hunger",
        "extra_marital_contacts",
        "family_history",
        "fast_heart_rate",
        "fatigue",
        "fluid_overload",
        "foul_smell_of urine",
        "headache",
        "high_fever",
        "hip_joint_pain",
        "history_of_alcohol_consumption",
        "increased_appetite",
        "indigestion",
        "inflammatory_nails",
        "internal_itching",
        "irregular_sugar_level",
        "irritability",
        "irritation_in_anus",
        "joint_pain",
        "knee_pain",
        "lack_of_concentration",
        "lethargy",
        "loss_of_appetite",
        "loss_of_balance",
        "loss_of_smell",
        "malaise",
        "mild_fever",
        "mood_swings",
        "movement_stiffness",
        "mucoid_sputum",
        "muscle_pain",
        "muscle_wasting",
        "muscle_weakness",
        "nausea",
        "neck_pain",
        "nodal_skin_eruptions",
        "obesity",
        "pain_behind_the_eyes",
        "pain_during_bowel_movements",
        "pain_in_anal_region",
        "painful_walking",
        "palpitations",
        "passage_of_gases",
        "patches_in_throat",
        "phlegm",
        "polyuria",
        "prominent_veins_on_calf",
        "puffy_face_and_eyes",
        "pus_filled_pimples",
        "receiving_blood_transfusion",
        "receiving_unsterile_injections",
        "red_sore_around_nose",
        "red_spots_over_body",
        "redness_of_eyes",
        "restlessness",
        "runny_nose",
        "rusty_sputum",
        "scurring",
        "shivering",
        "silver_like_dusting",
        "sinus_pressure",
        "skin_peeling",
        "skin_rash",
        "slurred_speech",
        "small_dents_in_nails",
        "spinning_movements",
        "stiff_neck",
        "stomach_bleeding",
        "stomach_pain",
        "sunken_eyes",
        "sweating",
        "swelled_lymph_nodes",
        "swelling_joints",
        "swelling_of_stomach",
        "swollen_blood_vessels",
        "swollen_extremeties",
        "swollen_legs",
        "throat_irritation",
        "toxic_look_(typhos)",
        "ulcers_on_tongue",
        "unsteadiness",
        "visual_disturbances",
        "vomiting",
        "watering_from_eyes",
        "weakness_in_limbs",
        "weakness_of_one_body_side",
        "weight_gain",
        "weight_loss",
        "yellow_crust_ooze",
        "yellow_urine",
        "yellowing_of_eyes",
        "yellowish_skin",
        "itching",
        "spotting_ urination",
    ];

    //Retrieving user details according to the user

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, []);

    useEffect(() => {
        retriveMedicalUserDetails(username, token)
            .then((response) => {
                setMedicaluserId(response.data.medicaluserId);
                setMedicaluserPhoneno(response.data.medicaluserPhoneno);
                setName(
                    response.data.medicaluserFirstname +
                    " " +
                    response.data.medicaluserLastname
                );

                return retriveDates(token); // Directly return retriveDates without calling retrivePatientDetails
            })
            .then((response) => {
                setAvailableDates(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleSymptomsClick = () => {
        setModalIsOpen(true);
    };

    const handleModalClose = async () => {
        setModalIsOpen(false);
        setSymptomsFilled(symptoms.length > 0);

        // Call ML model API when symptoms are selected
        if (symptoms.length > 0) {
            await callMLModel(symptoms);
        }
    };

    const handleSuccessToast = () => {
        const toastId = toast.success("Your Appointment Successfully Placed", {
            position: toast.POSITION.TOP_CENTER,
            className: "custom-toast-success",
            autoClose: 5000 // Set the duration for the toast, e.g., 5000 ms (5 seconds)
        });

        // Set a timeout to navigate after the toast duration ends
        setTimeout(() => {
            toast.dismiss(toastId); // Ensure the toast is dismissed
            navigate('/');
        }, 5000); // Match this duration with autoClose time
    };

    // -----------Payment------------

    const handlePayment = async () => {
        let date1 = new Date(appointmentTime);

        // Extract the hours, minutes, and seconds
        let hours = String(date1.getHours()).padStart(2, "0");
        let minutes = String(date1.getMinutes()).padStart(2, "0");
        let seconds = "00"; // Assuming you want the seconds to be '00'

        // Format the time as 'HH:MM:SS'
        let formattedTime = `${hours}:${minutes}:${seconds}`;

        let matchingSlot = timeSlotResult.find(
            (slot) => slot.startTime === formattedTime
        );

        let timeSlotId = matchingSlot.timeSlotId;

        const category = (await getCategory(mlSpecialtyResult, token)).data
            .categoryId;
        const currentDate = new Date();
        const treatmentStartDate = currentDate.toISOString().split("T")[0];
        const medicaluser = medicaluserId;
        const patientPayload = {
            medicaluser,
            category,
            treatmentStartDate,
        };

        saveNewPatient(patientPayload, token);

        const amount1 = 100;

        try {
            const transactionResponse = await payment(amount1);
            const {orderId, currency, amount, key} = transactionResponse;
            const options = {
                key: key,
                amount: amount,
                currency: currency,
                name: "Ayurcare",
                description: "Booking Description",
                image: pymentimage,
                order_id: orderId,
                handler: async (response) => {

                    try {
                        function formatCurrentDateTime() {
                            const date = new Date();
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
                            const day = String(date.getDate()).padStart(2, '0');
                            const hours = String(date.getHours()).padStart(2, '0');
                            const minutes = String(date.getMinutes()).padStart(2, '0');
                            const seconds = String(date.getSeconds()).padStart(2, '0');

                            return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
                        }

                        const paymentPayload = {
                            medicaluserId,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpaySignature: response.razorpay_signature,
                        };

                        paymentDetails(paymentPayload);

                        // Call retrivePatientDetails after the success toast
                        const patientDetailsResponse = await retrivePatientDetails(
                            medicaluserId,
                            token
                        );
                        const patientId = patientDetailsResponse.data.patientId;
                        console.log(`Patient ID: ${patientId}`);
                        const bookingDate = formatCurrentDateTime();

                        const bookingPayLoad = {
                            timeSlotId,
                            patientId,
                            bookingDate,
                        };

                        console.log(bookingPayLoad);

                        makeReservation(bookingPayLoad, token);

                        //-------send email to the user --------

                        const formattedAppointmentDate = formatDate(appointmentTime);
                        let subject = "Confirmation of Payment and Appoinment"
                        // let body = `We wish to inform that your payment is Successfully reseived. Also your appoinment is sheduled in ${formattedAppointmentDate}`
                        let body = `
                          <html>
                            <body>
                              <h1>Payment Confirmation</h1>
                              <p>Dear Patient,</p>
                              <p>We wish to inform you that your payment has been successfully received.</p>
                              <p>Your appointment is scheduled for <strong>${formattedAppointmentDate}</strong>.</p>
                              <p>Stay connected with us.</p>
                              <p>Best regards,<br>Ayurcare</p>
                            </body>
                          </html>
                        `;
                        let toEmail = username
                        const emailPayload = {
                            toEmail,
                            subject,
                            body
                        }
                        console.log(emailPayload)
                        email(emailPayload, token)

                        handleSuccessToast();


                    } catch (error) {
                        console.error("Error placing order:", error);
                        toast.error("Something Went Wrong Please Try Again", {
                            position: toast.POSITION.TOP_CENTER,
                        });
                    }
                },
                prefill: {
                    name: name,
                    email: username,
                    contact: phone,
                },
                theme: {
                    color: "#435334",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Error initiating transaction:", error);
        }
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setAppointmentDate(selectedDate);
        setDateFilled(selectedDate.trim() !== "");

        if (symptomsFilled && selectedDate.trim() !== "") {
            //retrieve available timeslots
            retriveAvailableTimeSlots(mlSpecialtyResult, selectedDate, token)
                .then((response) => {
                    setTimeSlotResult(response.data);
                    console.log(response);
                    setAvailableTimeSlots(response.data);
                })
                .catch((error) => {
                });
        }
    };

    const handleTimeChange = (e) => {
        setAppointmentTime(e.target.value);
        setTimeFilled(e.target.value.trim() !== "");
    };

    //time format

    const formatDate = (time) => {
        const [hours, minutes] = time.split(":");
        return `${hours}:${minutes}`;
    };

    //Select the sepecialist and the category according to that

    const callMLModel = async (selectedSymptoms) => {
        try {
            const result = await getSpecialtyRecommendation(selectedSymptoms);
            setMlError("");

            let specialtyCategory;

            switch (result.specialty) {
                case "Gynecologist":
                case "Pediatrician":
                    specialtyCategory = "Meda";
                    break;

                case "Neurologist":
                case "Rheumatologists":
                    specialtyCategory = "Vata";
                    break;

                case "Pulmonologist":
                case "Allergist":
                case "Otolaryngologist":
                case "Tuberculosis":
                    specialtyCategory = "Kapha";
                    break;

                case "Gastroenterologist":
                case "Hepatologist":
                case "Endocrinologist":
                    specialtyCategory = "Pitta";
                    break;

                case "Cardiologist":
                case "Phlebologist":
                    specialtyCategory = "Rasa";
                    break;

                case "Dermatologist":
                case "Osteopathic":
                    specialtyCategory = "Mamsa";
                    break;

                case "Internal Medicine":
                    specialtyCategory = "Rakta";
                    break;

                default:
                    specialtyCategory = "Unknown";
            }

            setMlSpecialtyResult(specialtyCategory);
        } catch (error) {
            setMlSpecialtyResult(null);
            setMlError("Failed to fetch the specialty recommendation.");
            console.error("ML Model API Error:", error);
        }
    };

    useEffect(() => {
        setIsFormFilled(symptomsFilled && dateFilled && timeFilled);
    }, [symptomsFilled, dateFilled, timeFilled]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="appointment-form-section">
            <div className="nav">
                <Link to="/">
                    <div className="nav-logo">
                        <img src={logo} alt="Logo"/>
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
                            value={symptoms.join(", ")}
                            onClick={handleSymptomsClick}
                            readOnly
                            required
                        />
                    </label>

                    <br/>
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

                    <br/>

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
                                <option
                                    key={index}
                                    value={`${appointmentDate}T${formatDate(slot.startTime)}`}
                                >
                                    {`${formatDate(slot.startTime)} to ${formatDate(
                                        slot.endTime
                                    )}`}
                                </option>
                            ))}
                        </select>
                    </label>

                    <br/>

                    <div className="button-container">
                        <Link to="/">
                            <button
                                type="button"
                                className="text-appointment-btn back-button"
                            >
                                Back
                            </button>
                        </Link>
                        <button
                            type="button"
                            className="text-appointment-btn"
                            onClick={handlePayment}
                            disabled={!isFormFilled}
                        >
                            Continue
                        </button>
                    </div>
                </form>
            </div>

            <ToastContainer autoClose={5000} limit={1} closeButton={false}/>

            <ModalComponent
                isOpen={modalIsOpen}
                onRequestClose={handleModalClose}
                options={symptomOptions}
                selectedOptions={symptoms}
                setSelectedOptions={setSymptoms}
            />

            <div className="legal-footer">
                <p>© 2013-2024 AyurCare. All rights reserved.</p>
            </div>
        </div>
    );
}

export default AppointmentForm;
