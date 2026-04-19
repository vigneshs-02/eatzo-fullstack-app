# 🍽️ Eatzo — Full Stack Food Delivery Application

> A premium full stack food delivery web application
> built with Spring Boot, React.js and MySQL.
> Features a luxury black & gold UI design with
> complete food ordering, cart management and
> real-time order tracking.

---

## 🌐 Live Demo

| App | URL |
|-----|-----|
| Customer App | https://vignesh-portfolio-silk.vercel.app |
| Admin Panel | https://eatzo-admin.vercel.app/ |

---

## ✨ Features

### 👤 Customer
- 🔐 JWT Authentication (Login/Signup)
- 🍕 Browse food menu by category
- 🔍 Filter foods by 15+ categories
- 🛒 Add/Remove items from cart
- 📦 Place orders with delivery address
- 📍 Track order status in real time
- 📋 View complete order history
- 👤 Profile dropdown with My Orders

### 🛠️ Admin
- 🔐 Secure admin only login
- ➕ Add new food items with images
- 📋 Manage food list
- ❌ Remove food items (soft delete)
- 📦 View all customer orders
- 🔄 Update order status
  (Pending → Confirmed → Out for Delivery → Delivered)

---

## 🚀 Tech Stack

### Backend
![Java](https://img.shields.io/badge/Java-ED8B00?style=flat&logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat&logo=spring&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=flat&logo=mysql&logoColor=white)

| Technology | Purpose |
|-----------|---------|
| Java Spring Boot | REST API |
| Spring Security | Authentication |
| JWT (jjwt 0.12.6) | Token based auth |
| Spring Data JPA | Database ORM |
| Hibernate | Object mapping |
| MySQL | Database |
| Lombok | Reduce boilerplate |
| BCrypt | Password hashing |

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

| Technology | Purpose |
|-----------|---------|
| React.js | UI Framework |
| Context API + useReducer | State Management |
| React Router DOM | Navigation |
| Axios | API calls |
| React Icons | Icons |
| CSS3 | Styling |

---

## 🎨 UI Theme
> Luxury Black & Gold theme inspired by
> premium restaurant websites
```
Background  → #0a0a0a (Deep Black)
Primary     → #d4a843 (Royal Gold)
Cards       → #111111 (Dark)
Text        → #ffffff (White)
Font        → Playfair Display + Poppins
```

---

## 📸 Screenshots

### Customer App

| Home Page | Menu Page |
|-----------|-----------|
| ![Home](screenshotsfolder/eatzo-Fronted/3.Home.png) | ![Menu](screenshots/frontend/menu.png) |

| Cart Page | My Orders |
|-----------|-----------|
| ![Cart](screenshots/frontend/cart.png) | ![Orders](screenshots/frontend/orders.png) |

### Admin Panel

| Dashboard | Add Food |
|-----------|----------|
| ![Dashboard](screenshots/admin/add-food.png) | ![Add Food](screenshots/admin/food-list.png) |

| Food List | Orders Management |
|-----------|------------------|
| ![Food List](screenshots/admin/food-list.png) | ![Orders](screenshots/admin/orders.png) |

---

## 📁 Project Structure
```
eatzo-fullstack-app/
│
├── Eatzo-Backend/          → Spring Boot REST API
│   └── src/main/java/
│       └── com/vignesh/eatzo/
│           ├── controller/ → REST endpoints
│           ├── service/    → Business logic
│           ├── repository/ → Database queries
│           ├── model/      → Database entities
│           ├── dto/        → Data transfer objects
│           ├── security/   → JWT + Spring Security
│           └── config/     → CORS + Security config
│
├── Eatzo-Fronted/          → Customer React App
│   └── src/
│       ├── components/     → Reusable UI components
│       ├── pages/          → Page components
│       ├── context/        → Global state (App.jsx)
│       └── services/       → API calls (api.js)
│
├── Eatzo-Admin/            → Admin React Panel
│   └── src/
│       ├── components/     → Navbar + Sidebar
│       ├── pages/          → Admin pages
│       └── services/       → API calls
│
└── screenshots/            → Project screenshots
    ├── frontend/
    └── admin/
```

---

## 🔐 Authentication Flow
```
Register/Login
     ↓
Spring Boot validates credentials
     ↓
JWT Token generated (7 days expiry)
     ↓
Token stored in localStorage
     ↓
Token sent in every API request
Authorization: Bearer <token>
     ↓
Spring Security validates token
     ↓
Role checked (ADMIN/CUSTOMER)
     ↓
Access granted or denied
```

---

## 🗄️ Database Schema
```
users        → id, name, email, password,
               role, authProvider
foods        → id, name, description, price,
               category, imageUrl, available
cart_items   → id, user_id, food_id, quantity
orders       → id, user_id, totalAmount,
               status, address, payment
order_items  → id, order_id, food_id,
               foodName, foodPrice, quantity
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8+
- Maven

### Backend Setup
```bash
# Go to backend folder
cd Eatzo-Backend

# Configure database in application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/eatzo-db
spring.datasource.username=root
spring.datasource.password=yourpassword

# Run the application
mvn spring-boot:run

# Backend runs on http://localhost:8080
```

### Frontend Setup
```bash
# Go to frontend folder
cd Eatzo-Fronted

# Install dependencies
npm install

# Run the app
npm run dev

# Frontend runs on http://localhost:5173
```

### Admin Setup
```bash
# Go to admin folder
cd Eatzo-Admin

# Install dependencies
npm install

# Run the app
npm run dev

# Admin runs on http://localhost:5174
```

### Create Admin Account
```bash
# Use Postman or any API client
POST http://localhost:8080/api/auth/register

{
  "name": "Admin",
  "email": "admin@eatzo.com",
  "password": "admin123",
  "adminSecret": "EATZO@ADMIN2024"
}
```

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |

### Food
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | /api/food/list | Get all foods | Public |
| POST | /api/food/add | Add food | Admin |
| DELETE | /api/food/delete/{id} | Delete food | Admin |
| GET | /api/food/image/{filename} | Get image | Public |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/cart/add | Add to cart |
| POST | /api/cart/remove | Remove from cart |
| GET | /api/cart/get/{userId} | Get cart |

### Orders
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /api/order/place | Place order | Customer |
| GET | /api/order/userorders/{id} | User orders | Customer |
| GET | /api/order/list | All orders | Admin |
| POST | /api/order/status | Update status | Admin |

---

## 👨‍💻 Developer

**Vignesh S**
- 🎓 Java Full Stack Developer
- 💼 Open to opportunities

---

## 📄 License
This project is open source and
available under the MIT License.

---

⭐ If you like this project,
   please give it a star on GitHub!
