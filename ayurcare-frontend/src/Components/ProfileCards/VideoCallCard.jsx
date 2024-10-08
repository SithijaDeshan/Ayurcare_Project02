import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import "./ProfileCard.css"
import ConfirmationModal from '../../Pages/admin/catogories and Channeling fees/ConfirmationModal';
import {getTheRecentTimeSlot, videoCallRequestCreate, getThePatientDetails} from "../../Components/api/AyurcareApiService"
import { toast, ToastContainer } from 'react-toastify';
import '../../Styles/customToast.css'

const VideoCallCard = ({ title, description, backgroundImage}) => {
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const token = localStorage.getItem('token')
    const [timeSlotId,setTimeSlotId] = useState()
    const userid = localStorage.getItem('userid')


    // Retrivng the patient details
    useEffect(() => {
        if(userid){
            RetrievePatient();
        }else {
            console.log("No MedicalUser present")
        }
    }, []);

    const RetrievePatient = async () => {
        try {
            const patientResponse = await getThePatientDetails(userid,token)
            console.log(patientResponse.data.patientId + "gatthoooo")
            localStorage.setItem('patientId', patientResponse.data.patientId);
        }catch (e) {
            console.log(e)
        }
    }

    //put patientId to local storage
    const patientId = localStorage.getItem("patientId")

    useEffect(() => {
        if (patientId) {
            RetriveTimeSlot();
        } else {
            console.log("No patientId available");
        }
    }, [patientId]);

    const RetriveTimeSlot = async () => {
        try {
            const response = await getTheRecentTimeSlot(patientId,token);
            console.log(response.data.timeSlotId)
            setTimeSlotId(response.data.timeSlotId)
        }catch (e) {
            console.log(e)
        }
    }


    //create the videocall request
    // const createVideoCallRequest = async () => {
    //     try {
    //         const videocallPayload = {
    //             patientId,
    //             timeSlotId,
    //             "status": "Proceed"
    //         };
    //
    //         await videoCallRequestCreate(videocallPayload, token);
    //         console.log("Video call request created successfully");
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    //Success toast
    const handleSuccessToast = (message) => {
        toast.success(message, {
            position: toast.POSITION.TOP_CENTER,
            className: "custom-toast-success",
            autoClose: 5000 // Set the duration for the toast, e.g., 5000 ms (5 seconds)
        });
    };

    //Handle modal confirm action
    // const handleConfirm = () => {
    //
    //     console.log("Turning current booking into a video conference...");
    //     createVideoCallRequest();
    //     handleSuccessToast("You have successfully scheduled a video conference.");
    //     setIsModalOpen(false);
    //     // Add your logic here to convert the booking into a video call
    // };

    // create the videocall request
    const createVideoCallRequest = async () => {
        if (!timeSlotId) {
            handleSuccessToast("You don't have any scheduled appointments.");
            return; // Exit early if no timeSlotId
        }

        try {
            const videocallPayload = {
                patientId,
                timeSlotId,
                "status": "Proceed"
            };

            await videoCallRequestCreate(videocallPayload, token);
            console.log("Video call request created successfully");
            handleSuccessToast("You have successfully scheduled a video conference.");
        } catch (e) {
            console.log(e);
        }
    };

// Handle modal confirm action
    const handleConfirm = () => {
        console.log("Turning current booking into a video conference...");
        createVideoCallRequest(); // The request will only proceed if timeSlotId exists
        setIsModalOpen(false);
    };



    // Handle modal cancel action
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Show modal when button is clicked
    const handleRequestVideoCall = () => {
        setIsModalOpen(true);
    };

    return (
        <div>
                <span className="profile_single-img" style={{ backgroundImage: `url(${backgroundImage})` }}>
                    <span className="profile_img-text">
                        <h4>{title}</h4>
                        <p>{description}</p>
                        <button onClick={handleRequestVideoCall}>Request Video Call</button> {/* Trigger modal */}
                    </span>
                </span>

            {/* Render modal conditionally */}
            {isModalOpen && (
                <ConfirmationModal
                    message="Do you want to cancel the current booking and turn it into a video conference?"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
            <ToastContainer />
        </div>
    );
};

VideoCallCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    patientId: PropTypes.string
};

export default VideoCallCard;
