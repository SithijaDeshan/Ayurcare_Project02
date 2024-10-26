import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./ProfileCard.css";
import { getTheRecentTimeSlot } from "../api/AyurcareApiService";

const RefundCard = ({ title, description, backgroundImage }) => {
    const [status, setStatus] = useState("");

    const navigate = useNavigate(); // Initialize useNavigate

    const patientId = localStorage.getItem("patientId");
    const token = localStorage.getItem("token");


    useEffect(() => {
        const getBookingData = async () => {
            if (patientId) {
                try {
                    const timeSlotResponse = await getTheRecentTimeSlot(patientId, token);
                    setStatus(timeSlotResponse.data.status); // Assuming status comes in response
                } catch (e) {
                    console.log(e);
                }
            } else {
                console.log("No Patient present");
            }
        };

        getBookingData();
    }, [patientId, token]);

    // Update handleRefundClick to navigate to ContactUs page
    const handleRefundClick = () => {
        if (status === "Cancel") {
            navigate('/contact'); // Change '/contact' to your actual route for ContactUs
        }
    };

    return (
        <>
            <span
                className={`profile_single-img_refund ${status === "Cancel" ? "cancelled" : ""}`}
                style={{ backgroundImage: `url(${backgroundImage})` }}
                onClick={handleRefundClick}
            >
                <span className="profile_img-text">
                    <h4>{title}</h4>
                    <p>{description}</p>
                    <button
                        disabled={status === "Booked"}
                        title={status === "Booked" ? "You don't have any cancelled appointments" : ""}
                        onClick={handleRefundClick} // Ensure the button also triggers the click
                    >
                        Refund
                    </button>
                </span>
            </span>
        </>
    );
};

RefundCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
};

export default RefundCard;

