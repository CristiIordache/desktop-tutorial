
import PropTypes from 'prop-types'; // Import PropTypes
import './Exerciti2.css';

// Functional component to display user profile details
const Exerciti2 = ({ name, age, email }) => {
    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Age:</strong> {age}</p>
            <p><strong>Email:</strong> {email}</p>
        </div>
    );
};

// PropTypes for type checking and validation
Exerciti2.propTypes = {
    name: PropTypes.string.isRequired, // name is required and must be a string
    age: PropTypes.number.isRequired, // age is required and must be a number
    email: PropTypes.string.isRequired, // email is required and must be a string
};

export default Exerciti2;
