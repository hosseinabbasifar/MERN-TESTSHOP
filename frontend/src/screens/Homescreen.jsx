import { Row, Col, Button } from 'react-bootstrap';
import Product from '../components/product';
import { useGetProductsQuery } from '../slices/productApiSlice';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { useParams, useNavigate } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

const HomeScreen = () => {
  const { PageNumber, keyword } = useParams();
  const { data, isLoading, isFetching, error } = useGetProductsQuery({
    keyword,
    PageNumber,
  });

  if (error) {
    console.error('Error fetching products:', error);
  }
  const navigate = useNavigate();

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Button variant="light" className="my-3" onClick={() => navigate('/')}>
          Go Back
        </Button>
      )}
      {isLoading || isFetching ? (
        <Loading />
      ) : error ? (
        <Message variant={'danger'}>
          {' '}
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((item) => (
              <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={item} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
