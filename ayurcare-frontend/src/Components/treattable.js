// App.js
import React, { useState, useEffect } from 'react';
import '../Styles/tt.css'
import { retriveMedicalRecordDetails } from "./api/AyurcareApiService";

const Ttable = ({ medicaluserId }) => {
    const [medicalRecord, setMedicalRecord] = useState([]);

    useEffect(() => {
        refreshMedicalRecord(medicaluserId);
    }, [medicaluserId]); 

    function refreshMedicalRecord(medicaluserId){
        console.log(medicaluserId)
        retriveMedicalRecordDetails(medicaluserId)
        .then((response) => {
            console.log(response)
            setMedicalRecord(response.data)
          })
    
    
    
        .catch((error) => console.log(error));
    }

    return (
        <div className="table-container">
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Prescription Photo</th>
                        <th>Treatment Duration</th>
                    </tr>
                </thead>
                <tbody>
                {medicalRecord.map((medicalRecord) => (
              <tr key={medicalRecord.medicalId}>
                <td>{medicalRecord.prescriptionIssueDate}</td>
                <td>{medicalRecord.medicalRecord}</td>
                <td>{medicalRecord.prescriptionIssueDate}</td>
              </tr>
            ))}
                </tbody>
            </table>
        </div>
    );
    
};

export default Ttable;
