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
      isPageAdded: false,
      pageData: {},
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

    [PageActions.REQUEST_PAGE_BY_ID]: (
      state = PagesInitialStates,
      action: any
    ) => ({
      ...state,
      pageData: {},
      isPageAdded: false,
    }),
    [PageActions.PAGE_BY_ID_SUCCESS]: (
      state = PagesInitialStates,
      action: any
    ) => ({
      ...state,
      pageData: action.payload,
      isPageAdded: false,
    }),

    [PageActions.EDIT_PAGE_REQUEST]: (
      state = PagesInitialStates,
      action: any
    ) => ({
      ...state,
      isPageAdded: false,
    }),
    [PageActions.EDIT_PAGE_SUCCESS]: (
      state = PagesInitialStates,
      action: any
    ) => ({
      ...state,
      isPageAdded: true,
    }),
  },
  PagesInitialStates
);
