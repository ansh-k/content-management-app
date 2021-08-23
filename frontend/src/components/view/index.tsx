import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, } from '@fortawesome/free-solid-svg-icons';
import { ViewDetails } from './VewDetails';
import { requestPageById } from '../../redux/actions';


const ViewPage: FC<any> = (props: any) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const {
		match: { params },
	} = props;
	const { id = '' } = params || {};

	// selectors
	const pagesResult: any = useSelector<any>((state) => state.pageReducer);
	const { pageData, isLoading } = pagesResult;

	useEffect(() => {
		if (id) dispatch(requestPageById(id));// eslint-disable-next-line
	}, []);

	return (
		<div className='container card p-3 mt-2 mb-3'>
			<div className='d-flex align-items-center'>
				<button type='button' className='btn btn-secondary' onClick={() => props.history.push('/')}>
					<FontAwesomeIcon icon={faArrowLeft} />
				</button>
				<h6 className='border-bottom'>{t('VIEW_PAGE')}</h6>
			</div>
			<ViewDetails
				pageData={pageData}
				t={t}
				isLoading={isLoading}
			/>
		</div>
	);
};

export default ViewPage;
