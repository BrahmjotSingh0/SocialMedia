import PropTypes from 'prop-types';
import './Overlay.css';

const Overlay = ({ message, onClose }) => {
  return (
    <div className="overlay">
      <div className="overlay-content">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

Overlay.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Overlay;