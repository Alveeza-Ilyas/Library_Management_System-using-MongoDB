# 📚 Library Management System

A comprehensive full-stack Library Management System built using the **MERN/MEVN Stack paradigm** (Node.js, Express, MongoDB/Mongoose) for the backend and **Semantic HTML5, CSS3 (Modern Flexbox/Grid), and Vanilla JavaScript** for a high-performance, dynamic user interface.

This system provides complete CRUD functionality for managing books, system members, and real-time tracking of borrowing and returning transactions with automated fine calculations.

---

## 🚀 Features

### 1. Dashboard Analytics
* **Real-time Counters:** Displays Total Books, Active Members, Borrowed Books, and Overdue Transactions dynamically.
* **Graphical Breakdown:** Modern UI representation of library statistics.

### 2. Book Management
* View all available cataloged books with title, author, ISBN, and available copies.
* Add new books to the inventory with input verification.
* Dynamic search and pagination capabilities.

### 3. Member Directory
* Track registration details, including Member ID, Name, Email, Phone, Membership Level, and current borrowing metrics.
* Add new library members and manage existing records easily.

### 4. Core Transaction System
* **Issue/Borrow Books:** Records automated checkout dates and pre-calculates due dates.
* **Return Mechanism:** Tracks returned state, date of completion, updates book availability counters, and records arbitrary fines if necessary.
* **Data Population:** Leverages MongoDB `$lookup` / Mongoose `.populate()` to seamlessly aggregate book and member schemas inside data logs.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (Custom properties/variables, responsive layout grids), JavaScript (Asynchronous Fetch API, State Management).
* **Backend:** Node.js, Express.js (RESTful API architecture).
* **Database:** MongoDB Atlas / Local MongoDB via Mongoose Object Modeling.
* **Icons & Fonts:** FontAwesome 6.4.0, Google Fonts (Inter).

---

## 📁 Repository Structure (12 Core Files)

```text
├── config/
│   └── db.js                 # MongoDB connection protocol using Mongoose
├── models/
│   ├── Book.js               # Database schema definition for Books
│   ├── Member.js             # Database schema definition for Library Members
│   └── Transaction.js        # Database schema definition for Borrow/Return actions
├── routes/
│   ├── books.js              # REST API Endpoints for Book CRUD operations
│   ├── members.js            # REST API Endpoints for Member Management
│   └── transactions.js       # REST API Endpoints for processing loans and returns
├── data/
│   └── library_db.books.json # Pre-configured MongoDB seed data for initial cataloging
├── server.js                 # Express Application bootstrap & server initializer
├── index.html                # Single Page interface structure with modular modals
├── styles.css                # Comprehensive modern component UI styling sheet
└── script.js                 # Global State engine, Event Handling, and API Integrations

```

---

## 🌐 API Endpoints Reference

### 📖 Books Route (`/api/books`)

* `GET /api/books` - Fetches array of all indexed catalog titles.
* `POST /api/books` - Publishes a newly formatted book into the ecosystem.

### 👥 Members Route (`/api/members`)

* `GET /api/members` - Retrieves a listing of all active registered library patrons.
* `POST /api/members` - Provisions a new account setup profile.
* `DELETE /api/members/:id` - Purges an existing member account out of the system base.

### 🔄 Transactions Route (`/api/transactions`)

* `GET /api/transactions` - Returns all transaction records with fully populated reference data.
* `POST /api/transactions` - Logs an instance of a member checkout action.
* `PUT /api/transactions/:id` - Updates transaction logs to process returns and allocate fines.

---

## 🔧 Installation & Setup

### Prerequisites

Make sure you have **Node.js** and **MongoDB** installed on your system.

### 1. Backend Server Configuration

1. Navigate to your backend/root project directory.
2. Initialize or verify your dependencies using `npm`. You need `express`, `mongoose`, `cors`, `dotenv`, and `body-parser`.
3. Create a `.env` file in the root directory and add your MongoDB connection string:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here

```


4. Run the development server:
```bash
node server.js

```


*You should see:* `🚀 Server running on port 5000` and `MongoDB Connected Successfully`.

### 2. Database Seeding (Optional)

Import the provided dataset file (`library_db.books.json`) into your MongoDB instance using MongoDB Compass or the CLI tool to quickly populate your initial dashboard view:

```bash
mongoimport --db library_db --collection books --file library_db.books.json --jsonArray

```

### 3. Running the Frontend

Since the application frontend communicates via the native JavaScript Async Fetch API directly targeting `http://localhost:5000/api`:

1. Simply execute `index.html` directly in your favorite modern browser.
2. Live Server extension in VS Code is highly recommended to manage seamless refreshing during deployment.
