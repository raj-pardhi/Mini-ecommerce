# 🛍️ ShoeCart — Full-Stack E-Commerce Platform

A full-featured e-commerce web application for browsing, searching, and purchasing shoes online — built end-to-end with **Next.js (App Router)**, featuring a complete admin dashboard, secure authentication, category/price filtering, and integrated online payments.

**🔗 Live Demo:** [mini-ecommerce-jet-gamma.vercel.app](https://mini-ecommerce-jet-gamma.vercel.app/)

> Originally built as a MERN stack (React + Express) application and fully migrated to **Next.js**, unifying the frontend and backend into a single, production-ready codebase.

---

## ✨ Features

### 🧑‍💻 Customer
- Browse products with pagination and "load more"
- Filter products by **category** and **price range**
- Full-text **search** across product name and description
- Product detail pages with **related/similar products**
- Cart with add/remove items, persisted in local storage
- Secure **checkout with Braintree** (card + PayPal support)
- User authentication (register, login, forgot password)
- User dashboard — view order history, update profile & address

### 🛠️ Admin
- Protected **admin dashboard** (role-based access control)
- Create, update, and delete **product categories**
- Create, update, and delete **products** (with image upload)
- View and manage **all customer orders**, update order status
- View registered users

### ⚙️ Engineering highlights
- **Route protection** via custom middleware (`AdminRoute` / `PrivateRoute`) backed by JWT verification
- Product images stored directly in **MongoDB** as binary data (no external file storage needed)
- MongoDB connection caching pattern for serverless environments (Vercel-safe)
- Fully responsive, modern UI built with **Tailwind CSS**

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Frontend | React, Tailwind CSS, Ant Design |
| Backend | Next.js API Routes (Node.js runtime) |
| Database | MongoDB with Mongoose |
| Auth | JWT (JSON Web Tokens), bcrypt |
| Payments | Braintree (Sandbox — supports card & PayPal) |
| Notifications | react-hot-toast |
| Deployment | Vercel |

---

## 📂 Project Structure

```
src/
├── app/
│   ├── api/v1/                # Backend REST API (auth, category, product, payments)
│   ├── (public pages)/        # Home, product/category pages, cart, search, auth
│   └── dashboard/
│       ├── admin/             # Admin panel (protected)
│       └── user/              # User account area (protected)
├── components/                # Reusable UI (Header, Footer, Forms, Route guards)
├── context/                   # React Context — auth, cart, search state
├── hooks/                     # Custom hooks (e.g. useCategory)
├── lib/                       # DB connection, auth middleware, Braintree config
└── models/                    # Mongoose schemas (User, Product, Category, Order)
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/RajPardhi07/<repo-name>.git
cd <repo-name>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the root directory:
```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
BRAINTREE_MERCHANT_ID=your_braintree_merchant_id
BRAINTREE_PUBLIC_KEY=your_braintree_public_key
BRAINTREE_PRIVATE_KEY=your_braintree_private_key
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🔐 Environment & Deployment Notes

- MongoDB Atlas **Network Access** must allow connections from anywhere (`0.0.0.0/0`) for Vercel's serverless functions to connect.
- All environment variables must be added to your **Vercel Project Settings** before deploying.
- Braintree is configured for the **Sandbox** environment — swap credentials for production use.

---

## 📸 Screenshots

> _Add a few screenshots or a short demo GIF of the homepage, product page, cart, and admin dashboard here._

---

## 👤 Author

**Raj Pardhi**
Full Stack Developer (MERN / Next.js)

- GitHub: [github.com/RajPardhi07](https://github.com/RajPardhi07)
- LinkedIn: [linkedin.com/in/raj-pardhi](https://linkedin.com/in/raj-pardhi)
- Portfolio: [raj-portfolio-2026.vercel.app](https://raj-portfolio-2026.vercel.app/)

---

## 📄 License

This project is open source and available for learning purposes.