import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LocationSearching, MailOutline, PhoneAndroid, Publish } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { retriveMedicalUserDetails, updateMedicalUserDetails } from "../../../Components/api/AyurcareApiService";
import "../../../Styles/customToast.css";
import "./user.css";
import Modal from 'react-modal';
import "./modal.css"



// Define the handleSuccessToast function
const handleSuccessToast = (message) => {
    toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
        className: "custom-toast-success",
        autoClose: 5000 // Set the duration for the toast, e.g., 5000 ms (5 seconds)
    });
};




Modal.setAppElement('#root'); // For accessibility purposes



export default function User() {
    const { medicaluserEmail } = useParams();
    const token = localStorage.getItem('token');
    const [userDetails, setUserDetails] = useState({
        medicaluserFirstname: "",
        medicaluserLastname: "",
        medicaluserEmail: "",
        medicaluserPhoneno: "",
        medicaluserAddress: "",
        role: ""
    });
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility


    //Getting user detail from backend


    useEffect(() => {
        if (medicaluserEmail) {
            retrieveUserDetails(medicaluserEmail);
        }
    }, [medicaluserEmail]);

    const retrieveUserDetails = async (medicaluserEmail) => {
        try {
            const response = await retriveMedicalUserDetails(medicaluserEmail, token);
            setUserDetails(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };


    // Update input handling

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };


    //modal with updating user

    const openModal = () => setIsModalOpen(true); // Open modal
    const closeModal = () => setIsModalOpen(false); // Close modal

    const handleConfirmUpdate = async () => {
        closeModal(); // Close modal on confirmation

        console.log(userDetails);
        try {
            const response = await updateMedicalUserDetails(userDetails.medicaluserId, userDetails, token);
            console.log(response.data);
            handleSuccessToast("User details Successfully Updated"); // Call the success toast function
        } catch (error) {
            console.log(error);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        openModal(); // Open modal on form submission
    };

    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
                <Link to="/admin/newUser">
                    <button className="userAddButton">Create</button>
                </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img
                            src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt=""
                            className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{`${userDetails.medicaluserFirstname} ${userDetails.medicaluserLastname}`}</span>
                            <span className="userShowUserTitle">{userDetails.role}</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Contact Details</span>
                        <div className="userShowInfo">
                            <PhoneAndroid className="userShowIcon" />
                            <span className="userShowInfoTitle">{userDetails.medicaluserPhoneno}</span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutline className="userShowIcon" />
                            <span className="userShowInfoTitle">{userDetails.medicaluserEmail}</span>
                        </div>
                        <div className="userShowInfo">
                            <LocationSearching className="userShowIcon" />
                            <span className="userShowInfoTitle">{userDetails.medicaluserAddress}</span>
                        </div>
                    </div>
                </div>

                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm" onSubmit={handleFormSubmit}>
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={userDetails.medicaluserFirstname}
                                    onChange={handleInputChange}
                                    name="medicaluserFirstname"
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={userDetails.medicaluserLastname}
                                    onChange={handleInputChange}
                                    name="medicaluserLastname"
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={userDetails.medicaluserEmail}
                                    onChange={handleInputChange}
                                    name="medicaluserEmail"
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    placeholder="Phone"
                                    value={userDetails.medicaluserPhoneno}
                                    onChange={handleInputChange}
                                    name="medicaluserPhoneno"
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Address</label>
                                <input
                                    type="text"
                                    placeholder="Address"
                                    value={userDetails.medicaluserAddress}
                                    onChange={handleInputChange}
                                    name="medicaluserAddress"
                                    className="userUpdateInput"
                                />
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img
                                    className="userUpdateImg"
                                    src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                                    alt=""
                                />
                                <label htmlFor="file">
                                    <Publish className="userUpdateIcon" />
                                </label>
                                <input type="file" id="file" style={{ display: "none" }} />
                            </div>
                            <button className="userUpdateButton">Update</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Confirmation Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Confirm Update"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <h2>Confirm Update</h2>
                <p>Are you sure you want to update the user details?</p>
                <button onClick={handleConfirmUpdate} className="modal-button">Yes, Update</button>
                <button onClick={closeModal} className="modal-button">Cancel</button>
            </Modal>

            <ToastContainer /> {/* Ensure ToastContainer is rendered */}
        </div>
    );
}
