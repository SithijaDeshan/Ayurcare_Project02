import React from "react";
import "./style.css"; // Import the CSS file
import GoogleMap from "./Map";
import Title from "./Title";
import doctor1 from "./images/doctor1.jpg";
import doctor2 from "./images/doctor2.jpeg";
import doctor3 from "./images/doctor3.jpg";
import avator from "./images/avator.jpg"
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";


const AboutUs = () => {

  return (
    
    <>
    <Navbar/>
      <Title />
      <div className="about-page">
      <div className="about-container">
        <section className="hero-section1">
          <div className="hero-text">
            <p>
            At AyurCare Clinic, we aim to harmonize traditional 
            Ayurvedic wisdom with modern medical practices, 
            empowering individuals to naturally achieve holistic health and well-being.
            </p>
          </div>
        </section>

        {/* Company Mission Section */}
        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>
          At AyurCare Clinic, our mission is to provide personalized, 
          compassionate, and effective Ayurvedic treatments that address the 
          root cause of health issues. We strive to create a healing environment 
          where every patient receives individualized care, utilizing a blend of 
          ancient knowledge and modern techniques for sustainable and holistic health solutions. 
          We are committed to promoting natural healing and overall well-being through preventative 
          care and therapeutic practices.
          </p>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <h2>Meet Our Specialists</h2>
          <div className="team-members">
            <div className="team-member">
              <img src={avator} alt="Jayantha Somasili" />
              <h3>Dr. Jayantha Somasili</h3>
              <h4>Ayurvedic Medicine Specialist</h4>
              <p>20 years of experience in Ayurvedic therapies and treatments</p>
              
            </div>
            <div className="team-member">
            <img src = {doctor1} alt="Nirmala Perera" />
            <h3>Dr. Nirmala Perera</h3>
            <h4>Panchakarma Therapy Expert</h4>
            <p>15 years of expertise in lifestyle consultations and holistic healing</p>
            </div>
            <div className="team-member">
              <img src= {doctor2} alt="Kamalika Weeraratne" />
              <h3>Dr. Kamalika Weeraratne</h3>
              <h4>Herbal Medicine Specialist</h4>
              <p>18 years of experience in Ayurvedic herbal medicine and natural healing therapies</p>
            </div>
            <div className="team-member">
              <img src= {doctor3} alt="Dinesh Bandara" />
              <h3>Dr. Dinesh Bandara</h3>
              <h4>Clinical Ayurveda Consultant</h4>
              <p>12 years of expertise in clinical Ayurveda, focusing on chronic disease management</p>
            </div>
          </div>
        </section>
      </div>
      </div>
      <GoogleMap />
      <Footer/>
    </>
  );
  
};

export default AboutUs;
