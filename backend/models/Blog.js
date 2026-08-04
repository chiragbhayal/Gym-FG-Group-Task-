const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, default: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800' },
  author: { type: String, default: 'Admin' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema);
