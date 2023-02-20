import { TaskProvider } from "./components/Context/TaskContext";
import AddTask from "../src/components/AddTask/AddTask";
import TaskList from "./components/TaskList/TaskList";

const App = () => {
  return (
    <TaskProvider>
      <AddTask />
      <TaskList />
    </TaskProvider>
  );
};

export default App;
