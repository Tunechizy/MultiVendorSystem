import React from 'react'; // Importing React

const OrderList = () => {
  // Static data for orders - In a real-world scenario, this would come from an API or state
  const orders = [
    { id: 1, name: 'Order 1' },
    { id: 2, name: 'Order 2' },
  ];

  // Function to handle the cancellation of an order
  const handleCancel = (orderId) => {
    console.log(`Canceling order with ID: ${orderId}`);
    // Logic to cancel the order, like making an API call to remove the order from a database
  };

  return (
    <div className="order-list">
      <h2>Order List</h2>
      {/* Loop through orders and render each order with a cancel button */}
      {orders.map((order) => (
        <div className="order-item" key={order.id}>
          <p>{order.name}</p>
          {/* Cancel button triggers the handleCancel function */}
          <button
            className="cancel-button"
            onClick={() => handleCancel(order.id)}
          >
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
};

export default OrderList;

