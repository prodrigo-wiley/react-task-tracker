import PropTypes from "prop-types";
const Button = ({ color, text, onClick }) => {
  return (
    <div>
      <button
        style={{ backgroundColor: color }}
        className="btn"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

Button.defaultProps = {
  color: "steelblue",
};

Button.propTyprd = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Button;
