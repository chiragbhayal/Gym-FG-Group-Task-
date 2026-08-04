import React, { useState, useEffect, useContext } from 'react';
import { ShoppingBag, X, CheckCircle, Award } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Shop = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchasedProduct, setPurchasedProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleBuy = async (product) => {
    if (!user) {
      alert('You must be logged in to purchase supplements.');
      navigate('/login');
      return;
    }
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId: product._id })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Order placement failed');
      }
      setPurchasedProduct(product);
    } catch (err) {
      alert(err.message || 'Failed to place order');
    }
  };

  return (
    <div className="min-h-screen py-16 bg-[#070b12] relative">
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-3.5 py-1 text-xs font-extrabold text-orange-500 uppercase tracking-widest">
            <Award className="h-3 w-3" />
            <span>FLEXFIT DISPENSARY</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
            SUPPLEMENT SHOP
          </h1>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Fuel your gains with 100% authentic, premium quality protein shakes, amino acids, and strength boosters.
          </p>
          <div className="w-16 h-1 bg-gradient-custom mx-auto rounded-full mt-4"></div>
        </div>

        {loading ? (
          <div className="text-center py-24 text-gray-500">Loading shop inventory...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 text-gray-500">No supplements are currently in stock. Check back soon!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-[#0b0f19] border border-gray-900 rounded-2xl p-6 flex flex-col justify-between hover:border-orange-500/30 transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-xl h-48 bg-gray-950 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div>
                    <span className="text-orange-500 text-[10px] font-bold uppercase tracking-widest bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/10">
                      {product.category}
                    </span>
                    <h3 className="text-base font-bold text-white uppercase mt-3 tracking-wide line-clamp-1 group-hover:text-orange-500 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 text-xs mt-2 line-clamp-3 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-900 mt-6">
                  <span className="text-xl font-black text-white">${product.price.toFixed(2)}</span>
                  
                  {product.inStock ? (
                    <button
                      onClick={() => handleBuy(product)}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs px-3 py-2 rounded-lg transition-colors flex items-center space-x-1"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span>Buy Now</span>
                    </button>
                  ) : (
                    <span className="text-red-500 text-xs font-bold uppercase">Out of Stock</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mock Purchase Success Modal */}
      {purchasedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070b12]/80 backdrop-blur-md">
          <div className="relative w-full max-w-md glass border border-gray-800 p-8 rounded-2xl text-center space-y-6 shadow-2xl">
            <button
              onClick={() => setPurchasedProduct(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 animate-bounce" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Order Placed!</h2>
              <p className="text-xs text-gray-500">Thank you for ordering with FlexFit Supplements.</p>
            </div>

            <div className="bg-[#0b0f19] border border-gray-900 p-4 rounded-xl text-left space-y-3">
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>Product Name:</span>
                <span className="font-bold text-white max-w-[180px] truncate">{purchasedProduct.name}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>Amount Paid:</span>
                <span className="font-bold text-orange-500">${purchasedProduct.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>Estimated Delivery:</span>
                <span className="font-semibold text-white">2-3 Business Days</span>
              </div>
            </div>

            <button
              onClick={() => setPurchasedProduct(null)}
              className="w-full bg-gradient-custom hover-gradient text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-orange-500/10"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
