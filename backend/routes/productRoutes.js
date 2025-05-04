import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
} from "../controllers/productsController.js";
import { protect, admin } from "../middleware/loginMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router
  .route("/:id")
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, updateProduct);

export default router;
