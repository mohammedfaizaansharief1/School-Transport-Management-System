🚌 School Transport Management System

A full-stack web application to manage School Transport Management System including bus routes, personnel, student registrations, and real-time communication features using Socket.io.

🚀 Features

- ✅ Bus Management (Add/Edit/Delete Buses)
- ✅ Route Management (Map bus routes with stops)
- ✅ Personnel Management (Assign Drivers, Cleaners, Incharge)
- ✅ Student Registration (With Route & Payment info)
- ✅ Real-Time Updates (via Socket.io)
- ✅ Dynamic Dashboard with Metrics
- ✅ Authentication (optional, can be added)


🛠️ Tech Stack

Frontend
- React.js + TailwindCSS
- Axios for API calls
- React Router

Backend
- Node.js + Express.js
- MongoDB + Mongoose
- Socket.io for real-time features
- dotenv for env configuration


⚙️ Setup Instructions

1. Clone the Repository
git clone https://github.com/your-username/school-transport-system.git
cd school-transport-system

2. Setup Backend
cd backend
npm install

Create a .env file in /backend directory:
PORT=5000
MONGO_URI=mongodb://localhost:27017/school-transport

Start the Backend Server
npm run dev
or
npm start

3. Setup Frontend
cd ../frontend
npm install

Create a .env file in /frontend directory:
VITE_API_BASE_URL=http://localhost:5000/api

Start the Frontend Dev Server
npm run dev


🔌 API Endpoints (Sample)
Method	Endpoint	          Description
GET	    /api/routes	        Get all bus routes
POST	  /api/registrations	Register a student
PUT	    /api/buses/:id	    Update a bus
DELETE	/api/personnel/:id	Delete personnel record


📁 Project Structure
school-transport-system/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   └── .env
│
└── README.md

🧪 Optional: MongoDB Setup with Docker (if you prefer)
docker run -d -p 27017:27017 --name school-db mongo


🤝 Contributions
Feel free to fork, improve, and raise PRs. Contributions are welcome!

