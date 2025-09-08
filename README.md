# E-commerce Backend (Node.js + Express + MongoDB + JWT)

This is the backend for the mini e-commerce web app, providing user authentication, protected item CRUD routes, and a cart system with data persistence in MongoDB.


##  Features

- **User Authentication**: Signup and login using JWT.
- **Items API**: Create, read, update, delete items with filters (category, price).
- **Cart API**: Add items with quantity to cart, remove or update quantity, and retrieve populated cart.
- **Seed Script**: `seed.js` to populate the database with dummy items.


##  Setup Instructions

### Prerequisites

- Node.js (v16+)
- MongoDB connection

### Installation & Setup

```bash
git clone https://github.com/Sajidaunnisa/Assignment-Backend.git
cd Assignment-Backend
npm install
Create a .env file in the root with:

env
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your_jwt_secret_key
Seeding Dummy Data
To insert sample items into your database, run:

bash
node seed.js
This will clear existing items and populate new ones for testing.

Running the Server
Start in development mode:

bash
npm run dev
Default API base URL: http://localhost:5000/api
