import axios from "axios";

const token = localStorage.getItem('token')

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
)

export const retriveMedicalUserDetails = (medicaluserEmail,token) => {
    return apiClient.get(`/users/email/${medicaluserEmail}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const updateMedicalUserDetails = (medicaluserId, medicaluserDetails,token) => {
    return apiClient.put(`/users/update/${medicaluserId}`,medicaluserDetails, {
        headers: { Authorization: `Bearer ${token}` }
    })
};



export const deleteMedicalUserDetails = (medicaluserId,token) => {
    return apiClient.delete(`/users/delete/${medicaluserId}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
};

export const getCategory
    = (categoryDetails, token) => {return apiClient.get(`/category/${categoryDetails}`,{
        headers: { Authorization: `Bearer ${token}` }
    })
};

export const saveNewPatient = (patientSave,token) => {
    return apiClient.post(`/patient/addpatient`,patientSave, {
        headers: { Authorization: `Bearer ${token}` }
    })
};


export const paymentDetails = (paymentPayload) => {
    return apiClient.post(`payment/placeeOrder/true`,paymentPayload, {
        headers: { Authorization: `Bearer ${token}` }
    })
};

export const retriveMedicalRecordDetails
    = (medicaluserId, token) => {return apiClient.get(`/users/${medicaluserId}/medical-records`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    
}; 

export const retriveAllMedicalUsers
    = (token) => {return apiClient.get(`/users`,{
        headers: { Authorization: `Bearer ${token}` }
    })
};

export const register
    = (userData) => apiClient.post('/register', userData);


export const retrivePatientDetails = (medicaluserId , token) => {
    return apiClient.get(`/booking/patient/${medicaluserId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const checkBeforeBooking
    = (patientId, bookingDate, token) => {return apiClient.get(`/booking/check/${patientId}/${bookingDate}`,{
    headers: { Authorization: `Bearer ${token}` }
})
};

export const makeReservation = (bookingPayLoad,token) => {
    return apiClient.post(`/booking/book`,bookingPayLoad, {
        headers: { Authorization: `Bearer ${token}` }
    })
};



export const retriveDates = (token) => {
    return apiClient.get(`/timeslots/dates`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};


export const logout = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await apiClient.get(`/logout`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        localStorage.removeItem('token');
        return response.data;
    } catch (err) {
        console.error("Logout failed", err);
        throw new Error("Logout failed");
    }
};



export const retriveAvailableTimeSlots = (category, date, token) => {
    return apiClient.get(`/timeslots/available/${category}/${date}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
    
export const login = async (email, password) => {
    try {
        const response = await apiClient.post('/login', { medicaluserEmail: email, medicalUserPassword: password });
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Username or Password incorrect");
    }
};

export const payment = async (amount) => {
    try {
        const response = await apiClient.get(`/createTransaction/${amount}`,{
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (err) {
        throw new Error("Something Went Wrong");
    }
};


export const email = (emailPayLoad,token) => {
    return apiClient.post(`/email/booking/confirmation`,emailPayLoad, {
        headers: { Authorization: `Bearer ${token}` }
    })
};