import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc    Create new order
// @route   GET /api/orders
// @access  Private
const addOrders = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Get orders of user who logged in
// @route   GET /api/orders
// @access  Private
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get orders by id
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    // Verify order belongs to user or user is admin
    if (
      order.user._id.toString() === req.user._id.toString() ||
      req.user.isAdmin
    ) {
      res.json(order);
    } else {
      res.status(401);
      throw new Error("Not authorized to view this order");
    }
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // // Verify order belongs to user or user is admin
  // if (order.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
  //   res.status(401);
  //   throw new Error('Not authorized to update this order');
  // }

  // // Validate payment details
  // if (!req.body.amount || !req.body.id || !req.body.status || !req.body.payer?.email_address) {
  //   res.status(400);
  //   throw new Error('Missing payment details');
  // }

  // // Check the correct amount was paid
  // const paidCorrectAmount = order.totalPrice.toString() === req.body.amount.toString();
  // if (!paidCorrectAmount) {
  //   res.status(400);
  //   throw new Error(`Incorrect amount paid. Expected: ${order.totalPrice}, Received: ${req.body.amount}`);
  // }

  // Update order status
  order.isPaid = true;
  order.paidAt = Date.now();

  // //  type of payment result depends on to your local provider
  // order.paymentResult = {
  //   id: req.body.id,
  //   status: req.body.status,
  //   update_time: req.body.update_time ,
  //   email_address: req.body.email_address,
  // };

  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("update order to delivered");
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  res.send("get all orders");
});

export {
  addOrders,
  getUserOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
};
