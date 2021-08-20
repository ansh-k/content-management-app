import React from 'react';
import Input from '../../common/Input';

export const AddEditPageForm = ({
    onSubmit,
    inputs,
    onHandleFileUpload,
    onInputChange,
    t,
    onAddNewTextResourceModalToggle,
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
                <div className='col-md-12'>
                    <p className='space-top border-bottom d-flex justify-content-between'>
                        {t('TEXT_RESOURCE')} :
                        <button
                            type="button"
                            className='btn btn-secondary'
                            onClick={onAddNewTextResourceModalToggle}
                        >
                            {t('ADD')} {t('TEXT_RESOURCE')}
                        </button>
                    </p>
                </div>
                {textResources && textResources.length > 0 ? (
                    <div className="col-12 col-md-6">
                        <div className="row border p-2 my-2" >
                            <div className="col-6">Name</div>
                            <div className="col-6">Value</div>
                        </div>
                        {textResources.map((item: any, i: number) => (
                            <div className="row border p-2 my-2" key={i}>
                                <div className="col-6">{item.name}</div>
                                <div className="col-6">{item.value}</div>
                            </div>
                        ))}
                    </div>
                ) : null}
                <div className='col-md-12'>
                    <input
                        type='submit'
                        className='btn btn-primary'
                        value={`${t('ADD')}`}
                    />
                </div>
            </div>
        </form>
    );
};
