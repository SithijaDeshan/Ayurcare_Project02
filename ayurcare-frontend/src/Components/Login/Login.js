import React, { useState } from "react";
import basestyle from "../../Styles/Base.module.css";
import loginstyle from "../../Styles/Login.module.css";
import { useNavigate, NavLink } from "react-router-dom";
import logo from '../../Assets/logo.png';
import SlideComponent from "../Slider";
import { login } from "../api/AyurcareApiService";

const Login = ({ setUserState }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState("");
  const [user, setUserDetails] = useState({
    medicaluserEmail: "",
    medicalUserPassword: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const validateForm = (values) => {
    const errors = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.medicaluserEmail) {
      errors.medicaluserEmail = "Email is required";
    } else if (!regex.test(values.medicaluserEmail)) {
      errors.medicaluserEmail = "Please enter a valid email address";
    }
    if (!values.medicalUserPassword) {
      errors.medicalUserPassword = "Password is required";
    }
    return errors;
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const errors = validateForm(user);
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
      try {
        const userData = await login(user.medicaluserEmail, user.medicalUserPassword);

        console.log(userData);
        if (userData.token) {
          localStorage.setItem('token', userData.token);
          localStorage.setItem('username', user.medicaluserEmail);
          setUserState(userData.user);
          navigate('/');
        } else {
          setError(userData.message);
        }
      } catch (error) {
        console.log(error);
        setError(error.message);
        setTimeout(() => {
          setError('');
        }, 5000);
      }
    }
  };

  return (
    <div className={loginstyle.logincontainer}>
      <div style={{ position: 'absolute', width: '100%' }}><SlideComponent /></div>
      <div className={loginstyle.login}>
        <NavLink to="/">
          <div className="nav-logo">
            <img src={logo} alt="Logo" />
          </div>
        </NavLink>
        <form>
          <input
            type="email"
            name="medicaluserEmail"
            id="medicaluserEmail"
            placeholder="Email"
            onChange={changeHandler}
            value={user.medicaluserEmail}
          />
          <p className={basestyle.error}>{formErrors.medicaluserEmail}</p>
          <input
            type="password"
            name="medicalUserPassword"
            id="medicalUserPassword"
            placeholder="Password"
            onChange={changeHandler}
            value={user.medicalUserPassword}
          />
          <p className={basestyle.error}>{formErrors.medicalUserPassword}</p>
          <button className={basestyle.button_common} onClick={loginHandler}>
            Login
          </button>
        </form>
        {error && <p className={basestyle.error}>{error}</p>}
        <NavLink to="/register" style={{ textDecoration: 'none', color: '#000', fontFamily: 'Poppins' }}>
          Don't you have an account? <span className="lr-link" style={{ color: '#123410', fontWeight: '700' }}>Register Now</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Login;

