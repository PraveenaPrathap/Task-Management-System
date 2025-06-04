// Imports the Server class from the socket.io library. This class helps to create a WebSocket server.
const { Server } = require("socket.io");//Used to set up WebSocket for real-time communication.
const EventEmitter = require('events'); // Import Node.js's built-in EventEmitter to create and manage custom events inside the app.


const eventEmitter = new EventEmitter();// Create a new EventEmitter instance to emit and listen for custom events like "taskChange".
let io;// Create a variable to store the WebSocket server instance

// Define a function to set up the WebSocket server
const initSocket = (server) => { // Create a new WebSocket server using the provided HTTP server Allow connections only from http://localhost:3000 with certain HTTP methods
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PATCH", "DELETE"],
    },
  });

   // When a client connects to the WebSocket server
  io.on("connection", (socket) => {
    console.log("Client connected"); // Log when someone connects
    socket.on("disconnect", () => {       // When that client disconnects, show a message
      console.log("Client disconnected");
    });
  });
   // When the custom 'taskChange' event is triggered...
  eventEmitter.on("taskChange", () => {
    io.emit('taskChange');    // broadcast a 'taskChange' message to all connected clients
  });

  console.log("WebSocket server initialized");  // Log that the WebSocket server setup is complete

};

const emitTaskUpdate = () => {// Define a function to trigger the 'taskChange' event manually
  eventEmitter.emit("taskChange");
};

module.exports = { initSocket, emitTaskUpdate };// Export the two functions so they can be used in other files
