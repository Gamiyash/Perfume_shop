// Import necessary modules
import express from 'express';
import Product from '../models/Products_Details.js'; // Assuming you have a Product model defined
import mongoose from 'mongoose';

const router = express.Router();


// POST route to create a new product
router.post('/products', async (req, res) => {
    const { id, images, name, price, description, sizes } = req.body;

    const newItem = new Product({
        id,
        images,
        name,
        price,
        description,
        sizes,
    });

    try {
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        console.error('Error saving product:', error);
        res.status(400).json({ message: error.message });
    }
});

// GET all products
router.get('/products', async (req, res) => {
    try {
        const items = await Product.find();
        res.json(items);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: error.message });
    }
});

// GET product by ID
router.get('/products/:productId', async (req, res) => {
    try {
        // Inside your route handler, before querying:
        const { productId } = req.params; // Directly destructure `productId` from `req.params`

        // Check if `productId` is valid
        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: "Invalid or missing product ID" });
        }

        const item = await Product.findById(productId);
        if (!item) return res.status(404).json({ message: 'Product not found' });
        res.json(item);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: error.message });
    }
});

// POST route to add a review to a product
// POST route to add a review to a product
router.post('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params; // Extract productId directly from req.params
    const { author, rating, comment } = req.body;

    try {
        // Check if productId is valid
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: "Invalid or missing product ID" });
        }

        // Find the product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Create a new review
        const newReview = { author, rating, comment };

        // Push the new review to the product's reviews array
        product.reviews.push(newReview);

        // Save the updated product
        const updatedProduct = await product.save();
        res.status(201).json(updatedProduct);
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: error.message });
    }
});


export default router;
