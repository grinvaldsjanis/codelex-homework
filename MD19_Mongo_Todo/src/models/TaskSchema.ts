import { Schema, model, Document } from 'mongoose';


export interface TaskInterface extends Document {
  title: string;
  priority: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema({
  title: String,
  priority: { type: String, enum: ['highest', 'high', 'moderate', 'low'] },
  done: { default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Task = model('Task', taskSchema, 'tasks');

export default Task;