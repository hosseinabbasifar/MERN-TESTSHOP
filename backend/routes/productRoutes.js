import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts
} from '../controllers/productsController.js';
import { protect, admin } from '../middleware/loginMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/top').get(getTopProducts);
router
  .route('/:id')
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);
router.route('/:id/reviews').post(protect, createProductReview);

export default router;
