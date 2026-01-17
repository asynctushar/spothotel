# SpotHotel 🏨

**Discover, Compare, and Book Comfortable Hotels Worldwide**

SpotHotel is a modern hotel booking platform that helps travelers find the perfect stay for their next trip in just a few clicks. Built with the MERN stack, it offers a seamless experience for browsing hotels, exploring rooms, and making secure bookings.

🌐 **Live Demo:** [https://spothotel.vercel.app](https://spothotel.vercel.app)

---

## 🚀 Features

- Browse and search hotels by location
- View detailed hotel and room information
- Filter rooms by type, price, and specifications
- Secure user authentication and authorization
- Booking management system
- Payment integration with Stripe
- Responsive design for all devices
- Image upload and management with Cloudinary

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- Tailwind CSS
- Shadcn
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Stripe Payment Gateway
- Cloudinary for image storage

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas account)
- Cloudinary account
- Stripe account (for payment processing)

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/asynctushar/spothotel.git
cd spothotel
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `/backend` directory using `.env.sample` as reference:

```env
PORT=5000
NODE_ENV=DEVELOPMENT
DB_URI=your_mongodb_connection_string
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=5d
COOKIE_EXPIRE=7
STRIPE_API_KEY=your_stripe_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Create a `.env` file in the `/frontend` directory using `.env.sample` as reference:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

---

## 🔑 Environment Variables

### Backend Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port number | Yes |
| `NODE_ENV` | Environment (DEVELOPMENT/PRODUCTION) | Yes |
| `DB_URI` | MongoDB connection string | Yes |
| `CLOUDINARY_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `JWT_EXPIRE` | JWT token expiration time | Yes |
| `COOKIE_EXPIRE` | Cookie expiration in days | Yes |
| `STRIPE_API_KEY` | Stripe publishable key | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |

### Frontend Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | Yes |

---

## 📁 Project Structure

```
spothotel/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── utils/
│   ├── .env.sample
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── lib/
│   │   ├── redux/
│   │   ├── router/
│   │   └── App.jsx
│   │   └── main.jsx
│   ├── .env.sample
│   └── index.html
└── README.md
```

---

## 🤝 Contributing

We welcome contributions to SpotHotel! Here's how you can help:

### Reporting Bugs

If you find a bug, please open an issue with:
- A clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

### Submitting Changes

1. Fork the repository
2. Create a new branch from `v3` branch:
   ```bash
   git checkout v3
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Commit with clear, descriptive messages
5. Push to your fork
6. Open a Pull Request to the `v3` branch

### Development Guidelines

- Follow the existing code style
- Write clear commit messages
- Test your changes thoroughly
- Update documentation as needed
- Ensure all validations match the schema requirements

---

## 🐛 Known Issues

Check our [Issues](https://github.com/asynctushar/spothotel/issues) page for current bugs and feature requests.

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Tushar Biswas**
- GitHub: [@asynctushar](https://github.com/asynctushar)

---

## 🙏 Acknowledgments

- Thanks to all contributors who help improve SpotHotel
- Built with ❤️ using the MERN stack

---

## 📧 Support

For support, email or open an issue in the GitHub repository.

---

**Note:** This is version 2 of SpotHotel. We're constantly working to improve the platform. Stay tuned for updates!