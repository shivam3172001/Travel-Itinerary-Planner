# Travel Planner - Full Stack Web App

A full-stack itinerary planner built with React, Node.js/Express, and MongoDB.

## Features

- User authentication with JWT
- Create, view, and delete itineraries
- Multiple destinations per itinerary with dates and notes
- Google Maps integration with markers
- Protected routes and secure API endpoints
- Responsive design

## Project Structure

```
Travel-planner-project/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── context/         # Auth context
│   │   ├── pages/           # Page components
│   │   └── services/        # API services
│   ├── .env                 # Frontend environment variables
│   └── package.json
├── backend/                 # Node.js/Express backend
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── middleware/          # Auth middleware
│   ├── .env                 # Backend environment variables
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- Google Maps API key (optional, for map functionality)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/travel-planner
JWT_SECRET=your_jwt_secret_key_here_change_in_production
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

4. Start the frontend development server:
```bash
npm start
```

The frontend will run on http://localhost:3000

### MongoDB Setup

1. Make sure MongoDB is running locally on port 27017
2. The app will automatically create the `travel-planner` database

### Google Maps Setup (Optional)

1. Get a Google Maps API key from Google Cloud Console
2. Enable the Maps JavaScript API
3. Add the API key to your frontend `.env` file

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Itineraries (Protected)
- `GET /api/itineraries` - Get user's itineraries
- `POST /api/itineraries` - Create new itinerary
- `DELETE /api/itineraries/:id` - Delete itinerary

## Usage

1. Register a new account or login
2. Navigate to the Itineraries page
3. Click "Add New Itinerary" to create an itinerary
4. Add destinations with locations, dates, and optional coordinates
5. View your itineraries and see markers on the map (if coordinates provided)
6. Delete itineraries as needed

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration

## Technologies Used

### Frontend
- React 18
- React Router DOM
- Axios for API calls
- Google Maps React Wrapper
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- express-validator for input validation