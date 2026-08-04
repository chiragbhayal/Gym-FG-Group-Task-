# Postman Setup for Backend

1. Start the backend server:
   - `cd backend`
   - `npm run dev`
2. Import the collection file: `backend/postman/Gym_Management.postman_collection.json`
3. Import the environment file: `backend/postman/Gym_Management.postman_environment.json`
4. Run the authentication requests first, then copy the returned JWT token into the matching environment variable.
5. Use the created IDs from responses to populate `blogId`, `productId`, `inquiryId`, and `orderId`.
