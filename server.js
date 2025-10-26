// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Custom Error Classes
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
  next();
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// Authentication middleware
const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== 'secret123') {
    return res.status(401).json({ message: 'Unauthorized: Invalid or missing API key' });
  }
  
  next();
};

// Apply to all product routes
app.use('/api/products', authenticate);

// GET /api/products - Get all products (with filter + pagination)
app.get('/api/products', (req, res) => {
  let filteredProducts = [...products];

  // Filter by category
  if (req.query.category) {
    filteredProducts = filteredProducts.filter(
      p => p.category.toLowerCase() === req.query.category.toLowerCase()
    );
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || filteredProducts.length;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedResults = filteredProducts.slice(startIndex, endIndex);

  res.json({
    page,
    limit,
    total: filteredProducts.length,
    products: paginatedResults
  });
});

app.get('/api/products/search', (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: "Please provide a name to search" });
  }

  const results = products.filter(product =>
    product.name.toLowerCase().includes(name.toLowerCase())
  );

  res.json(results);
});

app.get('/api/products/stats', (req, res) => {
  const stats = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  res.json({
    totalProducts: products.length,
    countByCategory: stats
  });
});

// GET /api/products/:id - Get a specific product
app.get('/api/products/:id', (req, res, next) => {
  try {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
      throw new NotFoundError("Product not found");
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// Validation middleware for product creation and update
const validateProduct = (req, res, next) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      message: "Validation error: 'name' and 'price' are required"
    });
  }

  next();
};
// POST /api/products - Create a new product
app.post('/api/products', validateProduct, (req, res, next) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) {
      throw new ValidationError("Name and price are required");
    }

    const newProduct = {
      id: uuidv4(),
      ...req.body
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});
// PUT /api/products/:id - Update a product
app.put('/api/products/:id', validateProduct, (req, res, next) => {
  try {
    const productIndex = products.findIndex(p => p.id === req.params.id);
    if (productIndex === -1) {
      throw new NotFoundError("Product not found");
    }
    products[productIndex] = { ...products[productIndex], ...req.body };
    res.json(products[productIndex]);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id - Delete a product
app.delete('/api/products/:id', (req, res, next) => {
  try {
    const productIndex = products.findIndex(p => p.id === req.params.id);
    if (productIndex === -1) {
      throw new NotFoundError("Product not found");
    }
    const deletedProduct = products.splice(productIndex, 1);
    res.json({ message: 'Product deleted', deletedProduct });
  } catch (err) {
    next(err);
  }
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.name || "ServerError",
    message: err.message || "Something went wrong"
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app; 