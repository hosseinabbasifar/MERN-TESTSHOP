import { Row, Col } from "react-bootstrap";
import products from "../products";
import ProductComponent from "../components/product";

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <ProductComponent product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
