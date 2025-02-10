import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import './Seller.css';
import { useNavigate } from 'react-router-dom';
import { useSeller } from '../../context/SellerContext';
import { useProducts } from '../../context/ProductContext';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { logoutSeller } = useSeller();
  const { products, addProduct, removeProduct } = useProducts();
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    stock_quantity: ''
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    addProduct(newProduct);
    setNewProduct({
      title: '',
      description: '',
      price: '',
      imageUrl: '',
      stock_quantity: ''
    });
  };

  const handleRemoveProduct = (productId) => {
    removeProduct(productId);
  };

  const handleLogout = () => {
    logoutSeller();
    navigate('/login');
  };

  return (
    <Container className="seller-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Seller Dashboard</h2>
        <Button variant="outline-danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Header>Add New Product</Card.Header>
            <Card.Body>
              <Form onSubmit={handleAddProduct}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={newProduct.title}
                    onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="url"
                    value={newProduct.imageUrl}
                    onChange={(e) => setNewProduct({...newProduct, imageUrl: e.target.value})}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Stock Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={newProduct.stock_quantity}
                    onChange={(e) => setNewProduct({...newProduct, stock_quantity: e.target.value})}
                    required
                  />
                </Form.Group>

                <Button type="submit" variant="primary">Add Product</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <h3>Your Products</h3>
          {products.map(product => (
            <Card key={product._id} className="mb-3">
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  Price: ${product.price}<br />
                  Stock: {product.stock_quantity}
                </Card.Text>
                <Button variant="danger" size="sm" onClick={() => handleRemoveProduct(product._id)}>Remove</Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default SellerDashboard; 