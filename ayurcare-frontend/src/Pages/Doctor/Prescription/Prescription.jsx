import React, { useState } from 'react';
import "./prescription.css";
import prescriptionimg from "../../../Assets/prescription.jpg";
import GetAllUsersForPrescription from "./users/GetAllUsersForPrescription";
import PrescriptionUpload from "./prescriptionUpload/PrescriptionUpload";
import Ttable from "../../../Components/treattable";

function Prescription(props) {
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <div className="prescription">
            <div className="pressBanner">
                <img src={prescriptionimg} alt="Banner" className="pressBannerImg" />
            </div>
            <div>
                <GetAllUsersForPrescription setSelectedUser={setSelectedUser} />
            </div>
            <div>
                <PrescriptionUpload user={selectedUser} />
            </div>
        </div>
    );
}

export default Prescription;
