// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "../Styles/AppointmentForm.css";
// import { ToastContainer } from "react-toastify";
// import logo from "../Assets/logo.png";
// import {
//   retriveMedicalUserDetails,
//   retrivePatientDetails,
//   retriveDates,
//   retriveAvailableTimeSlots,
// } from "./api/AyurcareApiService";

// function AppointmentForm() {
//   const [medicaluserId, setMedicaluserId] = useState(null);
//   const [patientId, setPatientId] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [symptoms, setSymptoms] = useState("A");
//   const [appointmentDate, setAppointmentDate] = useState("");
//   const [appointmentTime, setAppointmentTime] = useState("");

//   const [symptomsFilled, setSymptomsFilled] = useState(true);
//   const [dateFilled, setDateFilled] = useState(false);
//   const [timeFilled, setTimeFilled] = useState(false);

//   const [availableDates, setAvailableDates] = useState([]); // State to store available dates
//   const [availableTimeSlots, setAvailableTimeSlots] = useState([]); // State to store available time slots
//   const [isFormFilled, setIsFormFilled] = useState(false);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   });

//   useEffect(() => {
//     retriveMedicalUserDetails("jane.smith@example.com")
//       .then((response) => {
//         setMedicaluserId(response.data.medicaluserId);
//         return retrivePatientDetails(response.data.medicaluserId); // Chain the patient details retrieval
//       })
//       .then((response) => {
//         setPatientId(response.data.patientId);
//         return retriveDates();
//       })
//       .then((response) => {
//         setAvailableDates(response.data); // Set available dates
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//       .finally(() => {
//         setLoading(false); // Set loading to false after all data is fetched or if there's an error
//       });
//   }, []);

//   const handleSymptomsChange = (e) => {
//     setSymptoms(e.target.value);
//     setAvailableTimeSlots([]); // Reset available time slots when symptoms change
//   };

//   const handleDateChange = (e) => {
//     const selectedDate = e.target.value;
//     setAppointmentDate(selectedDate);
//     setDateFilled(selectedDate.trim() !== "");

//     if (symptomsFilled && selectedDate.trim() !== "") {
//       retriveAvailableTimeSlots(symptoms, selectedDate)
//         .then((response) => {
//           setAvailableTimeSlots(response.data); // Set available time slots
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   };

//   const handleTimeChange = (e) => {
//     setAppointmentTime(e.target.value);
//     setTimeFilled(e.target.value.trim() !== "");
//   };

//   const formatDate = (time) => {
//     const [hours, minutes] = time.split(':');
//     return `${hours}:${minutes}`;
//   };

//   useEffect(() => {
//     setIsFormFilled(symptomsFilled && dateFilled && timeFilled);
//   }, [symptomsFilled, dateFilled, timeFilled]);

//   // if (loading) {
//   //   return <div>Loading...</div>;
//   // }

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="spinner"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="appointment-form-section">
//       <div className="nav">
//         <Link to="/">
//           <div className="nav-logo">
//             <img src={logo} alt="Logo" />
//           </div>
//         </Link>
//       </div>

//       <div className="form-container">
//         <h2 className="form-title">
//           <span>Book Appointment Online</span>
//         </h2>

//         <form className="form-content">
//           <label>
//             Please select your symptoms:
//             <input
//               type="text"
//               value={symptoms}
//               onChange={handleSymptomsChange}
//               required
//             />
//           </label>

//           <br />
//           <label>
//             Preferred Appointment Date:
//             <select
//               value={appointmentDate}
//               onChange={handleDateChange}
//               disabled={!symptomsFilled}
//               required
//             >
//               <option value="default">Select</option>
//               {availableDates.map((date, index) => (
//                 <option key={index} value={date}>
//                   {date}
//                 </option>
//               ))}
//             </select>
//           </label>

//           <br />

//           <label>
//             Preferred Appointment Time Slot:
//             <select
//               value={appointmentTime}
//               onChange={handleTimeChange}
//               disabled={!dateFilled}
//               required
//             >
//               <option value="default">Select</option>
//               {availableTimeSlots.map((slot, index) => (
//                 <option key={index} value={`${appointmentDate}T${formatDate(slot.startTime)}`}>
//                   {`${formatDate(slot.startTime)} to ${formatDate(slot.endTime)}`}
//                 </option>
//               ))}
//             </select>
//           </label>

//           <br />

//           <div className="button-container">
//           <Link to="/">
//               <button type="button" className="text-appointment-btn back-button">
//                 Back
//               </button>
//             </Link>
//             <button type="submit" className="text-appointment-btn" disabled={!isFormFilled}>
//               Confirm Appointment
//             </button>
//           </div>
//         </form>
//       </div>

//       <div className="legal-footer">
//         <p>© 2013-2024 AyurCare. All rights reserved.</p>
//       </div>

//       <ToastContainer autoClose={5000} limit={1} closeButton={false} />
//     </div>
//   );
// }

// export default AppointmentForm;





// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "../Styles/AppointmentForm.css";
// import { ToastContainer } from "react-toastify";
// import logo from "../Assets/logo.png";
// import {
//   retriveMedicalUserDetails,
//   retrivePatientDetails,
//   retriveDates,
//   retriveAvailableTimeSlots,
// } from "./api/AyurcareApiService";
// import ModalComponent from "./ModalComponent";

// function AppointmentForm() {
//   const [medicaluserId, setMedicaluserId] = useState(null);
//   const [patientId, setPatientId] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [symptoms, setSymptoms] = useState([]);
//   const [appointmentDate, setAppointmentDate] = useState("");
//   const [appointmentTime, setAppointmentTime] = useState("");

//   const [symptomsFilled, setSymptomsFilled] = useState(false);
//   const [dateFilled, setDateFilled] = useState(false);
//   const [timeFilled, setTimeFilled] = useState(false);

//   const [availableDates, setAvailableDates] = useState([]);
//   const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
//   const [isFormFilled, setIsFormFilled] = useState(false);

//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const symptomOptions = [
//     'abdominal_pain', 'abnormal_menstruation', 'acidity', 'acute_liver_failure', 'altered_sensorium', 
//     'anxiety', 'back_pain', 'belly_pain', 'blackheads', 'bladder_discomfort', 'blister', 
//     'blood_in_sputum', 'bloody_stool', 'blurred_and_distorted_vision', 'breathlessness', 'brittle_nails', 
//     'bruising', 'burning_micturition', 'chest_pain', 'chills', 'cold_hands_and_feets', 'coma', 
//     'congestion', 'constipation', 'continuous_feel_of_urine', 'continuous_sneezing', 'cough', 
//     'cramps', 'dark_urine', 'dehydration', 'depression', 'diarrhoea', 'dischromic _patches', 
//     'distention_of_abdomen', 'dizziness', 'drying_and_tingling_lips', 'enlarged_thyroid', 
//     'excessive_hunger', 'extra_marital_contacts', 'family_history', 'fast_heart_rate', 'fatigue', 
//     'fluid_overload', 'foul_smell_of urine', 'headache', 'high_fever', 'hip_joint_pain', 
//     'history_of_alcohol_consumption', 'increased_appetite', 'indigestion', 'inflammatory_nails', 
//     'internal_itching', 'irregular_sugar_level', 'irritability', 'irritation_in_anus', 'joint_pain', 
//     'knee_pain', 'lack_of_concentration', 'lethargy', 'loss_of_appetite', 'loss_of_balance', 
//     'loss_of_smell', 'malaise', 'mild_fever', 'mood_swings', 'movement_stiffness', 'mucoid_sputum', 
//     'muscle_pain', 'muscle_wasting', 'muscle_weakness', 'nausea', 'neck_pain', 'nodal_skin_eruptions', 
//     'obesity', 'pain_behind_the_eyes', 'pain_during_bowel_movements', 'pain_in_anal_region', 
//     'painful_walking', 'palpitations', 'passage_of_gases', 'patches_in_throat', 'phlegm', 'polyuria', 
//     'prominent_veins_on_calf', 'puffy_face_and_eyes', 'pus_filled_pimples', 'receiving_blood_transfusion', 
//     'receiving_unsterile_injections', 'red_sore_around_nose', 'red_spots_over_body', 'redness_of_eyes', 
//     'restlessness', 'runny_nose', 'rusty_sputum', 'scurring', 'shivering', 'silver_like_dusting', 
//     'sinus_pressure', 'skin_peeling', 'skin_rash', 'slurred_speech', 'small_dents_in_nails', 
//     'spinning_movements', 'stiff_neck', 'stomach_bleeding', 'stomach_pain', 
//     'sunken_eyes', 'sweating', 'swelled_lymph_nodes', 'swelling_joints', 'swelling_of_stomach', 
//     'swollen_blood_vessels', 'swollen_extremeties', 'swollen_legs', 'throat_irritation', 
//     'toxic_look_(typhos)', 'ulcers_on_tongue', 'unsteadiness', 'visual_disturbances', 'vomiting', 
//     'watering_from_eyes', 'weakness_in_limbs', 'weakness_of_one_body_side', 'weight_gain', 'weight_loss', 
//     'yellow_crust_ooze', 'yellow_urine', 'yellowing_of_eyes', 'yellowish_skin', 'itching', 'spotting_ urination'
// ];

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   });

//   useEffect(() => {
//     retriveMedicalUserDetails("jane.smith@example.com")
//       .then((response) => {
//         setMedicaluserId(response.data.medicaluserId);
//         return retrivePatientDetails(response.data.medicaluserId);
//       })
//       .then((response) => {
//         setPatientId(response.data.patientId);
//         return retriveDates();
//       })
//       .then((response) => {
//         setAvailableDates(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   const handleSymptomsClick = () => {
//     setModalIsOpen(true);
//   };

//   const handleModalClose = () => {
//     setModalIsOpen(false);
//     setSymptomsFilled(symptoms.length > 0);
//   };

//   const handleDateChange = (e) => {
//     const selectedDate = e.target.value;
//     setAppointmentDate(selectedDate);
//     setDateFilled(selectedDate.trim() !== "");

//     if (symptomsFilled && selectedDate.trim() !== "") {
//       retriveAvailableTimeSlots(symptoms.join(','), selectedDate)
//         .then((response) => {
//           setAvailableTimeSlots(response.data);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   };

//   const handleTimeChange = (e) => {
//     setAppointmentTime(e.target.value);
//     setTimeFilled(e.target.value.trim() !== "");
//   };

//   const formatDate = (time) => {
//     const [hours, minutes] = time.split(':');
//     return `${hours}:${minutes}`;
//   };

//   useEffect(() => {
//     setIsFormFilled(symptomsFilled && dateFilled && timeFilled);
//   }, [symptomsFilled, dateFilled, timeFilled]);

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="spinner"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="appointment-form-section">
//       <div className="nav">
//         <Link to="/">
//           <div className="nav-logo">
//             <img src={logo} alt="Logo" />
//           </div>
//         </Link>
//       </div>

//       <div className="form-container">
//         <h2 className="form-title">
//           <span>Book Appointment Online</span>
//         </h2>

//         <form className="form-content">
//           <label>
//             Please select your symptoms:
//             <input
//               type="text"
//               value={symptoms.join(', ')}
//               onClick={handleSymptomsClick}
//               readOnly
//               required
//             />
//           </label>

//           <br />
//           <label>
//             Preferred Appointment Date:
//             <select
//               value={appointmentDate}
//               onChange={handleDateChange}
//               disabled={!symptomsFilled}
//               required
//             >
//               <option value="default">Select</option>
//               {availableDates.map((date, index) => (
//                 <option key={index} value={date}>
//                   {date}
//                 </option>
//               ))}
//             </select>
//           </label>

//           <br />

//           <label>
//             Preferred Appointment Time Slot:
//             <select
//               value={appointmentTime}
//               onChange={handleTimeChange}
//               disabled={!dateFilled}
//               required
//             >
//               <option value="default">Select</option>
//               {availableTimeSlots.map((slot, index) => (
//                 <option key={index} value={`${appointmentDate}T${formatDate(slot.startTime)}`}>
//                   {`${formatDate(slot.startTime)} to ${formatDate(slot.endTime)}`}
//                 </option>
//               ))}
//             </select>
//           </label>

//           <br />

//           <div className="button-container">
//             <Link to="/">
//               <button type="button" className="text-appointment-btn back-button">
//                 Back
//               </button>
//             </Link>
//             <button type="submit" className="text-appointment-btn" disabled={!isFormFilled}>
//               Confirm Appointment
//             </button>
//           </div>
//         </form>
//       </div>

//       <div className="legal-footer">
//         <p>© 2013-2024 AyurCare. All rights reserved.</p>
//       </div>

//       <ToastContainer autoClose={5000} limit={1} closeButton={false} />

//       <ModalComponent
//         isOpen={modalIsOpen}
//         onRequestClose={handleModalClose}
//         options={symptomOptions}
//         selectedOptions={symptoms}
//         setSelectedOptions={setSymptoms}
//       />
//     </div>
//   );
// }

// export default AppointmentForm;





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
import ModalComponent from "./ModalComponent";
import getSpecialtyRecommendation from "./api/ModelApiService";

function AppointmentForm() {
  const [medicaluserId, setMedicaluserId] = useState(null);
  const [patientId, setPatientId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [symptoms, setSymptoms] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const [symptomsFilled, setSymptomsFilled] = useState(false);
  const [dateFilled, setDateFilled] = useState(false);
  const [timeFilled, setTimeFilled] = useState(false);

  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [isFormFilled, setIsFormFilled] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mlSpecialtyResult, setMlSpecialtyResult] = useState(null); // Store ML result here
  const [mlError, setMlError] = useState("");

  const symptomOptions = [
    'abdominal_pain', 'abnormal_menstruation', 'acidity', 'acute_liver_failure', 'altered_sensorium', 
    'anxiety', 'back_pain', 'belly_pain', 'blackheads', 'bladder_discomfort', 'blister', 
    'blood_in_sputum', 'bloody_stool', 'blurred_and_distorted_vision', 'breathlessness', 'brittle_nails', 
    'bruising', 'burning_micturition', 'chest_pain', 'chills', 'cold_hands_and_feets', 'coma', 
    'congestion', 'constipation', 'continuous_feel_of_urine', 'continuous_sneezing', 'cough', 
    'cramps', 'dark_urine', 'dehydration', 'depression', 'diarrhoea', 'dischromic _patches', 
    'distention_of_abdomen', 'dizziness', 'drying_and_tingling_lips', 'enlarged_thyroid', 
    'excessive_hunger', 'extra_marital_contacts', 'family_history', 'fast_heart_rate', 'fatigue', 
    'fluid_overload', 'foul_smell_of urine', 'headache', 'high_fever', 'hip_joint_pain', 
    'history_of_alcohol_consumption', 'increased_appetite', 'indigestion', 'inflammatory_nails', 
    'internal_itching', 'irregular_sugar_level', 'irritability', 'irritation_in_anus', 'joint_pain', 
    'knee_pain', 'lack_of_concentration', 'lethargy', 'loss_of_appetite', 'loss_of_balance', 
    'loss_of_smell', 'malaise', 'mild_fever', 'mood_swings', 'movement_stiffness', 'mucoid_sputum', 
    'muscle_pain', 'muscle_wasting', 'muscle_weakness', 'nausea', 'neck_pain', 'nodal_skin_eruptions', 
    'obesity', 'pain_behind_the_eyes', 'pain_during_bowel_movements', 'pain_in_anal_region', 
    'painful_walking', 'palpitations', 'passage_of_gases', 'patches_in_throat', 'phlegm', 'polyuria', 
    'prominent_veins_on_calf', 'puffy_face_and_eyes', 'pus_filled_pimples', 'receiving_blood_transfusion', 
    'receiving_unsterile_injections', 'red_sore_around_nose', 'red_spots_over_body', 'redness_of_eyes', 
    'restlessness', 'runny_nose', 'rusty_sputum', 'scurring', 'shivering', 'silver_like_dusting', 
    'sinus_pressure', 'skin_peeling', 'skin_rash', 'slurred_speech', 'small_dents_in_nails', 
    'spinning_movements', 'stiff_neck', 'stomach_bleeding', 'stomach_pain', 
    'sunken_eyes', 'sweating', 'swelled_lymph_nodes', 'swelling_joints', 'swelling_of_stomach', 
    'swollen_blood_vessels', 'swollen_extremeties', 'swollen_legs', 'throat_irritation', 
    'toxic_look_(typhos)', 'ulcers_on_tongue', 'unsteadiness', 'visual_disturbances', 'vomiting', 
    'watering_from_eyes', 'weakness_in_limbs', 'weakness_of_one_body_side', 'weight_gain', 'weight_loss', 
    'yellow_crust_ooze', 'yellow_urine', 'yellowing_of_eyes', 'yellowish_skin', 'itching', 'spotting_ urination'
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    retriveMedicalUserDetails("jane.smith@example.com")
      .then((response) => {
        setMedicaluserId(response.data.medicaluserId);
        return retrivePatientDetails(response.data.medicaluserId);
      })
      .then((response) => {
        setPatientId(response.data.patientId);
        return retriveDates();
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

  console.log(mlSpecialtyResult);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setAppointmentDate(selectedDate);
    setDateFilled(selectedDate.trim() !== "");

    if (symptomsFilled && selectedDate.trim() !== "") {
      retriveAvailableTimeSlots(mlSpecialtyResult, selectedDate)
        .then((response) => {
          setAvailableTimeSlots(response.data);
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

  // const callMLModel = async (selectedSymptoms) => {
  //   try {
  //     const result = await getSpecialtyRecommendation(selectedSymptoms);
  //     setMlSpecialtyResult(result); // Store ML result here
  //     console.log(result)
  //     setMlError("");
  //   } catch (error) {
  //     setMlSpecialtyResult(null);
  //     setMlError("Failed to fetch the specialty recommendation.");
  //     console.error("ML Model API Error:", error);
  //   }
  // };

  const callMLModel = async (selectedSymptoms) => {
    try {
      const result = await getSpecialtyRecommendation(selectedSymptoms);
      setMlError("");
  
      let specialtyCategory;
  
      switch (result.specialty) {
        case 'Gynecologist':
        case 'Pediatrician':
          specialtyCategory = 'Meda';
          break;
  
        case 'Neurologist':
        case 'Rheumatologists':
          specialtyCategory = 'Vata';
          break;
  
        case 'Pulmonologist':
        case 'Allergist':
        case 'Otolaryngologist':
        case 'Tuberculosis':
          specialtyCategory = 'Kapha';
          break;
  
        case 'Gastroenterologist':
        case 'Hepatologist':
        case 'Endocrinologist':
          specialtyCategory = 'Pitta';
          break;
  
        case 'Cardiologist':
        case 'Phlebologist':
          specialtyCategory = 'Rasa';
          break;
  
        case 'Dermatologist':
        case 'Osteopathic':
          specialtyCategory = 'Mamsa';
          break;
  
        case 'Internal Medicine':
          specialtyCategory = 'Rakta';
          break;
  
        default:
          specialtyCategory = 'Unknown';
      }

      setMlSpecialtyResult(specialtyCategory)
      console.log(specialtyCategory + " yeeehaaa...")
  
      console.log(`Specialty: ${result.specialty}, Category: ${specialtyCategory}`);
  
    } catch (error) {
      setMlSpecialtyResult(null);
      setMlError("Failed to fetch the specialty recommendation.");
      console.error("ML Model API Error:", error);
    }
  };

  console.log(mlSpecialtyResult);
  

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
              value={symptoms.join(', ')}
              onClick={handleSymptomsClick}
              readOnly
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
            <button
              type="button"
              className="text-appointment-btn"
              onClick={handleModalClose}
              disabled={!isFormFilled}
            >
              Done
            </button>
          </div>
        </form>
      </div>

      <div className="legal-footer">
        <p>© 2013-2024 AyurCare. All rights reserved.</p>
      </div>

      <ToastContainer autoClose={5000} limit={1} closeButton={false} />

      <ModalComponent
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        options={symptomOptions}
        selectedOptions={symptoms}
        setSelectedOptions={setSymptoms}
      />
    </div>
  );
}

export default AppointmentForm;
