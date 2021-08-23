import React, { FC, useEffect, FormEvent, useState, SyntheticEvent } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { useTranslation } from 'react-i18next';
import qs from 'query-string'
import { SearchForm } from './SearchForm';
import { TableForm } from './TableForm'

import { IListProps } from '../../Interfaces';
import { ADD_NEW_PAGE, EDIT_PAGE, VIEW_PAGE, Pagination } from '../../util';
import { deleteRecord, requestPages } from '../../redux/actions';

const _limit: number = 3;

const Home: FC<IListProps> = (props: any) => {
  const { history, location } = props;
  const { t } = useTranslation();

  const parse = qs.parse(location.search);
  const { page = 1, search = '' } = parse;
  // states
  const [searchValue, setSearchValue] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<any>(1)

  const dispatch = useDispatch()

  // selectors
  const pagesResult: any = useSelector<any>(state => state.pageReducer);
  const { pages: pagesRecord, totalRecords, isLoading } = pagesResult

  useEffect(() => {
    getPages();// eslint-disable-next-line
  }, [page, search])




  /*
  ------------------------------
    Function to get pages list
  ------------------------------
  */
  const getPages = async () => {
    setCurrentPage(page)
    dispatch(requestPages({ search, page, _limit }))
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
  /*
         -----------------------------------------------
             Function to manage search input on change
         -----------------------------------------------
         */
  const onInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLFormElement;
    setSearchValue(value)
  };

  /*
     -------------------------------------
         Function to manage form submit
      ------------------------------------
     */
  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const stringified = qs.stringify({ page: 1, search: searchValue });
    history.push(`?${stringified}`);
  };

  /*
----------------------------------
Function to manage pagination
----------------------------------
*/
  // eslint-disable-next-line
  const onPageChanged = (page: any) => {
    const stringified = qs.stringify({ page: page.currentPage, search: searchValue });
    history.push(`?${stringified}`);
  };

  return <div className='container'>
    <div className='row space-top'>
      <div className='col-md-6'>
        <SearchForm searchValue={searchValue} onInputChange={onInputChange} onSubmit={onSubmit} />
      </div>
      <div className='col-md-6'>
        <button className='btn btn-secondary' onClick={() => onAddNewPage()}>
          {t('ADD_NEW_PAGE')}
        </button>
      </div>
      <div className='col-md-12'>
        <TableForm pagesRecord={pagesRecord} OnPageEdit={OnPageEdit} onPageRecordDelete={onPageRecordDelete} OnPageView={OnPageView} t={t} currentPage={page} _limit={_limit} isLoading={isLoading} />

        <div className='d-flex flex-row py-4 align-items-center justify-content-center'>
          {!isLoading && totalRecords && totalRecords > 0 && currentPage ? (
            <Pagination
              totalRecords={totalRecords}
              pageLimit={_limit}
              pageNeighbours={currentPage}
              onPageChanged={onPageChanged}
              currentPage={currentPage}
            />
          ) : null}
        </div>
      </div>
    </div>
  </div>;
};

export default Home;
