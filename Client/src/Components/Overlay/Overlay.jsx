import PropTypes from 'prop-types';
import './Overlay.css';

const Overlay = ({ message, onClose }) => {
  return (
    <div className="overlay">
      <div className="overlay-content">
        {typeof message === 'string' ? <p>{message}</p> : message}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

Overlay.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  onClose: PropTypes.func.isRequired
};

export default Overlay;