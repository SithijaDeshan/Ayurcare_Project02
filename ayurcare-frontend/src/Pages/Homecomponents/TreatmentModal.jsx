// import React from "react";
// import "./TreatmentModel.css";
// import imglogo from "../../Assets/logo.png";
//
// const TreatmentModal = ({ show, onClose, treatment }) => {
//   if (!show) {
//     return null;
//   }
//
//   return (
//     <div className="treatmodal-overlay">
//       <div className="treatmodal">
//         <img src={imglogo} alt="Logo" className="treatmodal-logo" /> {/* Logo added here */}
//         <div className="treatmodal-header">
//           <h2>{treatment.title}</h2>
//           <button className="treatclose-button" onClick={onClose}>×</button>
//         </div>
//
//         <div className="treatmodal-content">
//           <p>{treatment.details}</p>
//         </div>
//         <h2>Treatments</h2>
//
//         <div className="treatmodal-content">
//           <p>{treatment.treatment}</p>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default TreatmentModal;
//
//
//
//



import React from "react";
import "./TreatmentModel.css";
import imglogo from "../../Assets/logo.png";

const TreatmentModal = ({ show, onClose, treatment }) => {
  if (!show) {
    return null;
  }

  return (
      <div className="treatmodal-overlay">
        <div className="treatmodal">
          <img src={imglogo} alt="Logo" className="treatmodal-logo" />
          <div className="treatmodal-header">
            <h2>{treatment.title}</h2>
            <button className="treatclose-button" onClick={onClose}>×</button>
          </div>

          <div className="treatmodal-content">
            <p>{treatment.details}</p>
          </div>

          <h2>Treatments</h2>

          <div className="treatmodal-content">
            <p>{treatment.treatment}</p>
          </div>
        </div>
      </div>
  );
};

export default TreatmentModal;
