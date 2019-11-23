import { BaseAction, ActionTypes } from '../types';
import { ThunkDispatch } from 'redux-thunk';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

interface Task {
  _id: Number;
  title: String;
  priority: String;
  created_date: Date;
  completed: Boolean;
}

interface Body {
  title: String;
  description: String;
  priority: String;
}

export interface GetTasksAction extends BaseAction {
  type: ActionTypes.GET_TASKS;
  payload: Array<Task>;
}
export interface AddTaskAction extends BaseAction {
  type: ActionTypes.ADD_TASK;
  payload: Array<Task>;
}

export const getTasks = () => async (
  dispatch: ThunkDispatch<{}, {}, GetTasksAction>
) => {
  try {
    let res = await axiosWithAuth().get('/tasks');
    dispatch({
      type: ActionTypes.GET_TASKS,
      payload: res.data
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const addTask = (values: Body) => async (
  dispatch: ThunkDispatch<{}, {}, GetTasksAction>
) => {
  try {
    let res = await axiosWithAuth().post('tasks', values);
    dispatch({
      type: ActionTypes.GET_TASKS,
      payload: res.data.tasks
    });
  } catch (error) {
    console.error(error.message);
  }
};
