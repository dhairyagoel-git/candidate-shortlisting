# Candidate Shortlisting System

A full-stack web application for shortlisting and ranking candidates based on required skill sets, with AI-powered matching via OpenRouter.

## Project Structure

```
candidate-shortlisting/
├── backend/          # Node.js + Express + MongoDB
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── .env.example
│   └── package.json
└── frontend/         # React
    ├── public/
    ├── src/
    │   ├── components/
    │   └── ...
    └── package.json
```

## Setup

### 1. Backend

```bash
cd backend
cp .env.example .env
# Edit .env and add your MongoDB URI and OpenRouter API key
npm install
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

### 3. Environment Variables (backend/.env)

```
MONGO_URI=mongodb://localhost:27017/candidate-shortlisting
OPENROUTER_API_KEY=your_openrouter_api_key_here
PORT=5000
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/candidates | Add a candidate |
| GET | /api/candidates | Get all candidates |
| DELETE | /api/candidates/:id | Delete a candidate |
| POST | /api/match | Basic skill matching |
| POST | /api/ai/shortlist | AI-powered shortlisting |

## Features

- Add/view/delete candidates with skills, experience and bio
- Basic shortlisting by skill overlap % and experience
- AI-powered shortlisting via OpenRouter API
- Match score chart (bar graph)
- Search and filter candidates
- Responsive dark UI
