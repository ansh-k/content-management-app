import React from 'react';

const Input = (props: any) => {
  const {
    type,
    name,
    value,
    label,
    onChange,
    placeholder,
    valid,
    invalidMessage,
    accept,
    rows,
    textarea = false
  } = props;
  let className = 'form-control';
  if (value !== '') {
    if (valid) {
      className = 'form-control is-valid';
    } else {
      className = 'form-control is-invalid';
    }
  }
  let inputProps = {}
  if (accept)
    inputProps = {
      accept: accept
    }
  return (
    <div className='form-group'>
      <label className='form-control-label' htmlFor={name}>
        {label}
      </label>
      {textarea ?
        <textarea
          className={className}
          name={name}
          id={name}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...inputProps}
        />
        :
        <input
          type={type}
          className={className}
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...inputProps}
        />
      }
      {value !== '' && !valid && (
        <div className='form-control-feedback'>{invalidMessage}</div>
      )}
    </div>
  );
};

export default Input;
