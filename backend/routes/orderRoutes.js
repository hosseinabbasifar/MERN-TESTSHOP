import express from "express";
const router = express.Router();
import {
  addOrders,
  getUserOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/loginMiddleware.js";

router.route("/").post(protect, addOrders).get(protect, admin, getAllOrders);
router.route("/myorders").get(protect, getUserOrders);
router.route("/:id").get(protect,admin, getOrderById);
router.route("/:id/pay").put(protect, admin, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
