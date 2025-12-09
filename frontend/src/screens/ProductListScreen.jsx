import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import Loading from '../components/Loading';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from '../slices/productApiSlice';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';

//Mui imports

import {
  Container,
  Typography,
  Card,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button as MuiButton,
  Box,
  Paper,
  Stack,
  alpha,
  Avatar,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  Inventory as ProductIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import MuiLoading from '../material-ui/components/MuiLoading';
import MuiMessage from '../material-ui/components/MuiMessage';
import MuiPaginate from '../material-ui/components/MuiPaginate';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '../utils/ThemeContext';

const ProductListScreen = () => {
  const { PageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    PageNumber,
  });
  const [deleteProduct, { isLoading: Loadingdelete }] =
    useDeleteProductMutation();

  const { currentTheme } = useTheme();
  const theme = useMuiTheme();

  const navigate = useNavigate();
  const createProductHandler = () => {
    navigate('/admin/product/create');
  };
  const DeleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteProduct(id).unwrap();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  if (currentTheme === 'bootstrap') {
    return (
      <>
        <Row className="align-items-center">
          <Col>
            <h1>Products</h1>
          </Col>
          <Col className="text-end">
            <Button className="my-3" onClick={createProductHandler}>
              <FaPlus /> Create Product
            </Button>
          </Col>
        </Row>
        {Loadingdelete && <Loading />}
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Message variant="danger">{error.data.message}</Message>
        ) : (
          <>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.products?.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <NavLink to={`/admin/product/${product._id}/edit`}>
                        <Button variant="light" className="btn-sm mx-2">
                          <FaEdit />
                        </Button>
                      </NavLink>
                      <Button variant="outline-danger" className="btn-sm">
                        <FaTrash
                          style={{ color: 'red' }}
                          onClick={() => DeleteHandler(product._id)}
                        />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Paginate pages={data.pages} page={data.page} isAdmin={true} />
          </>
        )}
      </>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.light} 100%)`,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -50,
            right: -50,
            width: 150,
            height: 150,
            background: alpha('#fff', 0.1),
            borderRadius: '50%',
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: alpha('#fff', 0.15),
                backdropFilter: 'blur(10px)',
              }}
            >
              <ProductIcon sx={{ fontSize: 32 }} />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Product Management
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                {data?.count} products found
              </Typography>
            </Box>
          </Stack>

          <MuiButton
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={createProductHandler}
            sx={{
              bgcolor: alpha('#fff', 0.2),
              color: 'white',
              border: `1px solid ${alpha('#fff', 0.3)}`,
              '&:hover': {
                bgcolor: alpha('#fff', 0.3),
                transform: 'translateY(-2px)',
              },
            }}
          >
            Create Product
          </MuiButton>
        </Stack>
      </Paper>

      {Loadingdelete && <MuiLoading message="Deleting product..." />}

      {isLoading ? (
        <MuiLoading />
      ) : error ? (
        <MuiMessage variant="error">{error?.data?.message || error.message}</MuiMessage>
      ) : (
        <>
          {/* Products Table */}
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
              overflow: 'hidden',
            }}
          >
            <TableContainer>
              <MuiTable>
                <TableHead>
                  <TableRow
                    sx={{
                      bgcolor: alpha(theme.palette.secondary.main, 0.02),
                      '& th': {
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        borderBottom: `2px solid ${theme.palette.divider}`,
                      },
                    }}
                  >
                    <TableCell>Product</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Brand</TableCell>
                    <TableCell align="center">Stock</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.products.map((product) => (
                    <TableRow
                      key={product._id}
                      sx={{
                        '&:hover': {
                          bgcolor: alpha(theme.palette.secondary.main, 0.02),
                        },
                        '& td': {
                          borderBottom: `1px solid ${alpha(
                            theme.palette.divider,
                            0.5
                          )}`,
                        },
                      }}
                    >
                      <TableCell>
                        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                          <Avatar
                            src={product.image}
                            alt={product.name}
                            variant="rounded"
                            sx={{
                              width: 50,
                              height: 50,
                              border: `1px solid ${theme.palette.divider}`,
                            }}
                          />
                        </Link>
                      </TableCell>

                      <TableCell>
                        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <Typography variant="body1" fontWeight={500}>
                            {product.name}
                          </Typography>
                        </Link>
                        <Typography variant="caption" color="text.secondary">
                          #{product._id.substring(0, 8)}...
                        </Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Typography
                          variant="body1"
                          fontWeight={600}
                          color="primary"
                        >
                          ${product.price}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={product.category}
                          size="small"
                          sx={{ borderRadius: 1 }}
                        />
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2">{product.brand}</Typography>
                      </TableCell>

                      <TableCell align="center">
                        <Chip
                          label={product.countInStock}
                          size="small"
                          color={product.countInStock > 0 ? 'success' : 'error'}
                          sx={{ borderRadius: 1 }}
                        />
                      </TableCell>

                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <Tooltip title="Edit Product">
                            <IconButton
                              component={NavLink}
                              to={`/admin/product/${product._id}/edit`}
                              sx={{
                                color: theme.palette.primary.main,
                                '&:hover': {
                                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                                  transform: 'scale(1.1)',
                                },
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Delete Product">
                            <IconButton
                              onClick={() => DeleteHandler(product._id)}
                              sx={{
                                color: theme.palette.error.main,
                                '&:hover': {
                                  bgcolor: alpha(theme.palette.error.main, 0.08),
                                  transform: 'scale(1.1)',
                                },
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </MuiTable>
            </TableContainer>
          </Card>

          {/* Pagination */}
          <MuiPaginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </Container>
  );
};

export default ProductListScreen;
