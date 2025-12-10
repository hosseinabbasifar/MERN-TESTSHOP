import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button as MuiButton,
  Grid,
  Typography,
  Paper,
  Divider,
  FormControl,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
  Alert,
  Container,
  Chip,
  IconButton,
  Fade,
  Zoom,
  Card as MuiCard,
  Stack,
  Skeleton,
  Avatar,
  Tooltip,
  Breadcrumbs,
  alpha,
} from '@mui/material';
import {
  ArrowBack,
  ShoppingCart,
  LocalShipping,
  Security,
  Favorite,
  Share,
  CheckCircle,
  Star,
  StarBorder,
  NavigateNext,
  Verified,
  LocalOffer,
  Inventory,
} from '@mui/icons-material';
import Rating from '@mui/material/Rating';
import {
  useGetProductsDetailQuery,
  useCreateReviewMutation,
} from '../slices/productApiSlice';
import { addToCart } from '../slices/cartSlice';
import { toast } from 'react-toastify';
import MuiLoading from '../material-ui/components/MuiLoading';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '../utils/ThemeContext';
import Loader from '../components/Loading';
import Message from '../components/Message';

import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';

const MuiProductScreen = () => {
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading: ProductsDetailLoading,
    error: ProductsDetailError,
    refetch,
  } = useGetProductsDetailQuery(productId);

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { currentTheme } = useTheme();
  const theme = useMuiTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success('Added to cart!', {
      position: 'bottom-right',
      autoClose: 2000,
    });
    navigate('/cart');
  };

  const { userInfo } = useSelector((state) => state.auth);

  const [
    createReview,
    { isLoading: loadingMuiProductReview, isSuccess, error: reviewError },
  ] = useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Review created successfully');
      setRating(0);
      setComment('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (product && product.name) {
      document.title = product.name;
    } else {
      document.title = 'Loading...';
    }
    return () => {
      document.title = 'MERN-TESTSHOP';
    };
  }, [product]);
  const renderLoadingAndError = () => {
  if (ProductsDetailLoading) {
    return currentTheme === 'bootstrap' ? <Loader /> : <MuiLoading />;
  }
  if (ProductsDetailError) {
    const message = ProductsDetailError?.data?.message || ProductsDetailError.error;
    return currentTheme === 'bootstrap' ? (
      <Message variant="danger">{message}</Message>
    ) : (
      <Alert severity="error">{message}</Alert>
    );
  }
  return null;
};
if (renderLoadingAndError()) {
  return renderLoadingAndError();
}

  // Loading skeleton
  if (ProductsDetailLoading) {
    return (
      <>
        <MuiLoading />
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Skeleton variant="rounded" width="100%" height={500} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton variant="text" width="60%" height={60} />
              <Skeleton variant="text" width="40%" height={30} sx={{ mt: 2 }} />
              <Skeleton
                variant="text"
                width="100%"
                height={100}
                sx={{ mt: 2 }}
              />
              <Skeleton
                variant="rounded"
                width="100%"
                height={200}
                sx={{ mt: 3 }}
              />
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }

  if (ProductsDetailError) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert
          severity="error"
          sx={{
            borderRadius: 3,
            fontSize: '1rem',
          }}
        >
          An error occurred while fetching product details:
          {ProductsDetailError?.data?.message || ProductsDetailError.error}
        </Alert>
      </Container>
    );
  }

  if (currentTheme === 'bootstrap') {
    return (
      <>
        <Link className="btn btn-light my-3" to="/">
          Go Back
        </Link>
        
          <>
            <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                  <ListGroup.Item>
                    Description: {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>${product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0
                            ? 'In Stock'
                            : 'Out Of Stock'}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                      <Button
                        onClick={addToCartHandler}
                        className="btn-block"
                        type="button"
                        disabled={product.countInStock === 0}
                      >
                        Add To Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant="flush">
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h2>Write a Customer Review</h2>
                    {isSuccess && (
                      <Message variant="success">
                        Review submitted successfully
                      </Message>
                    )}
                    {loadingMuiProductReview && <Loader />}
                    {reviewError && (
                      <Message variant="danger">
                        {reviewError?.data?.message || reviewError.error}
                      </Message>
                    )}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          disabled={loadingMuiProductReview}
                          type="submit"
                          variant="primary"
                        >
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to="/login">sign in</Link> to write a
                        review{' '}
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </>
        
      </>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.light,
          0.03
        )} 0%, ${alpha(theme.palette.background.default, 1)} 100%)`,
      }}
    >
      {/* Hero Section with Breadcrumbs */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderBottom: `1px solid ${theme.palette.divider}`,
          mb: 4,
        }}
      >
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Breadcrumbs
              separator={<NavigateNext fontSize="small" />}
              sx={{
                '& .MuiBreadcrumbs-li': {
                  fontSize: '0.875rem',
                },
              }}
            >
              <Link
                to="/"
                style={{
                  textDecoration: 'none',
                  color: theme.palette.text.secondary,
                  transition: 'color 0.2s',
                }}
              >
                Home
              </Link>
              <Link
                to="/products"
                style={{
                  textDecoration: 'none',
                  color: theme.palette.text.secondary,
                  transition: 'color 0.2s',
                }}
              >
                Products
              </Link>
              {product && (
                <Typography
                  color="text.primary"
                  fontSize="0.875rem"
                  fontWeight={500}
                >
                  {product.name}
                </Typography>
              )}
            </Breadcrumbs>

            <MuiButton
              component={Link}
              to="/"
              startIcon={<ArrowBack />}
              sx={{
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: 500,
              }}
            >
              Continue Shopping
            </MuiButton>
          </Stack>
        </Container>
      </Box>

      {product && (
        <Container maxWidth="xl">
          <Fade in={true} timeout={800}>
            <Grid container spacing={6}>
              {/* Product Image Section */}
              <Grid item xs={12} lg={6}>
                <Zoom in={imageLoaded} timeout={600}>
                  <Paper
                    elevation={0}
                    sx={{
                      position: 'relative',
                      borderRadius: 4,
                      overflow: 'hidden',
                      bgcolor: 'grey.50',
                      border: `1px solid ${theme.palette.divider}`,
                      height: { xs: 400, sm: 500, md: 600 },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&:hover .image-actions': {
                        opacity: 1,
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={product.image}
                      alt={product.name}
                      onLoad={() => setImageLoaded(true)}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        p: 3,
                      }}
                    />

                    {/* Image Action Buttons */}
                    <Box
                      className="image-actions"
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        opacity: 0,
                        transition: 'opacity 0.3s',
                      }}
                    >
                      <Tooltip
                        title={
                          isFavorite
                            ? 'Remove from wishlist'
                            : 'Add to wishlist'
                        }
                      >
                        <IconButton
                          onClick={() => setIsFavorite(!isFavorite)}
                          sx={{
                            bgcolor: 'background.paper',
                            boxShadow: 2,
                            '&:hover': {
                              bgcolor: 'background.paper',
                              transform: 'scale(1.1)',
                            },
                          }}
                        >
                          <Favorite color={isFavorite ? 'error' : 'action'} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Share product">
                        <IconButton
                          sx={{
                            bgcolor: 'background.paper',
                            boxShadow: 2,
                            '&:hover': {
                              bgcolor: 'background.paper',
                              transform: 'scale(1.1)',
                            },
                          }}
                        >
                          <Share />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    {/* Product Badge */}
                    {product.countInStock > 0 && product.countInStock < 10 && (
                      <Chip
                        label={`Only ${product.countInStock} left!`}
                        color="warning"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 16,
                          left: 16,
                          fontWeight: 600,
                        }}
                      />
                    )}
                  </Paper>
                </Zoom>
              </Grid>

              {/* Product Info Section */}
              <Grid item xs={12} lg={6}>
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Product Title & Rating */}
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="h3"
                      component="h1"
                      gutterBottom
                      sx={{
                        fontWeight: 700,
                        color: 'text.primary',
                        lineHeight: 1.2,
                      }}
                    >
                      {product.name}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      sx={{ mt: 2 }}
                    >
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Rating
                          value={product.rating}
                          readOnly
                          precision={0.5}
                          sx={{ color: 'warning.main' }}
                        />
                        <Typography variant="h6" fontWeight={600}>
                          {product.rating}
                        </Typography>
                      </Box>
                      <Divider orientation="vertical" flexItem />
                      <Chip
                        label={`${product.numReviews} reviews`}
                        variant="outlined"
                        size="small"
                        icon={<Verified />}
                      />
                      <Chip
                        label={product.brand}
                        color="primary"
                        variant="outlined"
                        size="small"
                      />
                    </Stack>
                  </Box>

                  {/* Price Section */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      mb: 3,
                      borderRadius: 3,
                      background: `linear-gradient(135deg, ${alpha(
                        theme.palette.primary.main,
                        0.05
                      )} 0%, ${alpha(theme.palette.primary.light, 0.02)} 100%)`,
                      border: `1px solid ${alpha(
                        theme.palette.primary.main,
                        0.1
                      )}`,
                    }}
                  >
                    <Stack direction="row" alignItems="baseline" spacing={2}>
                      <Typography
                        variant="h3"
                        color="primary.main"
                        fontWeight={700}
                      >
                        ${product.price}
                      </Typography>
                      {product.oldPrice && (
                        <>
                          <Typography
                            variant="h5"
                            sx={{
                              textDecoration: 'line-through',
                              color: 'text.disabled',
                            }}
                          >
                            ${product.oldPrice}
                          </Typography>
                          <Chip
                            label={`Save ${Math.round(
                              ((product.oldPrice - product.price) /
                                product.oldPrice) *
                                100
                            )}%`}
                            color="error"
                            size="small"
                            icon={<LocalOffer />}
                          />
                        </>
                      )}
                    </Stack>
                  </Paper>

                  {/* Description */}
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      mb: 4,
                      lineHeight: 1.8,
                      fontSize: '1.05rem',
                    }}
                  >
                    {product.description}
                  </Typography>

                  {/* Purchase Options */}
                  <MuiCard
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      border: `1px solid ${theme.palette.divider}`,
                      p: 3,
                      mb: 3,
                    }}
                  >
                    <Grid container spacing={3}>
                      {/* Stock Status */}
                      <Grid item xs={12}>
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Inventory
                              color={
                                product.countInStock > 0 ? 'success' : 'error'
                              }
                            />
                            <Typography variant="body1" fontWeight={600}>
                              Status:
                            </Typography>
                          </Stack>
                          <Chip
                            label={
                              product.countInStock > 0
                                ? 'In Stock'
                                : 'Out of Stock'
                            }
                            color={
                              product.countInStock > 0 ? 'success' : 'error'
                            }
                            variant="filled"
                            icon={
                              product.countInStock > 0 ? <CheckCircle /> : null
                            }
                          />
                        </Stack>
                      </Grid>

                      {/* Quantity Selector */}
                      {product.countInStock > 0 && (
                        <Grid item xs={12}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Typography variant="body1" fontWeight={600}>
                              Quantity:
                            </Typography>
                            <FormControl size="small" sx={{ minWidth: 120 }}>
                              <Select
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                                sx={{ borderRadius: 2 }}
                              >
                                {[
                                  ...Array(
                                    Math.min(10, product.countInStock)
                                  ).keys(),
                                ].map((x) => (
                                  <MenuItem key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              ({product.countInStock} available)
                            </Typography>
                          </Stack>
                        </Grid>
                      )}

                      {/* Add to Cart Button */}
                      <Grid item xs={12}>
                        <MuiButton
                          fullWidth
                          variant="contained"
                          size="large"
                          color="secondary"
                          disabled={product.countInStock === 0}
                          onClick={addToCartHandler}
                          startIcon={<ShoppingCart />}
                          sx={{
                            py: 1.5,
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            borderRadius: 3,
                            boxShadow: theme.shadows[4],
                            '&:hover': {
                              boxShadow: theme.shadows[8],
                            },
                          }}
                        >
                          Add to Cart • ${(product.price * qty).toFixed(2)}
                        </MuiButton>
                      </Grid>
                    </Grid>
                  </MuiCard>

                  {/* Trust Badges */}
                  <Stack direction="row" spacing={3} sx={{ mt: 'auto', pt: 3 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <LocalShipping color="action" />
                      <Typography variant="body2" color="text.secondary">
                        Free shipping over $50
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Security color="action" />
                      <Typography variant="body2" color="text.secondary">
                        Secure payment
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Fade>

          {/* Reviews Section */}
          <Box sx={{ mt: 8, mb: 4 }}>
            <Divider sx={{ mb: 6 }}>
              <Chip label="Customer Reviews" size="large" />
            </Divider>

            <Grid container spacing={6}>
              {/* Reviews List */}
              <Grid item xs={12} md={7}>
                {product.reviews.length === 0 ? (
                  <Alert
                    severity="info"
                    icon={<Star />}
                    sx={{
                      borderRadius: 3,
                      border: `1px solid ${theme.palette.info.light}`,
                    }}
                  >
                    Be the first to review this product!
                  </Alert>
                ) : (
                  <Stack spacing={3}>
                    {product.reviews.map((review) => (
                      <Fade in={true} key={review._id}>
                        <MuiCard
                          elevation={0}
                          sx={{
                            p: 3,
                            borderRadius: 3,
                            border: `1px solid ${theme.palette.divider}`,
                            transition: 'all 0.3s',
                            '&:hover': {
                              borderColor: theme.palette.primary.light,
                              boxShadow: `0 4px 20px ${alpha(
                                theme.palette.primary.main,
                                0.08
                              )}`,
                            },
                          }}
                        >
                          <Stack spacing={2}>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                              >
                                <Avatar
                                  sx={{ bgcolor: theme.palette.primary.main }}
                                >
                                  {review.name[0].toUpperCase()}
                                </Avatar>
                                <Box>
                                  <Typography
                                    variant="subtitle1"
                                    fontWeight={600}
                                  >
                                    {review.name}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    {new Date(
                                      review.createdAt
                                    ).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                    })}
                                  </Typography>
                                </Box>
                              </Stack>
                              <Rating
                                value={review.rating}
                                readOnly
                                size="small"
                              />
                            </Stack>

                            <Typography
                              variant="body2"
                              sx={{ lineHeight: 1.7 }}
                            >
                              {review.comment}
                            </Typography>
                          </Stack>
                        </MuiCard>
                      </Fade>
                    ))}
                  </Stack>
                )}
              </Grid>

              {/* Write Review Form */}
              <Grid item xs={12} md={5}>
                <MuiCard
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${alpha(
                      theme.palette.background.paper,
                      1
                    )} 0%, ${alpha(theme.palette.grey[50], 0.5)} 100%)`,
                    border: `1px solid ${theme.palette.divider}`,
                    position: 'sticky',
                    top: 100,
                  }}
                >
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    Write a Review
                  </Typography>

                  {loadingMuiProductReview && (
                    <Box
                      sx={{ display: 'flex', justifyContent: 'center', py: 3 }}
                    >
                      <CircularProgress />
                    </Box>
                  )}

                  {userInfo ? (
                    <Box component="form" onSubmit={submitHandler}>
                      <Stack spacing={3}>
                        <Box>
                          <Typography
                            variant="body2"
                            fontWeight={500}
                            sx={{ mb: 1 }}
                          >
                            Your Rating
                          </Typography>
                          <Rating
                            value={rating}
                            onChange={(event, newValue) => setRating(newValue)}
                            size="large"
                            icon={<Star fontSize="inherit" />}
                            emptyIcon={<StarBorder fontSize="inherit" />}
                            sx={{
                              color: 'warning.main',
                              '& .MuiRating-iconFilled': {
                                color: 'warning.main',
                              },
                            }}
                          />
                        </Box>

                        <TextField
                          label="Your Review"
                          multiline
                          rows={4}
                          fullWidth
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                            },
                          }}
                          placeholder="Share your thoughts about this product..."
                        />

                        <MuiButton
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                          size="large"
                          disabled={loadingMuiProductReview || !rating}
                          sx={{
                            borderRadius: 2,
                            py: 1.5,
                            fontWeight: 600,
                          }}
                        >
                          Submit Review
                        </MuiButton>
                      </Stack>
                    </Box>
                  ) : (
                    <Alert
                      severity="info"
                      sx={{
                        borderRadius: 2,
                        mt: 2,
                      }}
                      action={
                        <MuiButton
                          component={Link}
                          to="/login"
                          color="inherit"
                          size="small"
                        >
                          Sign In
                        </MuiButton>
                      }
                    >
                      Please sign in to write a review
                    </Alert>
                  )}
                </MuiCard>
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
    </Box>
  );
};

export default MuiProductScreen;
