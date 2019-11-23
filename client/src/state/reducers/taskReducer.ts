import { BaseAction, ActionTypes } from '../types';
import { GetTasksAction } from '../actions/taskActions';

interface Task {
  _id: Number;
  title: String;
  priority: String;
  created_date: Date;
  completed: Boolean;
}

interface TaskState {
  tasks: Array<Task>;
}

const initialState = {
  tasks: []
};

export const taskReducer = (
  state: TaskState = initialState,
  action: GetTasksAction
) => {
  switch (action.type) {
    case ActionTypes.GET_TASKS:
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
};
