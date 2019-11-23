import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String
  },
  password: {
    type: String,
    required: 'Enter a valid password'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  tasks: [
    {
      title: String,
      created_date: {
        type: Date,
        default: Date.now
      },
      priority: String,
      completed: Boolean
    }
  ]
});

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  created_date?: Date;
  tasks?: Array<Task>;
}

interface Task {
  title: string;
  created_date?: Date;
  priority: string;
  completed: Boolean;
}

export default mongoose.model<IUser>('Users', UserSchema);
