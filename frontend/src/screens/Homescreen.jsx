import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/product";
import { fetchProducts } from "../services/productService";

const HomeScreen = () => {
  // State to store the list of products
  const [products, setProducts] = useState([]);
  // State to manage loading state
  const [loading, setLoading] = useState(true);
  // State to handle error messages
  const [error, setError] = useState("");

  useEffect(() => {
    // Function to fetch products from the API
    const getProducts = async () => {
      try {
        // Fetch products and update state
        const data = await fetchProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        // Handle errors and update state
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    // Call the function to fetch products
    getProducts();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      {/* Display loading message, error message, or the list of products . also
      i will modify loading page later on*/}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Row>
          {products.map((item) => (
            <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={item} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
