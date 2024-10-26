// import React, { useEffect, useState } from 'react';
// import user_default from "../../../../Assets/user_default.png";
// import { Visibility, Check, Search } from "@mui/icons-material";
// import Modal from "react-modal";
// import { retriveAllMedicalUsers } from "../../../../Components/api/AyurcareApiService";
// import "./gAUP.css";
//
// Modal.setAppElement('#root');
//
// function GetAllUsersForPrescription({ setSelectedUser }) {
//     const token = localStorage.getItem('token');
//     const [detailedUsers, setUsers] = useState([]);
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [currentUser, setCurrentUser] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filteredUsers, setFilteredUsers] = useState([]);
//
//     useEffect(() => {
//         retrieveFiveMedicalUsers();
//     }, []);
//
//     const retrieveFiveMedicalUsers = async () => {
//         try {
//             const response = await retriveAllMedicalUsers(token);
//             const roleUsers = response.data.filter(user => user.role === 'USER');
//             setUsers(roleUsers);
//             console.log(roleUsers);
//         } catch (e) {
//             console.log(e);
//         }
//     };
//
//     useEffect(() => {
//         const filtered = detailedUsers.filter(user =>
//             `${user.medicaluserFirstname} ${user.medicaluserLastname}`
//                 .toLowerCase()
//                 .includes(searchTerm.toLowerCase())
//         );
//         setFilteredUsers(filtered);
//     }, [searchTerm, detailedUsers]);
//
//     const handleSelectClick = (user) => {
//         setSelectedUser(user);
//     };
//
//     const openModal = (user) => {
//         setCurrentUser(user);
//         setModalIsOpen(true);
//     };
//
//     const closeModal = () => {
//         setModalIsOpen(false);
//         setCurrentUser(null);
//     };
//
//     return (
//         <div className="smallWidget">
//             <span className="smallWidgetTitle">All Patients</span>
//
//             <div className="searchBarContainer">
//                 <Search className="searchIcon" />
//                 <input
//                     type="text"
//                     className="searchBar"
//                     placeholder="Search patient..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//             </div>
//
//             <ul className="smallWidgetList">
//                 {filteredUsers && filteredUsers.map(user => (
//                     <li className="smallWidgetListItem" key={user.medicaluserId}>
//                         <img className="smallWidgetImg" src={user_default} alt="" />
//                         <div className="smallWidgetUser">
//                             <span className="smallWidgetUsername">{`${user.medicaluserFirstname} ${user.medicaluserLastname}`}</span>
//                             <span className="smallWidgetUserTitle">{user.medicaluserEmail}</span>
//                         </div>
//                         <div className="smallWidgetButtonGroup">
//                             <button className="smallWidgetButton" onClick={() => openModal(user)}>
//                                 <Visibility className="smallWidgetIcon" />
//                                 Display
//                             </button>
//                             <button
//                                 className="smallWidgetButton selectButton"
//                                 onClick={() => handleSelectClick(user)}
//                             >
//                                 <Check className="smallWidgetIcon" />
//                                 Select
//                             </button>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//
//             {currentUser && (
//                 <Modal
//                     isOpen={modalIsOpen}
//                     onRequestClose={closeModal}
//                     contentLabel="User Information"
//                     className="infoModal"
//                     overlayClassName="infoModalOverlay"
//                 >
//                     <div className="modalDetails">
//                         <img className="modalProfileImg" src={user_default} alt="" />
//                         <h2 className="modalProfileName">{`${currentUser.medicaluserFirstname} ${currentUser.medicaluserLastname}`}</h2>
//                         <p>Email: {currentUser.medicaluserEmail}</p>
//                         <p>Phone: {currentUser.medicaluserPhoneno}</p>
//                         <p>Address: {currentUser.medicaluserAddress}</p>
//                         <p>Role: {currentUser.role}</p>
//                         <p>In Treatment: {currentUser.medicaluserIntreatment}</p>
//                         <button onClick={closeModal} className="closeInfoModalButton">Close</button>
//                     </div>
//                 </Modal>
//             )}
//         </div>
//     );
// }
//
// export default GetAllUsersForPrescription;


import React, { useEffect, useState } from 'react';
import user_default from "../../../../Assets/user_default.png";
import { Visibility, Check, Search } from "@mui/icons-material";
import Modal from "react-modal";
import { retriveAllMedicalUsers } from "../../../../Components/api/AyurcareApiService";
import "./gAUP.css";

Modal.setAppElement('#root');

function GetAllUsersForPrescription({ setSelectedUser }) {
    const token = localStorage.getItem('token');
    const [detailedUsers, setUsers] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        retrieveFiveMedicalUsers();
    }, []);

    const retrieveFiveMedicalUsers = async () => {
        try {
            const response = await retriveAllMedicalUsers(token);
            const roleUsers = response.data.filter(user => user.role === 'USER');
            setUsers(roleUsers);
            setFilteredUsers(roleUsers);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const filtered = detailedUsers.filter(user =>
            `${user.medicaluserFirstname} ${user.medicaluserLastname}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchTerm, detailedUsers]);

    const handleSelectClick = (user) => {
        setSelectedUser(user);
    };

    const openModal = (user) => {
        setCurrentUser(user);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setCurrentUser(null);
    };

    return (
        <div className="smallWidget">
            <span className="smallWidgetTitle">All Patients</span>

            <div className="searchBarContainer">
                <Search className="searchIcon" />
                <input
                    type="text"
                    className="searchBar"
                    placeholder="Search patient..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <ul className="smallWidgetList">
                {filteredUsers.slice(0, 5).map(user => (
                    <li className="smallWidgetListItem" key={user.medicaluserId}>
                        <img className="smallWidgetImg" src={user_default} alt="" />
                        <div className="smallWidgetUser">
                            <span className="smallWidgetUsername">{`${user.medicaluserFirstname} ${user.medicaluserLastname}`}</span>
                            <span className="smallWidgetUserTitle">{user.medicaluserEmail}</span>
                        </div>
                        <div className="smallWidgetButtonGroup">
                            <button className="smallWidgetButton" onClick={() => openModal(user)}>
                                <Visibility className="smallWidgetIcon" />
                                Display
                            </button>
                            <button
                                className="smallWidgetButton selectButton"
                                onClick={() => handleSelectClick(user)}
                            >
                                <Check className="smallWidgetIcon" />
                                Select
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {currentUser && (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="User Information"
                    className="infoModal"
                    overlayClassName="infoModalOverlay"
                >
                    <div className="modalDetails">
                        <img className="modalProfileImg" src={user_default} alt="" />
                        <h2 className="modalProfileName">{`${currentUser.medicaluserFirstname} ${currentUser.medicaluserLastname}`}</h2>
                        <p>Email: {currentUser.medicaluserEmail}</p>
                        <p>Phone: {currentUser.medicaluserPhoneno}</p>
                        <p>Address: {currentUser.medicaluserAddress}</p>
                        <p>Role: {currentUser.role}</p>
                        <p>In Treatment: {currentUser.medicaluserIntreatment}</p>
                        <button onClick={closeModal} className="closeInfoModalButton">Close</button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default GetAllUsersForPrescription;
