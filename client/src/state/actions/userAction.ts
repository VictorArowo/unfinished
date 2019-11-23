import { BaseAction, ActionTypes } from '../types';
import { ThunkDispatch } from 'redux-thunk';
import { History } from 'history';
import axios from 'axios';
import jwt from 'jsonwebtoken';

export interface LoginUserAction extends BaseAction {
  type: ActionTypes.LOGIN_USER;
  payload: {
    email: String;
    userId: String;
  };
}

export const loginUser = (
  email: String,
  password: String,
  history: History
) => async (dispatch: ThunkDispatch<{}, {}, LoginUserAction>) => {
  try {
    let res = await axios.post('http://localhost:4000/api/login', {
      email,
      password
    });
    localStorage.setItem('accessToken', `${res.data.accessToken}`);
    localStorage.setItem('refreshToken', `${res.data.refreshToken}`);
    let details = jwt.decode(res.data.accessToken);
    if (details)
      dispatch({
        type: ActionTypes.LOGIN_USER,
        payload: {
          email: (details as any).email,
          userId: (details as any).subject
        }
      });
    history.push('/dashboard');
  } catch (error) {
    console.error(error.message);
  }
};

export const logoutUser = (history: History) => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  history.push('/');
};
