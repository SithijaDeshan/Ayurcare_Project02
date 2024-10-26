import React, { useState } from 'react';
import Modal from 'react-modal';

const customStylesForAppoinment = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '60%', // Increased width
    maxWidth: '600px', // Optional: set a max width
  },
};

Modal.setAppElement('#root');

function ModalComponent({ isOpen, onRequestClose, options, selectedOptions, setSelectedOptions }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedOptions((prev) => {
      if (prev.includes(value)) {
        return prev.filter((option) => option !== value);
      } else if (prev.length < 5) {
        return [...prev, value];
      } else {
        return prev;
      }
    });
  };

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStylesForAppoinment}
      contentLabel="Select Symptoms"
    >
      {/*<div className="modal-content">*/}
      {/*  <div className="modal-header">*/}
      {/*    <h2>Select Symptoms</h2>*/}
      {/*    <button onClick={onRequestClose} className="modal-button">Close</button>*/}
      {/*  </div>*/}
      {/*  <div className="modal-body">*/}
      {/*    <input*/}
      {/*      type="text"*/}
      {/*      placeholder="Search symptoms..."*/}
      {/*      value={searchTerm}*/}
      {/*      onChange={(e) => setSearchTerm(e.target.value)}*/}
      {/*      className="search-bar"*/}
      {/*    />*/}
      {/*    <div className="selected-options">*/}
      {/*      {selectedOptions.map((option, index) => (*/}
      {/*        <span key={index} className="selected-option">{option}</span>*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*    <div className="scrollable-options">*/}
      {/*      <form>*/}
      {/*        {filteredOptions.map((option, index) => (*/}
      {/*          <div key={index} className="option-item">*/}
      {/*            <input*/}
      {/*              type="checkbox"*/}
      {/*              value={option}*/}
      {/*              checked={selectedOptions.includes(option)}*/}
      {/*              onChange={handleCheckboxChange}*/}
      {/*              className="checkbox"*/}
      {/*              disabled={!selectedOptions.includes(option) && selectedOptions.length >= 5}*/}
      {/*            />*/}
      {/*            <label className="checkbox-label">{option}</label>*/}
      {/*          </div>*/}
      {/*        ))}*/}
      {/*      </form>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className="modal-footer">*/}
      {/*    <button onClick={onRequestClose} className="done-button">Done</button>*/}
      {/*  </div>*/}
      {/*</div>*/}



      <div className="my_appoinment_modal-content">
        <div className="my_appoinment_modal-header">
          <h2>Select Symptoms</h2>
          <button onClick={onRequestClose} className="my_appoinment_modal-button">Close</button>
        </div>
        <div className="my_appoinment_modal-body">
          <input
              type="text"
              placeholder="Search symptoms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="my_appoinment_search-bar"
          />
          <div className="my_appoinment_selected-options">
            {selectedOptions.map((option, index) => (
                <span key={index} className="my_appoinment_selected-option">{option}</span>
            ))}
          </div>
          <div className="my_appoinment_scrollable-options">
            <form>
              {filteredOptions.map((option, index) => (
                  <div key={index} className="my_appoinment_option-item">
                    <input
                        type="checkbox"
                        value={option}
                        checked={selectedOptions.includes(option)}
                        onChange={handleCheckboxChange}
                        className="my_appoinment_checkbox"
                        disabled={!selectedOptions.includes(option) && selectedOptions.length >= 5}
                    />
                    <label className="my_appoinment_checkbox-label">{option}</label>
                  </div>
              ))}
            </form>
          </div>
        </div>
        <div className="my_appoinment_modal-footer">
          <button onClick={onRequestClose} className="my_appoinment_done-button">Done</button>
        </div>
      </div>

    </Modal>
  );
}

export default ModalComponent;
