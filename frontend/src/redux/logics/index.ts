import { createLogic } from 'redux-logic';
import { push } from 'react-router-redux';

import { PageLogics } from './Page';

export const redirectToLogic = createLogic({
  type: 'REDIRECT_TO',
  async process(data, dispatch, done) {
    const action: any = data.action;
    dispatch(push(action.payload.path));
    done();
  },
});

export const AllLogics = [...PageLogics, redirectToLogic];
