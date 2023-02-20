import { useTask } from "../Context/TaskContext";
import TaskItem from "../TaskItem/TaskItem";

const TaskList = () => {
  const { tasks } = useTask();

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;
