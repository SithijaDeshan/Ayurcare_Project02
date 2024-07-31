import React, { useState, useEffect } from 'react';
import '../Styles/tt.css';
import Modal from './Modal';
import { retriveMedicalRecordDetails } from './api/AyurcareApiService';
import axios from 'axios';

const Ttable = ({ medicaluserId }) => {
    const [medicalRecord, setMedicalRecord] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [images, setImages] = useState({}); // To store fetched images

    useEffect(() => {
        refreshMedicalRecord(medicaluserId);
    }, [medicaluserId]);

    function refreshMedicalRecord(medicaluserId) {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        retriveMedicalRecordDetails(medicaluserId, token)
            .then((response) => {
                setMedicalRecord(response.data);
                response.data.forEach(record => fetchImage(record));
            })
            .catch((error) => console.log(error));
    }

    const fetchImage = (record) => {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        const imageUrl = `http://localhost:8080/users/${record.patientId}/${record.medicalRecord}/image/download`;

        axios.get(imageUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            responseType: 'blob'
        })
        .then(response => {
            const url = URL.createObjectURL(response.data);
            setImages(prevImages => ({ ...prevImages, [record.medicalId]: url }));
        })
        .catch(error => {
            console.log(error);
        });
    };

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
                                {images[record.medicalId] ? (
                                    <img
                                        src={images[record.medicalId]}
                                        alt="Prescription"
                                        className="prescription-image"
                                        onClick={() => handleImageClick(images[record.medicalId])}
                                    />
                                ) : (
                                    <span>Loading...</span>
                                )}
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


