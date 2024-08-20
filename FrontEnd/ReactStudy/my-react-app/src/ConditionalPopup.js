import React from 'react';


const ConditionalPopup = ({ isOpen, onClose, canClose, children }) => {
  if (!isOpen) return null; // Don't render the popup if it's not open
    localStorage.setItem('count',isOpen)
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {!canClose && (
          <div className="popup-blocked-message">
          </div>
        )}
        {children}
        {canClose && (
          <button className="popup-close" onClick={onClose}>×</button>
        )}
      </div>
    </div>
  );
};

export default ConditionalPopup;
