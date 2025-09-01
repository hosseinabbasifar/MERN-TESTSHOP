import {
  Box,
  Container,
  Grid,
  Typography,
  Button as MuiButton,
} from '@mui/material';
import MuiProduct from '../material-ui/components/MuiProduct';
import { useTheme } from '../utils/ThemeContext';

//bootstrap
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

  const navigate = useNavigate();
  const { currentTheme } = useTheme();

  if (error) {
    console.error('Error fetching products:', error);
  }

  const renderLoadingAndError = () => {
    if (isLoading || isFetching) {
      return currentTheme === 'bootstrap' ? <Loading /> : <Loading />;
    }
    if (error) {
      const message = error?.data?.message || error.error;
      return currentTheme === 'bootstrap' ? (
        <Message variant="danger">{message}</Message>
      ) : (
        <Message severity="error">{message}</Message>
      );
    }
    return null;
  };

  if (renderLoadingAndError()) {
    return renderLoadingAndError();
  }

  if (currentTheme === 'bootstrap') {
    return (
      <>
        {!keyword ? (
          <ProductCarousel />
        ) : (
          <Button
            variant="light"
            className="my-3"
            onClick={() => navigate('/')}
          >
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
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {!keyword ? (
        <Box sx={{ mb: 4 }}>
          <ProductCarousel />
        </Box>
      ) : (
        <MuiButton
          variant="outlined"
          onClick={() => navigate('/')}
          sx={{ mb: 3 }}
        >
          Go Back
        </MuiButton>
      )}
      {isLoading || isFetching ? (
        <Loading />
      ) : error ? (
        <Message variant="error">{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Latest Products
          </Typography>
          <Grid container spacing={3} sx={{ mb: 2 }}>
            {data?.products?.map((item) => (
              <Grid item key={item._id} xs={12} sm={6} md={4} lg={3} xl={3}>
                <Box sx={{ height: '100%' }}>
                  <MuiProduct product={item} />
                </Box>
              </Grid>
            ))}
          </Grid>
          {data?.pages > 1 && (
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Paginate
                pages={data.pages}
                page={data.page}
                keyword={keyword || ''}
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default HomeScreen;
