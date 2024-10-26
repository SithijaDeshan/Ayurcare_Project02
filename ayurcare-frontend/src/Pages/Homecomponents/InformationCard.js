import React from "react";

function InformationCard(props) {
  const handleShowDetails = () => {
    // Call the callback function passed through props to open the modal
    if (props.onShowDetails) {
      props.onShowDetails(props.title);
    }
  };

  const cardStyle = {
    backgroundImage: `url(${props.img})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '20px',
    borderRadius: '10px',
    color: 'white',
    textAlign: 'center',
    overflow: 'hidden',
    position: 'relative',
  };

  const buttonStyle = {
    padding: '10px 15px', // Smaller button
    color: '#FAF1E4',
    border: '1px solid #FAF1E4',
    borderRadius: '28px',
    backgroundColor: '#435334',
    fontSize: '14px', // Slightly smaller font size
    fontFamily: "'Rubik', sans-serif",
    letterSpacing: '0.8px',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    marginTop: '5px',
    marginBottom: '15px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  };

  const buttonHoverStyle = {
    backgroundColor: '#2a2a2a', // Darker shade for hover
    color: '#FAF1E4', // Maintain text color on hover
    transform: 'scale(1.05)',
  };

  return (
    <div className="info-cards" style={cardStyle}>
      {/*<span className="info-card-icon">*/}
      {/*  <FontAwesomeIcon className="info-fa-icon" icon={props.icon} />*/}
      {/*</span>*/}
      <p className="info-card-title">{props.title}</p>
      <p className="info-card-description">{props.description}</p>
      <button
        style={buttonStyle}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor;
          e.currentTarget.style.color = buttonHoverStyle.color;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor;
          e.currentTarget.style.color = buttonStyle.color;
        }}
        onMouseDown={(e) => e.currentTarget.style.transform = buttonHoverStyle.transform}
        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        onClick={handleShowDetails}
      >
        Show Details
      </button>
    </div>
  );
}

export default InformationCard;




