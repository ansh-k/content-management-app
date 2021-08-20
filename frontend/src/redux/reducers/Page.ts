import { PagesInitialStates } from '../states';
import { handleActions } from 'redux-actions';

import { PageActions } from '../actions';

export const PageReducer = handleActions(
  {
    [PageActions.PAGES_LIST_SUCCESS]: (
      state = PagesInitialStates,
      action: any
    ) => ({
      ...state,
      isLoading: false,
      pages: action.payload,
    }),
    [PageActions.ADD_PAGE_REQUEST]: (
      state = PagesInitialStates,
      action: any
    ) => ({
      ...state,
      isPageAdded: false,
    }),
    [PageActions.ADD_PAGE_SUCCESS]: (
      state = PagesInitialStates,
      action: any
    ) => ({
      ...state,
      isPageAdded: true,
    }),
  },
  PagesInitialStates
);
