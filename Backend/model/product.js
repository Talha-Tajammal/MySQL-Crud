const db = require('../config/database');

// Create a Product
const createProduct = (product, callback) => {
  const query = 'INSERT INTO products (id, name, description, price) VALUES (?, ?, ?, ?)';
  db.query(query, [product.id, product.name, product.description, product.price], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Get All Products
const getAllProducts = (callback) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Get a Product by ID
const getProductById = (id, callback) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

// Update a Product
const updateProduct = (id, product, callback) => {
  const query = 'UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?';
  db.query(query, [product.name, product.description, product.price, id], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Delete a Product
const deleteProduct = (id, callback) => {
  const query = 'DELETE FROM products WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
