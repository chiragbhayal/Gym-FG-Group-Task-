const Inquiry = require('../models/Inquiry');
const mongoose = require('mongoose');

const createInquiry = async (req, res) => {
  const { name, phone, age, goal, message } = req.body;
  try {
    const inquiry = new Inquiry({
      name,
      phone,
      age,
      goal,
      message,
      user: req.user._id
    });
    const createdInquiry = await inquiry.save();
    res.status(201).json(createdInquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteInquiry = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid inquiry ID format' });
    }
    const inquiry = await Inquiry.findById(req.params.id);
    if (inquiry) {
      await inquiry.deleteOne();
      res.json({ message: 'Inquiry removed' });
    } else {
      res.status(404).json({ message: 'Inquiry not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createInquiry, getInquiries, deleteInquiry };
