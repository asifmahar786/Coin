import { useEffect } from 'react';

const STYLES = {
  success: 'toast--success',
  danger: 'toast--danger',
  warning: 'toast--warning',
  info: 'toast--info',
};

const Toast = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      role="status"
      className={`toast ${STYLES[type]}`}
    >
      {message}
    </div>
  );
};

export default Toast;
