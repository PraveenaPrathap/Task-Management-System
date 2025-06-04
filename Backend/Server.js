const express = require('express');// import express module
require('dotenv').config();//import environnmental variables
const mongoose = require('mongoose');// import mongoose
const app = express();  //Initialize the express application and store in app
const taskRoutes = require('./routes/taskRoute'); //import the task route
const cors = require('cors');// Import CORS to allow frontend (React) to connect to this server
const { Server } = require('socket.io');// Import tools for setting up WebSocket server
const http = require('http');// 
const { initSocket, emitTaskUpdate } = require('./socketManager'); // Import our WebSocket manager functions

const server = http.createServer(app); // Create an HTTP server using the Express app
initSocket(server);// Initialize WebSocket server using our HTTP server


//  // create middleware(app.use)
app.use((req, res, next) => { // middleware runs for incomming request. 
  console.log('path' + req.path + ' method ' + req.method); //Show path and method of request hit in server and monitor the request
  next();  // Move to the next middleware
});

app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from the React frontend running on localhost:3000
app.use(express.json());   // pass the request body in json format
app.use('/api/tasks', taskRoutes); // comming request are start with api/task/, taskroute decide the router to do (base route)


// Connect to MongoDB using the URL in the environment variables
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    server.listen(process.env.PORT, () => {     // Start the HTTP and WebSocket server on the defined port
      console.log('DB is connected successfully listening to ' + process.env.PORT);
    });

    const db = mongoose.connection;    // Access the MongoDB database connection
    const taskCollection = db.collection('tasks');    // Get a reference to the 'tasks' collection in the database
    const changeStream = taskCollection.watch();     // Start watching the 'tasks' collection for real-time changes using a MongoDB change stream
  
    
    changeStream.on('change', (change) => {      // If any change happens in the collection (add, update, delete), this event triggers

      console.log('MongoDB Change detected:', change);
      emitTaskUpdate(); // Notify all connected clients via WebSocket
    });

    changeStream.on('error', (error) => {      // If something goes wrong while watching the database, log the error
      console.error('Change Stream error:', error);
    });
  })
  .catch((error) => console.log(error)); // Log error if DB connection fails
  





