# 🍽️ FOOD LOOP

**Connecting Surplus Food with Those in Need**

FOOD LOOP is a modern, full-stack web platform that creates a zero-waste circular food economy by connecting surplus food from restaurants and individuals with people and communities in need.

---

## ✨ Features

### 🌟 Core Functionality
- **Role-Based Access**: Three distinct user roles (Donor, Receiver, Admin)
- **Food Donation System**: Easy posting and management of food donations
- **Request Management**: Request, accept, reject, and track food donations
- **Real-time Updates**: Live status tracking for donations and requests
- **Search & Filter**: Advanced search capabilities for receivers
- **Admin Dashboard**: Comprehensive platform management and statistics

### 🎨 Design Features
- **Animated Loading Screen**: Beautiful fork & knife loading animation
- **Modern UI/UX**: Clean, professional, and emotionally engaging design
- **Smooth Animations**: Framer Motion and CSS animations throughout
- **Responsive Design**: Fully responsive across all devices
- **Interactive Elements**: Hover effects, transitions, and micro-interactions
- **Professional Color Scheme**: Warm, inviting colors that reflect the platform's mission

---

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Navigation
- **Framer Motion** - Animations
- **React Icons** - Icon library
- **Axios** - HTTP client
- **CSS3** - Styling with custom animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

---

## 📁 Project Structure

```
SEProject/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context (Auth)
│   │   ├── pages/         # Page components
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   └── package.json
│
├── server/                 # Node.js backend
│   ├── database/          # Database setup
│   ├── middleware/        # Auth middleware
│   ├── routes/            # API routes
│   └── index.js           # Server entry point
│
├── package.json           # Root package.json
└── README.md             # This file
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository** (or navigate to the project directory)

2. **Install root dependencies:**
   ```bash
   npm install
   ```

3. **Install client dependencies:**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Environment Setup:**
   - The `.env` file is already created with default values
   - For production, update `JWT_SECRET` in `.env`

### Running the Application

#### Option 1: Run Both Servers Concurrently (Recommended)
```bash
npm run dev
```

This will start both the backend server (port 5000) and frontend dev server (port 3000).

#### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api

---

## 👥 User Roles & Default Accounts

### Default Admin Account
- **Email**: `admin@foodloop.org`
- **Password**: `admin123`

### Creating New Accounts
1. Click **"Click to Join"** on the landing page
2. Select your role (Donor, Receiver, or Admin)
3. Choose **Sign Up**
4. Fill in the registration form
5. Start using the platform!

---

## 📱 User Flows

### Donor Flow
1. Sign up/Login as Donor
2. Post food donations with details
3. View and manage donation requests
4. Accept/Reject requests
5. Share contact information upon acceptance
6. Mark donations as completed

### Receiver Flow
1. Sign up/Login as Receiver
2. Browse available food donations
3. Search and filter donations
4. Request food donations
5. Track request status
6. View donor contact after acceptance

### Admin Flow
1. Login with admin credentials
2. View platform statistics
3. Manage users
4. Monitor donations
5. View audit logs
6. Restore or permanently delete donations

---

## 🎨 Design System

### Color Palette
- **Primary**: `#FF6B35` (Warm Orange - Energy, Food, Community)
- **Secondary**: `#4ECDC4` (Turquoise - Trust, Sustainability)
- **Accent**: `#FFE66D` (Yellow - Positivity, Hope)
- **Success**: `#6BCB77` (Green - Growth, Success)
- **Dark Background**: `#1A1A2E` (Deep Blue - Professional, Trustworthy)

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Headings**: Bold (600-800 weight)
- **Body**: Regular (400 weight)

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user
- `GET /api/auth/me` - Get current user

### Donations
- `GET /api/donations` - Get all available donations
- `GET /api/donations/:id` - Get single donation
- `POST /api/donations` - Create donation (Donor only)
- `PUT /api/donations/:id` - Update donation (Donor only)
- `DELETE /api/donations/:id` - Delete donation (Donor only)
- `GET /api/donations/my/list` - Get my donations (Donor)

### Requests
- `POST /api/requests` - Create request (Receiver only)
- `PUT /api/requests/:id/respond` - Accept/Reject request (Donor)
- `PUT /api/requests/:id/complete` - Mark completed (Donor)
- `GET /api/requests/donor/my` - Get donor requests
- `GET /api/requests/receiver/my` - Get receiver requests

### Admin
- `GET /api/admin/stats` - Platform statistics
- `GET /api/admin/users` - All users
- `GET /api/admin/donations` - All donations
- `GET /api/admin/audit-logs` - Audit logs
- `PUT /api/admin/donations/:id/restore` - Restore donation
- `DELETE /api/admin/donations/:id` - Delete permanently

### Messages
- `POST /api/messages` - Submit contact message

---

## 🗄️ Database Schema

### Tables
- **users** - User accounts with roles
- **donations** - Food donation posts
- **requests** - Food requests from receivers
- **messages** - Contact form submissions
- **auditLogs** - Admin action logs
- **platformStats** - Platform statistics

All tables include timestamps and soft-delete support where applicable.

---

## 🎯 Key Features Explained

### Loading Screen
- Animated fork & knife icons
- Progress bar animation
- 2.5-second duration with fade-out transition

### Landing Page
- Hero section with call-to-action
- What Food Loop Does section with feature cards
- How It Works step-by-step guide
- Impact counters with animation
- Message & Rating section
- Comprehensive footer

### Authentication
- JWT-based secure authentication
- Role-based access control
- Protected routes
- Password hashing with bcrypt

### Dashboards
- **Donor**: Post, manage donations, handle requests
- **Receiver**: Browse, search, request food
- **Admin**: Full platform management

---

## 🐛 Troubleshooting

### Database Issues
- Database is automatically created on first server start
- Location: `server/database/foodloop.db`
- Delete the `.db` file to reset the database

### Port Already in Use
- Backend default port: 5000
- Frontend default port: 3000
- Update ports in `.env` and `package.json` if needed

### CORS Issues
- CORS is enabled for all origins in development
- For production, update CORS settings in `server/index.js`

---

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt (10 rounds)
- Role-based route protection
- Input validation
- SQL injection protection (parameterized queries)

---

## 📝 Notes

- The platform uses placeholder images from Unsplash
- All images are loaded from external URLs
- For production, implement image upload functionality
- Update API URLs in production environment

---

## 🚀 Production Deployment

1. **Build the React app:**
   ```bash
   cd client
   npm run build
   ```

2. **Set environment variables:**
   - Update `JWT_SECRET` with a strong random string
   - Set `NODE_ENV=production`

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Deploy to:**
   - Heroku
   - AWS
   - DigitalOcean
   - Any Node.js hosting platform

---

## 🤝 Contributing

This is a project submission. For contributions:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is created for educational purposes.

---

## 👨‍💻 Development Team

Built with ❤️ for creating a zero-waste food economy.

---

## 🎉 Enjoy Using FOOD LOOP!

**Remember**: Every meal matters. Let's work together to eliminate food waste and feed our communities.

For questions or support, contact: contact@foodloop.org
