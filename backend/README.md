# E-Commerce REST API

A small REST API for an e-commerce system, built with Node.js, Express, and MongoDB through Mongoose.

It includes categories, products with filtering, a cart, and orders with checkout handling for stock checks, server-side totals, stock reduction, and cart clearing.

## Features

- MVC-style folders for models, controllers, routes, middleware, utilities, config, and database access
- Central error handling for validation errors, invalid ObjectIds, duplicate keys, operational errors, and unexpected 500s
- Shared async route wrapper for controller errors
- Input validation with `express-validator`
- NoSQL injection protection with `express-mongo-sanitize`
- Product filtering by `category`, `minPrice`, `maxPrice`, `inStock`, and `search`
- Populated product, cart, and order reads
- Server-trusted cart prices with stock validation
- Orders with a unique `orderNumber`, status enum, and checkout flow
- Seed script with sample data
- Postman collection and environment in `postman/`

## Tech Stack

- Runtime: Node.js
- Framework: Express
- Database: MongoDB
- ODM: Mongoose
- Validation: express-validator
- Security: express-mongo-sanitize
- Config: dotenv

## Prerequisites

- Node.js 18 or newer
- npm 9 or newer
- MongoDB running locally at `mongodb://127.0.0.1:27017` or a MongoDB Atlas URI

## Installation

```bash
git clone <your-repo-url>
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

The API runs at `http://localhost:5000` by default.

## Environment Variables

| Variable | Description | Example |
| --- | --- | --- |
| `PORT` | Port the Express server listens on | `5000` |
| `NODE_ENV` | Runtime environment | `development` or `production` |
| `MONGO_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/ecommerce` |

## API Endpoints

All successful responses use this shape:

```json
{ "status": "success", "message": "...", "data": {} }
```

### Categories

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/categories` | List all categories |
| GET | `/api/categories/:id` | Get one category by id |
| POST | `/api/categories` | Create a category |
| PATCH | `/api/categories/:id` | Update a category |
| DELETE | `/api/categories/:id` | Delete a category |

### Products

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/products` | List products with optional filters |
| GET | `/api/products/:id` | Get one product with its category |
| POST | `/api/products` | Create a product |
| PATCH | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

Supported product filters: `category`, `minPrice`, `maxPrice`, `inStock`, and `search`.

### Cart

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/cart` | Get the cart with populated products |
| POST | `/api/cart/items` | Add an item with `{ productId, quantity }` |
| PATCH | `/api/cart/items/:productId` | Update quantity; `0` removes the item |
| DELETE | `/api/cart/items/:productId` | Remove one item |
| DELETE | `/api/cart` | Clear the cart |

### Orders

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/orders` | Check out the current cart |
| GET | `/api/orders` | List all orders |
| GET | `/api/orders/:id` | Get one order with populated items |
| PATCH | `/api/orders/:id/status` | Update the order status |

Allowed order statuses: `pending`, `confirmed`, `shipped`, `delivered`, and `cancelled`.

## Project Structure

```text
backend/
|-- app.js
|-- seed.js
|-- package.json
|-- config/
|   `-- config.js
|-- db/
|   `-- connect.js
|-- models/
|   |-- category.model.js
|   |-- product.model.js
|   |-- cart.model.js
|   `-- order.model.js
|-- controllers/
|   |-- category.controller.js
|   |-- product.controller.js
|   |-- cart.controller.js
|   `-- order.controller.js
|-- routes/
|   |-- category.routes.js
|   |-- product.routes.js
|   |-- cart.routes.js
|   `-- order.routes.js
|-- middleware/
|   |-- errorHandler.js
|   |-- notFound.js
|   `-- validate.js
|-- utils/
|   |-- AppError.js
|   |-- asyncHandler.js
|   `-- slugify.js
`-- postman/
    |-- E-Commerce-API.postman_collection.json
    `-- E-Commerce-API-Dev.postman_environment.json
```

## Testing in Postman

1. Import both files from the `postman/` folder into Postman.
2. Select the `E-Commerce API Dev` environment.
3. Run `GET /api/categories` and copy an `_id` into the `categoryId` environment variable.
4. List products and copy a product `_id` into `productId`.
5. Create an order and copy its `_id` into `orderId`.

Every request uses `{{baseUrl}}`, so local and deployed targets can be switched with one environment variable.

## License

ISC
