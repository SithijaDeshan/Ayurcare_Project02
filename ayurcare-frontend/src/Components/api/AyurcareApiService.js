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

export const retriveAllMedicalUsers
    = (token) => {return apiClient.get(`/users`,{
    headers: { Authorization: `Bearer ${token}` }
})
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


export const paymentDetails = (paymentPayload, token) => {
    return apiClient.post(`payment/placeeOrder/true`,paymentPayload, {
        headers: { Authorization: `Bearer ${token}` }
    })
};

export const retriveMedicalRecordDetails
    = (medicaluserId, token) => {return apiClient.get(`/users/${medicaluserId}/medical-records`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    
}; 



export const retriveAllMedicalUsersCount
    = (token) => {return apiClient.get(`/users/registered/USERcount`,{
    headers: { Authorization: `Bearer ${token}` }
    })
};

export const retriveFiveMedicalUsers
    = (token) => {return apiClient.get(`/users/lastFiveUsers`,{
    headers: { Authorization: `Bearer ${token}` }
})
};

export const retriveAllPatientsCount
    = (token) => {return apiClient.get(`/patient/count`,{
    headers: { Authorization: `Bearer ${token}` }
    })
};

export const retriveAllPaymentsCount
    = (token) => {return apiClient.get(`/payment/count`,{
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

export const retrivePatientBookingDetailsForDate
    = (date, token) => {return apiClient.get(`/booking/details/${date}`,{
    headers: { Authorization: `Bearer ${token}` }
})
};

export const doctorCancelation = (bookingId,decitionPayLoad,token) => {
    return apiClient.post(`/booking/cancel/${bookingId}`,decitionPayLoad, {
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

export const payment = async (amount, token) => {
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


export const videoCallApi = (day,token) => {
    return apiClient.get(`/videocall/by-date/${day}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
};

export const videoCallApiStatusUpdate = (id,status,token) => {
    return apiClient.get(`/videocall/update-status/${id}/${status}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
};

// api for the geting all the patient details
export const getAllPatient = (token) => {
    return apiClient.get(`/patient/allpatients`, {
        headers: { Authorization: `Bearer ${token}` }
    })
};

//all categories
export const getAllCategories = (token) => {
    return apiClient.get(`/category/getall`, {
        headers: { Authorization: `Bearer ${token}` }
    })
};

export const getChannelingFee = (token) => {
    return apiClient.get(`channelling/fee/1`, {
        headers: { Authorization: `Bearer ${token}` }
    })
};

export const updateCategoriesPredifinedtime = (categoryId, timePeriod,token) => {
    return apiClient.put(`/category/update/predefinedTime/${categoryId}`,timePeriod, {
        headers: { Authorization: `Bearer ${token}` }
    })
};

export const updateChannelingFee = (feePayload,token) => {
    return apiClient.put(`channelling/fee/1`,feePayload, {
        headers: { Authorization: `Bearer ${token}` }
    })
};

//Videocall timeslot check
export const getTheRecentTimeSlot = (patientId, token) => {
    return apiClient.get(`booking/recent/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
};

//videocall request create
export const videoCallRequestCreate = (videoCallPayLoad,token) => {
    return apiClient.post(`videocall/create`,videoCallPayLoad, {
        headers: { Authorization: `Bearer ${token}` }
    })
};

//Retrive patient using the medicaluserId
export const getThePatientDetails = (medicalUserId, token) => {
    return apiClient.get(`patient/by-medicaluser/${medicalUserId}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
};