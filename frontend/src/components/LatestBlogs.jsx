import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';

const LatestBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/blogs');
        if (res.ok) {
          const data = await res.json();
          // Take top 3
          setBlogs(data.slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestBlogs();
  }, []);

  return (
    <section className="py-24 bg-[#0b0f19] border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div className="space-y-4">
            <h2 className="text-orange-500 font-extrabold text-sm uppercase tracking-widest">Latest Blogs</h2>
            <p className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Read Our Recent Articles
            </p>
            <div className="w-16 h-1 bg-gradient-custom rounded-full"></div>
          </div>
          <Link
            to="/blogs"
            className="flex items-center space-x-2 text-orange-500 hover:text-orange-400 font-bold tracking-wide group transition-all"
          >
            <span>View All Blogs</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading articles...</div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No blog posts found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article
                key={blog._id}
                className="bg-[#070b12] border border-gray-900 rounded-2xl overflow-hidden shadow-lg group hover:border-orange-500/30 transition-all duration-300"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                  />
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-orange-500" />
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <User className="h-3 w-3 text-orange-500" />
                      <span>{blog.author}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white uppercase tracking-wide group-hover:text-orange-500 transition-colors line-clamp-1">
                    {blog.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {blog.content}
                  </p>

                  <div className="pt-2">
                    <Link
                      to="/blogs"
                      className="text-orange-500 hover:text-orange-400 font-semibold text-sm flex items-center space-x-1"
                    >
                      <span>Read More</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestBlogs;
