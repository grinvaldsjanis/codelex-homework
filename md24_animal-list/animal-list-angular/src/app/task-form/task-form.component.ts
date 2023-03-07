import { v4 as uuidv4 } from 'uuid';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Task } from '../utils/task.interface';
import { addTask } from '../store/tasks.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  taskForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(private formBuilder: FormBuilder, private store: Store<any>) {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  @Output() addTask = new EventEmitter<{ name: string }>();

  onSubmit() {
    if (this.taskForm.invalid) {
      return;
    }

    const newTask: Task = {
      id: uuidv4(),
      name: this.taskForm.value.name!,
      status: 'not started',
    };
    console.log('chack the event', newTask);
    this.store.dispatch(addTask({ task: newTask }));
    this.taskForm.reset();
  }
}
