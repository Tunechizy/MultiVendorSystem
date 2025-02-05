import React from 'react';
import { Card, Button } from 'react-bootstrap'; // Importing necessary components from react-bootstrap
import './ProductCard.css'; // Import custom CSS for styling

// Functional component to display a product card
const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Card>
        {/* Image with a fallback to a placeholder if the product image is unavailable */}
        <Card.Img
          variant="top"
          src={product.image || "https://via.placeholder.com/150"} // Fallback image URL if no image is provided
          alt={product.title || "Product image"} // Fallback alt text if product title is unavailable
          className="product-image" // Custom class for styling the image
        />
        <Card.Body className="card-body">
          {/* Display the product title with a fallback value */}
          <Card.Title>{product.title || "No Title Available"}</Card.Title>

          {/* Display the product description with a fallback value */}
          <Card.Text>{product.description || "No Description Available"}</Card.Text>

          {/* Display product price with optional formatting */}
          <Card.Text>
            <strong>${product.price?.toFixed(2) || "0.00"}</strong> {/* Display price, format it to 2 decimal places */}
          </Card.Text>

          {/* Display stock availability, with fallback if the quantity is not provided */}
          <Card.Text>
            <small>
              Stock: {product.stock_quantity || "Out of stock"} available
            </small>
          </Card.Text>

          {/* Add to Cart button with an onClick event handler */}
          <Button
            variant="primary"
            onClick={() => console.log(`Product "${product.title}" added to cart!`)} // Placeholder action for adding to cart
          >
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;
