# ShopEZ - Complete E-Commerce Platform

ShopEZ is a full-featured, robust e-commerce web application built using the powerful MERN stack (MongoDB, Express, React, Node.js). Setup to handle everything from user authentication, product catalogs, fully integrated shopping carts, to a dedicated seller dashboard. 

![ShopEZ](/client/public/logo.png) (Logo)

## 🚀 Features

### For Shoppers (Users)
* **Authentication:** Secure Registration and Login with encrypted passwords.
* **Product Catalog:** Browse products, view detailed pages, check stock status, and see high-quality images.
* **Shopping Cart & Checkout:** Seamlessly add items to a cart, adjust quantities, securely checkout, and automatically clear the cart upon successful order placement.
* **Order History:** View all past orders, track processing/shipped/delivered statuses.
* **Customer Reviews:** Leave 1-5 star ratings and written reviews on products *after* they have been marked as delivered.
* **Currency Support:** Fully localized for the Indian Rupee (₹).

### For Sellers (Pro Accounts)
* **Seller Dashboard:** View comprehensive shop analytics, revenue trends, top products by sales, and quick metrics.
* **Product Management:** Add new listings with rich details (SKU, Categories, Stock tracking, Pricing) and manage existing inventory.
* **Order Management:** See exactly which users ordered your products, tracking specific line items, and update order fulfillment statuses in real-time.

## 💻 Tech Stack

**Frontend Framework & Tools:**
- **React.js** (Vite build system)
- **Tailwind CSS** (for highly responsive, modern UI styling)
- **React Router DOM** (for SPA navigation)
- **Axios** (for API communication)
- **Context API** (for global Authentication State Management)

**Backend Framework & Tools:**
- **Node.js**
- **Express.js**
- **MongoDB** (Cloud Database via Atlas)
- **Mongoose ORM** (Schema validations and querying)
- **JSON Web Tokens (JWT)** (Secure route protection and authentication)
- **Bcrypt.js** (Password Hashing)

## ⚙️ Local Development Setup

### Prerequisites
Make sure you have Node.js and npm installed on your machine.
Ensure you have a MongoDB connection string (local or Atlas) ready.

### 1. Clone & Install
Clone the repository, then install dependencies for both the frontend (`client`) and backend (`server`).

```bash
# Install Server Dependencies
cd server
npm install

# Install Client Dependencies
cd ../client
npm install
```

### 2. Environment Variables
Create a `.env` file inside the `/server` directory and configure the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

### 3. Run the Application
You can run both servers concurrently. Open two terminal instances:

**Run the Backend Server:**
```bash
cd server
npm run dev
# The server will start on http://localhost:5000
```

**Run the Frontend React Client:**
```bash
cd client
npm run dev
# The client will start typically on http://localhost:5173
```

## 🏗️ Project Structure

```text
SHOPEZ/
├── client/                 # React Frontend
│   ├── public/             # Static assets (logos, etc.)
│   ├── src/
│   │   ├── api/            # Axios interceptors & configs
│   │   ├── components/     # Reusable UI (Header, Footer, Sidebars)
│   │   ├── context/        # React Contexts (AuthContext)
│   │   ├── pages/          # Main route components (Catalog, Profile, Cart, Dashboards)
│   │   └── App.jsx         # App Entry & Routing
│   └── package.json
│
└── server/                 # Node.js/Express Backend
    ├── controllers/        # Request handlers (auth, products, orders, cart)
    ├── middleware/         # Custom Express middlewares (protect, seller authentication)
    ├── models/             # Mongoose Schemas (User, Product, Order)
    ├── routes/             # API Endpoint definitions
    ├── server.js           # Server Entry Point
    └── package.json
```

## 🔐 Authentication & Roles
The application handles two distinct roles determined by `user.role` on the database schema:
- **`user`**: The default role granted upon registration. Restricted to their own profile, cart, and shopping views.
- **`seller`**: A privileged role that gains access to the `/seller` prefixed routes, allowed to manage products globally and view restricted order segments.

## 🛣️ Key API Routes

**Auth:**
- `POST /api/auth/register`
- `POST /api/auth/login`

**Products:**
- `GET /api/products` - Fetch entire catalog
- `GET /api/products/:id` - Fetch single product
- `POST /api/products` - (Seller) Add product
- `POST /api/products/:id/reviews` - (Private) Leave a product review

**Orders:**
- `POST /api/orders` - (Private) Create a new order
- `GET /api/orders/myorders` - (Private) View personal history
- `GET /api/orders` - (Seller) Manage incoming orders

**Cart:**
- `POST /api/cart`
- `GET /api/cart`
- `DELETE /api/cart` - Clears entire cart
