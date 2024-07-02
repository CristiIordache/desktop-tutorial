import { useState } from 'react';
import './Exercise4.css';

const Exercise4 = () => {
    // State to keep track of the count value
    const [count, setCount] = useState(0);

    // Function to increment the count by 100
    const increment = () => {
        setCount(prevCount => prevCount + 100);
    };

    // Function to decrement the count by 100
    const decrement = () => {
        setCount(prevCount => prevCount - 100);
    };

    return (
        <div className="counter-container">
            <h2>Counter</h2>
            <p>Count: {count}</p>
            <div className="buttons">
                <button onClick={increment}>Increment by 100</button>
                <button onClick={decrement}>Decrement by 100</button>
            </div>
        </div>
    );
};

export default Exercise4;
