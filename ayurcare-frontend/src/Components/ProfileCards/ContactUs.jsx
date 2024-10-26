import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './contactUs.css'; // Import the CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import location from "./images/location.png";
import emailpic from "./images/email.png";
import phonepic from "./images/phone.png";
import shapepic from "./images/shape.png";
import { useNavigate } from 'react-router-dom';
import { retriveMedicalUserDetails } from "./../api/AyurcareApiService";
import { toast, ToastContainer } from 'react-toastify';
import "./../../Styles/customToast.css"
import Navbar from "./../Navbar"
import Footer from "./../Footer"

export const ContactUs = () => {
    const form = useRef();
    const [messageFormat, setMessageFormat] = useState('');
    const [fromName, setFromName] = useState('');
    const [fromEmail, setFromEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [clicked, setClicked] = useState(false);
    const [clicked1, setClicked1] = useState(false); // New state to track click
    const [clicked2, setClicked2] = useState(false);
    const [clicked3, setClicked3] = useState(false);
    const navigate = useNavigate();
    const email = localStorage.getItem("username");
    const token = localStorage.getItem("token");


    useEffect(() => {
        const retrieveUserDetails = async () => {
            if (email) {
                const response = await retriveMedicalUserDetails(email, token);
                console.log(response.data);
                // Extracting user details from the response
                if (response.data) {
                    const { medicaluserFirstname, medicaluserLastname, medicaluserPhoneno, medicaluserEmail } = response.data;
                    setFromName(`${medicaluserFirstname} ${medicaluserLastname}`);
                    setPhone(medicaluserPhoneno);
                    setFromEmail(medicaluserEmail);
                }
            } else {
                console.log("No email present");
            }
        };
        retrieveUserDetails();
    }, [email, token]);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_npytmwd', 'template_ozup1qy', form.current, {
                publicKey: 'eW9I8cwZMURY-QOpJ',
            })
            .then(

                () => {
                    console.log('SUCCESS!');
                    handleSuccessToast("You have successfully placed your refund request.");
                    setTimeout(() => {
                        navigate('/profile');
                    }, 5000);

                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    const handleSuccessToast = (message) => {
        toast.success(message, {
            position: toast.POSITION.TOP_CENTER,
            className: "custom-toast-success",
            autoClose: 5000 // Set the duration for the toast, e.g., 5000 ms (5 seconds)
        });
    };

    const handleFocus = (e) => {
        e.target.parentNode.classList.add('focus');
        setClicked(true); // Set clicked to true when a field is focused
        if (e.target.name === 'message') {
            setMessageFormat(`Account Name : \nAccount Number : \nBank Name : \nBranch Name : \n`);
        }
    };

    const handleBlur = (e) => {
        if (e.target.value === '') {
            e.target.parentNode.classList.remove('focus');
            setClicked(false); // Reset clicked to false if no input
            if (e.target.name === 'message') {
                setMessageFormat('');
            }
        }
    };

    const handleFocus1 = (e) => {
        e.target.parentNode.classList.add('focus');
        setClicked1(true); // Set clicked to true when a field is focused
        if (e.target.name === 'message') {
            setMessageFormat(`Account Name : \nAccount Number : \nBank Name : \nBranch Name : \n`);
        }
    };

    const handleBlur1 = (e) => {
        if (e.target.value === '') {
            e.target.parentNode.classList.remove('focus');
            setClicked1(false); // Reset clicked to false if no input
            if (e.target.name === 'message') {
                setMessageFormat('');
            }
        }
    };

    const handleFocus2 = (e) => {
        e.target.parentNode.classList.add('focus');
        setClicked2(true); // Set clicked to true when a field is focused
        if (e.target.name === 'message') {
            setMessageFormat(`Account Name : \nAccount Number : \nBank Name : \nBranch Name : \n`);
        }
    };

    const handleBlur2 = (e) => {
        if (e.target.value === '') {
            e.target.parentNode.classList.remove('focus');
            setClicked2(false); // Reset clicked to false if no input
            if (e.target.name === 'message') {
                setMessageFormat('');
            }
        }
    };

    const handleFocus3 = (e) => {
        e.target.parentNode.classList.add('focus');
        setClicked3(true); // Set clicked to true when a field is focused
        if (e.target.name === 'message') {
            setMessageFormat(`Account Name : \nAccount Number : \nBank Name : \nBranch Name : \n`);
        }
    };

    const handleBlur3 = (e) => {
        if (e.target.value === '') {
            e.target.parentNode.classList.remove('focus');
            setClicked3(false); // Reset clicked to false if no input
            if (e.target.name === 'message') {
                setMessageFormat('');
            }
        }
    };

    const handleBackClick = () => {
        navigate('/profile');
    };

    return (
        <div>
            <Navbar/>
            <div className="cu_container">
                <span className="big-circle"></span>
                <img src={shapepic} className="square" alt="" />
                <div className="form">
                    <div className="contact-info">
                        <h3 className="title">Submit Your Refund Request</h3>
                        <p className="text">
                            We apologize for the rare cancellation due to unavoidable circumstances. Please proceed with a refund and book another appointment.
                        </p>

                        <div className="info">
                            <div className="information">
                                <img src={location} className="icon" alt="" />
                                <p>No 77, Kahatagahawatta, Randawana</p>
                            </div>
                            <div className="information">
                                <img src={emailpic} className="icon" alt="" />
                                <p>ayurcaremedical@gmail.com</p>
                            </div>
                            <div className="information">
                                <img src={phonepic} className="icon" alt="" />
                                <p>0718160765</p>
                            </div>
                        </div>

                        <div className="social-media">
                            <p>Connect with us :</p>
                            <div className="social-icons">
                                <a href="#">
                                    <FontAwesomeIcon icon={faFacebookF} />
                                </a>
                                <a href="#">
                                    <FontAwesomeIcon icon={faTwitter} />
                                </a>
                                <a href="#">
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                                <a href="#">
                                    <FontAwesomeIcon icon={faLinkedinIn} />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form">
                        <span className="circle one"></span>
                        <span className="circle two"></span>

                        <form ref={form} onSubmit={sendEmail}>
                            <h3 className="title">Account Details</h3>
                            <div className="input-container">
                                <input
                                    type="text"
                                    name="from_name"
                                    className="input"
                                    value={clicked1 ? fromName : ''} // Show value only if clicked
                                    onFocus={handleFocus1}
                                    onBlur={handleBlur1}
                                    onChange={(e) => setFromName(e.target.value)} // Optional: allow user to edit
                                />
                                <label>Username</label>
                                <span>Username</span>
                            </div>
                            <div className="input-container">
                                <input
                                    type="email"
                                    name="from_email"
                                    className="input"
                                    value={clicked2 ? fromEmail : ''} // Show value only if clicked
                                    onFocus={handleFocus2}
                                    onBlur={handleBlur2}
                                    onChange={(e) => setFromEmail(e.target.value)} // Optional: allow user to edit
                                />
                                <label>Email</label>
                                <span>Email</span>
                            </div>
                            <div className="input-container">
                                <input
                                    type="tel"
                                    name="phone"
                                    className="input"
                                    value={clicked3 ? phone : ''} // Show value only if clicked
                                    onFocus={handleFocus3}
                                    onBlur={handleBlur3}
                                    onChange={(e) => setPhone(e.target.value)} // Optional: allow user to edit
                                />
                                <label>Phone</label>
                                <span>Phone</span>
                            </div>
                            <div className="input-container textarea">
                            <textarea
                                name="message"
                                className="input"
                                value={messageFormat}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                onChange={(e) => setMessageFormat(e.target.value)}
                            ></textarea>
                                <label>Bank Details</label>
                                <span>Message</span>
                            </div>
                            <div className="button-container">
                                <input type="submit" value="Send" className="btn" />
                                <button type="button" className="btn" onClick={handleBackClick}>Back</button>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </div>
            <Footer/>
        </div>

    );
};

export default ContactUs; // Ensure to export the component
