import React from 'react';

interface ToastProps {
  message: string;
  show: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, show }) => {
  return (
    <div className={`toast ${show ? 'show' : ''}`}>
      {message}
    </div>
  );
};

export default Toast;