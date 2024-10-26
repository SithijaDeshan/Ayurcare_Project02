import React, { useState } from "react";
import basestyle from "../../Styles/Base.module.css";
import registerstyle from "../../Styles/Register.module.css";
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../../Assets/logo.png";
import home1 from "../../Assets/home1.png";
import { register } from "../api/AyurcareApiService"; 

const Register = () => {
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
  });

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
        });
        alert('User registered successfully');
        navigate('/login');
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
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!values.medicaluserFirstname) {
      errors.medicaluserFirstname = "First Name is required";
    }
    if (!values.medicaluserLastname) {
      errors.medicaluserLastname = "Last Name is required";
    }
    if (!values.medicaluserPhoneno) {
      errors.medicaluserPhoneno = "Phone Number is required";
    } else if (!phoneRegex.test(values.medicaluserPhoneno)) {
      errors.medicaluserPhoneno = "Phone Number must be a valid 10-digit number";
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
    } else if (!passwordRegex.test(values.medicalUserPassword)) {
      errors.medicalUserPassword =
          "Password must be 8-12 characters long, include at least one uppercase letter, one number, and one special character (@, $, !, %, *, etc.)";
    }
    if (!values.cpassword) {
      errors.cpassword = "Confirm Password is required";
    } else if (values.cpassword !== values.medicalUserPassword) {
      errors.cpassword = "Confirm password and password should match";
    }
    return errors;
  };

  return (
    <div className={registerstyle.registercontainer} style={{ backgroundImage: `url(${home1})` }}>
      <div className={registerstyle.register}>
        <div className="nav-logo">
          <img src={logo} alt="Logo" />
        </div>
        <form onSubmit={signupHandler}>
          <input
            type="text"
            name="medicaluserFirstname"
            placeholder="First Name"
            onChange={changeHandler}
            value={user.medicaluserFirstname}
          />
          <p className={basestyle.error}>{formErrors.medicaluserFirstname}</p>
          <input
            type="text"
            name="medicaluserLastname"
            placeholder="Last Name"
            onChange={changeHandler}
            value={user.medicaluserLastname}
          />
          <p className={basestyle.error}>{formErrors.medicaluserLastname}</p>
          <input
            type="text"
            name="medicaluserPhoneno"
            placeholder="TelePhone"
            onChange={changeHandler}
            value={user.medicaluserPhoneno}
          />
          <p className={basestyle.error}>{formErrors.medicaluserPhoneno}</p>
          <input
            type="email"
            name="medicaluserEmail"
            placeholder="Email"
            onChange={changeHandler}
            value={user.medicaluserEmail}
          />
          <p className={basestyle.error}>{formErrors.medicaluserEmail}</p>
          <input
            type="text"
            name="medicaluserAddress"
            placeholder="Address"
            onChange={changeHandler}
            value={user.medicaluserAddress}
          />
          <p className={basestyle.error}>{formErrors.medicaluserAddress}</p>
          <input
            type="password"
            name="medicalUserPassword"
            placeholder="Password"
            onChange={changeHandler}
            value={user.medicalUserPassword}
          />
          <p className={basestyle.error}>{formErrors.medicalUserPassword}</p>
          <input
            type="password"
            name="cpassword"
            placeholder="Confirm Password"
            onChange={changeHandler}
            value={user.cpassword}
          />
          <p className={basestyle.error}>{formErrors.cpassword}</p>
          <button className={basestyle.button_common} type="submit">
            Register
          </button>
        </form>
        <NavLink to="/login" style={{ textDecoration: 'none', color: '#000', fontFamily: 'Poppins' }}>
          Already registered? <span className="lr-link" style={{ color: '#123410', fontWeight: '700' }}>Login</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Register;

