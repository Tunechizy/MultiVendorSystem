import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Button, Badge } from 'react-bootstrap';
import './CartIndicator.css';

const CartIndicator = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-indicator">
      <Button 
        variant="outline-light" 
        onClick={() => navigate('/cart')}
        className="cart-button"
      >
        🛒 Cart <Badge bg="danger">{totalItems}</Badge>
      </Button>
    </div>
  );
};

export default CartIndicator; 