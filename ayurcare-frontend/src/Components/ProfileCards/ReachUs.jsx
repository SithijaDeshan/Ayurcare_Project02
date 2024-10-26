import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './contactUs.css'; // Import the CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import location from "./images/location.png"
import emailpic from "./images/email.png"
import phonepic from "./images/phone.png"
import shapepic from "./images/shape.png"
import Navbar from "./../Navbar"
import Footer from "./../Footer"
import { toast, ToastContainer } from 'react-toastify';
import "./../../Styles/customToast.css"
import { useNavigate } from 'react-router-dom';

export const ReachUs = () => {
    const form = useRef();
    const navigate = useNavigate();

    const handleSuccessToast = (message) => {
        toast.success(message, {
            position: toast.POSITION.TOP_CENTER,
            className: "custom-toast-success",
            autoClose: 5000 // Set the duration for the toast, e.g., 5000 ms (5 seconds)
        });
    };

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_npytmwd', 'template_wzs1gee', form.current, {
                publicKey: 'eW9I8cwZMURY-QOpJ',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    handleSuccessToast("You have successfully sent your email.");
                    setTimeout(() => {
                        navigate('/');
                    }, 5000);
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    // Focus and blur handlers
    const handleFocus = (e) => {
        e.target.parentNode.classList.add('focus');
    };

    const handleBlur = (e) => {
        if (e.target.value === '') {
            e.target.parentNode.classList.remove('focus');
        }
    };

    return (
        <div>
            <Navbar/>
            <div className="cu_container">
                <span className="big-circle"></span>
                <img src={shapepic} className="square" alt="" />
                <div className="form">
                    <div className="contact-info">
                        <h3 className="title">Let's get in touch</h3>
                        <p className="text">
                            For assistance or inquiries, please contact our support team. We are committed to providing prompt and professional service to address your needs.
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
                            <h3 className="title">Contact us</h3>
                            <div className="input-container">
                                <input
                                    type="text"
                                    name="from_name"
                                    className="input"
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                                <label>Username</label>
                                <span>Username</span>
                            </div>
                            <div className="input-container">
                                <input
                                    type="email"
                                    name="from_email"
                                    className="input"
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                                <label>Email</label>
                                <span>Email</span>
                            </div>
                            <div className="input-container">
                                <input
                                    type="tel"
                                    name="phone"
                                    className="input"
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                                <label>Phone</label>
                                <span>Phone</span>
                            </div>
                            <div className="input-container textarea">
                            <textarea
                                name="message"
                                className="input"
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            ></textarea>
                                <label>Message</label>
                                <span>Message</span>
                            </div>
                            <input type="submit" value="Send" className="btn" />
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </div>
            <Footer/>
        </div>
    );
};
