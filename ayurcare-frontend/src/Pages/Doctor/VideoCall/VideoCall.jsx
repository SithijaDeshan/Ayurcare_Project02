import React, { useEffect, useState } from 'react';
import "./videoCall.css";
import videocallBanner from "../../../Assets/videocall.jpg";
import { videoCallApi, videoCallApiStatusUpdate } from "../../../Components/api/AyurcareApiService";
import { useNavigate, NavLink } from "react-router-dom";

function VideoCall() {
    const [videoCallData, setVideoCallData] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const currentDate = getCurrentDate();

    useEffect(() => {
        if (currentDate) {
            retriveVideoCallRequests(currentDate);
        }
    }, [currentDate]);

    const retriveVideoCallRequests = async (currentDate) => {
        try {
            const response = await videoCallApi(currentDate, token);
            setVideoCallData(response.data);
            console.log(response.data)
        } catch (e) {
            console.log(e);
        }
    };


    const handleStatusChange = async (videoCallId, newStatus) => {
        try {
            // Call the API to update the status
            await videoCallApiStatusUpdate(videoCallId, newStatus,token);

            // Update the state after the API call is successful
            setVideoCallData(prevData =>
                prevData.map(item =>
                    item.videoCallId === videoCallId ? { ...item, status: newStatus } : item
                )
            );
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };


    const StatusButton = ({ status, videoCallId }) => {
        const handleClick = () => {
            // Handle the status change
            handleStatusChange(videoCallId, status === "Proceed" ? "Done" : "Proceed");

            // Refresh the page
            window.location.reload();
        };

        return (
            <button
                className={`statusButton ${status}`}
                onClick={handleClick}
            >
                {status === "Proceed" ? "Mark as Done" : "Undo"}
            </button>
        );
    };


    const handleProceedToCall = async (videoCallId, patientId) => {
        try {
            // Handle Proceed to Call action here
            // navigate('/videocall');
            navigate(`/videocall?patientId=${patientId}`);
            console.log(`Proceeding to call for patient ID: ${patientId}`);
        } catch (error) {
            console.error("Error proceeding to call:", error);
        }
    };

    return (
        <div className="videoCallPage">
            <div className="videoCallBanner">
                <img src={videocallBanner} alt="Video Call Banner" className="videoCallBannerImg" />
            </div>

            <div className="contentArea">
                <div className="transactionWidget">
                    <h3 className="transactionTitle">Video Call Requests for {currentDate}</h3>
                    <table className="transactionTable">
                        <thead>
                        <tr className="transactionRow">
                            <th className="transactionHeader">Patient Name</th>
                            <th className="transactionHeader">Category</th>
                            <th className="transactionHeader">Time Slot</th>
                            <th className="transactionHeader">Proceed</th>
                            <th className="transactionHeader">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {videoCallData.map((item) => (
                            <tr className="transactionRow" key={item.videoCallId}>
                                <td className="transactionUser">
                                    <img
                                        src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                                        alt="User"
                                        className="transactionUserImg"
                                    />
                                    <span className="transactionUserName">{item.patientName}</span>
                                </td>
                                <td className="transactionCategory">{item.category}</td>
                                <td className="transactionTimeSlot">
                                    {item.startTime} - {item.endTime}
                                </td>
                                <td className="transactionProceed">
                                    <button
                                        className="proceedButton"
                                        onClick={() => handleProceedToCall(item.videoCallId, item.patientId)}
                                    >
                                        Proceed to Call
                                    </button>
                                </td>
                                <td className="transactionStatus">
                                    <StatusButton status={item.status} videoCallId={item.videoCallId} />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default VideoCall;
