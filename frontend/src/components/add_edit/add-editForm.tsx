import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

import Input from '../../common/Input';

export const AddEditPageForm = ({
    onSubmit,
    inputs,
    onHandleFileUpload,
    onInputChange,
    t,
    onAddNewTextResourceModalToggle,
    id,
    OnTextResourceEdit,
    onTextResourceDelete,
}: any): JSX.Element => {
    const { name, url, description, image, textResources } = inputs || {};

    return (
        <form onSubmit={onSubmit}>
            <div className='row space-top'>
                <div className='col-md-6'>
                    <Input
                        type='text'
                        name='name'
                        label='Name'
                        placeholder='Enter name'
                        value={name}
                        onChange={onInputChange}
                    />
                </div>
                <div className='col-md-6'>
                    <Input
                        type='text'
                        name='url'
                        label='Url'
                        placeholder='Enter url'
                        value={url}
                        onChange={onInputChange}
                    />
                </div>
                <div className='col-md-12'>
                    <Input
                        textarea={true}
                        rows={6}
                        name='description'
                        label='Description'
                        placeholder='Enter description'
                        value={description}
                        onChange={onInputChange}
                    />
                </div>
                <div className='col-md-6'>
                    <Input
                        type='file'
                        name='image'
                        label='Snapshot'
                        placeholder='Upload image'
                        accept='image/*'
                        onChange={onHandleFileUpload}
                    />
                </div>
                {image ? (
                    <div className='col-md-6'>
                        <img src={image} alt='' width='90' />
                    </div>
                ) : null}
                <div className='col-md-12'>
                    <p className='space-top border-bottom d-flex justify-content-between'>
                        {t('TEXT_RESOURCE')} :
                        <button
                            type='button'
                            className='btn btn-secondary'
                            onClick={onAddNewTextResourceModalToggle}
                        >
                            {t('ADD')} {t('TEXT_RESOURCE')}
                        </button>
                    </p>
                </div>
                {textResources && textResources.length > 0 ? (
                    <div className='col-12 col-md-6'>
                        <div className='row border p-2 my-2'>
                            <div className='col-3'>Name</div>
                            <div className='col-3'>Value</div>
                            {id ? <div className='col-6'>Action</div> : null}
                        </div>
                        {textResources.map((item: any, i: number) => (
                            <div className='row border p-2 my-2' key={i}>
                                <div className='col-3'>{item.name}</div>
                                <div className='col-3'>{item.value}</div>
                                <div className='col-6'>
                                    {id && item._id ? (
                                        <>
                                            <span
                                                className='cursor-pointer mr-2'
                                                onClick={() => OnTextResourceEdit(item)}
                                            >
                                                <FontAwesomeIcon icon={faPencilAlt} />
                                            </span>
                                            <span
                                                className='cursor-pointer'
                                                onClick={() =>
                                                    window.confirm(
                                                        'Are you sure you wish to delete this item?'
                                                    ) && onTextResourceDelete(item._id)
                                                }
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </span>
                                        </>
                                    ) : (
                                        '-'
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : null}
                <div className='col-md-12'>
                    <input
                        type='submit'
                        className='btn-center btn btn-primary '
                        value={id ? `${t('EDIT')}` : `${t('ADD')}`}
                    />
                </div>
            </div>
        </form>
    );
};
