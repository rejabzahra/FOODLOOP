# 🚀 FOOD LOOP - VS Code Setup Guide

## Step-by-Step Instructions to Run in Visual Studio Code

---

## 📋 **Step 1: Prerequisites Check**

Before starting, ensure you have these installed:

1. **Node.js** (v14 or higher)
   - Check: Open terminal in VS Code and type `node --version`
   - Download: https://nodejs.org/ (if not installed)

2. **npm** (comes with Node.js)
   - Check: Type `npm --version` in terminal
   
3. **Visual Studio Code** (you're using it!)

---

## 📂 **Step 2: Open Project in VS Code**

1. **Open VS Code**
2. **Click "File" → "Open Folder"** (or press `Ctrl+K, Ctrl+O`)
3. **Navigate to your project folder**: `E:\Semester 3\SE\project\SEProject`
4. **Click "Select Folder"**

✅ You should now see the project structure in the VS Code Explorer sidebar.

---

## 📦 **Step 3: Install Backend Dependencies**

1. **Open Terminal in VS Code**:
   - Click `Terminal` → `New Terminal` (or press `` Ctrl+` ``)
   - Or use shortcut: `Ctrl+Shift+` (backtick)

2. **Verify you're in the project root**:
   ```bash
   pwd
   # Should show: E:\Semester 3\SE\project\SEProject
   ```

3. **Install root/backend dependencies**:
   ```bash
   npm install
   ```
   
   ⏳ Wait for installation to complete (may take 1-2 minutes)
   ✅ You should see "added X packages" message

---

## 📦 **Step 4: Install Frontend Dependencies**

1. **Navigate to client folder**:
   ```bash
   cd client
   ```

2. **Install client/frontend dependencies**:
   ```bash
   npm install
   ```
   
   ⏳ Wait for installation to complete (may take 2-3 minutes)
   ✅ You should see "added X packages" message

3. **Go back to project root**:
   ```bash
   cd ..
   ```

---

## ⚙️ **Step 5: Set Up Environment File (Optional)**

The project should work with default settings, but you can create a `.env` file:

1. **In VS Code Explorer**, right-click on the root folder
2. **Select "New File"**
3. **Name it**: `.env`
4. **Add this content**:
   ```
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=foodloop_secret_key_2024
   ```
5. **Save**: `Ctrl+S`

---

## 🚀 **Step 6: Run the Project**

You have **two options** to run the project:

### **Option A: Run Both Servers Together (Recommended)**

1. **Make sure you're in the project root** (not in `client` folder)
   ```bash
   cd E:\Semester 3\SE\project\SEProject
   ```

2. **Run the dev script**:
   ```bash
   npm run dev
   ```

   This will start:
   - ✅ Backend server on port 5000
   - ✅ Frontend server on port 3000

   ⏳ Wait for both servers to start (you'll see messages in terminal)

---

### **Option B: Run Servers Separately (Two Terminals)**

**Terminal 1 - Backend:**

1. **Open first terminal** (`` Ctrl+` ``)
2. **Make sure you're in project root**:
   ```bash
   cd E:\Semester 3\SE\project\SEProject
   ```
3. **Start backend server**:
   ```bash
   npm run server
   ```
   ✅ You should see: `🚀 FOOD LOOP server running on port 5000`

**Terminal 2 - Frontend:**

1. **Open second terminal**:
   - Click the **"+"** button next to terminal tabs
   - Or: `Terminal` → `New Terminal`
   - Or: `` Ctrl+Shift+` ``

2. **Navigate to client folder**:
   ```bash
   cd client
   ```

3. **Start frontend server**:
   ```bash
   npm start
   ```
   ⏳ Wait for React to compile (may take 30-60 seconds)
   ✅ Browser should automatically open to http://localhost:3000
   ✅ You should see: `webpack compiled successfully`

---

## 🌐 **Step 7: Access the Application**

1. **Open your web browser** (Chrome, Firefox, Edge, etc.)

2. **Navigate to**:
   ```
   http://localhost:3000
   ```

3. **You should see**:
   - ✅ Animated loading screen (fork & knife)
   - ✅ Landing page with "Click to Join" button
   - ✅ All features working!

---

## 🎯 **Step 8: Test the Application**

1. **Click "Click to Join"** button on landing page
2. **Select a role** (Donor, Receiver, or Admin)
3. **Try Sign Up** to create a new account
   - Or **Sign In** with admin:
     - Email: `admin@foodloop.org`
     - Password: `admin123`

4. **Explore the dashboards** based on your role

---

## 🛠️ **VS Code Tips & Tricks**

### **Opening Multiple Terminals**
- Click the **split terminal** button (or press `Ctrl+Shift+5`)
- Useful for running backend and frontend separately

### **Viewing Server Logs**
- Check terminal output for:
  - Backend: `🚀 FOOD LOOP server running on port 5000`
  - Frontend: `webpack compiled successfully`

### **Stopping Servers**
- Press `Ctrl+C` in the terminal where server is running
- Press `Ctrl+C` again to force stop if needed

### **Restarting Servers**
- Stop with `Ctrl+C`
- Run the start command again

---

## ⚠️ **Troubleshooting Common Issues**

### **Issue 1: Port Already in Use**

**Error**: `Port 5000 is already in use` or `Port 3000 is already in use`

**Solution**:
1. **Find what's using the port**:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   netstat -ano | findstr :3000
   ```
2. **Kill the process** or change port in `.env` file

---

### **Issue 2: npm install Fails**

**Error**: Various npm errors during installation

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -r node_modules
rm package-lock.json

# Try installing again
npm install
```

---

### **Issue 3: Module Not Found Errors**

**Error**: `Cannot find module 'xxx'`

**Solution**:
- Make sure you ran `npm install` in both root and `client` folders
- Check that `node_modules` folders exist

---

### **Issue 4: Database Not Found**

**Error**: Database connection errors

**Solution**:
- Database is created automatically on first run
- Location: `server/database/foodloop.db`
- Delete the `.db` file to reset database

---

### **Issue 5: CORS Errors**

**Error**: `CORS policy` errors in browser console

**Solution**:
- Make sure backend is running on port 5000
- Check that frontend is connecting to `http://localhost:5000/api`
- Restart both servers

---

### **Issue 6: Images Not Loading**

**Error**: Images don't appear on the page

**Solution**:
- Images are loaded from Unsplash (requires internet)
- Check your internet connection
- See `ASSETS.md` for image setup details

---

## ✅ **Success Checklist**

After following all steps, you should have:

- [x] VS Code open with project folder
- [x] Backend server running on port 5000
- [x] Frontend server running on port 3000
- [x] Browser opened to http://localhost:3000
- [x] Loading screen animation visible
- [x] Landing page loads successfully
- [x] Can click "Click to Join" button
- [x] Can navigate through the application

---

## 🎓 **Quick Reference Commands**

```bash
# Install dependencies (root)
npm install

# Install dependencies (client)
cd client
npm install
cd ..

# Run both servers together
npm run dev

# Run backend only
npm run server

# Run frontend only
cd client
npm start

# Stop server
Ctrl+C
```

---

## 📚 **Additional Resources**

- **Full Documentation**: See `README.md`
- **Quick Start Guide**: See `QUICKSTART.md`
- **Image Assets**: See `ASSETS.md`

---

## 🎉 **You're All Set!**

Your FOOD LOOP project should now be running successfully in VS Code! 

If you encounter any issues not covered here, check the terminal output for error messages and refer to the troubleshooting section above.

Happy coding! 🚀
