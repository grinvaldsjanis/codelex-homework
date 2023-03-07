import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Task } from '../utils/task.interface';
import { addTask, updateTask, deleteTask, completeTask, loadTasks } from './tasks.actions';

export const tasksAdapter = createEntityAdapter<Task>();

export interface TaskState extends EntityState<Task> {}

const initialState: TaskState = tasksAdapter.getInitialState();

export const taskReducer = createReducer(
  initialState,

  on(addTask, (state, { task }) => {
    return tasksAdapter.addOne(task, state);
  }),

  on(updateTask, (state, { id, changes }) => tasksAdapter.updateOne({ id, changes }, state)),
  on(deleteTask, (state, { id }) => tasksAdapter.removeOne(id, state)),
  on(completeTask, (state, { id }) => tasksAdapter.updateOne({ id, changes: { status: 'done' } }, state)),
  on(loadTasks, (state) => state)
);
