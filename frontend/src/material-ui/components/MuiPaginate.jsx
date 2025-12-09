import React from 'react';
import { Box, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const MuiPaginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = '',
  pageType = 'products',
}) => {
  const theme = useTheme();

  const getPaginationPath = (pageNumber) => {
    if (!isAdmin) {
      return keyword
        ? `/search/${keyword}/page/${pageNumber}`
        : `/page/${pageNumber}`;
    }
    switch (pageType) {
      case 'users':
        return `/admin/users/page/${pageNumber}`;
      case 'orders':
        return `/admin/orderlist/page/${pageNumber}`;
      case 'products':
        return `/admin/productlist/page/${pageNumber}`;
      default:
        console.log('invalid pagetype');
        return '/';
    }
  };

  return (
    pages > 1 && (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          my: 4,
        }}
      >
        <Pagination
          count={pages}
          page={page}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={getPaginationPath(item.page)}
              {...item}
              sx={{
                '&.Mui-selected': {
                  bgcolor: theme.palette.primary.main,
                  color: 'white',
                  '&:hover': {
                    bgcolor: theme.palette.primary.dark,
                  },
                },
                '&:hover': {
                  bgcolor: theme.palette.primary.light,
                  color: 'white',
                },
                borderRadius: 2,
                mx: 0.5,
              }}
            />
          )}
          sx={{
            '& .MuiPagination-ul': {
              gap: 1,
            },
          }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Page {page} of {pages}
        </Typography>
      </Box>
    )
  );
};
export default MuiPaginate;
