export enum Priority {
  low = 1,
  moderate = 2,
  high = 3,
  highest = 4,
}


export interface TaskType {
  _id?: string;
  title: string;
  priority: Priority;
  done: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type ExistingTask = Required<TaskType>;