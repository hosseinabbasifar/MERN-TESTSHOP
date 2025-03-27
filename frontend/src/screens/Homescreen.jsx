import { Row, Col } from "react-bootstrap";
import Product from "../components/product";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Loading from "../components/Loading";
import Message from "../components/Message";
const HomeScreen = () => {
  const { data: products = [], loading, error } = useGetProductsQuery();

  if (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant={"danger"}>
          {" "}
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((item) => (
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
