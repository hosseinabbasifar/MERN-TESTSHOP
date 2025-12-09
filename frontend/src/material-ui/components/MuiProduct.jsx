
import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Rating,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';

const MuiProduct = ({ product }) => {
  return (
    <Card
      sx={{
        height: { xs: 'auto', sm: 'auto' },
        width: { xs: '100vw', sm: 'auto', lg: 'auto', xl: '250px' },
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 3,
        borderRadius: 2,
        transition: 'transform 0.3s, box-shadow 0.3s',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
        },
      }}
    >
      <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          sx={{
            height: { xs: '250px', sm: '180px' },
            
            objectFit: 'cover',
            width: '100%',
          }}
          image={product.image}
          alt={product.name}
        />
      </Link>

      <CardContent
        sx={{
          flexGrow: 1,
          p: 2,
          bgcolor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          height: { xs: 'auto', sm: '200px', lg: 'auto', xl: 'auto' },
          width: { xs: '100vw', sm: '100vw', lg: '250px', xl: '250px' },
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontWeight: 'bold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            height: '2.5em',
            color: 'text.primary',
          }}
        >
          {product.name}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 'auto',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <Rating
              value={product.rating}
              precision={0.5}
              readOnly
              size="small"
              sx={{ color: 'secondary.main' }}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                ml: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '80px',
              }}
            >
              ({product.numReviews})
            </Typography>
          </Box>
          <Typography
            variant="h6"
            color="primary"
            sx={{
              fontWeight: 'bold',
              ml: 1,
            }}
          >
            ${product.price}
          </Typography>
        </Box>
      </CardContent>

      <CardActions
        sx={{
          mt: 0,
          p: 2,
          pt: 0,
          display: 'flex',
          justifyContent: 'space-between',
          bgcolor: 'background.paper',
          height: '60px', // Fixed height for actions
          alignItems: 'center',
        }}
      >
        <Button
          component={Link}
          to={`/product/${product._id}`}
          variant="outlined"
          size="small"
          startIcon={<VisibilityIcon />}
          sx={{
            minWidth: '80px',
            fontSize: '0.75rem',
          }}
        >
          View
        </Button>
        <Button
          variant="contained"
          size="small"
          color="primary"
          startIcon={<AddShoppingCartIcon />}
          sx={{
            minWidth: '100px',
            fontSize: '0.75rem',
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default MuiProduct;
