# 🚀 FOOD LOOP - Quick Start Guide

## ⚡ Quick Installation & Setup

### Step 1: Install Dependencies

```bash
# Install root dependencies (backend)
npm install

# Install client dependencies (frontend)
cd client
npm install
cd ..
```

### Step 2: Start the Application

**Option A: Run Both Servers Together (Recommended)**
```bash
npm run dev
```

**Option B: Run Separately**

Terminal 1 - Backend:
```bash
npm run server
```

Terminal 2 - Frontend:
```bash
npm run client
```

### Step 3: Access the Application

- **Frontend**: Open http://localhost:3000 in your browser
- **Backend API**: http://localhost:5000/api

---

## 👤 Default Login Credentials

### Admin Account
- **Email**: `admin@foodloop.org`
- **Password**: `admin123`

### Creating New Accounts
1. Visit http://localhost:3000
2. Click **"Click to Join"** button
3. Select your role (Donor, Receiver, or Admin)
4. Choose **"Sign Up"**
5. Fill in the registration form
6. Start using the platform!

---

## 📱 User Flows

### 🧑‍🍳 Donor Flow
1. Sign up/Login as Donor
2. Click **"Post Food Donation"** button
3. Fill in donation details (title, description, quantity, location, etc.)
4. View incoming requests on your dashboard
5. Accept or reject requests
6. Share contact information when accepting
7. Mark donations as completed after pickup

### 🧺 Receiver Flow
1. Sign up/Login as Receiver
2. Browse available food donations
3. Use search and filter to find specific items
4. Click **"Request Food"** on any donation
5. Track request status (Pending → Accepted → Completed)
6. View donor contact information after acceptance
7. Arrange pickup with the donor

### 🛡️ Admin Flow
1. Login with admin credentials
2. View platform statistics dashboard
3. Manage users (view all registered users)
4. Monitor all donations (including deleted ones)
5. Restore or permanently delete donations
6. View audit logs for platform activity

---

## 🎯 Key Features to Try

### Landing Page
- ✅ Animated loading screen (fork & knife animation)
- ✅ Hero section with "Click to Join" button
- ✅ Scroll animations on sections
- ✅ Impact counters (animated numbers)
- ✅ Message & rating form
- ✅ Comprehensive footer

### Authentication
- ✅ Role selection page (Donor/Receiver/Admin)
- ✅ Sign In and Sign Up pages
- ✅ JWT-based secure authentication
- ✅ Role-based route protection

### Dashboards
- ✅ **Donor**: Post donations, manage requests
- ✅ **Receiver**: Browse, search, request food
- ✅ **Admin**: Platform management and statistics

### Additional Pages
- ✅ About Us (Mission, Vision, Founders)
- ✅ Contact Us (Contact info + message form)

---

## 🔧 Troubleshooting

### Database Issues
- Database is automatically created on first server start
- Location: `server/database/foodloop.db`
- To reset: Delete the `.db` file and restart server

### Port Already in Use
- Backend default port: 5000
- Frontend default port: 3000
- Update ports in `.env` file if needed

### CORS Errors
- CORS is enabled for all origins in development
- Check that backend is running on port 5000
- Check API_URL in `client/src/context/AuthContext.js`

### Images Not Loading
- Images are loaded from Unsplash CDN (requires internet)
- Check internet connection
- See `ASSETS.md` for image setup details

---

## 📚 Additional Resources

- **Full Documentation**: See `README.md`
- **Image Assets**: See `ASSETS.md`
- **API Endpoints**: See `README.md` (API Endpoints section)

---

## 🎨 Customization

### Change Colors
Edit `client/src/index.css` - CSS variables in `:root` section

### Change Images
Edit URLs in:
- `client/src/pages/LandingPage.js` (feature cards)
- `client/src/pages/AboutUs.js` (founder photos)

### Environment Variables
Create `.env` file in root directory:
```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key_here
```

---

## ✅ Checklist

- [x] Install all dependencies
- [x] Start backend server (port 5000)
- [x] Start frontend server (port 3000)
- [x] Open browser to http://localhost:3000
- [x] See animated loading screen
- [x] Explore landing page
- [x] Test "Click to Join" flow
- [x] Create test accounts for each role
- [x] Test Donor dashboard (post donation)
- [x] Test Receiver dashboard (browse & request)
- [x] Test Admin dashboard (view stats)

---

## 🎉 You're All Set!

The FOOD LOOP platform is now ready to use. Explore all the features, test different user roles, and see how the platform creates a zero-waste food economy!

For questions or issues, refer to the main `README.md` file or check the code documentation.
