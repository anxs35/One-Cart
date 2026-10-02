# 🛍️ OneCart - Modern Full-Stack E-Commerce Platform

OneCart is a high-performance, full-stack e-commerce web application built using the **MERN** stack (MongoDB, Express, React, Node.js) with Vite, Tailwind CSS, Cloudinary, Razorpay payment gateway integration, and Google Gemini AI-powered smart recommendations.

---

## 📑 Table of Contents
- [✨ Key Features](#-key-features)
- [🏗️ Project Architecture](#️-project-architecture)
- [💻 Tech Stack](#-tech-stack)
- [📋 Prerequisites](#-prerequisites)
- [🚀 Full Installation & Setup Guide](#-full-installation--setup-guide)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup (Customer Storefront)](#3-frontend-setup-customer-storefront)
  - [4. Admin Panel Setup](#4-admin-panel-setup)
- [🔑 Default Credentials & Test Accounts](#-default-credentials--test-accounts)
- [📦 Database Seeding](#-database-seeding)
- [🌐 API Endpoints Reference](#-api-endpoints-reference)
- [🛠️ Production Build](#️-production-build)
- [🤝 Contributing & License](#-contributing--license)

---

## ✨ Key Features

### 🛒 Customer Storefront (`/frontend`)
- **Product Discovery**: Dynamic product catalog with multi-category browsing (`Men`, `Women`, `Kids`) and sub-categories (`TopWear`, `BottomWear`, `WinterWear`).
- **Interactive Multi-Angle Gallery**: High-resolution image viewer with clickable preview thumbnails.
- **Instant Search & Multi-Faceted Filters**: Real-time keyword search, category checkboxes, and price sorting (Low to High / High to Low).
- **Persistent Cart & Wishlist**: State-managed cart synchronized with user accounts and guest persistence.
- **Smart Recommendations**: Integrated with **Google Gemini AI** to recommend matching outfits and trending fashion items.
- **Secure Checkout & Payments**:
  - Integrated **Razorpay** payment gateway for cards, UPI, and net banking.
  - Cash on Delivery (COD) option with instant order confirmation.
- **User Loyalty & Rewards**: Earn and redeem loyalty points on repeat purchases.
- **Automated Alerts**: In-stock restock notifications and price-drop alerts.
- **PDF Invoice Download**: Generate and download printable order receipts.

### 🛡️ Admin Dashboard (`/admin`)
- **Product Management**: Add new products with multi-image Cloudinary upload, size variant tagging, stock counts, and bestseller flags.
- **Catalog Control**: Real-time product listing table with delete and inventory adjustment options.
- **Order Management**: View and track customer orders, payment status, and dispatch updates (`Order Placed`, `Packing`, `Shipped`, `Out for Delivery`, `Delivered`).
- **User Directory**: View registered customers and account details.

---

## 🏗️ Project Architecture

```
OneCart/
├── backend/                  # Express REST API Server
│   ├── config/               # Database, Cloudinary, Razorpay configurations
│   ├── controller/           # Business logic & route controllers
│   ├── middleware/           # JWT auth & Multer file upload middlewares
│   ├── model/                # Mongoose database models (User, Product, Order, etc.)
│   ├── routes/               # API route definitions
│   ├── seed50Products.js     # Curated 50 products database seeding script
│   ├── index.js              # Server entry point
│   ├── .env.example          # Environment variables template
│   └── package.json
│
├── frontend/                 # React 19 Customer Web Storefront
│   ├── src/
│   │   ├── component/        # Navbar, Footer, Product Cards, Hero, etc.
│   │   ├── context/          # ShopContext, AuthContext, UserContext
│   │   ├── pages/            # Home, Collections, ProductDetail, Cart, PlaceOrder, etc.
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example          # Frontend environment variables template
│   ├── vite.config.js
│   └── package.json
│
├── admin/                    # React 19 Admin Panel
│   ├── src/
│   │   ├── component/        # Admin Navbar, Sidebar, Layout
│   │   ├── context/          # AdminContext, AuthContext
│   │   ├── pages/            # Add Product, Product List, Orders, Users, Login
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
│
├── .gitignore                # Root gitignore protecting all packages
└── README.md                 # Complete documentation & setup guide
```

---

## 💻 Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Backend** | Node.js, Express 5, MongoDB, Mongoose, JWT, BcryptJS, Multer |
| **Frontend** | React 19, Vite, Tailwind CSS v4, React Router 7, Axios, React Icons, React Toastify |
| **Admin Panel** | React 19, Vite, Tailwind CSS v4, React Router 7, Axios |
| **Cloud & Media** | Cloudinary (Image storage & CDN) |
| **Payments** | Razorpay Payment Gateway |
| **Artificial Intelligence** | Google Generative AI (Gemini Flash) |
| **Authentication** | JSON Web Tokens (Cookies & Bearer tokens), Firebase Auth / Google OAuth |

---

## 📋 Prerequisites

Ensure you have the following installed on your system before proceeding:
- **Node.js**: `v18.0.0` or higher ([Download Node.js](https://nodejs.org/))
- **npm**: `v9.0.0` or higher (bundled with Node.js)
- **MongoDB**: 
  - Local MongoDB Community Server ([Download MongoDB](https://www.mongodb.com/try/download/community-edition)) OR
  - MongoDB Atlas Cloud Database connection string ([MongoDB Atlas](https://www.mongodb.com/atlas))
- **Git** ([Download Git](https://git-scm.com/))

---

## 🚀 Full Installation & Setup Guide

### 1. Clone the Repository

Open your terminal or command prompt:

```bash
git clone https://github.com/anxs35/One-Cart.git
cd One-Cart
```

---

### 2. Backend Setup

1. **Navigate to the backend folder**:
   ```bash
   cd backend
   ```

2. **Install backend dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the `backend/` directory by copying the example:
   ```bash
   cp .env.example .env
   ```

   Fill in your configuration values inside `backend/.env`:
   ```env
   # Server Port
   PORT=8000

   # MongoDB Connection String (Local or Atlas)
   MONGODB_URL="mongodb://localhost:27017/OneCart"

   # JWT Secret Key (Any secure random string)
   JWT_SECRET="your_custom_jwt_secret_key_12345"

   # Admin Dashboard Login Credentials
   ADMIN_EMAIL="admin@onecart.com"
   ADMIN_PASSWORD="admin1234567"

   # Cloudinary Credentials (https://cloudinary.com/)
   CLOUDINARY_NAME="your_cloudinary_name"
   CLOUDINARY_API_KEY="your_cloudinary_api_key"
   CLOUDINARY_API_SECRET="your_cloudinary_api_secret"

   # Razorpay Credentials (https://dashboard.razorpay.com/)
   RAZORPAY_KEY_ID="rzp_test_yourKeyId"
   RAZORPAY_KEY_SECRET="yourRazorpayKeySecret"

   # Google Gemini API Key (https://aistudio.google.com/)
   GEMINI_API_KEY="AIzaSyYourGeminiApiKey"
   ```

4. **Seed Database with 50 Curated Fashion Products**:
   Run the included automated seeding script to populate your store with 50 high-quality products across Men, Women, and Kids:
   ```bash
   node seed50Products.js
   ```
   *Expected Output: `Successfully added 50 products to OneCart!`*

5. **Start the Backend Server**:
   ```bash
   npm run dev
   ```
   The backend API will start running at: **`http://localhost:8000`**

---

### 3. Frontend Setup (Customer Storefront)

1. **Open a new terminal window** and navigate to the `frontend/` folder:
   ```bash
   cd frontend
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file inside `frontend/`:
   ```bash
   cp .env.example .env
   ```

   Add your client credentials:
   ```env
   VITE_FIREBASE_APIKEY="your_firebase_api_key"
   VITE_RAZORPAY_KEY_ID="rzp_test_yourKeyId"
   ```

4. **Start the Frontend Development Server**:
   ```bash
   npm run dev
   ```
   The customer storefront will open at: **`http://localhost:5173`**

---

### 4. Admin Panel Setup

1. **Open a third terminal window** and navigate to the `admin/` folder:
   ```bash
   cd admin
   ```

2. **Install admin dependencies**:
   ```bash
   npm install
   ```

3. **Start the Admin Panel Server**:
   ```bash
   npm run dev
   ```
   The admin panel will open at: **`http://localhost:5174`** (or the next available port indicated in your console).

---

## 🔑 Default Credentials & Test Accounts

### 👑 Admin Login (`http://localhost:5174`)
- **Email**: `admin@onecart.com`
- **Password**: `admin1234567`
*(Configured via `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `backend/.env`)*

### 👤 Customer Test Accounts (`http://localhost:5173/login`)
You can register a new account on the website or use any of the pre-configured test accounts:
- **Email**: `user1@test.com` (available up to `user50@test.com`)
- **Password**: `password123`

---

## 📦 Database Seeding

OneCart comes equipped with ready-to-run database seeders in the `backend/` directory:

| Seeder Script | Description |
| :--- | :--- |
| `node seed50Products.js` | Clears products and seeds exactly 50 curated clothing items with verified multi-angle imagery, realistic prices, and accurate category tags (`TopWear`, `BottomWear`, `WinterWear`). |

To re-seed or reset your product catalog anytime:
```bash
cd backend
node seed50Products.js
```

---

## 🌐 API Endpoints Reference

All API routes are served from `http://localhost:8000/api/`:

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Log in existing user | No |
| `GET` | `/api/auth/logout` | Clear user authentication session | No |
| `GET` | `/api/product/list` | Fetch all products for catalog & filtering | No |
| `POST` | `/api/product/add` | Add new product (Multer + Cloudinary) | Admin |
| `POST` | `/api/product/remove/:id`| Delete product by ID | Admin |
| `POST` | `/api/cart/add` | Add item & selected size to cart | User |
| `POST` | `/api/cart/update` | Update cart item quantity | User |
| `GET` | `/api/cart/get` | Retrieve user cart items | User |
| `POST` | `/api/order/place` | Place COD order | User |
| `POST` | `/api/order/razorpay` | Initiate Razorpay order checkout | User |
| `POST` | `/api/order/verifyrazorpay`| Verify payment signature | User |
| `GET` | `/api/order/userorder` | Retrieve past orders for user | User |
| `GET` | `/api/order/list` | Retrieve all platform orders | Admin |
| `POST` | `/api/order/status` | Update dispatch & fulfillment status | Admin |
| `POST` | `/api/ai/recommend` | Gemini AI powered styling suggestions | User |
| `GET` | `/api/loyalty/points` | Check earned loyalty points balance | User |

---

## 🛠️ Production Build

To test and build all applications for production deployment:

### Build Backend
```bash
cd backend
npm install --production
# Run via PM2, Docker, or Node
node index.js
```

### Build Frontend
```bash
cd frontend
npm run build
# The optimized bundle will be generated in `frontend/dist/`
```

### Build Admin Panel
```bash
cd admin
npm run build
# The optimized bundle will be generated in `admin/dist/`
```

---

## 🤝 Contributing & License

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

Distributed under the **ISC License**. See `LICENSE` for more information.
