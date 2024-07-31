import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../Styles/MedicalUserDetailsUpdate.css"
import { ToastContainer, toast } from "react-toastify";
import logo from "../Assets/logo.png";
import { retriveMedicalUserDetails, updateMedicalUserDetails } from "../Components/api/AyurcareApiService";
import { Field, Form, Formik, ErrorMessage } from "formik";

export default function MedicalUserDetailsUpdate() {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const [medicalUser, setMedicalUser] = useState({});
  const [medicalUserId, setMedicalUserId] = useState("");
  const [medicaluserRole, setMedicaluserRole] = useState("");
  const [medicaluserIntreatment, setMedicaluserIntreatment] = useState("");
  const { medicaluserEmail } = useParams();
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    RetrieveMedicaluser(medicaluserEmail);
  }, [medicaluserEmail]);

  function RetrieveMedicaluser(medicaluserEmail) {
    retriveMedicalUserDetails(medicaluserEmail,token)
      .then((response) => {
        setMedicalUser(response.data);
        setMedicalUserId(response.data.medicaluserId)
        setMedicaluserRole(response.data.medicaluserRole)
        setMedicaluserIntreatment(response.data.medicaluserIntreatment)
      })
      .catch((error) => console.log(error));
  }

  function onSubmit(values) {
    console.log(values);
    const medicaluserDetails = {
      medicaluserId: medicalUserId,
      medicaluserFirstname: values.firstname,
      medicaluserLastname: values.lastname,
      medicaluserEmail: values.email,
      medicaluserPhoneno: values.contactnumber,
      medicaluserPhoto: null,
      medicaluserAddress: values.address,
      medicaluserRole: medicaluserRole,
      medicaluserIntreatment: medicaluserIntreatment
      }

      updateMedicalUserDetails(medicalUserId, medicaluserDetails)
        .then(response =>{
          navigate('/profile')
        })
        .catch(error => console.log(error))
  }

  function validate(values) {
    let errors = {};
  
    // Validate first name
    if (!values.firstname.trim()) {
      errors.firstname = "First name is required";
    } else if (values.firstname.trim().length < 2) {
      errors.firstname = "First name must be at least 2 characters";
    }
  
    // Validate last name
    if (!values.lastname.trim()) {
      errors.lastname = "Last name is required";
    } else if (values.lastname.trim().length < 2) {
      errors.lastname = "Last name must be at least 2 characters";
    }
  
    // Validate email
    if (!values.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }
  
    // Validate address
    if (!values.address.trim()) {
      errors.address = "Address is required";
    } else if (values.address.trim().length < 5) {
      errors.address = "Address must be at least 5 characters";
    }
  
    // Validate contact number
    if (!values.contactnumber.trim()) {
      errors.contactnumber = "Contact number is required";
    } else if (!/^\d{10}$/.test(values.contactnumber.trim())) {
      errors.contactnumber = "Contact number must be 10 digits";
    }
  
    return errors;
  }

  return (
    <div className="appointment-form-section">
      <div className="nav">
        <Link to="/">
          <div className="nav-logo">
            <img src={logo} alt="Logo" />
          </div>
        </Link>
      </div>

      <div className="form-container">
        <h2 className="form-title">
          <span>Please Update Your Details</span>
        </h2>

        <div className="appointment-form-wrapper">

      
      <Formik
        initialValues={{
          firstname: medicalUser.medicaluserFirstname || "",
          lastname: medicalUser.medicaluserLastname || "",
          email: medicalUser.medicaluserEmail || "",
          address: medicalUser.medicaluserAddress || "",
          contactnumber: medicalUser.medicaluserPhoneno || "",
        }}
        enableReinitialize={true}
        onSubmit={onSubmit}
        validate={validate}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {(props) => (
          <div className="form-content">
            <Form>
              <ErrorMessage
                name="firstname"
                component="div"
                className="alert alert-warning error-message"
              />

              <ErrorMessage
                name="lastname"
                component="div"
                className="alert alert-warning error-message"
              />

              <ErrorMessage
                name="email"
                component="div"
                className="alert alert-warning error-message"
              />

              <ErrorMessage
                name="address"
                component="div"
                className="alert alert-warning error-message"
              />

              <ErrorMessage
                name="contactnumber"
                component="div"
                className="alert alert-warning error-message"
              />

              <fieldset className="form-group">
                <label>First Name :</label>
                <Field type="text" className="form-control" name="firstname" />
              </fieldset>

              <fieldset className="form-group">
                <label>Last Name :</label>
                <Field type="text" className="form-control" name="lastname" />
              </fieldset>

              <fieldset className="form-group">
                <label>Email :</label>
                <Field type="text" className="form-control" name="email" />
              </fieldset>

              <fieldset className="form-group">
                <label>Address :</label>
                <Field type="text" className="form-control" name="address" />
              </fieldset>

              <fieldset className="form-group">
                <label>Contact Number :</label>
                <Field
                  type="text"
                  className="form-control"
                  name="contactnumber"
                />
              </fieldset>

              <div className="button-container">
              <Link to="/profile">
              <button type="button" className="text-appointment-btn back-button">
                Back
              </button>
            </Link>
                <button className="text-appointment-btn" type="submit">
                  Save
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
      </div>
      </div>

      

      
      <div className="legal-footer">
        <p>© 2013-2024 AyurCare. All rights reserved.</p>
      </div>

      <ToastContainer autoClose={5000} limit={1} closeButton={false} />
    </div>
  );
}
