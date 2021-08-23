import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

import Input from '../../common/Input';
import { IAddEditFormProps } from '../../interfaces';

export const AddEditPageForm = ({
	onSubmit,
	inputs,
	onHandleFileUpload,
	onInputChange,
	t,
	onAddNewTextResourceModalToggle,
	id,
	OnTextResourceEdit,
	onTextResourceDelete,
	validObj,
}: IAddEditFormProps): JSX.Element => {
	const { name, url, description, image, textResources } = inputs || {};

	return (
		<form onSubmit={onSubmit}>
			<div className='row space-top'>
				<div className='col-md-6'>
					<Input
						type='text'
						name='name'
						label='Name'
						placeholder='Enter name'
						value={name}
						onChange={onInputChange}
						valid={validObj.validName}
					/>
				</div>
				<div className='col-md-6'>
					<Input
						type='text'
						name='url'
						label='Url'
						placeholder='Enter url'
						value={url}
						onChange={onInputChange}
						valid={validObj.validURL}
					/>
				</div>
				<div className='col-md-12'>
					<Input
						textarea={true}
						rows={6}
						name='description'
						label='Description'
						placeholder='Enter description'
						value={description}
						onChange={onInputChange}
						valid={validObj.validDesc}
					/>
				</div>
				<div className='col-md-6'>
					<Input
						type='file'
						name='image'
						label='Snapshot'
						placeholder='Upload image'
						accept='image/*'
						onChange={onHandleFileUpload}
						valid={validObj.validImage}
					/>
				</div>
				{image ? (
					<div className='col-md-6'>
						<img src={image} alt='' width='90' />
					</div>
				) : null}
				<div className='col-md-12'>
					<p className='space-top border-bottom d-flex justify-content-between'>
						{t('TEXT_RESOURCE')} :
						<button
							type='button'
							className='btn btn-secondary'
							onClick={onAddNewTextResourceModalToggle}
						>
							{t('ADD')} {t('TEXT_RESOURCE')}
						</button>
					</p>
				</div>
				{textResources && textResources.length > 0 ? (
					<div className='table-responsive'>
						<table className='table table-hover'>
							<thead>
								<tr>
									<th>#</th>
									<th>{t('NAME')}</th>
									<th>{t('VALUE')}</th>
									<th>{t('TYPE')}</th>
									<th>{t('MAX_LENGTH')}</th>
									<th>{t('LINE_TYPE')}</th>
									<th>{t('ACTION')}</th>
								</tr>
							</thead>
							<tbody>
								{textResources && textResources.length > 0
									? textResources.map((item: any, key: number) => {
										return (
											<tr key={key}>
												<th>#{key + 1}</th>
												<th>{item.name ? item.name : '-'}</th>
												<th>{item.value ? item.value : '-'}</th>
												<th>{item.type ? item.type : '-'}</th>
												<th>{item.maxLength ? item.maxLength : '-'}</th>
												<th className='text-capitalize'>
													{item.lineType ? item.lineType : '-'}
												</th>
												<th>
													<div className='d-flex justify-content-around'>
														{id && item._id ? (
															<>
																<span
																	className='cursor-pointer'
																	onClick={() => OnTextResourceEdit(item)}
																>
																	<FontAwesomeIcon icon={faPencilAlt} />
																</span>
																<span
																	className='cursor-pointer'
																	onClick={() =>
																		window.confirm(
																			'Are you sure you wish to delete this item?'
																		) && onTextResourceDelete(item._id)
																	}
																>
																	<FontAwesomeIcon icon={faTrash} />
																</span>
															</>
														) : (
															'-'
														)}
													</div>
												</th>
											</tr>
										);
									})
									: null}
							</tbody>
						</table>
					</div>
				) : null}

				<div className='col-md-12'>
					<input
						type='submit'
						className='btn-center btn btn-primary '
						value={id ? `${t('EDIT')}` : `${t('ADD')}`}
					/>
				</div>
			</div>
		</form>
	);
};
