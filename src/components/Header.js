import PropTypes from "prop-types"; // Importing PropTypes
import Button from "./Button";

/* 
Keeping styling in the form of an object (CSS in JS)
const headingStyle = { color: "red", backgroundColor: "black" };
*/

// Can also define as 'const Header = (props)' and use as 'props.title' where applicable
const Header = ({ title, onAdd, showAdd }) => {
  return (
    <header className="header">
      {/* Inline styling -  <h1 style={{color: 'red', backgroundColor: 'black'}}>{title}</h1> */}
      <h1>{title}</h1>
      <Button
        color={showAdd ? "Red" : "Green"}
        text={showAdd ? "Close" : "Add"}
        onClick={onAdd}
      />
    </header>
  );
};

// Defining default property values for props (if not provided)
Header.defaultProps = {
  title: "Task Tracker",
};

// Specifying types for above props
Header.propTypes = {
  // isRequired will indicate errors if a value is not provided (will not be effective if a default value is set)
  title: PropTypes.string.isRequired,
};

export default Header;
