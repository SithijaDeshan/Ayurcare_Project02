import React, {useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Legal from "./Pages/Legal";
import NotFound from "./Pages/NotFound";
import Appointment from "./Pages/Appointment";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Profile from "./Components/Profile";
import Doctors from "./Components/Doctors";
import Treatments from "./Components/Info";
import ImageUpload from "./Pages/ImageUpload";
import MedicalUserDetailsUpdate from "./Components/MedicalUserDetailsUpdate";
import AdminHome from "./Pages/admin/home/AdminHome";
import Topbar from "./Components/admin/topbar/Topbar";
import Sidebar from "./Components/admin/sidebar/Sidebar";
import User from "./Pages/admin/user/User"
import UserList from "./Pages/admin/userList/UserList"
import NewUser from "./Pages/admin/newUser/NewUser"
import PredictionComponent from "./Components/PredictionComponent"

function App() {

  const [userState, setUserState] = useState(null);

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Main routes */}
          <Route path="/" element={<Home />} />
          <Route path="/image" element={<ImageUpload />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/login" element={<Login setUserState={setUserState} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/treatments" element={<Treatments />} />
          <Route path="/prediction" element={<PredictionComponent />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/medicalUserUpdate/:medicaluserEmail" element={<MedicalUserDetailsUpdate />} />
          <Route path="*" element={<NotFound />} />

          {/* Admin routes */}
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </Router>
    </div>
  );
}

function AdminLayout() {
  return (
    <div className="admin-layout">
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="users" element={<UserList />} />
          <Route path="user/:userId" element={<User />} />
          <Route path="newuser" element={<NewUser />} />
          
        </Routes>
      </div>
    </div>
  );
}

export default App;
