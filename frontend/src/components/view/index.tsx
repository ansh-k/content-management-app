import React, { FC, } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { ViewForm } from './VewForm';
import { requestPageById } from '../../redux/actions';

import { useEffect } from 'react';

const ViewPage: FC<any> = (props: any) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const {
        match: { params },
    } = props;
    const { id = '' } = params || {};

    // selectors
    const pagesResult: any = useSelector<any>((state) => state.pageReducer);
    const { pageData, isLoading } = pagesResult;

    useEffect(() => {
        if (id) dispatch(requestPageById(id));// eslint-disable-next-line
    }, []);

    return (
        <div className='container card p-3 mt-2 mb-3'>
            <h6 className='border-bottom'>{t('VIEW_PAGE')}</h6>
            < ViewForm
                pageData={pageData}
                t={t}
                isLoading={isLoading}
            />
        </div>
    );
};

export default ViewPage;
