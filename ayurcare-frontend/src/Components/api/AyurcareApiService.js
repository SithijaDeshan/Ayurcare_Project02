import axios from "axios";

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
) 

export const retriveMedicalUserDetails
    = (medicaluserEmail) => apiClient.get(`/users/email/${medicaluserEmail}`)

export const updateMedicalUserDetails
    = (medicaluserId, medicaluserDetails) => apiClient.put(`/users/update/${medicaluserId}`,medicaluserDetails)

export const retriveMedicalRecordDetails
    = (medicaluserId) => apiClient.get(`/users/${medicaluserId}/medical-records`) 

export const retriveAllMedicalUsers
    = () => apiClient.get(`/users`)

export const retrivePatientDetails
    = (medicaluserId) => apiClient.get(`/booking/patient/${medicaluserId}`)

export const retriveDates
    = () => apiClient.get(`/timeslots/dates`)

export const retriveAvailableTimeSlots
    = (category,date) => apiClient.get(`/timeslots/available/${category}/${date}`)
