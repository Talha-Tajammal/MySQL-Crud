const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../model/product');
const router = express.Router();
const {verifyToken} = require('../middleware/auth');

// Create Product
router.post('/', (req, res) => {
  const product = { id: uuidv4(), ...req.body };
  createProduct(product, (err, result) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    res.status(201).json({ message: 'Product created', product });
  });
});

// Get All Products
router.get('/', (req, res) => {
  getAllProducts((err, products) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    res.json(products);
  });
});

// Get Product by ID
router.get('/:id', (req, res) => {
  getProductById(req.params.id, (err, product) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  });
});

// Update Product
router.put('/:id', (req, res) => {
  updateProduct(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    res.json({ message: 'Product updated' });
  });
});

// Delete Product
router.delete('/:id', (req, res) => {
  deleteProduct(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    res.json({ message: 'Product deleted' });
  });
});

module.exports = router;
