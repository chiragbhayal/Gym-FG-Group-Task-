const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FlexFit Gym Management System API',
      version: '1.0.0',
      description: 'Interactive API Documentation & Testing Console. Register or Login to obtain a JWT token, then click the Authorize button at the top to test protected endpoints directly.',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local Development Server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token (obtained from /api/auth/login or /api/auth/register)'
        }
      },
      schemas: {
        RegisterInput: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'john@example.com' },
            password: { type: 'string', example: 'password123' }
          }
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', example: 'admin@gym.com' },
            password: { type: 'string', example: 'password123' }
          }
        },
        InquiryInput: {
          type: 'object',
          required: ['name', 'phone', 'age', 'goal', 'message'],
          properties: {
            name: { type: 'string', example: 'John Doe' },
            phone: { type: 'string', example: '+1 (555) 019-2834' },
            age: { type: 'number', example: 25 },
            goal: { type: 'string', example: 'Weight Loss' },
            message: { type: 'string', example: 'Interested in personal training coaching' }
          }
        },
        OrderInput: {
          type: 'object',
          required: ['productId', 'address'],
          properties: {
            productId: { type: 'string', example: '66b0b0000000000000000001' },
            address: { type: 'string', example: '123 Muscle Street, Fitness City, FC 90812' }
          }
        },
        ProductInput: {
          type: 'object',
          required: ['name', 'price', 'description'],
          properties: {
            name: { type: 'string', example: 'Whey Protein Isolate' },
            price: { type: 'number', example: 59.99 },
            description: { type: 'string', example: 'High quality whey protein for muscle recovery.' },
            category: { type: 'string', example: 'Protein' },
            image: { type: 'string', example: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=800' },
            inStock: { type: 'boolean', example: true }
          }
        },
        BlogInput: {
          type: 'object',
          required: ['title', 'content'],
          properties: {
            title: { type: 'string', example: 'Top 5 Exercises for Building Muscle' },
            content: { type: 'string', example: 'Here are the top 5 exercises you should include in your routine...' },
            image: { type: 'string', example: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800' },
            author: { type: 'string', example: 'Coach Alex' }
          }
        }
      }
    },
    paths: {
      '/api/health': {
        get: {
          tags: ['Health'],
          summary: 'System Health Check',
          responses: {
            200: { description: 'Server is healthy' }
          }
        }
      },
      '/api/auth/register': {
        post: {
          tags: ['Auth'],
          summary: 'Register a new user account',
          requestBody: {
            required: true,
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/RegisterInput' } }
            }
          },
          responses: {
            201: { description: 'User registered successfully with JWT token returned' },
            400: { description: 'User already exists or invalid data' }
          }
        }
      },
      '/api/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'Log in with existing credentials to receive JWT token',
          requestBody: {
            required: true,
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/LoginInput' } }
            }
          },
          responses: {
            200: { description: 'Login successful. Copy token value to use in Authorize header.' },
            401: { description: 'Invalid email or password' }
          }
        }
      },
      '/api/products': {
        get: {
          tags: ['Products'],
          summary: 'Get all supplement products',
          responses: {
            200: { description: 'List of all products' }
          }
        },
        post: {
          tags: ['Products'],
          summary: 'Create a new product (Admin Only)',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ProductInput' } }
            }
          },
          responses: {
            201: { description: 'Product created' },
            401: { description: 'Not authorized' },
            403: { description: 'Forbidden (Requires Admin)' }
          }
        }
      },
      '/api/products/{id}': {
        get: {
          tags: ['Products'],
          summary: 'Get single product by ID',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Product details' }, 404: { description: 'Product not found' } }
        },
        put: {
          tags: ['Products'],
          summary: 'Update product (Admin Only)',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/ProductInput' } } } },
          responses: { 200: { description: 'Product updated' } }
        },
        delete: {
          tags: ['Products'],
          summary: 'Delete product (Admin Only)',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Product deleted' } }
        }
      },
      '/api/blogs': {
        get: {
          tags: ['Blogs'],
          summary: 'Get all fitness blogs',
          responses: { 200: { description: 'List of blogs' } }
        },
        post: {
          tags: ['Blogs'],
          summary: 'Create a new blog article (Admin Only)',
          security: [{ bearerAuth: [] }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/BlogInput' } } } },
          responses: { 201: { description: 'Blog created' } }
        }
      },
      '/api/blogs/{id}': {
        get: {
          tags: ['Blogs'],
          summary: 'Get single blog post by ID',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Blog details' } }
        },
        put: {
          tags: ['Blogs'],
          summary: 'Update blog (Admin Only)',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/BlogInput' } } } },
          responses: { 200: { description: 'Blog updated' } }
        },
        delete: {
          tags: ['Blogs'],
          summary: 'Delete blog (Admin Only)',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Blog deleted' } }
        }
      },
      '/api/inquiries': {
        post: {
          tags: ['Inquiries'],
          summary: 'Submit a new gym membership inquiry (Protected User Route)',
          security: [{ bearerAuth: [] }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/InquiryInput' } } } },
          responses: { 201: { description: 'Inquiry submitted' } }
        },
        get: {
          tags: ['Inquiries'],
          summary: 'Get all membership inquiries (Admin Only)',
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'List of inquiries' } }
        }
      },
      '/api/inquiries/{id}': {
        delete: {
          tags: ['Inquiries'],
          summary: 'Delete inquiry (Admin Only)',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Inquiry deleted' } }
        }
      },
      '/api/orders': {
        post: {
          tags: ['Orders'],
          summary: 'Place a new supplement order (Protected User Route)',
          security: [{ bearerAuth: [] }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/OrderInput' } } } },
          responses: { 201: { description: 'Order placed successfully' } }
        },
        get: {
          tags: ['Orders'],
          summary: 'Get all user orders (Admin Only)',
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'List of all orders across users' } }
        }
      },
      '/api/orders/myorders': {
        get: {
          tags: ['Orders'],
          summary: 'Get order history for logged-in user (Protected User Route)',
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'My orders history' } }
        }
      },
      '/api/orders/{id}/status': {
        put: {
          tags: ['Orders'],
          summary: 'Update order status (Admin Only)',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['status'],
                  properties: { status: { type: 'string', enum: ['Pending', 'Shipped', 'Delivered'], example: 'Shipped' } }
                }
              }
            }
          },
          responses: { 200: { description: 'Order status updated' } }
        }
      },
      '/api/users': {
        get: {
          tags: ['Users'],
          summary: 'Get all registered users (Admin Only)',
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'List of registered users' } }
        }
      }
    }
  },
  apis: ['./server.js']
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwagger = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger API Documentation available at http://localhost:5000/api/docs');
};

module.exports = setupSwagger;
