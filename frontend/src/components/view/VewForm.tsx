import React from 'react';
import moment from 'moment';

export const ViewForm = ({ pageData, t }: any): JSX.Element => {
    const {
        name = '',
        url = '',
        description = '',
        image = '',
        textResources = [],
        createdAt = '',
        updatedAt = '',
    } = pageData || {};
    return (
        <div className='box'>
            <div className='row '>
                <div className='col-12 p-3'>
                    <div className='px-5 d-flex'>
                        <b>{t('NAME')}:</b>
                        <p className='px-3'>{name}</p>
                    </div>
                    <div className='px-5 d-flex'>
                        <b>{t('URL')}:</b>
                        <p className='px-3'>{url}</p>
                    </div>
                    <div className='px-5 d-flex '>
                        <b>{t('DESCRIPTION')}:</b>
                        <p className='px-3'>{description}</p>
                    </div>
                    <div className='row px-5'>
                        <b className='col-2'>{t("SNAPSHOT")}:</b>
                        <div className='col-4'>
                            <img className='mx-auto' width='250' src={image} alt='' />
                        </div>
                    </div>
                    <div className='px-5 mt-2 d-flex '>
                        <b>{t('CREATED_DATE')}:</b>
                        <p className='px-3'>{moment(createdAt).format('llll')}</p>
                    </div>
                    <div className='px-5 d-flex '>
                        <b>{t('UPDATED_DATE')}:</b>
                        <p className='px-3'>{moment(updatedAt).format('llll')}</p>
                    </div>
                    <div className='px-5 my-1'>
                        <div className='col-12 '>
                            <b className='col-11'>{t('TEXT_RESOURCES')}</b>
                        </div>
                        {textResources && textResources.length > 0 ?
                            textResources.map((item: any, index: number) => (
                                <div className='row mx-2 px-3 my-3 border rounded' key={index}>
                                    <div className='col-10 '>
                                        <p>
                                            <span className='font-weight-bold'>{t('NAME')}:</span>{' '}
                                            <span className='ml-2 '>{item.name}</span>
                                        </p>
                                        <p>
                                            <span className='font-weight-bold'>{t('VALUE')}:</span>{' '}
                                            <span className='ml-2'>{item.value}</span>
                                        </p>
                                        <p>
                                            <span className='font-weight-bold'>{t('TYPE')}:</span>{' '}
                                            <span className='ml-2 '>{item.type}</span>
                                        </p>
                                        <p>
                                            <span className='font-weight-bold'>{t("MAX_LENGTH")}:</span>{' '}
                                            <span className='ml-2 '>{item.maxLength}</span>
                                        </p>
                                        <p>
                                            <span className='font-weight-bold'>{t("LINE_TYPE")}:</span>{' '}
                                            <span className='ml-2 text-capitalize '>{item.lineType}</span>
                                        </p>
                                    </div>
                                </div>
                            )) : <div className='row mx-2 px-3 my-3  text-center'>
                                <h5>{t('NOT_ADDED')}</h5>
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewForm;
