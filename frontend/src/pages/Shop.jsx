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

  // Shipping Address Modal States
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // User's Order List States
  const [myOrders, setMyOrders] = useState([]);
  const [myOrdersOpen, setMyOrdersOpen] = useState(false);
  const [fetchingOrders, setFetchingOrders] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
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

  const fetchMyOrders = async () => {
    if (!token) return;
    setFetchingOrders(true);
    try {
      const res = await fetch('http://localhost:5000/api/orders/myorders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setMyOrders(await res.json());
      }
    } catch (err) {
      console.error('Error fetching user orders:', err);
    } finally {
      setFetchingOrders(false);
    }
  };

  const handleMyOrdersClick = () => {
    if (!user) {
      alert('You must be logged in to view your orders.');
      navigate('/login');
      return;
    }
    fetchMyOrders();
    setMyOrdersOpen(true);
  };

  const handleBuyClick = (product) => {
    if (!user) {
      alert('You must be logged in to purchase supplements.');
      navigate('/login');
      return;
    }
    setSelectedProduct(product);
    setAddressModalOpen(true);
  };

  const handleConfirmPurchase = async (e) => {
    e.preventDefault();
    if (!shippingAddress.trim()) {
      alert('Please enter a valid shipping address.');
      return;
    }
    setError('');

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId: selectedProduct._id, address: shippingAddress })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Order placement failed');
      }
      setPurchasedProduct(selectedProduct);
      setAddressModalOpen(false);
      setShippingAddress('');
      fetchMyOrders();
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
          <div className="w-16 h-1 bg-gradient-custom mx-auto rounded-full mt-4 mb-6"></div>
          {user && (
            <button
              onClick={handleMyOrdersClick}
              className="bg-gray-900 border border-gray-800 hover:bg-gray-800 text-orange-500 hover:text-orange-400 font-bold text-xs px-4 py-2.5 rounded-xl transition-all inline-flex items-center space-x-2"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>View My Orders</span>
            </button>
          )}
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
                      onClick={() => handleBuyClick(product)}
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

      {/* Address Prompt Modal */}
      {addressModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070b12]/80 backdrop-blur-md">
          <div className="w-full max-w-md glass border border-gray-800 p-8 rounded-2xl relative shadow-2xl space-y-6">
            <button
              onClick={() => setAddressModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-2 text-center">
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Delivery Address</h3>
              <p className="text-xs text-gray-500">Provide shipping details to complete supplement order</p>
            </div>

            <div className="bg-[#0b0f19] border border-gray-900 p-4 rounded-xl flex items-center justify-between text-xs">
              <span className="text-gray-400">Item: <strong>{selectedProduct.name}</strong></span>
              <span className="font-black text-orange-500">${selectedProduct.price.toFixed(2)}</span>
            </div>

            <form onSubmit={handleConfirmPurchase} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Shipping Address</label>
                <textarea
                  required
                  rows={3}
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Enter your street, house number, city, and zip code..."
                  className="w-full bg-[#0b0f19] border border-gray-800 focus:border-orange-500 text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-colors resize-none"
                ></textarea>
               </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setAddressModalOpen(false)}
                  className="bg-gray-900 border border-gray-800 hover:bg-gray-800 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2.5 rounded-lg transition-colors"
                >
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Orders Status Drawer/Modal */}
      {myOrdersOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070b12]/80 backdrop-blur-md">
          <div className="w-full max-w-2xl glass border border-gray-800 p-6 sm:p-8 rounded-2xl relative shadow-2xl max-h-[85vh] flex flex-col">
            <button
              onClick={() => setMyOrdersOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-2 text-center mb-6">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">My Supplements Orders</h3>
              <p className="text-xs text-gray-500">Track shipping & delivery status of your purchases</p>
            </div>

            <div className="overflow-y-auto space-y-4 flex-grow pr-2">
              {fetchingOrders ? (
                <p className="text-center text-xs text-gray-500 py-8">Fetching order records...</p>
              ) : myOrders.length === 0 ? (
                <p className="text-center text-xs text-gray-500 py-8">You haven't placed any orders yet.</p>
              ) : (
                myOrders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-[#0b0f19] border border-gray-900 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs"
                  >
                    <div className="flex items-center space-x-3">
                      {order.product?.image && (
                        <img
                          src={order.product.image}
                          alt={order.product.name}
                          className="w-12 h-12 object-cover rounded-lg border border-gray-800"
                        />
                      )}
                      <div>
                        <p className="font-bold text-white uppercase tracking-wide text-sm">{order.product?.name || 'Deleted Product'}</p>
                        <p className="text-gray-500 mt-1">
                          Address: <span className="text-gray-300 italic">{order.address}</span>
                        </p>
                        <p className="text-[10px] text-gray-500 mt-0.5">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                      <span className="font-extrabold text-orange-500 text-sm">${order.price?.toFixed(2)}</span>
                      
                      <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded border ${
                        order.status === 'Pending'
                          ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20 animate-pulse'
                          : order.status === 'Shipped'
                          ? 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                          : 'bg-green-500/10 text-green-400 border-green-500/20'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
