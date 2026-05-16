# Deploy MERN Project on Render

This guide explains how to deploy your full stack MERN project on Render.

---

# Step 1 — Upload Project to GitHub

## Create a GitHub Repository

Go to:

github

Create a new repository.


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


# Step 2 — Deploy Backend on Render

Go to:

render

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
