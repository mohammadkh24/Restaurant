# 🍽️ Restaurant Backend API  

This project is a **backend system** for managing a **restaurant website**, built with **Node.js**, **Express.js**, and **MongoDB**.  

## ✨ Features:  
✅ **Authentication** (JWT-based for users and admins)  
✅ **Menu Management** (Add, edit, and delete food items)  
✅ **Order System** (Place orders, view order history)  
✅ **User Panel** (View and update profile, order history)  
✅ **Admin Panel** (Manage users, orders, and menu)  
✅ **Invoice & Payment** (Online payment integration)  

## 🛠️ Technologies Used:  
- **Node.js** + **Express.js** for backend development  
- **MongoDB** + **Mongoose** for database management  
- **bcrypt** for password hashing  
- **jsonwebtoken (JWT)** for authentication  
- **express-validator** for input validation  
- **dotenv** for environment variable management  

## 📌 How to Run:  
1. Clone the repository:  
   ```bash
   https://github.com/mohammadkh24/Restaurant.git
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Set up `.env` file (e.g., `DB_URI`, `JWT_SECRET`)
   ```bash
    PORT=5000
    DB_URI=mongodb://localhost:27017/Restaurant
    JWT_SECRET="8ab4550b87c84af25ebe14a6f9a00a330935c961ce69c5259af29c6ae6ff3eaff8dda80d64b1bc14f01cd1f52f2b7fadb5a1a6fa024819fb2000a9b85ee5954c"
4. Start the server:  
   ```bash
   npm start
   ```

🚀 **Your API is now running on `http://localhost:5000`!**

 **Document** : https://www.postman.com/teamwork-4920/workspace/my-workspace/collection/38477852-e15e8a38-f038-499b-b2a5-79a581dbec93?action=share&creator=38477852
