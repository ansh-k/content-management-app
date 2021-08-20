import { createLogic } from 'redux-logic';
import { addNewPageSuccess, PageActions, PagesListSuccess } from '../actions';
import axios from 'axios';
import toastr from 'toastr';
import { push } from 'react-router-redux';

const addNewPage = createLogic({
  type: PageActions.ADD_PAGE_REQUEST,
  async process(data: any, dispatch, done) {
    const { action } = data;
    const { payload } = action;
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}page/`, payload)
      .then(() => {
        toastr.success('Page created successfully');
        dispatch(addNewPageSuccess());
        done();
      })
      .catch((error: any) => {
        console.log(error);
      });
  },
});

const pagesList = createLogic({
  type: PageActions.REQUEST_PAGES_LIST,
  async process(data: any, dispatch, done) {
    const { action } = data;
    const { payload } = action;
    await axios
      .get(`${process.env.REACT_APP_SERVER_URL}page/`, payload)
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

export const PageLogics = [addNewPage, pagesList];
