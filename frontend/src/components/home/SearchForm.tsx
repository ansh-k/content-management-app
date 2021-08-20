
import React from 'react';
import { ISearchFormProps } from '../../Interfaces';


export const SearchForm = ({ search }: ISearchFormProps): JSX.Element => {
    return (
        <form className='form-inline md-form form-sm active-cyan active-cyan-2 d-flex align-items-center'>
            <input
                className='form-control form-control-sm ml-3 w-75 ml-5'
                type='text'
                placeholder='Search for the pages you are looking for...'
                aria-label='Search'
                name='query'
            />
        </form>
    );
};
