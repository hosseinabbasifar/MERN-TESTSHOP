import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Rating,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';

const MuiProduct = ({ product }) => {
  return (
    <Card
      sx={{
        width: '100%',
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
    mt: 'auto',
    justifyContent: 'flex-start',
    gap: 1,
    flexWrap: 'wrap',
  }}
>
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
    variant="h3"
    color="primary"
    sx={{ fontWeight: 'bold' }}
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
          height: '20px', // Fixed height for actions
          alignItems: 'center',
        }}
      ></CardActions>
    </Card>
  );
};

export default MuiProduct;
