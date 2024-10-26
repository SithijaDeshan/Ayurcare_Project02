// import React, {useEffect} from 'react';
// import {Publish} from "@mui/icons-material";
// import "./pUpload.css"
// import ImageUpload from "../../../ImageUpload";
// import {retriveMedicalUserDetails} from "../../../../Components/api/AyurcareApiService"
//
// function PrescriptionUpload(props) {
//     const email = localStorage.getItem('selectedEmail')
//     const token = localStorage.getItem('token')
//     console.log(email)
//
//     useEffect((email) => {
//         if(email){
//             retrieveUser(email)
//         }
//     }, [email]);
//
//     const retrieveUser =async () => {
//         try {
//
//             const response = await retriveMedicalUserDetails(email,token)
//             const userDetails = response.data
//
//         }catch (e) {
//             console.log(e)
//         }
//     }
//
//     return (
//         <div className="userDetailsForm">
//             <span className="formTitle">Selected Patient</span>
//             {/*<form className="formContainer" onSubmit={handleFormSubmit}>*/}
//             <form className="formContainer" >
//                 <div className="formLeft">
//                     <div className="formItem">
//                         <label>First Name</label>
//                         <input
//                             type="text"
//                             placeholder="First Name"
//                             // value={userDetails.medicaluserFirstname}
//                             // onChange={handleInputChange}
//                             name="medicaluserFirstname"
//                             className="formInput"
//                         />
//                     </div>
//                     <div className="formItem">
//                         <label>Last Name</label>
//                         <input
//                             type="text"
//                             placeholder="Last Name"
//                             // value={userDetails.medicaluserLastname}
//                             // onChange={handleInputChange}
//                             name="medicaluserLastname"
//                             className="formInput"
//                         />
//                     </div>
//                     <div className="formItem">
//                         <label>Email</label>
//                         <input
//                             type="email"
//                             placeholder="Email"
//                             // value={userDetails.medicaluserEmail}
//                             // onChange={handleInputChange}
//                             name="medicaluserEmail"
//                             className="formInput"
//                         />
//                     </div>
//                     <div className="formItem">
//                         <label>Phone</label>
//                         <input
//                             type="text"
//                             placeholder="Phone"
//                             // value={userDetails.medicaluserPhoneno}
//                             // onChange={handleInputChange}
//                             name="medicaluserPhoneno"
//                             className="formInput"
//                         />
//                     </div>
//                     <div className="formItem">
//                         <label>Address</label>
//                         <input
//                             type="text"
//                             placeholder="Address"
//                             // value={userDetails.medicaluserAddress}
//                             // onChange={handleInputChange}
//                             name="medicaluserAddress"
//                             className="formInput"
//                         />
//                     </div>
//                 </div>
//                 <div className="dropbox">
//                     <ImageUpload/>
//                 </div>
//
//             </form>
//         </div>
//     );
// }
//
// export default PrescriptionUpload;

import React, { useEffect, useState } from 'react';
import { Publish } from "@mui/icons-material";
import "./pUpload.css";
import ImageUpload from "../../../ImageUpload";
import Ttable from "../../../../Components/treattable";

function PrescriptionUpload({ user }) {
    if (!user) {
        return <div className="noUserSelected"></div>;
    }

    return (
        <div>
            <div className="userDetailsForm">
                <span className="formTitle">Selected Patient</span>
                <form className="formContainer">
                    <div className="formLeft">
                        <div className="formItem">
                            <label>First Name</label>
                            <input
                                type="text"
                                placeholder="First Name"
                                value={user.medicaluserFirstname}
                                className="formInput"
                                readOnly
                            />
                        </div>
                        <div className="formItem">
                            <label>Last Name</label>
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={user.medicaluserLastname}
                                className="formInput"
                                readOnly
                            />
                        </div>
                        <div className="formItem">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                value={user.medicaluserEmail}
                                className="formInput"
                                readOnly
                            />
                        </div>
                        <div className="formItem">
                            <label>Phone</label>
                            <input
                                type="text"
                                placeholder="Phone"
                                value={user.medicaluserPhoneno}
                                className="formInput"
                                readOnly
                            />
                        </div>
                        <div className="formItem">
                            <label>Address</label>
                            <input
                                type="text"
                                placeholder="Address"
                                value={user.medicaluserAddress}
                                className="formInput"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="dropbox">
                        <ImageUpload medicaluserId={user.medicaluserId} />
                    </div>
                </form>

            </div>
            <div>
                {/* Pass the medicaluserId to Ttable */}
                <Ttable medicaluserId={user.medicaluserId} />
            </div>
        </div>


    );
}

export default PrescriptionUpload;
