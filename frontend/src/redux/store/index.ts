import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogicMiddleware } from 'redux-logic';
import { AllLogics } from '../logics';
import { RootReducer } from '../reducers';

export default function configureStore(history: any) {
  const logicMiddleware = createLogicMiddleware(AllLogics);

  const middlewares = [routerMiddleware(history), logicMiddleware];

  const middleware = applyMiddleware(...middlewares);

  const store = createStore(RootReducer, middleware);

  return store;
}
