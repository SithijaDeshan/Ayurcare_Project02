import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { retriveAllMedicalUsers } from "../../../Components/api/AyurcareApiService";

export default function UserList() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    retrieveMedicalUsers();
  }, []);

  function retrieveMedicalUsers() {
    retriveAllMedicalUsers(token)
      .then(response => {
        console.log(response);
        setData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the users!", error);
      });
  }

  const handleDelete = (id) => {
    setData(data.filter((item) => item.medicaluserId !== id));
  };

  const columns = [
    { field: "medicaluserId", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.medicaluserPhoto || "default-avatar.png"} alt="" />
            {params.row.medicaluserFirstname} {params.row.medicaluserLastname}
          </div>
        );
      },
    },
    { field: "medicaluserEmail", headerName: "Email", width: 200 },
    {
      field: "role", headerName: "Role", width: 120,
    },
    {
      field: "medicaluserPhoneno", headerName: "Phone Number", width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/user/" + params.row.medicaluserId}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.medicaluserId)}
            />
          </>
        );
      },
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
    </div>
  );
}
