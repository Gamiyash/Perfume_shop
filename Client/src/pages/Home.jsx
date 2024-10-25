import { Link } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaBars, FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
        setProducts(response.data);
        console.log('Data retrieved:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-md backdrop-blur supports-[backdrop-filter]:bg-white/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link className="flex items-center" to="/">
                <img src="./logo.jpg" alt="Perfume Shop Logo" className="h-10 w-auto rounded-md" />
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/products" className="text-gray-700 hover:text-gray-900 transition-colors">Products</Link>
              <Link to="/collections" className="text-gray-700 hover:text-gray-900 transition-colors">Collections</Link>
              <Link to="/about" className="text-gray-700 hover:text-gray-900 transition-colors">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-gray-900 transition-colors">Contact</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button className="p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <FaShoppingCart className="h-6 w-6" />
                <span className="sr-only">Shopping Cart</span>
              </button>
              <button 
                className="md:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <FaBars className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white py-2">
            <div className="container mx-auto px-4 space-y-2">
              <Link to="/products" className="block py-2 text-gray-700 hover:text-gray-900 transition-colors">Products</Link>
              <Link to="/collections" className="block py-2 text-gray-700 hover:text-gray-900 transition-colors">Collections</Link>
              <Link to="/about" className="block py-2 text-gray-700 hover:text-gray-900 transition-colors">About</Link>
              <Link to="/contact" className="block py-2 text-gray-700 hover:text-gray-900 transition-colors">Contact</Link>
              <div className="relative mt-2">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
        )}
      </header>
      <main className="flex-1">
        <section className="relative w-full py-24 md:py-32 lg:py-48 bg-[url('./Perfume_Bg.webp')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">
                Discover Your Signature Scent
              </h1>
              <p className="text-xl sm:text-2xl text-gray-200 mb-8">
                Explore our curated collection of exquisite fragrances and find the perfect perfume that speaks to you.
              </p>
              <Link to="/products">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </section>
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Fragrances</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((perfume) => (
                <Link to={`/product/${perfume._id}`} key={perfume._id} className="group">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-xl">
                    <div className="relative pb-[100%]">
                      <img
                        alt={perfume.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        src={perfume.images[0]}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">{perfume.name}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{perfume.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-900">${perfume.price.toFixed(2)}</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className="w-4 h-4 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Link to="/" className="flex items-center mb-4">
                <img src="./logo.jpg" alt="Perfume Shop Logo" className="h-10 w-auto rounded-md mr-2" />
                <span className="text-xl font-bold">Perfume Shop</span>
              </Link>
              <p className="text-gray-400">Discover your perfect scent</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <nav className="space-y-2">
                <Link to="/products" className="block text-gray-400 hover:text-white transition-colors">Products</Link>
                <Link to="/collections" className="block text-gray-400 hover:text-white transition-colors">Collections</Link>
                <Link to="/about" className="block text-gray-400 hover:text-white transition-colors">About Us</Link>
                <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors">Contact</Link>
              </nav>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <nav className="space-y-2">
                <Link to="/terms" className="block text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
                <Link to="/privacy" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              </nav>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 Perfume Shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}