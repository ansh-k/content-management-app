import React from 'react';
import { MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';

import Input from './Input';

const TextResourceModal = ({
  textResourceInputs,
  textResourceToggle,
  onTextResourceInputChange,
  onSelectChange,
  t, onAddNewTextResourceModalToggle, onTextResourceSubmit
}: any) => {
  const { name, value, type, maxLength, lineType } = textResourceInputs;

  return (
    <MDBModal isOpen={textResourceToggle} centered>
      <MDBModalHeader toggle={onAddNewTextResourceModalToggle}>
        {' '}
        {t('ADD')} {t('TEXT_RESOURCE')}
      </MDBModalHeader>
      <MDBModalBody>
        <form onSubmit={onTextResourceSubmit}>
          <div className='row space-top'>
            <div className='col-md-6'>
              <Input
                type='text'
                name='name'
                label='Name'
                placeholder='Enter name'
                value={name}
                onChange={onTextResourceInputChange}
              />
            </div>
            <div className='col-md-6'>
              <Input
                type='text'
                name='value'
                label='Value'
                placeholder='Enter value'
                value={value}
                onChange={onTextResourceInputChange}
              />
            </div>
            <div className='col-md-6'>
              <Input
                type='text'
                name='type'
                label='Name'
                placeholder='Enter type'
                value={type}
                onChange={onTextResourceInputChange}
              />
            </div>
            <div className='col-md-6'>
              <Input
                type='text'
                name='maxLength'
                label='Max Length'
                placeholder='Enter max length'
                value={maxLength}
                onChange={onTextResourceInputChange}
              />
            </div>
            <div className='col-md-6'>
              <div className='form-group'>
                <label className='form-control-label' htmlFor={'LIne Type'}>
                  {t('LINE_TYPE')}{' '}
                </label>
                <select
                  value={lineType}
                  onChange={onSelectChange}
                  className='form-control'
                >
                  <option value=''>{t('SELECT')}</option>
                  <option value='single'>{t('SINGLE_LINE')}</option>
                  <option value='multiline'>{t('MULTI_LINE')}</option>
                </select>
              </div>
            </div>
            <div className='col-md-12'>
              <input
                type='submit'
                className='btn btn-primary'
                value={`${t('ADD')}`}
              />
            </div>
          </div>
        </form>
      </MDBModalBody>
    </MDBModal>
  );
};

export default TextResourceModal;
