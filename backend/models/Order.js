const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  price: { type: Number, required: true },
  address: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Shipped', 'Delivered'], default: 'Pending' }
}, {
  timestamps: true
});

orderSchema.pre('find', function (next) {
  this.sort({ createdAt: -1 });
  next();
});

orderSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Order', orderSchema);
