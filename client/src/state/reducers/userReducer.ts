import { BaseAction, ActionTypes } from '../types';
import { LoginUserAction } from '../actions/userAction';

interface Credentials {
  email: String;
  userId: String;
}

interface UserState {
  authenticated: Boolean;
  credentials: Credentials;
}

const initialState = {
  authenticated: false,
  credentials: {
    email: '',
    userId: ''
  }
};

export const userReducer = (
  state: UserState = initialState,
  action: LoginUserAction
) => {
  switch (action.type) {
    case ActionTypes.LOGIN_USER:
      return {
        ...state,
        authenticated: true,
        credentials: {
          email: action.payload.email,
          userId: action.payload.userId
        }
      };
    default:
      return state;
  }
};
