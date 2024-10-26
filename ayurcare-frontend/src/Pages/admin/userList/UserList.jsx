import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { deleteMedicalUserDetails, retriveAllMedicalUsers } from "../../../Components/api/AyurcareApiService";
import {toast, ToastContainer} from "react-toastify";
import Modal from 'react-modal';
import "./modal.css";
import "../../../Styles/customToast.css";
import user_default from "../../../Assets/user_default.png"

export default function UserList() {
  const [data, setData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null); // Track the user ID to delete
  const [selectedUserRole, setSelectedUserRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem('token');

  // Configure toast notifications
  const handleSuccessToast = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      className: "custom-toast-success",
      autoClose: 5000,
    });
  };

  Modal.setAppElement('#root');

  // Retrieve medical users on component mount
  useEffect(() => {
    retrieveMedicalUsers();
  }, []);

  // Function to fetch medical users
  function retrieveMedicalUsers() {
    retriveAllMedicalUsers(token)
        .then(response => {
          setData(response.data);
          console.log(response.data)
        })
        .catch(error => {
          console.error("There was an error fetching the users!", error);
        });
  }

  // Open modal with user ID to delete
  const openModal = (id, role) => {
    setSelectedUserId(id);
    setSelectedUserRole(role);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
    setSelectedUserRole(null);
  };

  const handleDelete = async () => {
    // Check if the selected user is an ADMIN
    if (selectedUserRole === "ADMIN") {
      toast.error("You can't delete an admin user", {
              position: toast.POSITION.TOP_CENTER,
              className: "custom-toast-error",
              autoClose: 5000,
            });
      closeModal(); // Close the modal without performing the delete
      return;
    }

    try {
      await deleteMedicalUserDetails(selectedUserId, token);
      setData(data.filter((item) => item.medicaluserId !== selectedUserId));
      handleSuccessToast("User Successfully Deleted");
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete user", {
              position: toast.POSITION.TOP_CENTER,
              className: "custom-toast-error",
              autoClose: 5000,
            });
    } finally {
      closeModal();
    }
  };

  const columns = [
    { field: "medicaluserId", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => (
          <div className="userListUser">
            <img className="userListImg" src={params.row.medicaluserPhoto || user_default} alt="" />
            {params.row.medicaluserFirstname} {params.row.medicaluserLastname}
          </div>
      ),
    },
    { field: "medicaluserEmail", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 120 },
    { field: "medicaluserPhoneno", headerName: "Phone Number", width: 160 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
          <>
            <Link to={"/admin/user/" + params.row.medicaluserEmail}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
                className="userListDelete"
                onClick={() => openModal(params.row.medicaluserId, params.row.role)}
            />
          </>
      ),
    },
  ];

  return (
      <div className="userList">
        <DataGrid
            rows={data}
            getRowId={(row) => row.medicaluserId}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
        />
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Confirm Delete"
            className="user_list_modal"
            overlayClassName="modal-overlay"
        >
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete this user?</p>
          <button onClick={handleDelete} className="user_list_modal-button_confirm">Yes, Delete</button>
          <button onClick={closeModal} className="user_list_modal-button_cansel">Cancel</button>
        </Modal>
        <ToastContainer />
      </div>
  );
}
