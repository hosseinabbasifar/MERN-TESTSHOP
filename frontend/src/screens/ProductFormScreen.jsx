import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loading from "../components/Loading";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";

import {
  useGetProductsDetailQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../slices/productApiSlice";

const ProductFormScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!productId;

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    image: "",
    brand: "",
    category: "",
    countInStock: 0,
    description: "",
  });

  const {
    data: product,
    isLoading: loadingProduct,
    error: errorProduct,
  } = useGetProductsDetailQuery(productId, {
    skip: !isEditMode,
  });

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  useEffect(() => {
    if (isEditMode && product) {
      setFormData({
        name: product.name || "",
        price: product.price || 0,
        image: product.image || "",
        brand: product.brand || "",
        category: product.category || "",
        countInStock: product.countInStock || 0,
        description: product.description || "",
      });
    }
  }, [product, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const goBackHandler = () => {
    navigate("/admin/productlist");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.price ||
      !formData.image ||
      !formData.brand ||
      !formData.category ||
      !formData.description
    ) {
      alert("Please Fill All Fields");
      return;
    }

    try {
      if (isEditMode) {
        await updateProduct({ _id: productId, ...formData }).unwrap();
      } else {
        await createProduct(formData).unwrap();
      }
      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.message || err?.error || "An error occurred");
    }
  };
  const UploadFileHandler = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadProductImage(formData).unwrap();
      setFormData((prev) => ({ ...prev, image: res.image }));
      toast.success("Image uploaded successfully", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      toast.error(err?.data?.message || err?.error || "An error occurred");
    }
  };

  return (
    <FormContainer>
      <Button variant="light" className="my-3" onClick={goBackHandler}>
        Go Back
      </Button>
      <h1>{isEditMode ? "Edit Product" : "Create Product"}</h1>

      {(loadingProduct || loadingCreate || loadingUpdate || loadingUpload) && (
        <Loading />
      )}
      {errorProduct && (
        <Message variant="danger">
          {errorProduct?.data?.message || "An Error Happened"}
        </Message>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Product Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="image">
          <Form.Label>Image</Form.Label>

         
          <Form.Control
            type="file"
            onChange={UploadFileHandler}
            disabled={loadingUpload}
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="brand">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="Brand Name"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="countInStock">
          <Form.Label>countInStock</Form.Label>
          <Form.Control
            type="number"
            placeholder="countInStock"
            name="countInStock"
            value={formData.countInStock}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="category">
          <Form.Label>category</Form.Label>
          <Form.Control
            type="text"
            placeholder="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="description">
          <Form.Label>description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-3"
          disabled={loadingCreate || loadingUpdate}
        >
          {loadingCreate || loadingUpdate
            ? "SAVING..."
            : isEditMode
            ? "Update Product"
            : "Create Product"}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProductFormScreen;
