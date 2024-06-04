import axios from "axios";

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
) 

export const retriveMedicalUserDetails
    = (medicaluserEmail) => apiClient.get(`/users/email/${medicaluserEmail}`)

export const retriveMedicalRecordDetails
    = (medicaluserId) => apiClient.get(`/users/${medicaluserId}/medical-records`)