import React from 'react';
import { MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';

import Input from './Input';
import { ITextResourceModelProps } from '../interfaces';

const TextResourceModal = ({
  textResourceInputs,
  textResourceToggle,
  onTextResourceInputChange,
  onSelectChange,
  t,
  onAddNewTextResourceModalToggle,
  onTextResourceSubmit,
  id, validTextResObj
}: ITextResourceModelProps) => {
  const {
    name,
    value,
    type,
    maxLength,
    lineType,
    _id = '',
  } = textResourceInputs;
  return (
    <MDBModal isOpen={textResourceToggle} centered>
      <MDBModalHeader toggle={onAddNewTextResourceModalToggle}>
        {' '}
        {id && _id ? t('EDIT') : t('ADD')} {t('TEXT_RESOURCE')}
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
                valid={validTextResObj.validName}
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
                valid={validTextResObj.validValue}
              />
            </div>
            <div className='col-md-6'>
              <Input
                type='text'
                name='type'
                label='Type'
                placeholder='Enter type'
                value={type}
                onChange={onTextResourceInputChange}
                valid={validTextResObj.validType}
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
                valid={validTextResObj.validMaxLength}
              />
            </div>
            <div className='col-md-6'>
              <div className='form-group'>
                <label className='form-control-label' htmlFor={'Line Type'}>
                  {t('LINE_TYPE')}{' '}
                </label>
                <select
                  value={lineType}
                  onChange={onSelectChange}
                  className={`form-control ${validTextResObj.validLineType ? 'is-valid' : 'is-invalid'}`}
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
                className='btn btn-primary btn-center'
                value={id && _id ? `${t('EDIT')}` : `${t('ADD')}`}
              />
            </div>
          </div>
        </form>
      </MDBModalBody>
    </MDBModal>
  );
};

export default TextResourceModal;
