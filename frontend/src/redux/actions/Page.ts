import { createAction } from 'redux-actions';

export const PageActions = {
  ADD_PAGE_REQUEST: 'Request add page!',
  ADD_PAGE_SUCCESS: 'Add page success',
  REQUEST_PAGES_LIST: 'Request pages list',
  PAGES_LIST_SUCCESS: 'Pages list success',
};

export const addNewPage = createAction(PageActions.ADD_PAGE_REQUEST);
export const addNewPageSuccess = createAction(PageActions.ADD_PAGE_SUCCESS);

/*
----------------
  Pages LIst
---------------
*/
export const requestPages = createAction(PageActions.REQUEST_PAGES_LIST);
export const PagesListSuccess = createAction(PageActions.PAGES_LIST_SUCCESS);
