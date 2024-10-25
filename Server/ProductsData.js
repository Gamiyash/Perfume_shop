import mongoose from 'mongoose';
import Product from './models/Products_Details.js'; // Ensure this path is correct
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
mongoose.connect(`${process.env.MONGO_URI}/Perfume_Shop`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected');
    return Product.deleteMany(); // Clear existing data
  })
  .then(() => {
    // Array of products to insert
    const products = [
      {
        name: "Floral Bliss",
        description: "A delightful blend of rose and jasmine, creating a romantic and feminine fragrance.",
        price: 89.99,
        images: ["../../Perfume1.jpg","../../Perfume2.jpg","../../Perfume3.jpg","../../Perfume4.jpg","../../Perfume5.jpg"],
        sizes: ["30ml", "50ml", "100ml"],
        reviews: [
          { author: 'Jane Doe', rating: 5, comment: "Absolutely love this scent! It's become my go-to perfume." }
        ]
      },
      {
        name: "Ocean Breeze",
        description: "Fresh and invigorating scent of the sea.",
        price: 79.99,
        images: ["../../Perfume2.jpg","../../Perfume1.jpg","../../Perfume3.jpg","../../Perfume4.jpg","../../Perfume5.jpg"],
        sizes: ["30ml", "50ml", "100ml"],
        reviews: []
      },
      {
        name: "Woody Elegance",
        description: "Sophisticated blend of sandalwood and cedar.",
        price: 99.99,
        images: ["../../Perfume3.jpg","../../Perfume2.jpg","../../Perfume1.jpg","../../Perfume4.jpg","../../Perfume5.jpg"],
        sizes: ["30ml", "50ml", "100ml"],
        reviews: []
      },
      {
        name: "Citrus Spark",
        description: "Energizing mix of lemon and bergamot.",
        price: 69.99,
        images: ["../../Perfume4.jpg","../../Perfume2.jpg","../../Perfume3.jpg","../../Perfume1.jpg","../../Perfume5.jpg"],
        sizes: ["30ml", "50ml", "100ml"],
        reviews: []
      },
      {
        name: "Vanilla Dream",
        description: "Sweet and comforting vanilla fragrance.",
        price: 84.99,
        images: ["../../Perfume5.jpg","../../Perfume2.jpg","../../Perfume3.jpg","../../Perfume4.jpg","../../Perfume1.jpg"],
        sizes: ["30ml", "50ml", "100ml"],
        reviews: []
      }
    ];

    // Insert products into the database
    return Product.insertMany(products);
  })
  .then(() => {
    console.log('Products inserted');
    // Close the connection after the operation is complete
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error:', err);
    // Close the connection in case of error
    mongoose.connection.close();
  });
