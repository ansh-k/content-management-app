import { createLogic } from 'redux-logic';
import {
  addNewPageSuccess,
  editPageSuccess,
  PageActions,
  pageByIdSuccess,
  PagesListSuccess,
  requestPageById,
  requestPages,
} from '../actions';
import axios from 'axios';
import toastr from 'toastr';
import i18next from 'i18next';

/*
-----------------
  Add new page
-----------------
*/
const addNewPage = createLogic({
  type: PageActions.ADD_PAGE_REQUEST,
  async process(data: any, dispatch, done) {
    const { action } = data;
    const { payload } = action;
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}page/`, payload)
      .then(() => {
        toastr.success(i18next.t('PAGE_CREATE_SUCCESS', { lng: 'en' }));
        dispatch(addNewPageSuccess());
        done();
      })
      .catch((error: any) => {
        console.log(error);
      });
  },
});

/*
-----------------
  Fetch pages list
-----------------
*/
const pagesList = createLogic({
  type: PageActions.REQUEST_PAGES_LIST,
  async process(data: any, dispatch, done) {
    const { action } = data;
    const { payload } = action;
    const { search, page, _limit } = payload;
    await axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}page/?search=${search}&page=${page}&_limit=${_limit}`
      )
      .then((response) => {
        const { data, success } = response.data;
        if (success) {
          dispatch(PagesListSuccess(data));
        }
        done();
      })
      .catch((error: any) => {
        console.log(error);
      });
  },
});

/*
--------------------------
  Fetch page data by id
-------------------------
*/
const pageDataById = createLogic({
  type: PageActions.REQUEST_PAGE_BY_ID,
  async process(data: any, dispatch, done) {
    const { action } = data;
    const { payload } = action;
    await axios
      .get(`${process.env.REACT_APP_SERVER_URL}page/${payload}`)
      .then((response) => {
        const { data, success } = response.data;
        if (success) {
          dispatch(pageByIdSuccess(data));
        }
        done();
      })
      .catch((error: any) => {
        console.log(error);
      });
  },
});

/*
-----------------
  Edit page
-----------------
*/
const editPage = createLogic({
  type: PageActions.EDIT_PAGE_REQUEST,
  async process(data: any, dispatch, done) {
    const { action } = data;
    const { payload } = action;
    const { id } = payload;
    await axios
      .put(`${process.env.REACT_APP_SERVER_URL}page/${id}`, payload)
      .then(() => {
        toastr.success(i18next.t('PAGE_EDIT_SUCCESS', { lng: 'en' }));
        dispatch(editPageSuccess());
        done();
      })
      .catch((error: any) => {
        console.log(error);
      });
  },
});

/*
----------------------------------
  Delete Record textResource/Page
---------------------------------
*/
const deleteRecord = createLogic({
  type: PageActions.DELETE_RECORD_REQUEST,
  async process(data: any, dispatch, done) {
    const { action } = data;
    const { payload } = action;
    const { pageID, textResourceID = '' } = payload;
    await axios
      .delete(
        `${process.env.REACT_APP_SERVER_URL}page/${
          textResourceID ? `/textResource/${textResourceID}` : pageID
        }`
      )
      .then(() => {
        toastr.success(i18next.t('RECORD_DELETE_SUCCESS', { lng: 'en' }));
        if (textResourceID) {
          dispatch(requestPageById(pageID));
        } else {
          dispatch(requestPages());
        }
        done();
      })
      .catch((error: any) => {
        console.log(error);
      });
  },
});

export const PageLogics = [
  addNewPage,
  pagesList,
  pageDataById,
  editPage,
  deleteRecord,
];
