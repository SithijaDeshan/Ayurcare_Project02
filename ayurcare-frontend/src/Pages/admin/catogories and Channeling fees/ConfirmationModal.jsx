import React from 'react';
import './modal_categories.css';

function ConfirmationModal({ message, onConfirm, onCancel }) {
    return (
        <div className="mn_modal_overlay">
            <div className="mn_modal_content">
                <p>{message}</p>
                <button onClick={onConfirm} className="mn_modal_confirm">Confirm</button>
                <button onClick={onCancel} className="mn_modal_cancel">Cancel</button>
            </div>
        </div>
    );
}

export default ConfirmationModal;
