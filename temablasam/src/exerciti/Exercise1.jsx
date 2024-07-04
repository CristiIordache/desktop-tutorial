// Importing the necessary CSS file for styling
import './exerciti1.css';

// Function to calculate the discounted price
// It takes the original price and the discount percentage as parameters
function calculateDiscount(price, discountPercentage) {
    // Calculate and return the discounted price
    return price - (price * (discountPercentage / 100));
}

// Functional component for displaying the discount calculator
const Exerciti1 = () => {
    // Define the original price
    const originalPrice = 100;
    
    // Define the discount percentage
    const discountPercentage = 20;
    
    // Calculate the discounted price using the calculateDiscount function
    const discountedPrice = calculateDiscount(originalPrice, discountPercentage);

    // Return the JSX to render the discount information
    return (
        <div className="discount-container">
            <h2>Discount Calculator</h2>
            <p>Original Price: ${originalPrice.toFixed(2)}</p>
            <p>Discount Percentage: {discountPercentage}%</p>
            <p>Discounted Price: ${discountedPrice.toFixed(2)}</p>
        </div>
    );
};

// Export the component as the default export of this module
export default Exerciti1;
