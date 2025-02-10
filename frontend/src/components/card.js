import React, { useState } from 'react';
import { Card, Button, Toast } from 'react-bootstrap'; // Importing necessary components from react-bootstrap
import { useSeller } from '../context/SellerContext';
import { useLocation } from 'react-router-dom';
import './ProductCard.css'; // Import custom CSS for styling

// Functional component to display a product card
const ProductCard = ({ product, onAddToCart }) => {
  const [showToast, setShowToast] = useState(false);
  const { isSeller } = useSeller();
  const location = useLocation();

  const handleAddToCart = () => {
    onAddToCart(product);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const isOutOfStock = !product.stock_quantity || product.stock_quantity <= 0;
  const isSellerPage = location.pathname.includes('/seller');

  return (
    <div className="product-card">
      <Card>
        {/* Image with a fallback to a placeholder if the product image is unavailable */}
        <Card.Img
          variant="top"
          src={product.imageUrl} // Changed from product.image to product.imageUrl
          alt={product.title}
          className="product-image" // Custom class for styling the image
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = "https://placehold.co/400x400/png?text=Image+Not+Found";
          }}
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
            <small className={isOutOfStock ? 'text-danger' : 'text-success'}>
              {isOutOfStock ? 'Out of stock' : `${product.stock_quantity} available`}
            </small>
          </Card.Text>

          {!isSellerPage && (
            <Button
              variant="primary"
              onClick={handleAddToCart}
              className="add-to-cart-btn"
              disabled={isOutOfStock}
            >
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          )}
        </Card.Body>
      </Card>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000
        }}
      >
        <Toast.Header>
          <strong className="me-auto">Added to Cart</strong>
        </Toast.Header>
        <Toast.Body>{product.title} has been added to your cart!</Toast.Body>
      </Toast>
    </div>
  );
};

export default ProductCard;
