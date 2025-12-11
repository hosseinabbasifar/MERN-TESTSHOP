# MERN TestShop

A full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js). This project provides a complete online shopping experience with user authentication, product management, shopping cart, order processing, and an admin panel.

## 🚀 Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Product Management**: Browse, search, and filter products with pagination
- **Shopping Cart**: Add, remove, and update cart items
- **Order Processing**: Complete checkout flow with payment integration
- **Admin Panel**: Manage products, users, and orders
- **Multiple UI Themes**: Switch between Bootstrap and Material-UI themes
- **Responsive Design**: Mobile-friendly interface
- **Product Reviews**: User reviews and ratings system
- **Image Upload**: File upload functionality for product images
- **Data Seeding**: Import and destroy sample data for development

## 🛠 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **multer** - File upload handling
- **sharp** - Image processing

### Frontend
- **React** - UI library
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Material-UI** - React components library
- **React Bootstrap** - Bootstrap components for React
- **React Toastify** - Toast notifications

### Development Tools
- **Nodemon** - Automatic server restart
- **Concurrently** - Run multiple commands concurrently


## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

## 🔧 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hosseinabbasifar/MERN-TESTSHOP.git
   cd mern-testshop
   ```

2. **Install dependencies:**
   ```bash
   npm install
   npm install --prefix frontend
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory with the following variables:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_DB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PAYPAL_CLIENT_ID=your_paypal_client_id
   ```

4. **Seed the database (optional):**
   ```bash
   npm run import
   ```

## 🚀 Usage

### Development Mode
Run both frontend and backend concurrently:
```bash
npm run dev
```

### Production Mode
1. Build the frontend:
   ```bash
   npm run build
   ```

2. Start the server:
   ```bash
   npm start
   ```

### Individual Services
- **Backend only:** `npm run server`
- **Frontend only:** `npm run client`

## 📜 Available Scripts

- `npm start` - Start the production server
- `npm run server` - Start the backend server with nodemon
- `npm run client` - Start the frontend development server
- `npm run dev` - Run both frontend and backend concurrently
- `npm run import` - Import sample data into the database
- `npm run delete` - Delete all data from the database
- `npm run build` - Install dependencies and build the frontend

## 🏗 Project Structure

```
mern-testshop/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── data/           # Sample data
│   ├── middleware/     # Custom middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   ├── seeder.js       # Database seeder
│   └── server.js       # Main server file
├── frontend/
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── material-ui/# Material-UI themed components
│   │   ├── screens/    # Page components
│   │   ├── slices/     # Redux slices
│   │   ├── utils/      # Utility functions
│   │   └── assets/     # Styles and images
│   └── package.json
├── uploads/            # Uploaded files
├── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License 

## 👨‍💻 Author

**HOSSEIN ABBASIFAR**

## 🙏 Acknowledgments

- This project is based on the MERN e-commerce tutorial
- Thanks to all contributors and the open-source community
