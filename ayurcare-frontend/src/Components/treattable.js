import React, { useState, useEffect } from 'react';
import '../Styles/tt.css';
import Modal from './Modal';
import { retriveMedicalRecordDetails } from './api/AyurcareApiService';

const Ttable = ({ medicaluserId }) => {
    const [medicalRecord, setMedicalRecord] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        refreshMedicalRecord(medicaluserId);
    }, [medicaluserId]);

    function refreshMedicalRecord(medicaluserId) {
        retriveMedicalRecordDetails(medicaluserId)
            .then((response) => {
                setMedicalRecord(response.data);
            })
            .catch((error) => console.log(error));
    }

    const handleImageClick = (imageSrc) => {
        setSelectedImage(imageSrc);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedImage('');
    };

    return (
        <div className="table-container">
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Prescription Photo</th>
                    </tr>
                </thead>
                <tbody>
                    {medicalRecord.map((record) => (
                        <tr key={record.medicalId}>
                            <td>{new Date(record.prescriptionIssueDate).toLocaleDateString()}</td>
                            <td>
                                <img
                                    src={`http://localhost:8080/users/${record.patientId}/${record.medicalRecord}/image/download`}
                                    alt="Prescription"
                                    className="prescription-image"
                                    onClick={() => handleImageClick(`http://localhost:8080/users/${record.patientId}/${record.medicalRecord}/image/download`)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={showModal} onClose={handleCloseModal} imageSrc={selectedImage} />
        </div>
    );
};

export default Ttable;
