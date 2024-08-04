import "./newUser.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { register } from "../../../Components/api/AyurcareApiService";
import basestyle from "../../../Styles/Base.module.css";
import { toast, ToastContainer } from 'react-toastify';

export default function NewUser() {
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    medicaluserFirstname: "",
    medicaluserLastname: "",
    medicaluserPhoneno: "",
    medicaluserEmail: "",
    medicaluserAddress: "",
    medicalUserPassword: "",
    cpassword: "",
    gender: "",
    role: "USER", // Default value for role
  });

  const handleSuccessToast = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      className: "custom-toast-success",
      autoClose: 5000 // Set the duration for the toast, e.g., 5000 ms (5 seconds)
    });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    const errors = validateForm(user);
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
      try {
        await register(user);
        // Clear the form fields after successful registration
        setUserDetails({
          medicaluserFirstname: "",
          medicaluserLastname: "",
          medicaluserPhoneno: "",
          medicaluserEmail: "",
          medicaluserAddress: "",
          medicalUserPassword: "",
          cpassword: "",
          gender: "",
          role: "USER",
        });
        // alert('User registered successfully');
        handleSuccessToast("User registered successfully");
      } catch (error) {
        console.error('Error registering user:', error);
        alert('An error occurred while registering user');
      }
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const validateForm = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.medicaluserFirstname) {
      errors.medicaluserFirstname = "First Name is required";
    }
    if (!values.medicaluserLastname) {
      errors.medicaluserLastname = "Last Name is required";
    }
    if (!values.medicaluserEmail) {
      errors.medicaluserEmail = "Email is required";
    } else if (!regex.test(values.medicaluserEmail)) {
      errors.medicaluserEmail = "This is not a valid email format!";
    }
    if (!values.medicaluserAddress) {
      errors.medicaluserAddress = "Address is required";
    }
    if (!values.medicalUserPassword) {
      errors.medicalUserPassword = "Password is required";
    } else if (values.medicalUserPassword.length < 4) {
      errors.medicalUserPassword = "Password must be more than 4 characters";
    } else if (values.medicalUserPassword.length > 10) {
      errors.medicalUserPassword = "Password cannot exceed more than 10 characters";
    }
    if (values.medicalUserPassword !== values.cpassword) {
      errors.cpassword = "Passwords do not match";
    }
    if (!values.cpassword) {
      errors.cpassword = "Password confirmation is required";
    }
    if (!values.medicaluserPhoneno) {
      errors.medicaluserPhoneno = "Phone number is required";
    }
    if (!values.gender) {
      errors.gender = "Gender is required";
    }
    return errors;
  };

  return (
      <div className="newUser">
        <h1 className="newUserTitle">New User</h1>

        <form className="newUserForm" onSubmit={signupHandler}>

          <div className="newUserItem">
            <label>First Name</label>
            <input
                type="text"
                name="medicaluserFirstname"
                placeholder="john"
                onChange={changeHandler}
                value={user.medicaluserFirstname}
            />
            <p className={basestyle.error}>{formErrors.medicaluserFirstname}</p>
          </div>

          <div className="newUserItem">
            <label>Last Name</label>
            <input
                type="text"
                name="medicaluserLastname"
                placeholder="John Smith"
                onChange={changeHandler}
                value={user.medicaluserLastname}
            />
            <p className={basestyle.error}>{formErrors.medicaluserLastname}</p>
          </div>

          <div className="newUserItem">
            <label>Email</label>
            <input
                type="email"
                name="medicaluserEmail"
                placeholder="john@gmail.com"
                onChange={changeHandler}
                value={user.medicaluserEmail}
            />
            <p className={basestyle.error}>{formErrors.medicaluserEmail}</p>
          </div>

          <div className="newUserItem">
            <label>Password</label>
            <input
                type="password"
                name="medicalUserPassword"
                placeholder="password"
                onChange={changeHandler}
                value={user.medicalUserPassword}
            />
            <p className={basestyle.error}>{formErrors.medicalUserPassword}</p>
          </div>

          <div className="newUserItem">
            <label>Confirm Password</label>
            <input
                type="password"
                name="cpassword"
                placeholder="confirm password"
                onChange={changeHandler}
                value={user.cpassword}
            />
            <p className={basestyle.error}>{formErrors.cpassword}</p>
          </div>

          <div className="newUserItem">
            <label>Phone</label>
            <input
                type="text"
                name="medicaluserPhoneno"
                placeholder="+1 123 456 78"
                onChange={changeHandler}
                value={user.medicaluserPhoneno}
            />
            <p className={basestyle.error}>{formErrors.medicaluserPhoneno}</p>
          </div>

          <div className="newUserItem">
            <label>Address</label>
            <input
                type="text"
                name="medicaluserAddress"
                placeholder="New York | USA"
                onChange={changeHandler}
                value={user.medicaluserAddress}
            />
            <p className={basestyle.error}>{formErrors.medicaluserAddress}</p>
          </div>

          <div className="newUserItem">
            <label>Gender</label>
            <div className="newUserGender">
              <input
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  onChange={changeHandler}
                  checked={user.gender === 'male'}
              />
              <label htmlFor="male">Male</label>
              <input
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  onChange={changeHandler}
                  checked={user.gender === 'female'}
              />
              <label htmlFor="female">Female</label>
              <input
                  type="radio"
                  name="gender"
                  id="other"
                  value="other"
                  onChange={changeHandler}
                  checked={user.gender === 'other'}
              />
              <label htmlFor="other">Other</label>
            </div>
            <p className={basestyle.error}>{formErrors.gender}</p>
          </div>

          <div className="newUserItem">
            <label>Role</label>
            <select
                className="newUserSelect"
                name="role"
                id="role"
                onChange={changeHandler}
                value={user.role}
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          <button className="newUserButton">Create</button>
        </form>
        <ToastContainer />
      </div>
  );
}
