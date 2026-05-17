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
# Deploy Frontend on Render

This guide explains how to deploy the frontend of your MERN project on Render after deploying the backend.

---

# Step 1 — Replace Local Backend URL

After deploying your backend on Render, copy the deployed backend URL.

Example:

```bash
https://your-backend-name.onrender.com
```

---

## Replace localhost URL

Open your project in **VS Code**.

Press:

```bash
Ctrl + Shift + F
```

Search for:

```bash
localhost:5000
```

Replace it with your deployed backend URL.

Example:

```bash
https://your-backend-name.onrender.com
```

Save all files.

---

# Step 2 — Push Updated Code to GitHub

Open terminal in your project folder and run:

```bash
git add .
git commit -m "Updated frontend API URL"
git push origin main
```

---

# Step 3 — Deploy Frontend on Render

Go to:

https://render.com

Login using GitHub.

---

## Create Static Site

1. Click **New +**
2. Select **Static Site**
3. Connect your GitHub repository
4. Select your MERN project repository

---

# Step 4 — Configure Frontend Service

Fill the details like this:

---

## Root Directory

```bash
./frontend
```

---

## Build Command

```bash
npm install && npm run build
```

---

## Publish Directory

```bash
build
```

---

# Step 5 — Deploy Frontend

Click:

```bash
Deploy Static Site
```

Render will now:

- Install dependencies
- Build the frontend
- Deploy your React application

---

# Step 6 — Wait for Deployment

Deployment may take a few minutes.

After successful deployment, Render will provide a frontend URL.

Example:

```bash
https://your-frontend-name.onrender.com
```

Your MERN frontend is now live on Render.
