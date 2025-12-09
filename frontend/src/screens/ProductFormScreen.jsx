import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Stack,
  alpha,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Avatar,
  Paper,
  LinearProgress,

} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';
import {
  ArrowBack as BackIcon,
  Save as SaveIcon,
  CloudUpload as UploadIcon,
  Inventory as ProductIcon,
} from '@mui/icons-material';
import MuiMessage from '../material-ui/components/MuiMessage';
import MuiContainer from '../material-ui/components/MuiContainer';
import MuiLoading from '../material-ui/components/MuiLoading';
import {
  useGetProductsDetailQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../slices/productApiSlice';

const ProductFormScreen = () => {
  const theme = useTheme();
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!productId;

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    image: '',
    brand: '',
    category: '',
    countInStock: 0,
    description: '',
  });

  const {
    data: product,
    isLoading: loadingProduct,
    error: errorProduct,
  } = useGetProductsDetailQuery(productId, { skip: !isEditMode });

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Toys'];
  const brands = ['Apple', 'Samsung', 'Nike', 'Sony', 'Dell', 'Canon'];

  useEffect(() => {
    if (isEditMode && product) {
      setFormData({
        name: product.name || '',
        price: product.price || 0,
        image: product.image || '',
        brand: product.brand || '',
        category: product.category || '',
        countInStock: product.countInStock || 0,
        description: product.description || '',
      });
    }
  }, [product, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const goBackHandler = () => {
    navigate('/admin/productlist');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.price ||
      !formData.brand ||
      !formData.category ||
      !formData.description
    ) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      if (isEditMode) {
        await updateProduct({ _id: productId, ...formData }).unwrap();
        toast.success('Product updated successfully');
      } else {
        await createProduct(formData).unwrap();
        toast.success('Product created successfully');
      }
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err?.error || 'An error occurred');
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    try {
      const res = await uploadProductImage(formDataUpload).unwrap();
      setFormData((prev) => ({ ...prev, image: res.image }));
      toast.success('Image uploaded successfully');
    } catch (err) {
      toast.error(err?.data?.message || err?.error || 'Upload failed');
    }
  };

  if (loadingProduct) {
    return <MuiLoading message="Loading product details..." />;
  }

  return (
    <MuiContainer maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.light} 100%)`,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: alpha('#fff', 0.15),
              }}
            >
              <ProductIcon sx={{ fontSize: 32 }} />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                {isEditMode ? 'Edit Product' : 'Create Product'}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                {isEditMode ? 'Update product information' : 'Add a new product to your store'}
              </Typography>
            </Box>
          </Stack>

          <Button
            variant="contained"
            startIcon={<BackIcon />}
            onClick={goBackHandler}
            sx={{
              bgcolor: alpha('#fff', 0.2),
              color: 'white',
              border: `1px solid ${alpha('#fff', 0.3)}`,
              '&:hover': {
                bgcolor: alpha('#fff', 0.3),
              },
            }}
          >
            Go Back
          </Button>
        </Stack>
      </Paper>

      {/* Loading States */}
      {(loadingCreate || loadingUpdate || loadingUpload) && (
        <Box sx={{ mb: 3 }}>
          <LinearProgress />
        </Box>
      )}

      {/* Error Message */}
      {errorProduct && (
        <MuiMessage severity="danger">
          {errorProduct?.data?.message || 'An Error Happened'}
        </MuiMessage>
      )}

      {/* Form */}
      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          overflow: 'hidden',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Product Image */}
              <Grid item xs={12} md={4}>
                <Stack spacing={2} alignItems="center">
                  <Avatar
                    src={formData.image}
                    alt="Product"
                    variant="rounded"
                    sx={{
                      width: 200,
                      height: 200,
                      border: `2px dashed ${theme.palette.divider}`,
                    }}
                  />
                  
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<UploadIcon />}
                    disabled={loadingUpload}
                    sx={{ borderRadius: 2 }}
                  >
                    {loadingUpload ? 'Uploading...' : 'Upload Image'}
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={uploadFileHandler}
                    />
                  </Button>
                </Stack>
              </Grid>

              {/* Form Fields */}
              <Grid item xs={12} md={8}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Product Name *"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Price *"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Stock Count"
                        name="countInStock"
                        value={formData.countInStock}
                        onChange={handleChange}
                        InputProps={{ inputProps: { min: 0 } }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Brand *</InputLabel>
                        <Select
                          name="brand"
                          value={formData.brand}
                          onChange={handleChange}
                          label="Brand *"
                          sx={{ borderRadius: 2 }}
                        >
                          {brands.map((brand) => (
                            <MenuItem key={brand} value={brand}>
                              {brand}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Category *</InputLabel>
                        <Select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          label="Category *"
                          sx={{ borderRadius: 2 }}
                        >
                          {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                              {category}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Description *"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<SaveIcon />}
                    disabled={loadingCreate || loadingUpdate}
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      fontWeight: 600,
                      fontSize: '1rem',
                      mt: 2,
                      background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
                      '&:hover': {
                        background: `linear-gradient(135deg, ${theme.palette.success.dark} 0%, ${theme.palette.success.main} 100%)`,
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    {loadingCreate || loadingUpdate
                      ? 'Saving...'
                      : isEditMode
                      ? 'Update Product'
                      : 'Create Product'}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </MuiContainer>
  );
};
export default ProductFormScreen;
