import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, CardMedia, Paper, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MuiLoading from './MuiLoading';
import MuiMessage from './MuiMessage';
import { useGetTopProductsQuery } from '../../slices/productApiSlice';

const MuiProductCarousel = () => {
  const { data: products = [], isLoading, error } = useGetTopProductsQuery(); // مقدار پیش‌فرض [] برای products
  const [currentIndex, setCurrentIndex] = useState(0);

  // استفاده از useCallback با مدیریت حالت undefined
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === (products?.length || 0) - 1 ? 0 : prevIndex + 1
    );
  }, [products?.length]); // استفاده از optional chaining

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? (products?.length || 0) - 1 : prevIndex - 1
    );
  }, [products?.length]); // استفاده از optional chaining

  useEffect(() => {
    const interval = setInterval(() => {
      if (products && products.length > 0) {
        // فقط اگر محصولات وجود داشته باشند
        nextSlide();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [nextSlide, products]); // اضافه کردن products به وابستگی‌ها

  if (isLoading) return <MuiLoading />;
  if (error)
    return (
      <MuiMessage severity="error">
        {error?.data?.message || error.error}
      </MuiMessage>
    );
  if (!products || products.length === 0) return null;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 400,
        mb: 4,
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 3,
      }}
    >
      <Paper sx={{ height: '100%', position: 'relative' }}>
        <Link
          to={`/product/${products[currentIndex]._id}`}
          style={{ textDecoration: 'none' }}
        >
          <CardMedia
            component="img"
            image={products[currentIndex].image}
            alt={products[currentIndex].name}
            sx={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              background:
                'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
              color: 'white',
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              {products[currentIndex].name} (${products[currentIndex].price})
            </Typography>
          </Box>
        </Link>
      </Paper>

      <IconButton
        onClick={prevSlide}
        sx={{
          position: 'absolute',
          top: '50%',
          left: 10,
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255,255,255,0.5)',
          '&:hover': {
            bgcolor: 'rgba(255,255,255,0.8)',
            transform: 'translateY(-50%) scale(1.1)',
          },
          transition: 'all 0.3s ease',
          zIndex: 10,
        }}
      >
        <ChevronLeftIcon />
      </IconButton>

      <IconButton
        onClick={nextSlide}
        sx={{
          position: 'absolute',
          top: '50%',
          right: 10,
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255,255,255,0.5)',
          '&:hover': {
            bgcolor: 'rgba(255,255,255,0.8)',
            transform: 'translateY(-50%) scale(1.1)',
          },
          transition: 'all 0.3s ease',
          zIndex: 10,
        }}
      >
        <ChevronRightIcon />
      </IconButton>

      <Box
        sx={{
          position: 'absolute',
          bottom: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
          zIndex: 10,
        }}
      >
        {products.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentIndex(index)}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor:
                index === currentIndex ? 'white' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'white',
                transform: 'scale(1.2)',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MuiProductCarousel;
