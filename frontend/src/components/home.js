import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./card"; // Import the ProductCard component for displaying each product
import { Container, Row, Col } from "react-bootstrap"; // Import Bootstrap components for layout
import { Navigate } from "react-router-dom"; // For redirection if the user is not logged in
import "./ProductCard.css"; // Import the styles for the product cards
import { useCart } from "../context/CartContext";
import { useProducts } from '../context/ProductContext';

const Homepage = ({ user }) => {
  // State hooks to manage the product data, loading state, error state, and search text
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState(""); // To track the text entered in the search bar
  const { addToCart } = useCart();
  const { products: sellerProducts } = useProducts();
  const [allProducts, setAllProducts] = useState([]);

  // useEffect hook that runs on component mount or whenever 'user' changes
  useEffect(() => {
    // Fetch products from the server
    const fetchProducts = async () => {
      try {
        console.log('Fetching products...'); // Debug log
        // Get API products
        const response = await axios.get("http://localhost:5001/api/products");
        const apiProducts = Array.isArray(response.data) ? response.data : [];
        
        // Combine API products with seller products
        const combinedProducts = [
          ...apiProducts,
          ...sellerProducts
        ].map(product => ({
          ...product,
          stock_quantity: product.stock_quantity || 10 // Default stock quantity for API products
        }));

        setAllProducts(combinedProducts);
      } catch (err) {
        console.error("Error details:", {
          message: err.message,
          response: err.response,
          request: err.request
        });
        setError(err.response?.data?.error || err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    // Remove the user check to always fetch products
    fetchProducts();
  }, [sellerProducts]); // Add sellerProducts as dependency

  // If the user is not authenticated, redirect them to the login page
  // if (!user) {
  //   return <Navigate to="/login" />;
  // }

  // Show a loading message while products are being fetched
  if (loading) {
    return <h1>Loading products...</h1>;
  }

  // If there's an error while fetching products, display the error message
  if (error) {
    return (
      <div className="error-message">
        <h1>Error Loading Products</h1>
        <p>{error}</p>
      </div>
    );
  }

  // Filter the products based on the search text entered by the user
  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchText.toLowerCase()) // Case-insensitive search
  );

  return (
    <Container>
      {/* Search bar to allow users to filter products */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)} // Update search text on input change
        />
      </div>

      {/* Conditional rendering based on the filtered product list */}
      {filteredProducts.length === 0 ? (
        // If no products match the search, show this message
        <h1 className="no-products-message">No products match your search.</h1>
      ) : (
        // If there are products that match the search, display them in a grid layout
        <Row>
          {filteredProducts.map((product) => (
            // For each product, render the ProductCard component
            <Col key={product._id} sm={12} md={6} lg={4}>
              <ProductCard 
                product={product} 
                onAddToCart={addToCart}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Homepage;
