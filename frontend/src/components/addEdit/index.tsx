import React, {
	FC,
	FormEvent,
	SyntheticEvent,
	useState,
	useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, } from '@fortawesome/free-solid-svg-icons';
import toastr from 'toastr';

import {
	IAddEditInputsProps,
	IListProps,
	ITextResourceInputs,
} from '../../interfaces';
import { AddEditPageForm } from './AddEditForm';
import {
	addPageValidationFunc,
	addTextResourceValidationFunc,
	convertBase64,
} from '../../util';
import {
	addNewPage,
	requestPageById,
	editPage,
	deleteRecord,
} from '../../redux/actions';
import TextResourceModal from '../../common/textResourceModel';

const initialStates = {
	name: '',
	url: '',
	description: '',
	image: undefined,
	textResources: [],
	id: '',
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

	const {
		history,
		match: {
			params: { id = '' },
		},
	} = props;

	// states
	const [inputs, setInputs] = useState<IAddEditInputsProps>(initialStates);
	const [textResourceInputs, setTextResourceInputs] =
		useState<ITextResourceInputs>(textResourceInitialStates);
	const [textResourceToggle, setTextResourceToggle] = useState<boolean>(false);

	// selectors
	const pagesResult: any = useSelector<any>((state) => state.pageReducer);
	const { isPageAdded, pageData } = pagesResult;

	const validObj = addPageValidationFunc(inputs); // add/edit page form validate function
	const validTextResObj = addTextResourceValidationFunc(textResourceInputs); // add/edit text resource form validate function

	useEffect(() => {
		if (isPageAdded) history.push('/'); // works only if form added  
		//eslint-disable-next-line
	}, [isPageAdded]);

	useEffect(() => {
		if (id) dispatch(requestPageById(id)); // eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (pageData && pageData._id) {
			setInputs({
				name: pageData.name,
				url: pageData.url,
				description: pageData.description,
				image: pageData.image,
				textResources: pageData.textResources,
				id: pageData._id,
			});
		}
	}, [pageData]);

	// Function to upload file
	const onHandleFileUpload = async (event: Event) => {
		const input = event.target as HTMLInputElement;

		if (!input.files?.length) {
			return;
		}
		const file = input.files[0];
		const base64: any = await convertBase64(file);
		setInputs({ ...inputs, image: base64 });
	};

	// Function to manage inputs states on change
	const onInputChange = (event: FormEvent<HTMLInputElement>) => {
		const { name, value } = event.target as HTMLFormElement;
		setInputs({
			...inputs,
			[name]: value,
		});
	};

	// Function to manage text resource inputs states on change
	const onTextResourceInputChange = (event: FormEvent<HTMLInputElement>) => {
		const { name, value } = event.target as HTMLFormElement;
		setTextResourceInputs({
			...textResourceInputs,
			[name]: value,
		});
	};

	// Function to manage select inputs states on change
	const onSelectChange = (event: FormEvent<HTMLInputElement>) => {
		const { value } = event.target as HTMLFormElement;
		setTextResourceInputs({
			...textResourceInputs,
			lineType: value,
		});
	};

	// Function to manage form submit
	const onSubmit = (event: SyntheticEvent) => {
		event.preventDefault();
		const { textResources } = inputs;
		const data = textResources;
		if (validObj.validForm) {
			if (id && inputs.id) { // if added already
				dispatch(
					editPage({
						...inputs,
						textResources: JSON.stringify(data),
					})
				);
			} else { // add new
				dispatch(
					addNewPage({
						...inputs,
						textResources: JSON.stringify(data),
					})
				);
			}
		} else {
			toastr.error(t('FORM_ERROR_MESSAGE'));
		}
	};

	// Function to manage add/edit Modal
	const onAddNewTextResourceModalToggle = () => {
		setTextResourceInputs(textResourceInitialStates);
		setTextResourceToggle(!textResourceToggle);
	};

	// Function to manage text resource form submit
	const onTextResourceSubmit = (event: SyntheticEvent) => {
		event.preventDefault();
		if (validTextResObj.validForm) {
			if (textResourceInputs._id && id) { // edit
				var foundIndex = inputs.textResources.findIndex(
					(x: ITextResourceInputs) => x._id === textResourceInputs._id
				);
				inputs.textResources[foundIndex] = textResourceInputs;
			} else { // add-new
				inputs.textResources.push(textResourceInputs);
			}
			setInputs({
				...inputs,
				textResources: [...inputs.textResources],
			});
			onAddNewTextResourceModalToggle();
		} else {
			toastr.error(t('FORM_ERROR_MESSAGE'));
		}
	};

	// Function to manage edit text resource modal
	const OnTextResourceEdit = (item: ITextResourceInputs) => {
		if (!textResourceToggle) {
			setTextResourceInputs(item);
			setTextResourceToggle(true);
		} else {
			setTextResourceInputs(textResourceInitialStates);
			setTextResourceToggle(false);
		}
	};

	// Function to delete text resource
	const onTextResourceDelete = (_id: number) => {
		dispatch(
			deleteRecord({
				pageID: id,
				textResourceID: _id,
			})
		);
	};

	return (
		<div className='container card p-3 mt-2'>
			<div className='d-flex align-items-center'>
				<button type='button' className='btn btn-secondary' onClick={() => props.history.push('/')}>
					<FontAwesomeIcon icon={faArrowLeft} />
				</button>
				<h6>{id ? t('EDIT_PAGE') : t('ADD_NEW_PAGE')}</h6>
			</div>
			<AddEditPageForm
				onHandleFileUpload={onHandleFileUpload}
				inputs={inputs}
				t={t}
				onSubmit={onSubmit}
				onInputChange={onInputChange}
				onAddNewTextResourceModalToggle={onAddNewTextResourceModalToggle}
				id={id}
				OnTextResourceEdit={OnTextResourceEdit}
				onTextResourceDelete={onTextResourceDelete}
				validObj={validObj}
			/>
			<TextResourceModal
				textResourceInputs={textResourceInputs}
				textResourceToggle={textResourceToggle}
				onTextResourceInputChange={onTextResourceInputChange}
				onTextResourceSubmit={onTextResourceSubmit}
				onSelectChange={onSelectChange}
				onAddNewTextResourceModalToggle={onAddNewTextResourceModalToggle}
				t={t}
				id={id}
				validTextResObj={validTextResObj}
			/>
		</div>
	);
};

export default AddEditPage;
