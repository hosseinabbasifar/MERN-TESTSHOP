import axios from "axios";

// Fetch all products from the API
export const fetchProducts = async () => {
  try {
    const { data } = await axios.get("/api/products");
    return data;
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  }
};

// Fetch a single product by ID from the API
export const getProductById = async (productId) => {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    return data;
  } catch (error) {
    throw new Error("Error fetching product: " + error.message);
  }
};
