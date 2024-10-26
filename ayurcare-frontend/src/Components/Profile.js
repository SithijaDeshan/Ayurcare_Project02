// import React, { useEffect, useState } from "react";
// import User from "../Assets/ayurcareBanner.png"; // Ensure this path is correct
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";
// import "../Styles/Profile.css";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import Treattable from "./treattable";
// import { ClipLoader } from "react-spinners";
// import { retriveMedicalUserDetails, retriveMedicalRecordDetails } from "../Components/api/AyurcareApiService";
// import axios from 'axios';
// import ProfileCard from "./ProfileCards/ProfileCard";
// import VideoCallCard from "./ProfileCards/VideoCallCard"
// import './ProfileCards/ProfileCard.css'
// import image1 from '../Assets/profile/1.jpg'
// import videocall from '../Assets/profile/videocall.jpg'
//
// function Profile() {
//   const navigate = useNavigate();
//
//   function handleUpdateMedicaluser(medicaluserEmail){
//     navigate(`/medicalUserUpdate/${medicaluserEmail}`);
//   };
//
//   const [medicalUser, setMedicalUser] = useState({});
//   const [medicaluserId, setMedicaluserId] = useState(null);
//   const [medicalRecord, setMedicalRecord] = useState([]);
//   const [imageUrl, setImageUrl] = useState(null);
//   const username = localStorage.getItem('username');
//   const token = localStorage.getItem('token');
//
//   useEffect(() => {
//     refreshMedicalUser();
//   }, []);
//
//   useEffect(() => {
//     if (medicaluserId) {
//       refreshMedicalRecord(medicaluserId);
//     }
//   }, [medicaluserId]);
//
//   function refreshMedicalUser() {
//     retriveMedicalUserDetails(username,token)
//       .then((response) => {
//         setMedicalUser(response.data);
//         setMedicaluserId(response.data.medicaluserId);
//         localStorage.setItem('userid', response.data.medicaluserId);
//       })
//       .catch((error) => console.log(error));
//   }
//
//   function refreshMedicalRecord(medicaluserId) {
//     const token = localStorage.getItem('token'); // Retrieve the token from local storage
//     retriveMedicalRecordDetails(medicaluserId, token)
//       .then((response) => {
//         setMedicalRecord(response.data);
//         // Assuming each medicalRecord has an image URL you need
//         if (response.data.length > 0 && response.data[0].patientId) {
//           fetchImage(response.data[0].patientId);
//         }
//       })
//       .catch((error) => console.log(error));
//   }
//
//   function fetchImage(patientId) {
//     const token = localStorage.getItem('token');
//
//     axios.get(`http://localhost:8080/users/${patientId}/image/download`, {
//       responseType: 'blob',
//       headers: { Authorization: `Bearer ${token}` }
//     })
//       .then((response) => {
//         const imageUrl = URL.createObjectURL(response.data);
//         setImageUrl(imageUrl);
//       })
//       .catch((error) => {
//         console.error('Error fetching the image:', error);
//         if (error.response && error.response.status === 401) {
//           console.error('Authentication error: Invalid or expired token');
//         }
//       });
//   }
//
//   return (
//     <div>
//       <Navbar />
//       <div className="ba-section">
//         <div className="ba-text-content">
//           <h3 className="ba-title">{medicalUser.medicaluserFirstname + " " + medicalUser.medicaluserLastname} </h3>
//           <p className="ba-checks ba-check-first">
//             <FontAwesomeIcon icon={faCircleCheck} style={{ color: "orange" }} />{" "}
//             {medicalUser.medicaluserFirstname}
//           </p>
//           <p className="ba-checks ba-check-first">
//             <FontAwesomeIcon icon={faCircleCheck} style={{ color: "orange" }} />{" "}
//             {medicalUser.medicaluserLastname}
//           </p>
//           <p className="ba-checks ba-check-first">
//             <FontAwesomeIcon icon={faCircleCheck} style={{ color: "orange" }} />{" "}
//             {medicalUser.medicaluserEmail}
//           </p>
//           <p className="ba-checks">
//             <FontAwesomeIcon icon={faCircleCheck} style={{ color: "orange" }} />{" "}
//             {medicalUser.medicaluserAddress}
//           </p>
//           <p className="ba-checks">
//             <FontAwesomeIcon icon={faCircleCheck} style={{ color: "orange" }} />{" "}
//             {medicalUser.medicaluserPhoneno}
//           </p>
//
//           <button className="logout-btn" type="button" onClick={() => handleUpdateMedicaluser(medicalUser.medicaluserEmail)}>
//             <FontAwesomeIcon icon={faEdit} /> Edit
//           </button>
//         </div>
//
//         <div className="ba-image-content">
//           <img src={imageUrl ? imageUrl : User} alt="Medical User" className="ba-image1" />
//         </div>
//       </div>
//
//
//       <div className="profile_body">
//         <div className="profile_wrapper">
//           <div className="profile_services">
//             <VideoCallCard
//                 title="Request Video Call"
//                 description="If you are unable to attend, you can change booking to a video conference."
//                 backgroundImage={videocall}
//             />
//             <ProfileCard
//                 title="Nikon 3458"
//                 description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, quam."
//                 backgroundImage={image1} // Update with the correct image URL
//             />
//             <ProfileCard
//                 title="Sony 1234"
//                 description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, quam."
//                 backgroundImage={image1} // Update with the correct image URL
//             />
//           </div>
//         </div>
//       </div>
//
//
//
//       <div className="treattable-container">
//         <Treattable medicaluserId={medicalUser.medicaluserId} />
//       </div>
//
//       <Footer />
//     </div>
//   );
// }
//
// export default Profile;


import React, { useEffect, useState } from "react";
import User from "../Assets/ayurcareBanner.png"; // Ensure this path is correct
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../Styles/Profile.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Treattable from "./treattable";
import axios from 'axios';
import ProfileCard from "./ProfileCards/ProfileCard";
import VideoCallCard from "./ProfileCards/VideoCallCard";
import RefundCard from "./ProfileCards/RefundCard";
import './ProfileCards/ProfileCard.css';
import image1 from '../Assets/profile/1.jpg';
import videocall from '../Assets/profile/videocall.jpg';
import refund from "../Assets/profile/refund.png"
import comingsoon from "../Assets/profile/cs.jpg"
import { retriveMedicalUserDetails, retriveMedicalRecordDetails } from "../Components/api/AyurcareApiService";

function Profile() {
  const navigate = useNavigate();
  const [medicalUser, setMedicalUser] = useState({});
  const [medicaluserId, setMedicaluserId] = useState(null);
  const [medicalRecord, setMedicalRecord] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  // Fetch medical user details and medical records on initial render
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await retriveMedicalUserDetails(username, token);
        setMedicalUser(userResponse.data);
        setMedicaluserId(userResponse.data.medicaluserId);
        localStorage.setItem('userid', userResponse.data.medicaluserId);

        // Fetch medical records for the retrieved user
        const recordResponse = await retriveMedicalRecordDetails(userResponse.data.medicaluserId, token);
        setMedicalRecord(recordResponse.data);

        // Fetch image if there are medical records
        if (recordResponse.data.length > 0 && recordResponse.data[0].patientId) {
          fetchImage(recordResponse.data[0].patientId);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [username, token]);

  const fetchImage = async (patientId) => {
    try {
      const response = await axios.get(`http://localhost:8080/users/${patientId}/image/download`, {
        responseType: 'blob',
        headers: { Authorization: `Bearer ${token}` }
      });
      const imageUrl = URL.createObjectURL(response.data);
      setImageUrl(imageUrl);
    } catch (error) {
      console.error('Error fetching the image:', error);
      if (error.response && error.response.status === 401) {
        console.error('Authentication error: Invalid or expired token');
      }
    }
  };

  return (
      <div>
        <Navbar />
        <div className="ba-section">
          <div className="ba-text-content">
            <h3 className="ba-title">{`${medicalUser.medicaluserFirstname} ${medicalUser.medicaluserLastname}`}</h3>
            <p className="ba-checks ba-check-first">
              <FontAwesomeIcon icon={faCircleCheck} style={{ color: "orange" }} /> {medicalUser.medicaluserFirstname}
            </p>
            <p className="ba-checks ba-check-first">
              <FontAwesomeIcon icon={faCircleCheck} style={{ color: "orange" }} /> {medicalUser.medicaluserLastname}
            </p>
            <p className="ba-checks ba-check-first">
              <FontAwesomeIcon icon={faCircleCheck} style={{ color: "orange" }} /> {medicalUser.medicaluserEmail}
            </p>
            <p className="ba-checks">
              <FontAwesomeIcon icon={faCircleCheck} style={{ color: "orange" }} /> {medicalUser.medicaluserAddress}
            </p>
            <p className="ba-checks">
              <FontAwesomeIcon icon={faCircleCheck} style={{ color: "orange" }} /> {medicalUser.medicaluserPhoneno}
            </p>

            <button className="logout-btn" type="button" onClick={() => navigate(`/medicalUserUpdate/${medicalUser.medicaluserEmail}`)}>
              <FontAwesomeIcon icon={faEdit} /> Edit
            </button>
          </div>

          <div className="ba-image-content">
            <img src={imageUrl ? imageUrl : User} alt="Medical User" className="ba-image1" />
          </div>
        </div>

        <div className="profile_body">
          <div className="profile_wrapper">
            <div className="profile_services">
              <VideoCallCard
                  title="Request Video Call"
                  description="Switch your appointment to a video conference for added convenience."
                  backgroundImage={videocall}
                  medicaluserId={medicaluserId} // Pass the medicaluserId as prop
              />
              <RefundCard
                  title="Refund"
                  description="If doctor cancelled your appoinmnt you can apply to refund."
                  backgroundImage={refund}
              />
              <ProfileCard
                  title="Coming Soon"
                  description="Shopping cart & delivery system development is currently in progress."
                  backgroundImage={comingsoon}
              />
            </div>
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
