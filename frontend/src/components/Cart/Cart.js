import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Button, Table, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [deliveryType, setDeliveryType] = useState("Standard");
  const [phone, setPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v2/inline.js';
    script.async = true;
    script.onerror = () => {
      toast.error('Failed to load payment system. Please refresh the page.');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const getSubtotal = () => {
    return cartTotal;
  };

  const getDeliveryCost = () => {
    return deliveryType === "Standard" ? 5 : 10;
  };

  const getTotal = () => {
    return getSubtotal() + getDeliveryCost();
  };

  const handleCheckout = () => {
    if (!phone) {
      toast.error('Please enter your phone number');
      return;
    }

    if (typeof window.PaystackPop === 'undefined') {
      toast.error('Payment system is not available. Please refresh the page.');
      return;
    }

    setIsProcessing(true);

    try {
      const handler = window.PaystackPop.setup({
        key: 'pk_test_1159077c47e09194898ceeee3cf3909fc969ec7b',
        email: 'customer@example.com',
        amount: Math.round(getTotal() * 100), // Amount in kobo
        currency: 'GHS',
        ref: `ref_${Math.floor(Math.random() * 1000000000 + 1)}`,
        metadata: {
          phone: phone,
          delivery_type: deliveryType
        },
        callback: function(response) {
          console.log('Payment successful:', response);
          clearCart();
          toast.success('Payment successful!');
          navigate('/home');
          setIsProcessing(false);
        },
        onClose: function() {
          setIsProcessing(false);
          toast.info('Payment cancelled');
        }
      });

      handler.openIframe();
    } catch (error) {
      console.error('Payment setup error:', error);
      toast.error('Failed to initialize payment. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="cart-item">
                      <img src={item.imageUrl} alt={item.title} className="cart-item-image" />
                      <div className="cart-item-details">
                        <h5>{item.title}</h5>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <div className="quantity-controls">
                      <Button 
                        size="sm" 
                        variant="outline-secondary"
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button 
                        size="sm" 
                        variant="outline-secondary"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="cart-summary">
            <div className="summary-details">
              <div className="summary-row">
                <h4>Subtotal ({cartItems.length} items)</h4>
                <h4>${getSubtotal().toFixed(2)}</h4>
              </div>

              <div className="summary-row">
                <h4>Shipping</h4>
                <Form.Select
                  value={deliveryType}
                  onChange={(e) => setDeliveryType(e.target.value)}
                  className="delivery-select"
                >
                  <option value="Standard">Standard ($5)</option>
                  <option value="Express">Express ($10)</option>
                </Form.Select>
              </div>

              <div className="summary-row">
                <h4>Phone Number</h4>
                <Form.Control
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="phone-input"
                />
              </div>

              <div className="summary-row total">
                <h4>Total</h4>
                <h4>${getTotal().toFixed(2)}</h4>
              </div>

              <Button 
                variant="success"
                onClick={handleCheckout}
                disabled={cartItems.length === 0 || isProcessing}
                className="checkout-button"
              >
                {isProcessing ? 'Processing Payment...' : 'Proceed to Checkout'}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart; 