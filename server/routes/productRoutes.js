const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    getSellerProducts,
    createProductReview
} = require('../controllers/productController');
const { protect, seller } = require('../middleware/auth');

router.route('/')
    .get(getProducts)
    .post(protect, seller, createProduct);

router.route('/seller')
    .get(protect, seller, getSellerProducts);

router.route('/:id')
    .get(getProductById);

router.route('/:id/reviews')
    .post(protect, createProductReview);

module.exports = router;
