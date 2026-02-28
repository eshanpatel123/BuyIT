const express = require('express');
const router = express.Router();
const {
    addOrderItems,
    getOrderById,
    getMyOrders,
    getOrders,
    updateOrderStatus
} = require('../controllers/orderController');
const { protect, seller } = require('../middleware/auth');

router.route('/')
    .post(protect, addOrderItems)
    .get(protect, seller, getOrders);

router.route('/myorders').get(protect, getMyOrders);

router.route('/:id').get(protect, getOrderById);

router.route('/:id/status').put(protect, seller, updateOrderStatus);

module.exports = router;
