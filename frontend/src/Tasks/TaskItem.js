import React, { useState, useEffect } from 'react';// We bring in React and useState so we can create a component and manage its internal state (like edit mode and input values).
import axios from 'axios';// We import Axios so we can send HTTP requests to the backend (for updating or deleting a task).

function TaskItem({ task, onUpdate }) {    // This is a component named TaskItem. It gets a "task" object and an "onUpdate" function as props from the parent.
  const [isEditing, setIsEditing] = useState(false);   // create the stae for is edditing and turns off edit mode that shows text again.
  const [title, setTitle] = useState(task.title);     //These states store the editable values for title and description.
  const [description, setDescription] = useState(task.description);   //These states store the editable values for title and description.

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
  }, [task]);//The [task] at the end is called the dependency array.SoIf task is updated new task is passed in this code runs again.



  const handleDelete = async () => { // This function is triggered when the user clicks Delete.
    await axios.delete(`http://localhost:4000/api/tasks/${task._id}`);  //It sends a DELETE request to the backend using the task’s unique ID.
    onUpdate();     // This function runs when the "Delete" button is clicked. It sends a DELETE request to remove the task,
                  // then it calls the "onUpdate" function to refresh the task list. 
  };

  const handleUpdate = async () => {    //This function runs when the user clicks Save while editing.
    await axios.patch(`http://localhost:4000/api/tasks/${task._id}`, {   //It sends a PATCH request to the backend with the updated title and description.
      title,
      description,
    });
    setIsEditing(false);//turns off edit mode 
    onUpdate();//  //function to refresh the task list.
  };         // This function runs when the "Save" button is clicked during editing. It sends a PATCH request with the updated title and description Then it turns off edit mode and refreshes the task list.

  return (
    
    <tr>
      <td>
        {isEditing ? (    //If in edit mode, show a textbox for the title.
          <input value={title} onChange={(e) => setTitle(e.target.value)} />// This is the first cell showing the title. If we're editing, it shows an input box. If not, it shows the plain title.
        ) : (
          title
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          description
        )}
      </td>

      <td>
        <div className='task-buttons'> 
        {isEditing ? (
          <button onClick={handleUpdate} className='btn-save'>Save</button>     // If we're editing, show a "Save" button. If not, show an "Edit" button that turns on editing when clicked        
        ) : (
          <button onClick={() => setIsEditing(true)} className='btn-edit'>Edit</button>  // If we're editing, show a "Save" button. If not, show an "Edit" button that turns on editing when clicked   
        )}
         <button onClick={handleDelete} className='btn-delete btn-spacing'>Delete</button> {/* Always shows the Delete button → triggers handleDelete. */}
      </div>
      </td>
    </tr>
  );
}

export default TaskItem;//This exports the TaskItem component so it can be used in other files