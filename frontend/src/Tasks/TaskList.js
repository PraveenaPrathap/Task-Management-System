import React from 'react';// We import React so we can use JSX and create this component.
import TaskItem from './TaskItem';//// We import the TaskItem component, which shows one task in a table row.

function TaskList({ tasks, onUpdate }) {  // This is the TaskList component. It receives two props: 'tasks' an array of tasks and 'onUpdate' a function to refresh the list.
  return (
    <div className='Table'>
      <table className="task-table" >    {/* We create a table to display the tasks. It spans full  */}
        <thead>
          <tr>
            <th>Title</th>    {/* Column heading for the task's title */}
            <th>Description</th>   {/* Column heading for the task's description */}
            <th>Actions</th>     {/* Column heading for buttons like Edit or Delete */}
          </tr>
        </thead>
        <tbody className='body-table'>
          {tasks.map((task) => (    //  loop through every task in the 'tasks' array using map()
            <TaskItem key={task._id} task={task} onUpdate={onUpdate} />// We loop through the tasks array and render a TaskItem for each task.
                                                                      // We give each TaskItem a unique key (task._id) and pass task data and the update function as props.
                                                                     //We also pass the onUpdate function so TaskItem can refresh the list after editing/deleting
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default TaskList; //// We export the TaskList component so it can be used in App.js or other files.