import React, { useState } from 'react'; // Importing React and useState hook

const NewOrderForm = () => {
  // State to hold the value of the new order
  const [order, setOrder] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission (page reload)
    console.log('New order submitted:', order); // Log the new order to the console (this is where you'd likely send it to an API)
  };

  return (
    // Form element that triggers the handleSubmit function on submission
    <form onSubmit={handleSubmit}>
      {/* Label and input field for entering the new order */}
      <label>
        New Order:
        {/* Input field to capture the new order */}
        <input
          type="text"
          value={order} // Bind input value to the 'order' state
          onChange={(e) => setOrder(e.target.value)} // Update 'order' state as the user types
        />
      </label>
      {/* Submit button to send the new order */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewOrderForm;

