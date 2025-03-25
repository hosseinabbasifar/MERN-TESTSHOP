import { Row, Col } from "react-bootstrap";
import Product from "../components/product";
import { useGetProductsQuery } from "../slices/productApiSlice";

const HomeScreen = () => {
  const { data: products, loading, error } = useGetProductsQuery();

  if (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error.message || "An error occurred"}</p>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {Array.isArray(products) && products.map((item) => (
              <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={item} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
