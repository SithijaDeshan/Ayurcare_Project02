import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./sidebar.css";
import { CalendarToday, VideoCall, LocalPharmacy } from "@mui/icons-material";
import doctor from "./../../../Assets/doctor-picture.png";
import { videoCallApi } from "../../../Components/api/AyurcareApiService";

function DoctorSidebar() {
    const location = useLocation();
    const [showNotificationBulb, setShowNotificationBulb] = useState(false);
    const token = localStorage.getItem('token');

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const currentDate = getCurrentDate();

    useEffect(() => {
        const fetchVideoCallRequests = async () => {
            try {
                const response = await videoCallApi("2024-10-25", token);

                // Check if any status is 'Proceed'
                const hasProceedStatus = response.data.some(item => item.status === "Proceed");
                setShowNotificationBulb(hasProceedStatus);
            } catch (e) {
                console.log(e);
            }
        };

        fetchVideoCallRequests();
    }, [currentDate, token]);

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarProfile">
                    <img
                        src={doctor}
                        alt="Doctor's Profile"
                        className="sidebarProfileImg"
                    />
                </div>

                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Doctor's Desk</h3>
                    <ul className="sidebarList">
                        <Link to="/doctor" className="link">
                            <li className={`sidebarListItem ${location.pathname === "/doctor" ? "active" : ""}`}>
                                <CalendarToday className="sidebarIcon" />
                                Bookings
                            </li>
                        </Link>
                        <Link to="/doctor/videocall" className="link">
                            <li className={`sidebarListItem ${location.pathname === "/doctor/videocall" ? "active" : ""}`}>
                                <VideoCall className="sidebarIcon" />
                                Video Call Requests
                                {showNotificationBulb && (
                                    <span className="notificationBulb"></span>
                                )}
                            </li>
                        </Link>
                        <Link to="/doctor/prescription" className="link">
                            <li className={`sidebarListItem ${location.pathname === "/doctor/prescription" ? "active" : ""}`}>
                                <LocalPharmacy className="sidebarIcon" />
                                Prescription Details
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default DoctorSidebar;
