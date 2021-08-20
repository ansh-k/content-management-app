import React, { FC, FormEvent, SyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { IAddEditInputsProps, IListProps } from '../../Interfaces';
import { AddEditPageForm } from './add-editForm';
import { convertBase64 } from '../../util';
import { addNewPage } from '../../redux/actions';

import TextResourceModal from './../../common/textResourceModel';
import { useEffect } from 'react';

const initialStates = {
    name: '',
    url: '',
    description: '',
    image: undefined,
    textResources: [],
};

const textResourceInitialStates = {
    name: '',
    value: '',
    type: '',
    maxLength: '',
    lineType: '',
};

const AddEditPage: FC<IListProps> = (props: any) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { history } = props;

    // states
    const [inputs, setInputs] = useState<IAddEditInputsProps>(initialStates);
    const [textResourceInputs, setTextResourceInputs] = useState<any>(
        textResourceInitialStates
    );
    const [textResourceToggle, setTextResourceToggle] = useState<any>(false);

    // selectors
    const pagesResult: any = useSelector<any>(state => state.pageReducer);
    const { isPageAdded } = pagesResult

    useEffect(() => {
        if (isPageAdded) history.push('/')
    }, [isPageAdded])
    /*
      -----------------------------
          Function to upload file
      -----------------------------
      */
    const onHandleFileUpload = async (event: Event) => {
        const input = event.target as HTMLInputElement;

        if (!input.files?.length) {
            return;
        }
        const file = input.files[0];
        const base64: any = await convertBase64(file);
        setInputs({ ...inputs, image: base64 });
    };

    /*
       -----------------------------------------------
           Function to manage inputs states on change
       -----------------------------------------------
       */
    const onInputChange = (event: FormEvent<HTMLInputElement>) => {
        const { name, value } = event.target as HTMLFormElement;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };
    /*
   --------------------------------------------------------------
       Function to manage text resource inputs states on change
   --------------------------------------------------------------
   */
    const onTextResourceInputChange = (event: FormEvent<HTMLInputElement>) => {
        const { name, value } = event.target as HTMLFormElement;
        setTextResourceInputs({
            ...textResourceInputs,
            [name]: value,
        });
    };

    /*
   --------------------------------------------------------------
       Function to manage select inputs states on change
   --------------------------------------------------------------
   */
    const onSelectChange = (event: FormEvent<HTMLInputElement>) => {
        const { value } = event.target as HTMLFormElement;
        setTextResourceInputs({
            ...textResourceInputs,
            lineType: value,
        });
    };

    /*
     -------------------------------------
         Function to manage form submit
      ------------------------------------
     */
    const onSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        const { textResources } = inputs
        const data = textResources;
        dispatch(
            addNewPage({
                ...inputs,
                textResources: JSON.stringify(data),
            })
        );
    };

    /*
        -------------------------------------
          Function to manage add/edit Modal
         ------------------------------------
        */
    const onAddNewTextResourceModalToggle = () => {
        setTextResourceInputs(textResourceInitialStates);
        setTextResourceToggle(!textResourceToggle);
    };

    /*
    ------------------------------------------------
      Function to manage text resource form submit
     -----------------------------------------------
    */
    const onTextResourceSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        inputs.textResources.push(textResourceInputs);
        setInputs({
            ...inputs,
            textResources: [...inputs.textResources],
        });
        onAddNewTextResourceModalToggle();
    };


    return (
        <div className='container card p-3 mt-2'>
            <h6>{t('ADD_NEW_PAGE')}</h6>
            <AddEditPageForm
                onHandleFileUpload={onHandleFileUpload}
                inputs={inputs}
                t={t}
                onSubmit={onSubmit}
                onInputChange={onInputChange}
                onAddNewTextResourceModalToggle={onAddNewTextResourceModalToggle}
            />
            <TextResourceModal
                textResourceInputs={textResourceInputs}
                textResourceToggle={textResourceToggle}
                onTextResourceInputChange={onTextResourceInputChange}
                onTextResourceSubmit={onTextResourceSubmit}
                onSelectChange={onSelectChange}
                onAddNewTextResourceModalToggle={onAddNewTextResourceModalToggle}
                t={t}
            />
        </div>
    );
};

export default AddEditPage;
