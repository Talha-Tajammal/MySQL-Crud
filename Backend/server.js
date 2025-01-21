const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userroutes');
const productRoutes = require('./routes/productRoutes');
const app = express();
const port = 3001;

// Middleware
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
