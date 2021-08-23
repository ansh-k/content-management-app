import { FormEvent, SyntheticEvent } from 'react';

export interface IAddEditInputsProps {
  name: string;
  url: string;
  description: string;
  image: any;
  textResources: any;
  id: string;
}

export interface ITextResourceInputs {
  name: string;
  value: string;
  type: string;
  maxLength: string;
  lineType: string;
  _id?: string;
}

export interface IAddEditFormProps {
  onSubmit: (event: SyntheticEvent) => void;
  inputs: IAddEditInputsProps;
  onHandleFileUpload: (event: Event) => void;
  onInputChange: (event: FormEvent<HTMLInputElement>) => void;
  onAddNewTextResourceModalToggle: () => void;
  id: string;
  OnTextResourceEdit: (item: ITextResourceInputs) => void;
  onTextResourceDelete: (_id: number) => void;
  t: any;
  validObj: {
    validName: boolean;
    validURL: boolean;
    validDesc: boolean;
    validImage: boolean;
    validForm: boolean;
  };
}
