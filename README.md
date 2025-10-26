# Express.js RESTful API Assignment

This assignment focuses on building a RESTful API using Express.js, implementing proper routing, middleware, and error handling.

## Assignment Overview

You will:
1. Set up an Express.js server
2. Create RESTful API routes for a product resource
3. Implement custom middleware for logging, authentication, and validation
4. Add comprehensive error handling
5. Develop advanced features like filtering, pagination, and search

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/PLP-MERN-Stack-Development/express-js-server-side-framework-Favgirlfr.git
   ```
2. Navigate to the project directory:
   ```bash
   cd express-js-server-side-framework-Favgirlfr
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
5. Run the server:
   ```bash
   npm start
   ```

## Project Structure

- `server.js`: Main Express.js server file
- `Week2-Assignment.md`: Detailed assignment instructions and requirements
- `.env`: Environment variables configuration (create from .env.example)
- `.env.example`: Example environment variables template
- `package.json`: Project dependencies and scripts
- `node_modules/`: Installed dependencies

## Requirements

- Node.js (v18 or higher)
- npm or yarn
- Postman, Insomnia, or curl for API testing

## API Endpoints

The API supports the following endpoints:

### Products

- `GET /api/products`
  - Get all products
  - Supports query parameters for filtering and pagination:
    - `page`: Page number (default: 1)
    - `limit`: Items per page (default: 10)
    - `search`: Search products by name or description
    - `sort`: Sort by field (e.g., 'price', 'name')

- `GET /api/products/:id`
  - Get a specific product by ID

- `POST /api/products`
  - Create a new product
  - Requires authentication
  - Request body example:
    ```json
    {
      "name": "Product Name",
      "description": "Product Description",
      "price": 99.99,
      "category": "Category Name"
    }
    ```

- `PUT /api/products/:id`
  - Update an existing product
  - Requires authentication
  - Request body: Same as POST, all fields optional

- `DELETE /api/products/:id`
  - Delete a product
  - Requires authentication

## Authentication

Protected endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

The API uses standard HTTP status codes and returns error messages in the following format:
```json
{
  "status": "error",
  "message": "Error description",
  "code": 400
}
```

## Submission

Your work will be automatically submitted when you push to the repository. Ensure:

1. All API endpoints are implemented and tested
2. Middleware and error handling are in place
3. API documentation is complete
4. Test coverage for main functionality
5. Environment variables are properly configured

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [JWT Authentication](https://jwt.io/) 