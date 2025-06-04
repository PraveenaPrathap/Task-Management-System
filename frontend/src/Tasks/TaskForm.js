import React, { useState } from 'react';//// Import React and the useState hook to manage component state
import axios from 'axios';//// Import Axios to handle HTTP requests

// This is a functional React component that takes a prop called onTaskCreated
function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState('');  // Set up state variables for task title and description
  const [description, setDescription] = useState('');//state variables that Stores the task description.


  
  // Function to handle form submission
  const handleSubmit = async (e) => {      //This function is called when the user clicks the Add Task button.
    e.preventDefault();              // Prevent the default  page reload
    await axios.post('http://localhost:4000/api/tasks', { title, description }); // Send a POST request to the backend to create a new task
    setTitle('');     // Clear the form fields after submission
    setDescription('');
    onTaskCreated();      // Call the function passed via props to update the task list in the parent component
  };

    // The form UI that the user interacts 
  return (
    <div className='form-container'>
    <form onSubmit={handleSubmit} className='task-form'>    {/*This sets up the form and connects it to handleSubmit.*/}
       <input 
        className='form-input'
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} // Updates the title state when user types
      />
      <input 
        className='form-input'
        placeholder="Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} // Updates description state on change
      />      
      <button type="submit" className='form-button'>Add Task</button>         {/* Button to submit the form and add a task */}

    </form>
    </div>
  );
}

export default TaskForm;