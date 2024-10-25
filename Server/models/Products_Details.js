import mongoose from 'mongoose';

// Define the Review schema
const reviewSchema = new mongoose.Schema({
  author: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
}, { _id: false }); // Disable automatic _id field for reviews

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String, required: true }], // Array of image URLs
  sizes: [{ type: String, required: true }],  // Array of available sizes
  reviews: [reviewSchema], // Array of review objects
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

export default Product;
