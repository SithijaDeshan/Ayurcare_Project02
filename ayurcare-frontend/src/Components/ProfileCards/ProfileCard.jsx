import React from "react";
import PropTypes from "prop-types";

const ProfileCard = ({ title, description, backgroundImage }) => {
    return (
        <a href="#">
      <span className="profile_single-img" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <span className="profile_img-text">
          <h4>{title}</h4>
          <p>{description}</p>
          <button>Buy Now</button>
        </span>
      </span>
        </a>
    );
};

ProfileCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
};

export default ProfileCard;
