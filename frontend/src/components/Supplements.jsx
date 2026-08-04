import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';

const Supplements = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          // Take top 3
          setProducts(data.slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestProducts();
  }, []);

  return (
    <section className="py-24 bg-[#070b12] border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div className="space-y-4">
            <h2 className="text-orange-500 font-extrabold text-sm uppercase tracking-widest">Featured Supplements</h2>
            <p className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Premium Sports Nutrition
            </p>
            <div className="w-16 h-1 bg-gradient-custom rounded-full"></div>
          </div>
          <Link
            to="/shop"
            className="flex items-center space-x-2 text-orange-500 hover:text-orange-400 font-bold tracking-wide group transition-all"
          >
            <span>Go to Shop</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No supplements found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-[#0b0f19] border border-gray-900 rounded-2xl p-6 flex flex-col justify-between hover:border-orange-500/30 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-xl h-48 bg-gray-950 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div>
                    <span className="text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/10">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-bold text-white uppercase mt-2 tracking-wide line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 text-sm mt-2 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-900 mt-6">
                  <span className="text-2xl font-black text-white">${product.price.toFixed(2)}</span>
                  <Link
                    to="/shop"
                    className="bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <ShoppingBag className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Supplements;
