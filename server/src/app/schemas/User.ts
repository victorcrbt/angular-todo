import { Schema, model, Document } from 'mongoose';

import { TaskType } from './Task';

export interface UserType extends Document {
  name: string;
  email: string;
  password: string;
  tasks?: TaskType[];
  created_at?: string;
  updated_at?: string;
}

export const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
});

const User = model<UserType>('User', userSchema);

export default User;
