import { RouteComponentProps } from 'react-router-dom';
import { History } from 'history';
import { FormEvent, SyntheticEvent } from 'react';
import { ITextResourceInputs } from './add_edit';

export interface IListProps extends RouteComponentProps {
  history: any;
}

export interface ITableFormProps {
  pagesRecord: Array<[]>;
  onPageRecordDelete: (id: string) => void;
  t: any;
  currentPage: number | any;
  _limit: number;
  isLoading: boolean;
  props: any;
}

export interface ITextResourceModelProps {
  textResourceInputs: ITextResourceInputs;
  textResourceToggle: boolean;
  onTextResourceInputChange: (event: FormEvent<HTMLInputElement>) => void;
  onSelectChange: any;
  t: any;
  onAddNewTextResourceModalToggle: () => void;
  onTextResourceSubmit: (event: SyntheticEvent) => void;
  id: string;
  validTextResObj: {
    validName: boolean;
    validValue: boolean;
    validType: boolean;
    validMaxLength: boolean;
    validLineType: boolean;
    validForm: boolean;
  };
}
