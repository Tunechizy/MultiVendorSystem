import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProductCard from "../card";
import "../ProductCard.css";
import { useProducts } from '../../context/ProductContext';

const SellerHome = () => {
  const navigate = useNavigate();
  const { products } = useProducts();

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Your Products</h2>
        <Button 
          variant="primary" 
          onClick={() => navigate('/seller/dashboard')}
        >
          Add New Product
        </Button>
      </div>

      {products.length === 0 ? (
        <p>No products available. Start by adding some products!</p>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default SellerHome; 