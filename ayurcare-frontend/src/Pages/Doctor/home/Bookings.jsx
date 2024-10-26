// import React from 'react';
// import "./home.css";
//
// function Bookings(props) {
//     return (
//         <div className="home">
//             <div className="homepic">
//
//             </div>
//         </div>
//     );
// }
//
// export default Bookings;

import React from 'react';
import "./home.css";
import appoinment from "./../../../Assets/doc_appoinment.jpg"
import DoctorAppoinments from "./../Appointments/DoctorAppoinments";

function Bookings(props) {
    return (
        <div className="home">
            <div className="banner">
                <img src={appoinment} alt="Banner" className="bannerImg" />
            </div>
            <div className="content1">
                <DoctorAppoinments/>
            </div>
        </div>
    );
}

export default Bookings;
