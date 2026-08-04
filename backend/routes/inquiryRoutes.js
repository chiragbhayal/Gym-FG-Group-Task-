const express = require('express');
const { createInquiry, getInquiries, deleteInquiry } = require('../controllers/inquiryController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .post(protect, createInquiry)
  .get(protect, admin, getInquiries);

router.route('/:id')
  .delete(protect, admin, deleteInquiry);

module.exports = router;
