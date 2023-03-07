import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './tasks.reducer';
import { tasksAdapter } from './tasks.adapter';

export const selectTasksState = createFeatureSelector<TaskState>('tasks');

export const selectAllTasks = createSelector(
  selectTasksState,
  tasksAdapter.getSelectors().selectAll
);