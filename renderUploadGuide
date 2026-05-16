# Deploy MERN Project on Render

This guide explains how to deploy your full stack MERN project on Render.

---

# Step 1 — Upload Project to GitHub

## Create a GitHub Repository

Go to:

:contentReference[oaicite:0]{index=0}

Create a new repository.

Example:

```bash
mern-project
```

---

## Upload Your Project

Open terminal in your project folder:

```bash
git init
git add .
git commit -m "Initial Commit"
```

Connect GitHub repository:

```bash
git remote add origin YOUR_GITHUB_REPOSITORY_LINK
```

Push code:

```bash
git branch -M main
git push -u origin main
```

---

# Step 2 — Deploy Backend on Render

Go to:

:contentReference[oaicite:1]{index=1}

Login using GitHub.

---

## Create Backend Web Service

1. Click **New +**
2. Select **Web Service**
3. Connect your GitHub repository
4. Select your MERN project repository

---

# Step 3 — Configure Backend Service

Fill the details like this:

## Root Directory

```bash
./backend
```

---

## Build Command

```bash
npm i
```

---

## Start Command

```bash
node server.js
```

---

## Select Instance Type

Choose:

```bash
Free
```

---

# Step 4 — Add Environment Variables

Scroll to **Environment Variables**

Click:

```bash
Add from .env
```

Copy and paste your backend `.env` file.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

# Step 5 — Deploy Backend

Click:

```bash
Deploy Web Service
```

Render will now:

- Install dependencies
- Build the backend
- Start the server

---

# Step 6 — Wait for Deployment

Deployment may take a few minutes.

After successful deployment, Render will provide a backend URL.

Example:

```bash
https://your-backend-name.onrender.com
```

---

# Step 7 — Test Backend API

Open the deployed backend URL in browser.

Example:

```bash
https://your-backend-name.onrender.com
```

If working correctly, backend should respond successfully.

---

# Important Notes

## Enable CORS in Backend

Install CORS:

```bash
npm install cors
```

Backend example:

```javascript
const cors = require("cors");
app.use(cors());
```

---

# Important for MongoDB Atlas Users

In MongoDB Atlas:

1. Open Network Access
2. Allow IP Address:

```bash
0.0.0.0/0
```

This allows Render server to connect to MongoDB.

---

# Common Deployment Errors

## 1. Build Failed

### Fix

Check if all dependencies are inside `package.json`

Run locally:

```bash
npm install
```

before pushing to GitHub.

---

## 2. Server Crashed

### Fix

Verify:

```bash
node server.js
```

is the correct start file.

Sometimes it may be:

```bash
node index.js
```

or

```bash
npm start
```

---

## 3. Environment Variables Not Working

### Fix

Make sure `.env` variables are added correctly in Render.

Redeploy service after updating environment variables.

---

## 4. MongoDB Connection Error

### Fix

- Check MongoDB URI
- Check username/password
- Allow network access in MongoDB Atlas

---

# Backend Deployment Complete

Your backend is now successfully hosted on Render.
