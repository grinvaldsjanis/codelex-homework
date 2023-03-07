import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Task } from '../utils/task.interface';

export interface TaskState extends EntityState<Task> {
  // additional state properties can go here
}

export const tasksAdapter = createEntityAdapter<Task>();

export const initialState: TaskState = tasksAdapter.getInitialState({
  // additional initial state properties can go here
});