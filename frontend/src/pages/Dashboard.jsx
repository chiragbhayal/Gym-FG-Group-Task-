import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Lock, FileText, ShoppingBag, Mail, Users, Plus, Trash2, Edit2, Check, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('inquiries');

  // Lists
  const [inquiries, setInquiries] = useState([]);
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  // Loadings & Errors
  const [loading, setLoading] = useState(true);
  const [actionError, setActionError] = useState('');

  // Modals state
  const [productModal, setProductModal] = useState({ open: false, isEdit: false, data: null });
  const [blogModal, setBlogModal] = useState({ open: false, isEdit: false, data: null });

  // Form inputs
  const [productForm, setProductForm] = useState({ name: '', price: '', description: '', category: '', image: '', inStock: true });
  const [blogForm, setBlogForm] = useState({ title: '', content: '', author: '', image: '' });

  // Fetch functions
  const fetchData = async () => {
    if (!token || user?.role !== 'admin') return;
    setLoading(true);
    try {
      // Inquiries
      const resInq = await fetch('http://localhost:5000/api/inquiries', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resInq.ok) setInquiries(await resInq.json());

      // Products
      const resProd = await fetch('http://localhost:5000/api/products');
      if (resProd.ok) setProducts(await resProd.json());

      // Blogs
      const resBlog = await fetch('http://localhost:5000/api/blogs');
      if (resBlog.ok) setBlogs(await resBlog.json());

      // Users
      const resUsers = await fetch('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resUsers.ok) setUsers(await resUsers.json());

      // Orders
      const resOrders = await fetch('http://localhost:5000/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resOrders.ok) setOrders(await resOrders.json());

    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, user]);

  // Actions: Orders
  const handleStatusChange = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setOrders(orders.map((o) => (o._id === id ? { ...o, status } : o)));
      } else {
        const data = await res.json();
        setActionError(data.message || 'Failed to update status');
      }
    } catch (err) {
      setActionError(err.message);
    }
  };

  // Actions: Inquiries
  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/inquiries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setInquiries(inquiries.filter((inq) => inq._id !== id));
      } else {
        const data = await res.json();
        setActionError(data.message || 'Failed to delete inquiry');
      }
    } catch (err) {
      setActionError(err.message);
    }
  };

  // Actions: Products
  const openProductCreate = () => {
    setProductForm({ name: '', price: '', description: '', category: 'Protein', image: '', inStock: true });
    setProductModal({ open: true, isEdit: false, data: null });
  };

  const openProductEdit = (product) => {
    setProductForm({
      name: product.name,
      price: product.price,
      description: product.description || '',
      category: product.category || 'Protein',
      image: product.image || '',
      inStock: product.inStock
    });
    setProductModal({ open: true, isEdit: true, data: product });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setActionError('');
    const method = productModal.isEdit ? 'PUT' : 'POST';
    const url = productModal.isEdit
      ? `http://localhost:5000/api/products/${productModal.data._id}`
      : 'http://localhost:5000/api/products';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productForm)
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Product save failed');
      }

      setProductModal({ open: false, isEdit: false, data: null });
      fetchData();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setProducts(products.filter((p) => p._id !== id));
      } else {
        const data = await res.json();
        setActionError(data.message || 'Failed to delete product');
      }
    } catch (err) {
      setActionError(err.message);
    }
  };

  // Actions: Blogs
  const openBlogCreate = () => {
    setBlogForm({ title: '', content: '', author: user?.name || 'Admin', image: '' });
    setBlogModal({ open: true, isEdit: false, data: null });
  };

  const openBlogEdit = (blog) => {
    setBlogForm({
      title: blog.title,
      content: blog.content,
      author: blog.author || 'Admin',
      image: blog.image || ''
    });
    setBlogModal({ open: true, isEdit: true, data: blog });
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setActionError('');
    const method = blogModal.isEdit ? 'PUT' : 'POST';
    const url = blogModal.isEdit
      ? `http://localhost:5000/api/blogs/${blogModal.data._id}`
      : 'http://localhost:5000/api/blogs';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(blogForm)
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Blog save failed');
      }

      setBlogModal({ open: false, isEdit: false, data: null });
      fetchData();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Delete this blog post?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setBlogs(blogs.filter((b) => b._id !== id));
      } else {
        const data = await res.json();
        setActionError(data.message || 'Failed to delete blog');
      }
    } catch (err) {
      setActionError(err.message);
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#070b12] relative">
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        <div className="max-w-md w-full space-y-6 glass p-8 rounded-2xl border border-gray-800 text-center relative z-10">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center">
              <Lock className="h-8 w-8" />
            </div>
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">Access Denied</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            This dashboard contains sensitive administration tools and is restricted to admin accounts only.
          </p>
          <div className="pt-4">
            <Link
              to="/"
              className="bg-gradient-custom hover-gradient text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-orange-500/10"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-[#070b12] relative">
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-900 pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tight">Admin Dashboard</h1>
            <p className="text-xs text-gray-500 mt-1">Hello, {user.name}. Manage gym activity database.</p>
          </div>
        </div>

        {actionError && (
          <div className="bg-red-600/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span>{actionError}</span>
          </div>
        )}

        {/* Tab Controls */}
        <div className="flex flex-wrap border-b border-gray-900 gap-2">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center space-x-2 px-6 py-3.5 border-b-2 font-bold text-sm tracking-wide uppercase transition-all ${
              activeTab === 'inquiries'
                ? 'border-orange-500 text-orange-500 bg-orange-500/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Mail className="h-4 w-4" />
            <span>Inquiries ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center space-x-2 px-6 py-3.5 border-b-2 font-bold text-sm tracking-wide uppercase transition-all ${
              activeTab === 'products'
                ? 'border-orange-500 text-orange-500 bg-orange-500/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Products ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`flex items-center space-x-2 px-6 py-3.5 border-b-2 font-bold text-sm tracking-wide uppercase transition-all ${
              activeTab === 'blogs'
                ? 'border-orange-500 text-orange-500 bg-orange-500/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Blogs ({blogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center space-x-2 px-6 py-3.5 border-b-2 font-bold text-sm tracking-wide uppercase transition-all ${
              activeTab === 'users'
                ? 'border-orange-500 text-orange-500 bg-orange-500/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Users ({users.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center space-x-2 px-6 py-3.5 border-b-2 font-bold text-sm tracking-wide uppercase transition-all ${
              activeTab === 'orders'
                ? 'border-orange-500 text-orange-500 bg-orange-500/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Orders ({orders.length})</span>
          </button>
        </div>

        {/* Tab Content panels */}
        {loading ? (
          <div className="text-center py-24 text-gray-500">Loading database tables...</div>
        ) : (
          <div className="space-y-6">
            {/* INQUIRIES TAB */}
            {activeTab === 'inquiries' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white uppercase tracking-wider">Gym Inquiries List</h2>
                {inquiries.length === 0 ? (
                  <p className="text-gray-500 text-sm py-8">No user inquiries found.</p>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {inquiries.map((inq) => (
                      <div key={inq._id} className="bg-[#0b0f19] border border-gray-900 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="text-white font-extrabold text-lg">{inq.name}</span>
                            <span className="bg-orange-500/10 border border-orange-500/20 text-orange-400 px-2.5 py-0.5 rounded-md text-xs font-bold uppercase">
                              Age: {inq.age}
                            </span>
                            <span className="bg-red-500/10 border border-red-500/20 text-red-400 px-2.5 py-0.5 rounded-md text-xs font-bold uppercase">
                              Goal: {inq.goal}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                            "{inq.message}"
                          </p>
                          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                            <span>Phone: <strong>{inq.phone}</strong></span>
                            <span>Submitted by: <strong>{inq.user?.name || 'Deleted Account'} ({inq.user?.email || 'N/A'})</strong></span>
                            <span>Date: {new Date(inq.createdAt || inq.updatedAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteInquiry(inq._id)}
                          className="bg-red-600/10 border border-red-500/20 text-red-400 hover:bg-red-600 hover:text-white p-2.5 rounded-xl transition-all flex-shrink-0"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PRODUCTS TAB */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white uppercase tracking-wider">Supplements Stock</h2>
                  <button
                    onClick={openProductCreate}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center space-x-2 text-sm"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Supplement</span>
                  </button>
                </div>

                {products.length === 0 ? (
                  <p className="text-gray-500 text-sm py-8">No products found.</p>
                ) : (
                  <div className="overflow-x-auto border border-gray-900 rounded-2xl bg-[#0b0f19]">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-[#070b12] text-xs font-bold text-gray-400 border-b border-gray-900 uppercase">
                        <tr>
                          <th className="px-6 py-4">Item details</th>
                          <th className="px-6 py-4">Category</th>
                          <th className="px-6 py-4">Price</th>
                          <th className="px-6 py-4">Stock</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-900">
                        {products.map((product) => (
                          <tr key={product._id} className="hover:bg-gray-950/20 transition-colors">
                            <td className="px-6 py-4 flex items-center space-x-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-10 h-10 object-cover rounded-lg bg-gray-900 border border-gray-800"
                              />
                              <div>
                                <p className="font-bold text-white uppercase tracking-wide">{product.name}</p>
                                <p className="text-xs text-gray-500 max-w-sm truncate mt-0.5">{product.description}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase">{product.category}</td>
                            <td className="px-6 py-4 font-bold text-orange-500">${product.price.toFixed(2)}</td>
                            <td className="px-6 py-4">
                              {product.inStock ? (
                                <span className="bg-green-500/10 text-green-400 border border-green-500/20 text-xs px-2 py-0.5 rounded font-bold uppercase">In Stock</span>
                              ) : (
                                <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-xs px-2 py-0.5 rounded font-bold uppercase">Out of Stock</span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-right space-x-2">
                              <button
                                onClick={() => openProductEdit(product)}
                                className="text-orange-500 hover:text-orange-400 bg-orange-500/10 border border-orange-500/20 p-2 rounded-lg transition-colors inline-block"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product._id)}
                                className="text-red-500 hover:text-red-400 bg-red-500/10 border border-red-500/20 p-2 rounded-lg transition-colors inline-block"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* BLOGS TAB */}
            {activeTab === 'blogs' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white uppercase tracking-wider">Blog Articles</h2>
                  <button
                    onClick={openBlogCreate}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center space-x-2 text-sm"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Blog Post</span>
                  </button>
                </div>

                {blogs.length === 0 ? (
                  <p className="text-gray-500 text-sm py-8">No articles found.</p>
                ) : (
                  <div className="overflow-x-auto border border-gray-900 rounded-2xl bg-[#0b0f19]">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-[#070b12] text-xs font-bold text-gray-400 border-b border-gray-900 uppercase">
                        <tr>
                          <th className="px-6 py-4">Title & Details</th>
                          <th className="px-6 py-4">Author</th>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-900">
                        {blogs.map((blog) => (
                          <tr key={blog._id} className="hover:bg-gray-950/20 transition-colors">
                            <td className="px-6 py-4 flex items-center space-x-3">
                              <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-12 h-10 object-cover rounded-lg bg-gray-900 border border-gray-800"
                              />
                              <div>
                                <p className="font-bold text-white uppercase tracking-wide max-w-md truncate">{blog.title}</p>
                                <p className="text-xs text-gray-500 max-w-sm truncate mt-0.5">{blog.content}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-xs font-semibold text-gray-400">{blog.author}</td>
                            <td className="px-6 py-4 text-xs text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</td>
                            <td className="px-6 py-4 text-right space-x-2">
                              <button
                                onClick={() => openBlogEdit(blog)}
                                className="text-orange-500 hover:text-orange-400 bg-orange-500/10 border border-orange-500/20 p-2 rounded-lg transition-colors inline-block"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteBlog(blog._id)}
                                className="text-red-500 hover:text-red-400 bg-red-500/10 border border-red-500/20 p-2 rounded-lg transition-colors inline-block"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* USERS TAB */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white uppercase tracking-wider">Registered Accounts</h2>
                {users.length === 0 ? (
                  <p className="text-gray-500 text-sm py-8">No registered accounts found.</p>
                ) : (
                  <div className="overflow-x-auto border border-gray-900 rounded-2xl bg-[#0b0f19]">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-[#070b12] text-xs font-bold text-gray-400 border-b border-gray-900 uppercase">
                        <tr>
                          <th className="px-6 py-4">Name</th>
                          <th className="px-6 py-4">Email</th>
                          <th className="px-6 py-4">Account ID</th>
                          <th className="px-6 py-4">Role</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-900">
                        {users.map((u) => (
                          <tr key={u._id} className="hover:bg-gray-950/20 transition-colors">
                            <td className="px-6 py-4 font-bold text-white">{u.name}</td>
                            <td className="px-6 py-4 text-gray-400">{u.email}</td>
                            <td className="px-6 py-4 text-xs font-mono text-gray-500">{u._id}</td>
                            <td className="px-6 py-4">
                              <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded border ${
                                u.role === 'admin'
                                  ? 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                                  : 'bg-gray-900 text-gray-400 border-gray-800'
                              }`}>
                                {u.role}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white uppercase tracking-wider">Supplement Orders</h2>
                {orders.length === 0 ? (
                  <p className="text-gray-500 text-sm py-8">No product orders found.</p>
                ) : (
                  <div className="overflow-x-auto border border-gray-900 rounded-2xl bg-[#0b0f19]">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-[#070b12] text-xs font-bold text-gray-400 border-b border-gray-900 uppercase">
                        <tr>
                          <th className="px-6 py-4">User</th>
                          <th className="px-6 py-4">Product</th>
                          <th className="px-6 py-4">Price</th>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-900">
                        {orders.map((order) => (
                          <tr key={order._id} className="hover:bg-gray-950/20 transition-colors">
                            <td className="px-6 py-4">
                              <p className="font-bold text-white">{order.user?.name || 'Deleted User'}</p>
                              <p className="text-xs text-gray-500">{order.user?.email || 'N/A'}</p>
                            </td>
                            <td className="px-6 py-4 flex items-center space-x-3">
                              {order.product?.image && (
                                <img
                                  src={order.product.image}
                                  alt={order.product.name}
                                  className="w-10 h-10 object-cover rounded-lg bg-gray-900 border border-gray-800"
                                />
                              )}
                              <div>
                                <p className="font-semibold text-white uppercase tracking-wide">{order.product?.name || 'Deleted Product'}</p>
                                <p className="text-xs text-gray-500 uppercase">{order.product?.category || 'N/A'}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4 font-bold text-orange-500">${order.price?.toFixed(2)}</td>
                            <td className="px-6 py-4 text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td className="px-6 py-4">
                              <select
                                value={order.status}
                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                className="bg-[#070b12] border border-gray-800 focus:border-orange-500 text-white rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:outline-none transition-colors cursor-pointer"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* PRODUCT SUBMISSION MODAL */}
      {productModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070b12]/80 backdrop-blur-md">
          <div className="w-full max-w-md glass border border-gray-800 p-8 rounded-2xl relative shadow-2xl">
            <h3 className="text-xl font-black text-white uppercase tracking-tight mb-6">
              {productModal.isEdit ? 'Edit Product' : 'Add New Supplement'}
            </h3>

            <form onSubmit={handleProductSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Product Name</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Pure BCAA recovery"
                  className="w-full bg-[#0b0f19] border border-gray-800 focus:border-orange-500 text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) })}
                    placeholder="e.g. 29.99"
                    className="w-full bg-[#0b0f19] border border-gray-800 focus:border-orange-500 text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full bg-[#0b0f19] border border-gray-800 focus:border-orange-500 text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Protein">Protein</option>
                    <option value="Performance">Performance</option>
                    <option value="Pre-Workout">Pre-Workout</option>
                    <option value="Recovery">Recovery</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Image Link</label>
                <input
                  type="url"
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  placeholder="https://unsplash.com/mockup-image-link"
                  className="w-full bg-[#0b0f19] border border-gray-800 focus:border-orange-500 text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Description</label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Add item details and dosage specs..."
                  className="w-full bg-[#0b0f19] border border-gray-800 focus:border-orange-500 text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={productForm.inStock}
                  onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                  className="w-4 h-4 bg-[#0b0f19] border-gray-800 text-orange-500 focus:ring-0 focus:ring-offset-0 rounded cursor-pointer"
                />
                <label htmlFor="inStock" className="text-xs font-bold text-gray-300 uppercase tracking-wider cursor-pointer">Item is In-Stock</label>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-900">
                <button
                  type="button"
                  onClick={() => setProductModal({ open: false, isEdit: false, data: null })}
                  className="bg-gray-900 border border-gray-800 hover:bg-gray-800 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2.5 rounded-lg transition-colors"
                >
                  Save Supplement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BLOG SUBMISSION MODAL */}
      {blogModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070b12]/80 backdrop-blur-md">
          <div className="w-full max-w-lg glass border border-gray-800 p-8 rounded-2xl relative shadow-2xl">
            <h3 className="text-xl font-black text-white uppercase tracking-tight mb-6">
              {blogModal.isEdit ? 'Edit Blog Post' : 'Write New Article'}
            </h3>

            <form onSubmit={handleBlogSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Article Title</label>
                <input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  placeholder="e.g. 5 Habits of Shredded Bodybuilders"
                  className="w-full bg-[#0b0f19] border border-gray-800 focus:border-orange-500 text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Author</label>
                  <input
                    type="text"
                    required
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    placeholder="Coach Marcus"
                    className="w-full bg-[#0b0f19] border border-gray-800 focus:border-orange-500 text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Image Link</label>
                  <input
                    type="url"
                    value={blogForm.image}
                    onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                    placeholder="https://unsplash.com/mockup-image"
                    className="w-full bg-[#0b0f19] border border-gray-800 focus:border-orange-500 text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Content Body</label>
                <textarea
                  rows={6}
                  required
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  placeholder="Draft the body paragraphs of the fitness guide here..."
                  className="w-full bg-[#0b0f19] border border-gray-800 focus:border-orange-500 text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-900">
                <button
                  type="button"
                  onClick={() => setBlogModal({ open: false, isEdit: false, data: null })}
                  className="bg-gray-900 border border-gray-800 hover:bg-gray-800 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2.5 rounded-lg transition-colors"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
