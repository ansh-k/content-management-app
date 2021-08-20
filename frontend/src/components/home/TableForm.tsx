import React from 'react';

export const TableForm = ({ pagesRecord }: any): JSX.Element => {
    return (
        <div className='box'>
            <div className='table-responsive'>
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Url</th>
                            <th>Snapshot</th>
                            <th>Text Resources count</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagesRecord && pagesRecord.length > 0
                            ? pagesRecord.map((item: any, key: number) => {
                                return (
                                    <tr key={key}>
                                        <th>#{key + 1}</th>
                                        <th>{item.name}</th>
                                        <th>{item.description}</th>
                                        <th>{item.url}</th>
                                        <th><img src={item.image} alt='' width="20" /></th>
                                        <th>{item.textResources && item.textResources.length}</th>
                                        <th></th>
                                    </tr>
                                );
                            })
                            : null}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableForm;
