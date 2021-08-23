import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton'

export const TableForm = ({ pagesRecord, OnPageEdit, onPageRecordDelete, OnPageView, t, currentPage, _limit, isLoading }: any): JSX.Element => {
    const _skip: number = (currentPage - 1) * _limit;
    return (
        <div className='box'>
            <div className='table-responsive'>
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>{t('NAME')}</th>
                            <th>{t('DESCRIPTION')}</th>
                            <th>{t('URL')}</th>
                            <th>{t('SNAPSHOT')}</th>
                            <th>{t('TEXT_RESOURCE_COUNT')}</th>
                            <th>{t('ACTION')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ?
                            <tr>
                                <th colSpan={7} >
                                    <Skeleton count={3} />
                                </th>
                            </tr> :
                            pagesRecord && pagesRecord.length > 0
                                ? pagesRecord.map((item: any, key: number) => {
                                    return (
                                        <tr key={key}>
                                            <th>{_skip + key + 1}</th>
                                            <th>{item.name}</th>
                                            <th className='desc-width'>{item.description}</th>
                                            <th>{item.url}</th>
                                            <th>
                                                <img src={item.image} alt='' width='80' />
                                            </th>
                                            <th>{item.textResources && item.textResources.length}</th>
                                            <th>
                                                <div className='d-flex justify-content-around action-width'>
                                                    <span className='cursor-pointer'>
                                                        <FontAwesomeIcon icon={faEye} onClick={() => OnPageView(item._id)} />
                                                    </span>
                                                    <span className='cursor-pointer' onClick={() => OnPageEdit(item._id)}>
                                                        <FontAwesomeIcon icon={faPencilAlt} />
                                                    </span>
                                                    <span className='cursor-pointer' onClick={() =>
                                                        window.confirm(
                                                            'Are you sure you wish to delete this item?'
                                                        ) && onPageRecordDelete(item._id)
                                                    }>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </span>
                                                </div>
                                            </th>
                                        </tr>
                                    );
                                })
                                : null}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableForm;
