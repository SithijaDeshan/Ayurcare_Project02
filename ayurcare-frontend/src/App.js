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
import DoctorSidebar from "./Pages/Doctor/sidebar/DoctorSidebar";
import User from "./Pages/admin/user/User"
import UserList from "./Pages/admin/userList/UserList"
import NewUser from "./Pages/admin/newUser/NewUser"
import PredictionComponent from "./Components/PredictionComponent"
import Bookings from "./Pages/Doctor/home/Bookings";
import VideoCAll from "./Pages/Doctor/VideoCall/VideoCall";
import Prescription from "./Pages/Doctor/Prescription/Prescription";
import Categories from "./Pages/admin/catogories and Channeling fees/Categories";
import {ContactUs} from "./Components/ProfileCards/ContactUs";
import AboutUs from "./Pages/About/About"
import {ReachUs} from "./Components/ProfileCards/ReachUs";
import PrivateRoute from "./Components/PrivateRoute"
import Layout from "./Components/shared/Layout"
import Dashboard from "./Pages/Inventory/Dashboard"
import NewProduct from "./Pages/Inventory/NewProduct"
import Products from "./Pages/Inventory/Products";
import Video_call from "./Pages/VideoCall/Video_call"



function App() {

    const [userState, setUserState] = useState(null);

    return (
        <div className="App">
            <Router>
                <Routes>
                    {/* Main routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/aboutus" element={<AboutUs/>} />
                    <Route path="/reachus" element={<ReachUs/>} />
                    <Route path="/image" element={<ImageUpload />} />
                    <Route path="/legal" element={<Legal />} />
                    <Route path="/login" element={<Login setUserState={setUserState} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/doctors" element={<Doctors />} />
                    <Route path="/treatments" element={<Treatments />} />
                    <Route path="/prediction" element={<PredictionComponent />} />
                    <Route path="/appointment" element={<Appointment />} />
                    <Route path="/medicalUserUpdate/:medicaluserEmail" element={<MedicalUserDetailsUpdate />} />
                    <Route path="/videocall" element={<Video_call />} />
                    <Route path="*" element={<NotFound />} />

                    <Route
                        path="/admin/*"
                        element={
                            <PrivateRoute allowedRoles={["ADMIN"]}>
                                <AdminLayout />
                            </PrivateRoute>
                        }
                    />


                    <Route
                        path="/doctor/*"
                        element={
                            <PrivateRoute allowedRoles={["DOCTOR"]}>
                                <DoctorLayout />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/inventory/*"
                        element={
                            <PrivateRoute allowedRoles={["OPERATOR"]}>
                                <StaffLayout/>
                            </PrivateRoute>
                        }
                    />


                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute allowedRoles={["USER"]}>
                                <Profile />
                            </PrivateRoute>
                        }
                    />


                    <Route path="*" element={<NotFound />} />

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
                    <Route path="user/:medicaluserEmail" element={<User />} />
                    <Route path="newuser" element={<NewUser />} />
                    <Route path="categories" element={<Categories />} />

                </Routes>
            </div>
        </div>
    );
}

function DoctorLayout() {
    return (
        <div className="admin-layout">
            <Topbar />
            <div className="container">
                <DoctorSidebar />
                <Routes>
                    <Route path="/" element={<Bookings />} />
                    <Route path="/videocall" element={<VideoCAll />} />
                    <Route path="/prescription" element={<Prescription />} />
                </Routes>
            </div>
        </div>
    );
}

function StaffLayout() {
    return (
        <div >
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="products" element={<Products />} />  {/* No leading slash */}
                    <Route path="newproduct" element={<NewProduct />} />  {/* No leading slash */}
                </Route>
            </Routes>
        </div>
    );
}




export default App;