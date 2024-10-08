import "./widgetSm.css";
import { Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { retriveFiveMedicalUsers } from "../../api/AyurcareApiService";
import user_default from "../../../Assets/user_default.png";
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Ensure accessibility by setting the root element

export default function WidgetSm() {
    const token = localStorage.getItem('token');
    const [lastFiveUsers, setLastFiveUsers] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const retrieveFiveMedicalUsers = async () => {
        try {
            const response = await retriveFiveMedicalUsers(token);
            setLastFiveUsers(response.data); // Assuming response.data contains the array of users
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        retrieveFiveMedicalUsers();
    }, []);

    const openModal = (user) => {
        setSelectedUser(user);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
                {lastFiveUsers && lastFiveUsers.map(user => (
                    <li className="widgetSmListItem" key={user.medicaluserId}>
                        <img className="widgetSmImg" src={user_default} alt="" />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">{`${user.medicaluserFirstname} ${user.medicaluserLastname}`}</span>
                            <span className="widgetSmUserTitle">{user.medicaluserEmail}</span>
                        </div>
                        <button className="widgetSmButton" onClick={() => openModal(user)}>
                            <Visibility className="widgetSmIcon" />
                            Display
                        </button>
                    </li>
                ))}
            </ul>
            {selectedUser && (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="User Information"
                    className="userModal"
                    overlayClassName="userModalOverlay"
                >
                    <div className="modalContent">
                        <img className="modalImg" src={user_default} alt="" />
                        <h2 className="modalUsername">{`${selectedUser.medicaluserFirstname} ${selectedUser.medicaluserLastname}`}</h2>
                        <p>Email: {selectedUser.medicaluserEmail}</p>
                        <p>Phone: {selectedUser.medicaluserPhoneno}</p>
                        <p>Address: {selectedUser.medicaluserAddress}</p>
                        <p>Role: {selectedUser.role}</p>
                        <p>In Treatment: {selectedUser.medicaluserIntreatment}</p>
                        <button onClick={closeModal} className="closeModalButton">Close</button>
                    </div>
                </Modal>
            )}
        </div>
    );
}
