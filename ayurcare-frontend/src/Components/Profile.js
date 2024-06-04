import React, { useEffect, useState } from "react";
import User from "../Assets/henry.jpg"; // Ensure this path is correct
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../Styles/Profile.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Treattable from "./treattable";
import { retriveMedicalUserDetails, retriveMedicalRecordDetails } from "../Components/api/AyurcareApiService";

function Profile() {
  const navigate = useNavigate();

  const handleBookAppointmentClick = () => {
    navigate("/appointment");
  };

  const [medicalUser, setMedicalUser] = useState({});
  const [medicaluserId, setMedicaluserId] = useState(null);
  const [medicalRecord, setMedicalRecord] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    refreshMedicalUser();
  }, []);

  useEffect(() => {
    if (medicaluserId) {
      refreshMedicalRecord(medicaluserId);
    }
  }, [medicaluserId]);

  function refreshMedicalUser() {
    retriveMedicalUserDetails("jane.smith@example.com")
      .then((response) => {
        setMedicalUser(response.data);
        setMedicaluserId(response.data.medicaluserId);
      })
      .catch((error) => console.log(error));
  }

  function refreshMedicalRecord(medicaluserId) {
    retriveMedicalRecordDetails(medicaluserId)
      .then((response) => {
        setMedicalRecord(response.data);
        // Assuming each medicalRecord has an image URL you need
        if (response.data.length > 0 && response.data[0].medicalId) {
          setImageUrl(`http://localhost:8080/users/${response.data[0].medicalId}/image/download`);
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <Navbar />
      <div className="ba-section">
        <div className="ba-text-content">
          <h3 className="ba-title">{medicalUser.medicaluserFirstname + " " + medicalUser.medicaluserLastname} </h3>
          <p className="ba-checks ba-check-first">
            <FontAwesomeIcon icon={faCircleCheck} style={{ color: "orange" }} />{" "}
            {medicalUser.medicaluserFirstname}
          </p>
          <p className="ba-checks ba-check-first">
            <FontAwesomeIcon icon={faCircleCheck} style={{ color: "orange" }} />{" "}
            {medicalUser.medicaluserLastname}
          </p>
          <p className="ba-checks ba-check-first">
            <FontAwesomeIcon icon={faCircleCheck} style={{ color: "red" }} />{" "}
            {medicalUser.medicaluserIntreatment}
          </p>
          <p className="ba-checks ba-check-first">
            <FontAwesomeIcon icon={faCircleCheck} style={{ color: "orange" }} />{" "}
            {medicalUser.medicaluserEmail}
          </p>
          <p className="ba-checks">
            <FontAwesomeIcon icon={faCircleCheck} style={{ color: "orange" }} />{" "}
            {medicalUser.medicaluserAddress}
          </p>
          <p className="ba-checks">
            <FontAwesomeIcon icon={faCircleCheck} style={{ color: "orange" }} />{" "}
            {medicalUser.medicaluserPhoneno}
          </p>

          <button className="logout-btn" type="button" onClick={handleBookAppointmentClick}>
            <FontAwesomeIcon icon={faEdit} /> Edit
          </button>
        </div>

        <div className="ba-image-content">
          <img src={imageUrl ? imageUrl : User} alt="Medical User" className="ba-image1" />
        </div>
      </div>

      <div className="treattable-container">
        <Treattable medicaluserId={medicalUser.medicaluserId} />
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
