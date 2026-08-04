const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String, default: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=800' },
  category: { type: String, default: 'Supplements' },
  inStock: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
