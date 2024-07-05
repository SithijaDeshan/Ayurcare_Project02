// import React from 'react';
// import '../Styles/modal.css';

// const Modal = ({ show, onClose, imageSrc }) => {
//     if (!show) {
//         return null;
//     }

//     return (
//         <div className="modal-overlay" onClick={onClose}>
//             <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//                 <span className="close-button" onClick={onClose}>&times;</span>
//                 <img src={imageSrc} alt="Prescription" className="modal-image" />
//             </div>
//         </div>
//     );
// };

// export default Modal;


import React, { useState, useEffect } from 'react';
import '../Styles/modal.css';

const Modal = ({ show, onClose, imageSrc }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (show) {
            setLoading(true);
        }
    }, [show]);

    const handleImageLoad = () => {
        setLoading(false);
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close-button" onClick={onClose}>&times;</span>
                {loading && <div className="loading-spinner"></div>}
                <img
                    src={imageSrc}
                    alt="Prescription"
                    className="modal-image"
                    onLoad={handleImageLoad}
                    style={{ display: loading ? 'none' : 'block' }}
                />
            </div>
        </div>
    );
};

export default Modal;
