const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

// Database connection initialized at the bottom of the file after seeder is defined

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic status check route
app.get('/', (req, res) => {
  res.send('Gym Management System API is running...');
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const productRoutes = require('./routes/productRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/products', productRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Seed database with dummy data if empty
const seedData = async () => {
  try {
    const Blog = require('./models/Blog');
    const Product = require('./models/Product');

    const blogCount = await Blog.countDocuments({});
    if (blogCount === 0) {
      await Blog.create([
        {
          title: 'The Ultimate Guide to Hypertrophy Training',
          content: 'Hypertrophy training focuses on muscle volume and growth. To achieve maximum results, aim for 3-5 sets of 8-12 repetitions using moderate to heavy weights. Maintain proper form, ensure a progressive overload by increasing weights over time, and complement your efforts with protein-rich meals.',
          image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800',
          author: 'Trainer Alex'
        },
        {
          title: '5 Pre-Workout Nutrition Habits for Maximum Energy',
          content: 'What you eat before exercising heavily influences your stamina. Aim for simple carbohydrates 30-60 minutes before training to supply fast-acting glucose, stay hydrated, keep fat and fiber content low to avoid digestive discomfort, and consider caffeine or creatine to boost performance.',
          image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800',
          author: 'Nutritionist Sarah'
        },
        {
          title: 'Why Muscle Growth Happens Outside the Gym',
          content: 'Workouts break down muscle tissue, but recovery is where repair and enlargement happen. Getting 7-9 hours of sound sleep supports protein synthesis and releases growth hormones. Remember, progress is built on consistency in rest days just as much as lifting days.',
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
          author: 'Coach Marcus'
        }
      ]);
      console.log('Dummy blogs seeded successfully.');
    }

    const productCount = await Product.countDocuments({});
    if (productCount === 0) {
      await Product.create([
        {
          name: '100% Whey Protein Isolate (Chocolate)',
          price: 59.99,
          description: 'Premium grass-fed whey protein isolate yielding 25g protein per serving. Zero artificial sweeteners, low carb, and highly bioavailable.',
          image: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=800',
          category: 'Protein',
          inStock: true
        },
        {
          name: 'Micronized Creatine Monohydrate',
          price: 24.99,
          description: 'Pure, unflavored micronized creatine monohydrate to improve strength, power, and muscle volume during intense workouts.',
          image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800',
          category: 'Performance',
          inStock: true
        },
        {
          name: 'Pre-Workout Pump Formula (Blue Raspberry)',
          price: 34.99,
          description: 'High-stimulant pre-workout designed to amplify energy, skin-splitting pumps, and intense focus with beta-alanine and L-Citrulline.',
          image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800',
          category: 'Pre-Workout',
          inStock: true
        },
        {
          name: 'Essential BCAAs 2:1:1 (Watermelon)',
          price: 29.99,
          description: 'High-quality branched chain amino acids to support post-workout muscle recovery, decrease soreness, and promote hydration.',
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
          category: 'Recovery',
          inStock: true
        }
      ]);
      console.log('Dummy products seeded successfully.');
    }
  } catch (error) {
    console.error('Error seeding initial data:', error.message);
  }
};

// Start seeding after database connection is successful
connectDB().then(() => {
  seedData();
});

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});
