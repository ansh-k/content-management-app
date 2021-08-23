import { createAction } from 'redux-actions';

export const PageActions = {
  ADD_PAGE_REQUEST: 'Request add page!', // add actions
  ADD_PAGE_SUCCESS: 'Add page success',
  REQUEST_PAGES_LIST: 'Request pages list', // page list actions
  PAGES_LIST_SUCCESS: 'Pages list success',
  REQUEST_PAGE_BY_ID: 'request page by id', // page data by id actions
  PAGE_BY_ID_SUCCESS: 'Page by id success',
  EDIT_PAGE_REQUEST: 'Request edit page!', // edit page actions
  EDIT_PAGE_SUCCESS: 'Edit page success',
  DELETE_RECORD_REQUEST: 'Request to delete record', // delete record actions
};

/*
---------------
  Add page 
---------------
*/
export const addNewPage = createAction(PageActions.ADD_PAGE_REQUEST);
export const addNewPageSuccess = createAction(PageActions.ADD_PAGE_SUCCESS);

/*
----------------
  Pages LIst
---------------
*/
export const requestPages = createAction(PageActions.REQUEST_PAGES_LIST);
export const PagesListSuccess = createAction(PageActions.PAGES_LIST_SUCCESS);

/*
------------------
  Page data by Id
-----------------
*/
export const requestPageById = createAction(PageActions.REQUEST_PAGE_BY_ID);
export const pageByIdSuccess = createAction(PageActions.PAGE_BY_ID_SUCCESS);

/*
------------------
  Edit page by Id
-----------------
*/
export const editPage = createAction(PageActions.EDIT_PAGE_REQUEST);
export const editPageSuccess = createAction(PageActions.EDIT_PAGE_SUCCESS);

/*
----------------------------------
  Delete Record textResource/Page
---------------------------------
*/
export const deleteRecord = createAction(PageActions.DELETE_RECORD_REQUEST);
