# 🧇 Bangalore Cream Waffles – Order Management System

A modern internal web application built using **Next.js, MongoDB Atlas, and Tailwind CSS** to manage waffle orders, track revenue, and monitor daily sales.

This system is designed for real-time order tracking across multiple devices.

---

## 🚀 Features

- 📋 Categorized menu (Classics & Cream Collection)
- ➕ Add/remove items with dynamic cart
- 🛒 Place orders with automatic total calculation
- 📦 Order history with date-based editing lock
- 📊 Dashboard with:
  - Total Revenue
  - Total Orders
  - Total Waffles Sold
- 🔒 Auto-lock editing for previous day orders
- 📱 Fully responsive (Mobile + Desktop)
- 🌐 Deployed on Vercel
- ☁️ Cloud database using MongoDB Atlas

---

## 🛠 Tech Stack

- **Frontend:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Backend API:** Next.js API Routes
- **Database:** MongoDB Atlas
- **Deployment:** Vercel
- **Version Control:** Git & GitHub

---

## 📂 Project Structure

```
app/
 ├── api/orders/
 │     ├── route.js
 │     └── [id]/route.js
 ├── dashboard/page.js
 ├── orders/page.js
 ├── page.js
 ├── layout.js
components/
 └── Navbar.js
lib/
 └── db.js
models/
 └── Order.js
```

---

## ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/waffle-tracker.git
cd waffle-tracker
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env.local` file in the root directory:

```
MONGODB_URI=your_mongodb_connection_string
```

---

## ▶️ Run Locally

```bash
npm run dev
```

Open in browser:

```
http://localhost:3000
```

---

## 🌍 Deployment

The application is deployed using **Vercel**.

Environment variables are configured in:
Vercel Dashboard → Project → Settings → Environment Variables

---

## 📈 Dashboard Metrics Logic

- **Total Revenue** → Sum of all order totals
- **Total Orders** → Total number of order documents
- **Total Waffles Sold** → Sum of all item quantities across orders

---

## 🔐 Order Lock Logic

- Orders from the current date can be edited.
- Orders from previous dates are automatically locked and treated as historical records.

---

## 📱 Responsive Design

- Desktop → Split layout (Menu + Cart)
- Mobile → Stacked layout with centered navigation
- Optimized for multi-device usage

---

## 📌 Future Improvements

- User authentication
- Daily revenue filtering
- Sales analytics charts
- Inventory management
- Progressive Web App (PWA) support

---

## 📄 License

This project is intended for internal order management and business tracking purposes.