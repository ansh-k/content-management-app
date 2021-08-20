import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SearchForm } from './SearchForm';
import { TableForm } from './TableForm'
import { IListProps } from '../../Interfaces';
import { ADD_NEW_PAGE, EDIT_PAGE, VIEW_PAGE } from '../../util';
import { deleteRecord, requestPages } from '../../redux/actions';
import { useTranslation } from 'react-i18next';


const Home: FC<IListProps> = (props: any) => {
  const { history } = props;
  const { t } = useTranslation();


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

  /*
  ------------------------------------
  Function to link to edit new page
  ------------------------------------
  */
  const OnPageEdit = (id: string) => {
    history.push(EDIT_PAGE.replace(':id', id))
  }

  /*
------------------------------------
Function to link to view record page
------------------------------------
*/
  const OnPageView = (id: string) => {
    history.push(VIEW_PAGE.replace(':id', id))
  }

  /*
      -------------------------------------
        Function to delete page record
       -------------------------------------
      */
  const onPageRecordDelete = (id: number) => {
    dispatch(
      deleteRecord({
        pageID: id,
      })
    );
  }

  return <div className='container'>
    <div className='row space-top'>
      <div className='col-md-6'>
        <SearchForm search='' />
      </div>
      <div className='col-md-6'>
        <button className='btn btn-secondary' onClick={() => onAddNewPage()}>
          {t('ADD_NEW_PAGE')}
        </button>
      </div>
      <div className='col-md-12'>
        <TableForm pagesRecord={pagesRecord} OnPageEdit={OnPageEdit} onPageRecordDelete={onPageRecordDelete} OnPageView={OnPageView} t={t} />
      </div>
    </div>
  </div>;
};

export default Home;
