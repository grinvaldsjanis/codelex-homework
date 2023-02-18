import React from 'react';
import { TaskContextProvider } from './TaskContext';
import TaskList from './components/TaskList/TaskList';

const App = () => {
  return (
    <TaskContextProvider>
      <TaskList />
    </TaskContextProvider>
  );
};

export default App;

// <div>
// <h1>Task Manager</h1>
// {isLoading ? (
//   <div>Loading...</div>
// ) : (
//   <>
//     <TaskList  handleTaskUpdate={handleTaskUpdate} />
//     <AddTaskForm
//       newTaskTitle={newTaskTitle}
//       newTaskPriority={newTaskPriority}
//       handleTitleChange={handleTitleChange}
//       handlePriorityChange={handlePriorityChange}
//       handleSubmit={handleAddTask}
//     />
//   </>
// )}
// </div>
