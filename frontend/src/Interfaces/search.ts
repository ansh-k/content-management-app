import React, { ChangeEvent, SyntheticEvent } from 'react';

export interface ISearchFormProps {
  searchValue: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: SyntheticEvent) => void;
}
