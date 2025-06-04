import React, { useEffect } from 'react';

const toastStyles = {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    background: '#323232',
    color: '#fff',
    padding: '1rem 2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    zIndex: 9999,
    minWidth: '200px',
    textAlign: 'center',
    fontSize: '1rem',
    opacity: 0.95,
};

function Toast({ message, duration = 3000, onClose }) {
    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(() => {
            if (onClose) onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [message, duration, onClose]);

    if (!message) return null;

    return (
        <div style={toastStyles}>
            {message}
        </div>
    );
}

export default Toast;