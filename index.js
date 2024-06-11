import express from 'express';
import productsRouter from './src/routes/products.js';
import infoRouter from './src/routes/info.js';
import ordersRouter from './src/routes/orders.js';
import usersRouter from './src/routes/users.js';
import cartRouter from './src/routes/carts.js';
import campaignRouter from './src/routes/campaign.js';

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());

// Routes
app.use('/products', productsRouter);
app.use('/info ', infoRouter);
app.use('/orders', ordersRouter);
app.use('/users', usersRouter);
app.use('/carts', cartRouter);
app.use('/campaign', campaignRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
