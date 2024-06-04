import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { retriveMedicalUserDetails } from "../Components/api/AyurcareApiService";
import { retriveMedicalRecordDetails } from "../Components/api/AyurcareApiService";
import { useDropzone } from 'react-dropzone';

export default function ImageUpload() {
  const [medicalUser, setMedicalUser] = useState({});
  const [medicaluserId, setMedicaluserId] = useState(null);
  const [medicalRecord, setMedicalRecord] = useState([]);

  useEffect(() => {
    refreshMedicalUser();
  }, []);

  useEffect(() => {
    if (medicaluserId) {
      refreshMedicalRecord(medicaluserId);
    }
  }, [medicaluserId]);

  function refreshMedicalUser() {
    retriveMedicalUserDetails("jane.smith@example.com")
      .then((response) => {
        setMedicalUser(response.data);
        setMedicaluserId(response.data.medicaluserId); // Update medicaluserId here
      })
      .catch((error) => console.log(error));
  }

  function refreshMedicalRecord(medicaluserId) {
    retriveMedicalRecordDetails(medicaluserId)
      .then((response) => {
        console.log(response);
        setMedicalRecord(response.data);
      })
      .catch((error) => console.log(error));
  }

  return medicalRecord.map((medicalRecord, index) => {
    return (
      <div key={index}>
        {medicalRecord.medicalId ? (<img src={`http://localhost:8080/users/${medicalRecord.medicalId}/image/download`}/>) : null}
        <h1>{medicalRecord.medicalId}</h1>
        <p>{medicalRecord.patientId}</p>
        <Dropzone medicalId={medicalRecord.medicalId} />
      </div>
    );
  });
}

function Dropzone({ medicalId }) {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log(file);

    const formData = new FormData();
    formData.append("file", file);

    axios.post(
      `http://localhost:8080/users/${medicalId}/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then(() => {
        console.log("File uploaded successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here</p>
      ) : (
        <p>Drag 'n' drop MedicalRecord here, or click to select MedicalRecord</p>
      )}
    </div>
  );
}
