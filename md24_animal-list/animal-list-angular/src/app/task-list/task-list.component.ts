import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../utils/task.interface';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() deleteTask = new EventEmitter<string>();
  @Output() changeStatus = new EventEmitter<Task>();


  onDeleteTask(id: string) {
    this.deleteTask.emit(id);
  }

  onChangeStatus(task: Task) {
    this.changeStatus.emit(task);
  }
}
