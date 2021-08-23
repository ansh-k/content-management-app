
import React from 'react';
import { ISearchFormProps } from '../../Interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const SearchForm = ({ searchValue, onInputChange, onSubmit }: ISearchFormProps): JSX.Element => {
    return (
        <form className='form-inline md-form form-sm active-cyan active-cyan-2 d-flex align-items-center' onSubmit={onSubmit}>
            <input
                className='form-control form-control-sm ml-3 w-75 ml-5'
                type='text'
                placeholder='Search for the pages you are looking for...'
                aria-label='Search'
                name='searchValue'
                onChange={onInputChange}
                value={searchValue}
            />
            <button type='submit' className='btn btn-secondary'>
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </form>
    );
};
