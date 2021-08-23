import { PagesInitialStates } from '../states';
import { handleActions } from 'redux-actions';

import { PageActions } from '../actions';

export const PageReducer = handleActions(
  {
    [PageActions.REQUEST_PAGES_LIST]: (
      state = PagesInitialStates,
      action: any
    ) => ({
      ...state,
      isLoading: true,
      totalRecords: 0,
      isPageAdded: false,
      pageData: {},
    }),
    [PageActions.PAGES_LIST_SUCCESS]: (
      state = PagesInitialStates,
      action: any
    ) => ({
      ...state,
      isLoading: false,
      pages: action.payload && action.payload.data ? action.payload.data : [],
      totalRecords:
        action.payload.metadata &&
        action.payload.metadata[0] &&
        action.payload.metadata[0].total
          ? action.payload.metadata[0].total
          : 0,
      isPageAdded: false,
      pageData: {},
    }),
    [PageActions.ADD_PAGE_REQUEST]: (
      state = PagesInitialStates,
      action: any
    ) => ({
      ...state,
      isPageAdded: false,
      isLoading: true,
    }),
    [PageActions.ADD_PAGE_SUCCESS]: (
      state = PagesInitialStates,
      action: any
    ) => ({
      ...state,
      isPageAdded: true,
      isLoading: false,
    }),

    [PageActions.REQUEST_PAGE_BY_ID]: (
      state = PagesInitialStates,
      action: any
    ) => ({
      ...state,
      pageData: {},
      isPageAdded: false,
      isLoading: true,
    }),
    [PageActions.PAGE_BY_ID_SUCCESS]: (
      state = PagesInitialStates,
      action: any
    ) => ({
      ...state,
      pageData: action.payload,
      isPageAdded: false,
      isLoading: false,
    }),

    [PageActions.EDIT_PAGE_REQUEST]: (
      state = PagesInitialStates,
      action: any
    ) => ({
      ...state,
      isPageAdded: false,
      isLoading: true,
    }),
    [PageActions.EDIT_PAGE_SUCCESS]: (
      state = PagesInitialStates,
      action: any
    ) => ({
      ...state,
      isPageAdded: true,
      isLoading: false,
    }),
  },
  PagesInitialStates
);
