import React from "react";
import Doctor from "../Assets/logo2.png";
import SolutionStep from "./SolutionStep";
import "../Styles/About.css";
import "../Styles/Reviews.css";
import SlideComponent from "./Slider";

function About() {
  return (
      <>
    <div className="about-section-bg"><img src={Doctor} alt="Doctor Group"/></div>

    <div className="about-section" id="about">

        {/*<div  style={{position:"absolute",width:"100%"}}><img src={Doctor} alt="Doctor Group" className="" /></div>*/}
      <div className="review-section" id="reviews">
        <div className="rw-text-content">

          <p className="rw-text-desc">AyurCare Treatments</p><br/>
          <p className="rw-text-title">
            More over <span className="rw-text-num">1500+ Customers</span>
          </p>
        </div></div>

      <div className="about-text-content">
        {/*<h3 className="about-title">*/}
        {/*  <span>About Us</span>*/}
        {/*</h3>*/}
        {/*<p className="about-description">*/}
        {/*  Welcome to Health Plus, your trusted partner for accessible and*/}
        {/*  personalized healthcare. Our expert doctors offer online consultations*/}
        {/*  and specialized services, prioritizing your well-being. Join us on*/}
        {/*  this journey towards a healthier you.*/}
        {/*</p>*/}

        {/*<h4 className="about-text-title">Your Solutions</h4>*/}

        {/*<div className="about-image-content">*/}

        {/*  /!*<h1>Ayucare</h1>*!/*/}
        {/*</div>*/}

        <SolutionStep
          title="Choose a Specialist"
          description="Find your perfect specialist and book with ease at AyurCare. Expert doctors prioritize your health, offering tailored care."
        />

        <SolutionStep
          title="Make a Schedule"
          description="Choose the date and time that suits you best, and let our dedicated team of medical professionals ensure your well-being with personalized care."
        />

        <SolutionStep
          title="Get Your Solutions"
          description="Our experienced doctors and specialists are here to provide expert advice and personalized treatment plans, helping you achieve your best possible health."
        />
      </div>
    </div>
      </>
  );
}

export default About;
