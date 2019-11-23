import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { userReducer } from './reducers/userReducer';
import { taskReducer } from './reducers/taskReducer';

const rootReducer = combineReducers({
  user: userReducer,
  task: taskReducer
});

export type AppState = ReturnType<typeof rootReducer>;

const middleware = [thunkMiddleware];

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
