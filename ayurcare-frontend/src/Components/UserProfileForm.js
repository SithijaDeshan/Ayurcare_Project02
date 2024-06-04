// UserProfileForm.js
import React, { useState } from 'react';
import '../Styles/UserProfileForm.css';

const UserProfileForm = ({ user }) => {
    const [formData, setFormData] = useState({
        name: user.name,
        birthday: user.birthday,
        email: user.email,
        phone: user.phone,
        occupation: user.occupation,
        address: user.address,
        profilePicture: user.profilePicture,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({ ...formData, profilePicture: reader.result });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user.name,
            birthday: user.birthday,
            email: user.email,
            phone: user.phone,
            occupation: user.occupation,
            address: user.address,
            profilePicture: user.profilePicture,
        });
    };

    const handleSave = () => {
        // Save the updated data to the server or state management
        console.log('Saved data:', formData);
    };

    return (
        <div className="user-profile-form">
            <div className="form-group">
                <label>Profile Picture</label>
                <div className="profile-picture">
                    <img src={formData.profilePicture} alt="Profile" />
                    <input type="file" onChange={handleProfilePictureChange} />
                </div>
            </div>

            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-group">
                <label>Birthday</label>
                <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-group">
                <label>Telephone Number</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-group">
                <label>Occupation</label>
                <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-group">
                <label>Address</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-buttons">
                <button type="button" onClick={handleCancel}>Cancel</button>
                <button type="button" onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default UserProfileForm;
