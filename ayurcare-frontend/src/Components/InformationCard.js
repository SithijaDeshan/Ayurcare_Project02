import React from "react";

function InformationCard(props) {
  return (<>
      <div className="info-cards" style={{ backgroundImage: `url(${props.img})` }}>
  {/*<span className="info-card-icon">*/}
  {/*  <FontAwesomeIcon className="info-fa-icon" icon={props.icon} />*/}
  {/*</span>*/}
          <p className="info-card-title">{props.title}</p>
          <p className="info-card-description">{props.description}</p>
      </div>

</>
  );
}

export default InformationCard;
