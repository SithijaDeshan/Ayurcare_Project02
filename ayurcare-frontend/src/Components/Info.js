// Treatments.js
import React from "react";
import InformationCard from "./InformationCard";
import { faHeartPulse, faTruckMedical, faTooth } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Info.css";
import About from "./About";

function Treatments() {
  return (
    <div className="info-section" id="services">
      <About />
      <div className="info-cards-content">
        <div className="orthopedic">
          <InformationCard
            title="Orthopedic Treatment"
            img="images/ortho.jpg"
            icon={faTruckMedical}
          />
        </div>
        <div className="sciatica">
          <InformationCard
            title="Sciatica Pain Treatment"
            img="images/sciatica.jpg"
            icon={faHeartPulse}
          />
        </div>
        <div className="panchakarma">
          <InformationCard
            title="Panchakarma Treatment"
            img="images/pancha.jpg"
            icon={faTooth}
          />
        </div>
      </div>
      <button className="treat-see-all" type="button">See All</button>
    </div>
  );
}

export default Treatments;
