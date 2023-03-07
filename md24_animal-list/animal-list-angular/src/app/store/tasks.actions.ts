import { createAction, props } from '@ngrx/store';
import { Task } from '../utils/task.interface';

export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());
export const updateTask = createAction('[Task] Update Task', props<{ id: string, changes: Partial<Task> }>());
export const deleteTask = createAction('[Task] Delete Task', props<{ id: string }>());
export const completeTask = createAction('[Task] Complete Task', props<{ id: string }>());
export const loadTasks = createAction('[Task] Load Tasks');
