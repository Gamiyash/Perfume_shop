import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './Db.js'; // Make sure this path is correct
import ProductsRoutes from './routes/Products.js'

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use(cors({
  origin: `${process.env.FRONTEND_URL}`, // Replace with your frontend URL
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use('/api', ProductsRoutes); // Use the products routes

// Connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
