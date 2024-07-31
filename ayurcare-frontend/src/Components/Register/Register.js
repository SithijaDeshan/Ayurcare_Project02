// import React, { useEffect, useState } from "react";
// import basestyle from "../../Styles/Base.module.css";
// import registerstyle from "../../Styles/Register.module.css";
// import axios from "axios";

// import { useNavigate, NavLink } from "react-router-dom";
// import logo from "../../Assets/logo.png";
// import home1 from "../../Assets/home1.png";
// import { register } from "../api/AyurcareApiService"; 



// const Register = () => {
//   const navigate = useNavigate();

//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmit, setIsSubmit] = useState(false);
//   const [user, setUserDetails] = useState({
//     fname: "",
//     lname: "",
//     phone: "",
//     email: "",
//     address: "",
//     password: "",
//     cpassword: "",
//   });


//   const signupHandler = async (e) => {
//     e.preventDefault();
//     setFormErrors(validateForm(user));
//     setIsSubmit(true);
//     try {
//         // Call the register method from UserService

//         const token = localStorage.getItem('token');
//         await register(user, token);

//         // Clear the form fields after successful registration
//         setUserDetails({
//           fname: "",
//           lname: "",
//           phone: "",
//           email: "",
//           address: "",
//           password: "",
//           cpassword: "",
//         });
//         alert('User registered successfully');
//         navigate('/login');

//     } catch (error) {
//         console.error('Error registering user:', error);
//         alert('An error occurred while registering user');
//     }
// };

//   const changeHandler = (e) => {
//     const { name, value } = e.target;
//     setUserDetails({
//       ...user,
//       [name]: value,
//     });
//   };

//   const validateForm = (values) => {
//     const error = {};
//     const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
//     if (!values.fname) {
//       error.fname = "First Name is required";
//     }
//     if (!values.lname) {
//       error.lname = "Last Name is required";
//     }
//     if (!values.email) {
//       error.email = "Email is required";
//     } else if (!regex.test(values.email)) {
//       error.email = "This is not a valid email format!";
//     }
//     if (!values.address) {
//       error.address = "Address is required";
//     }
//     if (!values.password) {
//       error.password = "Password is required";
//     } else if (values.password.length < 4) {
//       error.password = "Password must be more than 4 characters";
//     } else if (values.password.length > 10) {
//       error.password = "Password cannot exceed more than 10 characters";
//     }
//     if (!values.cpassword) {
//       error.cpassword = "Confirm Password is required";
//     } else if (values.cpassword !== values.password) {
//       error.cpassword = "Confirm password and password should be same";
//     }
//     return error;
//   };

//   // const signupHandler = (e) => {
//   //   e.preventDefault();
//   //   setFormErrors(validateForm(user));
//   //   setIsSubmit(true);
//   //   // if (!formErrors) {
//   //   //   setIsSubmit(true);
//   //   // }
//   // };

//   useEffect(() => {
//     if (Object.keys(formErrors).length === 0 && isSubmit) {
//       console.log(user);
//       axios.post("http://localhost:9002/signup/", user).then((res) => {
//         alert(res.data.message);
//         navigate("/login", { replace: true });
//       });
//     }
//   }, [formErrors]);



//   return (
//     <>
//       <div className={registerstyle.registercontainer} style={{ backgroundImage: `url(${home1})` }}>
//       <div className={registerstyle.register} >
//         <div className="nav-logo">
//           <img src={logo} alt="Logo" />
//         </div>

//         <form>



//           <input
//             type="text"
//             name="fname"
//             id="fname"
//             placeholder="First Name"
//             onChange={changeHandler}
//             value={user.fname}
//           />
//           <p className={basestyle.error}>{formErrors.fname}</p>
//           <input
//             type="text"
//             name="lname"
//             id="lname"
//             placeholder="Last Name"
//             onChange={changeHandler}
//             value={user.lname}
//           />
//           <p className={basestyle.error}>{formErrors.lname}</p>
//           <input
//               type="text"
//               name="phone"
//               id="phone"
//               placeholder="TelePhone"
//               onChange={changeHandler}
//               value={user.phone}
//           />
//           <p className={basestyle.error}>{formErrors.phone}</p>
//           <input
//             type="email"
//             name="email"
//             id="email"
//             placeholder="Email"
//             onChange={changeHandler}
//             value={user.email}
//           />
//           <p className={basestyle.error}>{formErrors.email}</p>
//           <input
//             type="text"
//             name="address"
//             id="address"
//             placeholder="Address"
//             onChange={changeHandler}
//             value={user.address}
//           />
//           <p className={basestyle.error}>{formErrors.address}</p>
//           <input
//             type="password"
//             name="password"
//             id="password"
//             placeholder="Password"
//             onChange={changeHandler}
//             value={user.password}
//           />
//           <p className={basestyle.error}>{formErrors.password}</p>
//           <input
//             type="password"
//             name="cpassword"
//             id="cpassword"
//             placeholder="Confirm Password"
//             onChange={changeHandler}
//             value={user.cpassword}
//           />
//           <p className={basestyle.error}>{formErrors.cpassword}</p>
//           <button className={basestyle.button_common} onClick={signupHandler}>
//             Register
//           </button>
//         </form>
//         <NavLink to="/login" style={{ textDecoration: 'none', color: '#000', fontFamily: 'Poppins'}}>
//           Already registered? <span className="lr-link" style={{color: '#123410', fontWeight: '700' }}> Login</span>
//         </NavLink>

//       </div>
//       </div>
//     </>
//   );
// };
// export default Register;

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
    if (!values.cpassword) {
      errors.cpassword = "Confirm Password is required";
    } else if (values.cpassword !== values.medicalUserPassword) {
      errors.cpassword = "Confirm password and password should be the same";
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

