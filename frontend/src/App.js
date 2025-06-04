// Import React and some built-in hooks from it.
// useEffect is used for running side effects like fetching data when the app loads
// useState is used to store and manage data in the component like the list of tasks
import React, { useEffect, useState } from 'react';// Import React library and some tools from it
import axios from 'axios';// Importing axios to handle HTTP requests  that helps us send and receive data from a server
import { io } from 'socket.io-client';// Import 'io' from the socket.io-client library. This helps connect our frontend to a WebSocket server.
import TaskForm from './Tasks/TaskForm';// Import the TaskForm component where users can add new tasks
import TaskList from './Tasks/TaskList';// Import the TaskList component which displays the list of tasks on the screen


const socket = io('http://localhost:4000');  // Create a WebSocket connection to the server running at http://localhost:4000

// Define the main component of our application
function App() {
  const [tasks, setTasks] = useState([]);  // Create a piece of state called 'tasks' to store the list of tasks. Initially, it's an empty array.

  // Fetch tasks from the server
  const fetchTasks = async () => {    // create a function to fetch tasks from the backend server

    try {
      const response = await axios.get('http://localhost:4000/api/tasks');// Send a GET request to the backend API to get the list of tasks
      setTasks(response.data);// Update the tasks state with the data received from the server
    } catch (error) {
      console.error('Error fetching tasks:', error);        // If there's an error while fetching, log it in the console
    }
  };

    // useEffect runs this code when the App component is first loaded (like on page load)
  useEffect(() => {
    fetchTasks(); // Call the function to fetch tasks from the server

    // Set up a WebSocket listener for an event called 'taskChange'.
    // This gets triggered when a task is added, updated, or deleted by any user.
    socket.on('taskChange', () => {
      console.log('Tasks updated via WebSocket');// Log a message
      fetchTasks(); // Fetch the updated list of tasks
    });

    // Clean up: When the component is removed from the screen,
    // stop listening to 'taskChange' to avoid memory leaks.
    return () => {
      socket.off('taskChange');
    };
  }, []); // The empty array ensures this runs only once when the component loads

  return (
    <div className="App">
      <h1>Task Manager App</h1>
      <TaskForm onTaskCreated={fetchTasks} /> {/* Show the form to create a new task.  When a new task is created, it calls fetchTasks to refresh the list */}
      <TaskList tasks={tasks} onUpdate={fetchTasks} />{/* Show the list of current tasks.Also refreshes the task list when a task is updated or deleted */}
    </div>
  );
}

export default App; // Export the App component so it can be used in other parts of the app     

