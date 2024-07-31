// import axios from "axios";
// import React, { useEffect, useState, useCallback } from "react";
// import { retriveMedicalRecordDetails , retrivePatientDetails , retriveMedicalUserDetails} from "../Components/api/AyurcareApiService";
// import { useDropzone } from 'react-dropzone';

// export default function ImageUpload() {
//   const [medicalUser, setMedicalUser] = useState({});
//   const [medicaluserId, setMedicaluserId] = useState(null);
//   // const [medicalRecord, setMedicalRecord] = useState([]);
//   const [medicalRecord, setMedicalRecord] = useState({});

//   useEffect(() => {
//     refreshMedicalUser();
//   }, []);

//   useEffect(() => {
//     if (medicaluserId) {
//       // refreshMedicalRecord(medicaluserId);
//       refreshPatientRecord(medicaluserId);
//     }
//   }, [medicaluserId]);

//   function refreshMedicalUser() {
//     retriveMedicalUserDetails("jane.smith@example.com")
//       .then((response) => {
//         setMedicalUser(response.data);
//         setMedicaluserId(response.data.medicaluserId); // Update medicaluserId here
//       })
//       .catch((error) => console.log(error));
//   }

//   function refreshPatientRecord(medicaluserId) {
//     retrivePatientDetails(medicaluserId)
//       .then((response) => {
//         console.log(response);
//         setMedicalRecord(response.data);
//       })
//       .catch((error) => console.log(error));
//   }

//   return (
//     <div>
//       {medicalRecord.patientId ? (
//         <img src={`http://localhost:8080/users/${medicalRecord.patientId}/image/download`} alt="Patient" />
//       ) : null}
//       <h1>{medicalRecord.patientId}</h1>
//       <p>{medicalRecord.patientId}</p>
//       <Dropzone patientId={medicalRecord.patientId} />
//     </div>
//   );
// } 

// function Dropzone({ patientId }) {
//   const onDrop = useCallback((acceptedFiles) => {
//     const file = acceptedFiles[0];
//     const formData = new FormData();
//     const token = localStorage.getItem('token');
//     formData.append("file", file);

//     axios.post(
//       `http://localhost:8080/users/${patientId}/image/upload`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`
//         },
//       }
//     )
//       .then(() => {
//         console.log("File uploaded successfully");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [patientId]);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   return (
//     <div {...getRootProps()}>
//       <input {...getInputProps()} />
//       {isDragActive ? (
//         <p>Drop the image here</p>
//       ) : (
//         <p>Drag 'n' drop MedicalRecord here, or click to select MedicalRecord</p>
//       )}
//     </div>
//   );
// }

import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { retriveMedicalRecordDetails, retrivePatientDetails, retriveMedicalUserDetails } from "../Components/api/AyurcareApiService";
import { useDropzone } from 'react-dropzone';

export default function ImageUpload() {
  const [medicalUser, setMedicalUser] = useState({});
  const [medicaluserId, setMedicaluserId] = useState(null);
  const [medicalRecord, setMedicalRecord] = useState({});
  const [imageSrc, setImageSrc] = useState(null);
  const username = localStorage.getItem('username')
  const token = localStorage.getItem('token')

  useEffect(() => {
    refreshMedicalUser();
  }, []);

  useEffect(() => {
    if (medicaluserId) {
      refreshPatientRecord(medicaluserId);
    }
  }, [medicaluserId]);

  useEffect(() => {
    if (medicalRecord.patientId) {
      fetchImage(medicalRecord.patientId);
    }
  }, [medicalRecord.patientId]);

  function refreshMedicalUser() {
    retriveMedicalUserDetails(username,token)
      .then((response) => {
        setMedicalUser(response.data);
        setMedicaluserId(response.data.medicaluserId);
      })
      .catch((error) => console.log(error));
  }

  function refreshPatientRecord(medicaluserId) {
    retrivePatientDetails(medicaluserId,token)
      .then((response) => {
        setMedicalRecord(response.data);
      })
      .catch((error) => console.log(error));
  }

  // function fetchImage(patientId) {
  //   const token = localStorage.getItem('token');
  //   axios.get(`http://localhost:8080/users/${patientId}/image/download`, {
  //     responseType: 'blob',
  //     headers: { Authorization: `Bearer ${token}` }
  //   })
  //     .then((response) => {
  //       const imageUrl = URL.createObjectURL(response.data);
  //       setImageSrc(imageUrl);
  //     })
  //     .catch((error) => {
  //       console.log('Error fetching the image:', error);
  //     });
  // }

  function fetchImage(patientId) {
    const token = localStorage.getItem('token');

    axios.get(`http://localhost:8080/users/${patientId}/image/download`, {
      responseType: 'blob',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        const imageUrl = URL.createObjectURL(response.data);
        setImageSrc(imageUrl);
      })
      .catch((error) => {
        console.error('Error fetching the image:', error);
        if (error.response && error.response.status === 401) {
          console.error('Authentication error: Invalid or expired token');
        }
      });
  }

  return (
    <div>
      {imageSrc ? (
        <img src={imageSrc} alt="Patient" />
      ) : null}
      <h1>{medicalRecord.patientId}</h1>
      <p>{medicalRecord.patientId}</p>
      <Dropzone patientId={medicalRecord.patientId} />
    </div>
  );
}

function Dropzone({ patientId }) {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    const token = localStorage.getItem('token');
    formData.append("file", file);

    axios.post(
      `http://localhost:8080/users/${patientId}/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
      }
    )
      .then(() => {
        console.log("File uploaded successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [patientId]);

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
