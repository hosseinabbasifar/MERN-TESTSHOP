import React from 'react';
import { Box } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Link, useParams } from 'react-router-dom';

const MuiPaginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = '',
  pageType = 'products',
}) => {
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
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
        <Pagination
          count={pages}
          page={page}
          renderItem={(item) => (
            <Link
              to={getPaginationPath(item.page)}
              style={{ textDecoration: 'none' }}
            >
              <PaginationItem {...item} />
            </Link>
          )}
        />
      </Box>
    )
  );
};

export default MuiPaginate;
