export enum ActionTypes {
  LOGIN_USER = 'LOGIN_USER',
  LOGOUT_USER = 'LOGOUT_USER',
  GET_TASKS = 'GET_TASKS',
  ADD_TASK = 'ADD_TASK',
  EDIT_TASK = 'EDIT_TASK',
  DELETE_TASK = 'DELETE_TASK'
}

export interface BaseAction {
  type: ActionTypes;
}
