import React, { useState, useEffect } from 'react';
import { Calendar, User, X, BookOpen } from 'lucide-react';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/blogs');
        if (res.ok) {
          const data = await res.json();
          setBlogs(data);
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen py-16 bg-[#070b12] relative">
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-3.5 py-1 text-xs font-extrabold text-orange-500 uppercase tracking-widest">
            <BookOpen className="h-3 w-3" />
            <span>FITNESS ARTICLES</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
            FLEXFIT BLOGS
          </h1>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Expert opinions, research-based nutrition tips, and training regimes created by our certified coaches.
          </p>
          <div className="w-16 h-1 bg-gradient-custom mx-auto rounded-full mt-4"></div>
        </div>

        {loading ? (
          <div className="text-center py-24 text-gray-500">Loading blogs database...</div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-24 text-gray-500">No blog posts found. Check back later!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article
                key={blog._id}
                onClick={() => setSelectedBlog(blog)}
                className="bg-[#0b0f19] border border-gray-900 rounded-2xl overflow-hidden shadow-lg group hover:border-orange-500/30 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-all duration-500"
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

                    <h2 className="text-xl font-bold text-white uppercase tracking-wide group-hover:text-orange-500 transition-colors line-clamp-2">
                      {blog.title}
                    </h2>

                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                      {blog.content}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <span className="text-orange-500 text-sm font-bold group-hover:underline">Read Full Article →</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Blog Details Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070b12]/80 backdrop-blur-md">
          <div className="relative w-full max-w-3xl glass border border-gray-800 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-950/80 border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="overflow-y-auto">
              <div className="h-64 sm:h-80 w-full relative">
                <img
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] to-transparent"></div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex items-center space-x-6 text-xs text-gray-400 border-b border-gray-900 pb-4">
                  <span className="flex items-center space-x-1.5">
                    <Calendar className="h-4 w-4 text-orange-500" />
                    <span>{new Date(selectedBlog.createdAt).toLocaleDateString()}</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <User className="h-4 w-4 text-orange-500" />
                    <span>{selectedBlog.author}</span>
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  {selectedBlog.title}
                </h2>

                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedBlog.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
