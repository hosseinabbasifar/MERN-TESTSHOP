import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Paginate = ({
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
        break;
    }
  };
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item
            key={x + 1}
            active={x + 1 === page}
            as={Link}
            to={getPaginationPath(x + 1)}
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
