import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./card"; // Import the ProductCard component for displaying each product
import { Container, Row, Col } from "react-bootstrap"; // Import Bootstrap components for layout
import { Navigate } from "react-router-dom"; // For redirection if the user is not logged in
import "./ProductCard.css"; // Import the styles for the product cards

const Homepage = ({ user }) => {
  // State hooks to manage the product data, loading state, error state, and search text
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState(""); // To track the text entered in the search bar

  // useEffect hook that runs on component mount or whenever 'user' changes
  useEffect(() => {
    // Fetch products from the server
    const fetchProducts = async () => {
      try {
        // Send a GET request to fetch products from the backend API
        const response = await axios.get("http://localhost:5001/product/");

        // Check if the response data is in the correct format (array of products)
        if (Array.isArray(response.data)) {
          setProducts(response.data); // Store the products in state
        } else {
          throw new Error("Invalid data format"); // If the data is not in the expected format, throw an error
        }
      } catch (err) {
        // If there's an error, set the error state with the error message
        setError(err.message || "Failed to fetch products");
      } finally {
        // Once the request completes (success or failure), set loading to false
        setLoading(false);
      }
    };

    // Only fetch products if the user is logged in
    if (user) {
      fetchProducts();
    }
  }, [user]); // Dependency array - re-run the effect when 'user' changes

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
  const filteredProducts = products.filter((product) =>
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
            <Col key={product.product_id} sm={12} md={6} lg={4}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Homepage;
