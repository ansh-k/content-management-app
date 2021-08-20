import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SearchForm } from './SearchForm';
import { TableForm } from './TableForm'
import { IListProps } from '../../Interfaces';
import { ADD_NEW_PAGE } from '../../util';
import { requestPages } from '../../redux/actions';


const Home: FC<IListProps> = (props: any) => {
  const { history } = props;

  const dispatch = useDispatch()

  // selectors
  const pagesResult: any = useSelector<any>(state => state.pageReducer);
  const { pages: pagesRecord } = pagesResult

  useEffect(() => {
    getPages();
  }, [])


  /*
  ------------------------------
    Function to get pages list
  ------------------------------
  */
  const getPages = async () => {
    dispatch(requestPages())
  }
  /*
  ------------------------------------
    Function to link to add new page
  ------------------------------------
  */
  const onAddNewPage = () => {
    history.push(ADD_NEW_PAGE)
  }

  return <div className='container'>
    <div className='row space-top'>
      <div className='col-md-6'>
        <SearchForm search='' />
      </div>
      <div className='col-md-6'>
        <button className='btn btn-secondary' onClick={() => onAddNewPage()}>
          Add New Page
        </button>
      </div>
      <div className='col-md-12'>
        <TableForm pagesRecord={pagesRecord} />
      </div>
    </div>
  </div>;
};

export default Home;
