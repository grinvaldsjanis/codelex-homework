export interface Task {
  id: string;
  name: string;
  status: 'not started' | 'in process' | 'done';
}
