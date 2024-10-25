import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaBars, FaChevronLeft, FaChevronRight, FaWhatsapp, FaTwitter, FaFacebook } from 'react-icons/fa';
import axios from 'axios';

export default function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSharePanelOpen, setIsSharePanelOpen] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`);
        setProduct(response.data);
        setSelectedSize(response.data.sizes[0]);
      } catch (error) {
        setError('Failed to load product data');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.comment.trim()) {
      alert('Please enter a comment before submitting.');
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}/reviews`,
        { author: "Anonymous", rating: newReview.rating, comment: newReview.comment }
      );
      console.log('Review submitted:', response.data);
      setNewReview({ rating: 5, comment: '' });
      // Instead of reloading, update the product state with the new review
      setProduct(prevProduct => ({
        ...prevProduct,
        reviews: [...prevProduct.reviews, response.data]
      }));
      window.location.reload()
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('There was an error submitting your review. Please try again.');
    }
  };

  const handleToggleSharePanel = () => {
    setIsSharePanelOpen((prev) => !prev);
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  const productUrl = `${window.location.origin}/products/${productId}`;
  const shareText = `Check out this product: ${product?.name}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}%0A${encodeURIComponent(productUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(productUrl)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <FaShoppingCart className="h-6 w-6 text-gray-800" />
              <span className="font-bold text-xl text-gray-800">Perfume Shop</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-600 hover:text-gray-800">Home</Link>
              <Link to="/products" className="text-gray-600 hover:text-gray-800">Products</Link>
              <Link to="/collections" className="text-gray-600 hover:text-gray-800">Collections</Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-800">About</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-800">Contact</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <input
                placeholder="Search products..."
                className="hidden md:block border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition duration-300">
                <FaShoppingCart className="h-5 w-5" />
              </button>
              <button className="md:hidden">
                <FaBars className="h-6 w-6 text-gray-800" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="relative aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={product.images[currentImageIndex]}
                  alt={`${product.name} - Image ${currentImageIndex + 1}`}
                  className="object-cover w-full h-full"
                />
                <button
                  onClick={handlePreviousImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300"
                >
                  <FaChevronLeft className="h-6 w-6 text-gray-800" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300"
                >
                  <FaChevronRight className="h-6 w-6 text-gray-800" />
                </button>
              </div>
              <div className="flex justify-center space-x-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      currentImageIndex === index ? 'bg-gray-800' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviews.length} reviews)</span>
              </div>
              <p className="text-3xl font-bold text-gray-800">${product.price.toFixed(2)}</p>
              <p className="text-gray-600">{product.description}</p>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Size:</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        selectedSize === size
                          ? 'bg-gray-800 text-white'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      } transition duration-300`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <button className="w-full bg-gray-800 text-white py-3 rounded-md hover:bg-gray-700 transition duration-300">
                Add to Cart
              </button>
              <button
                className="w-full border border-gray-300 py-3 rounded-md hover:bg-gray-100 transition duration-300 flex justify-center items-center space-x-2"
                onClick={handleToggleSharePanel}
              >
                <span>Share</span>
                <FaShoppingCart className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>
            <div className="space-y-6">
              {product.reviews.map((review, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-bold text-gray-800">{review.author}</h3>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Write a Review</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating:</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        className={`p-2 rounded-md ${
                          newReview.rating >= rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        onClick={() => setNewReview({ ...newReview, rating })}
                      >
                        <FaStar className="w-6 h-6" />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Review:
                  </label>
                  <textarea
                    id="comment"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Write your review here..."
                    rows={4}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition duration-300"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link to="/" className="flex items-center space-x-2">
                <FaShoppingCart className="h-6 w-6" />
                <span className="font-bold text-xl">Perfume Shop</span>
              </Link>
            </div>
            <nav className="flex flex-wrap justify-center space-x-4 md:space-x-8">
              <Link to="/" className="hover:text-gray-300 transition duration-300">Home</Link>
              <Link to="/products" className="hover:text-gray-300 transition duration-300">Products</Link>
              <Link to="/about" className="hover:text-gray-300 transition duration-300">About</Link>
              <Link to="/contact" className="hover:text-gray-300 transition duration-300">Contact</Link>
            </nav>
          </div>
          <div className="mt-8 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Perfume Shop. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Share Panel */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg transition-transform duration-300 ${
          isSharePanelOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Share this product</h3>
            <button  onClick={handleToggleSharePanel} className="text-gray-600 hover:text-gray-800">
              Close
            </button>
          </div>
          <div className="flex justify-center space-x-6">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              <FaWhatsapp className="h-5 w-5" />
              <span>WhatsApp</span>
            </a>
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition duration-300"
            >
              <FaTwitter className="h-5 w-5" />
              <span>Twitter</span>
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              <FaFacebook className="h-5 w-5" />
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}