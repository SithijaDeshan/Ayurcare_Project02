import React, { useEffect, useState } from "react";
import User from "../Assets/ayurcareBanner.png"; // Ensure this path is correct
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../Styles/Profile.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Treattable from "./treattable";
import { ClipLoader } from "react-spinners";
import { retriveMedicalUserDetails, retriveMedicalRecordDetails } from "../Components/api/AyurcareApiService"; 
import axios from 'axios';

function Profile() {
  const navigate = useNavigate();

  function handleUpdateMedicaluser(medicaluserEmail){
    navigate(`/medicalUserUpdate/${medicaluserEmail}`);
  };
 
  const [medicalUser, setMedicalUser] = useState({});
  const [medicaluserId, setMedicaluserId] = useState(null);
  const [medicalRecord, setMedicalRecord] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  useEffect(() => {
    refreshMedicalUser();
  }, []);

  useEffect(() => {
    if (medicaluserId) {
      refreshMedicalRecord(medicaluserId);
    }
  }, [medicaluserId]);

  function refreshMedicalUser() {
    retriveMedicalUserDetails(username,token)
      .then((response) => {
        setMedicalUser(response.data);
        setMedicaluserId(response.data.medicaluserId);
      })
      .catch((error) => console.log(error));
  } 

  function refreshMedicalRecord(medicaluserId) {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    retriveMedicalRecordDetails(medicaluserId, token)
      .then((response) => {
        setMedicalRecord(response.data);
        // Assuming each medicalRecord has an image URL you need
        if (response.data.length > 0 && response.data[0].patientId) {
          fetchImage(response.data[0].patientId);
        }
      })
      .catch((error) => console.log(error));
  }

  function fetchImage(patientId) {
    const token = localStorage.getItem('token');

    axios.get(`http://localhost:8080/users/${patientId}/image/download`, {
      responseType: 'blob',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        const imageUrl = URL.createObjectURL(response.data);
        setImageUrl(imageUrl);
      })
      .catch((error) => {
        console.error('Error fetching the image:', error);
        if (error.response && error.response.status === 401) {
          console.error('Authentication error: Invalid or expired token');
        }
      });
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

          <button className="logout-btn" type="button" onClick={() => handleUpdateMedicaluser(medicalUser.medicaluserEmail)}>
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
