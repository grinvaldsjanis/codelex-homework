import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { defaultIfEmpty, Observable } from 'rxjs';
import { Task } from '../utils/task.interface';
import * as TaskActions from '../store/tasks.actions';
import * as fromTasks from '../store/tasks.reducer';
import { selectAllTasks } from '../store/tasks.selectors';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss'],
})
export class TaskPageComponent implements OnInit {
  tasks: Task[] | null = null;
  tasks$: Observable<Task[]> = this.store
    .select(selectAllTasks)
    .pipe(defaultIfEmpty([]));
  errorMessage!: string;

  constructor(private store: Store<fromTasks.TaskState>) {}

  ngOnInit() {
    this.tasks$ = this.store.select(selectAllTasks);
    this.store.dispatch(TaskActions.loadTasks());
  }

  addTask(task: Task) {
    console.log("task: ", task)
    this.store.dispatch(TaskActions.addTask({ task }));
  }

  deleteTask(id: string) {
    this.store.dispatch(TaskActions.deleteTask({ id }));
  }

  changeStatus(task: Task) {
    let newStatus: 'not started' | 'done' | 'in process';

    switch (task.status) {
      case 'not started':
        newStatus = 'in process';
        break;
      case 'in process':
        newStatus = 'done';
        break;
      case 'done':
        newStatus = 'not started';
        break;
    }

    const updatedTask: { id: string; changes: Partial<Task> } = {
      id: task.id,
      changes: { status: newStatus },
    };

    this.store.dispatch(TaskActions.updateTask(updatedTask));
  }
}
