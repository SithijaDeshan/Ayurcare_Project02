import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@mui/icons-material";
import logo from '../../../Assets/logo.png'
import {logout} from "../../api/AyurcareApiService";
import { useNavigate} from "react-router-dom";

export default function Topbar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        localStorage.removeItem('username');
        localStorage.removeItem('patientId');
        localStorage.removeItem('userid');
        localStorage.removeItem('role')
        navigate('/login');
    };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo"><img src={logo} alt="logo"/></span>
        </div>
          <div className="topRight">
              <button className="logoutButton" onClick={handleLogout}>Logout</button>
          </div>
      </div>
    </div>
  );
}
