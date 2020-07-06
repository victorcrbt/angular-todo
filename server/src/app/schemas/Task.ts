import { Schema, model, Document } from 'mongoose';

import { UserType } from './User';

export interface TaskType extends Document {
  user?: UserType | string;
  description: string;
  status: 'pending' | 'completed';
  created_at?: string;
  updated_at?: string;
}

const taskSchema = new Schema(
  {
    name: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    description: String,
    status: {
      type: String,
      enum: ['pending', 'completed'],
    },
  },
  { timestamps: true }
);

const Task = model<TaskType>('Task', taskSchema);

export default Task;
