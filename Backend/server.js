const express = require('express');
const userRoutes = require('./routes/userroutes');
const app = express();
const port = 3001;

app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});