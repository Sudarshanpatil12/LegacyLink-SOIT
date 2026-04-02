# LegacyLink-SOIT

This repository is now split into two clear applications:

- `frontend/`: Create React App frontend
- `backend/`: Express and MongoDB backend

## Project Structure

```text
LegacyLink-SOIT/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env
├── backend/
│   ├── routes/
│   ├── models/
│   ├── utils/
│   ├── package.json
│   └── .env
├── package.json
└── start-dev.sh
```

## Frontend

Run the React app:

```bash
cd frontend
npm install
npm start
```

Build the frontend:

```bash
cd frontend
npm run build
```

Frontend environment file:

```env
REACT_APP_API_URL=http://localhost:5001/api
```

## Backend

Run the Express API:

```bash
cd backend
npm install
npm run dev
```

Backend production start:

```bash
cd backend
npm start
```

Important backend environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
PORT=5001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Root Convenience Scripts

From the repository root:

```bash
npm run frontend
npm run backend
npm run build
npm run test
```

## Production Note

In production, the backend serves the built frontend from:

```text
frontend/build
```

So deploy paths should now use the separated folder structure directly.
