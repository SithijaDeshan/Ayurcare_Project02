import React from "react";
import "../Styles/Footer.css";
import logo from "../Assets/logo.png";

function Footer() {
  return (
    <div className="footer-section">
      <div className="footer-container">
        <div className="ft-info">
          <div className="ft-info-p1">
            <div className="foot-logo-new">
              <img src={logo} alt="Logo" />
            </div>

          </div>

          {/*<SubscribeNewsletter />*/}
        </div>

        <div className="ft-list">
          {/*<p className="ft-list-title">Services</p>*/}
          <ul className="ft-list-items">
            <li>
              <a href="/aboutus">About Us</a>
            </li>
            <li>
              <a href="/appointment">Make an Appointment</a>
            </li>
            <li>
              <a href="/profile">Profile</a>
            </li>

          </ul>
        </div>


        <div className="ft-list" id="contact">
          <ul className="ft-list-items">
            <li>
              <a href="/aboutus">No 77, Kahatagahawatta, Randawana</a>
            </li>
            <li>
              <a href="/aboutus">ayurcaremedical@gmail.com</a>
            </li>
            <li>
              <a href="/reachus">0718160765</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="ft-copyright">
        <p>© 2013-2024 AyurCare. All rights reserved.</p>


      </div>
    </div>
  );
}

export default Footer;
