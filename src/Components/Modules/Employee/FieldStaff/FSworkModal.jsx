import React, { useState } from 'react';

function FSworkModal({ data }) {
    const [showModal, setShowModal] = useState(false);
    console.log(data);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    let dateObj = new Date(data?.date);

    // Extract day, month, and year
    let day = String(dateObj.getUTCDate()).padStart(2, '0');
    let month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    let year = dateObj.getUTCFullYear();

    // Format the date to dd:mm:yyyy
    let formattedDate = `${day}-${month}-${year}`;
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Get the day of the week
    let dayName = daysOfWeek[dateObj.getUTCDay()];


    return (
        <div>
            <button className="btn btn-primary py-1 px-3" onClick={handleShow}>
                Details
            </button>

            {showModal && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content white">
                            <div className="modal-header">
                                <h5 className="modal-title fs-3">Work Report</h5>
                                <button type="button" className="close" onClick={handleClose} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body mx-3 my-3">
                                <p><span className='font-bold'>Date : </span>{formattedDate} {`(${dayName})`}</p>
                                <p><span className='font-bold'> Employee Name : </span>{data?.emp_name}</p>
                                <hr />
                                <p><span className='font-bold'>1. Client Name : </span>
                                    {data?.cli_name}
                                </p>
                                <p><span className='font-bold'>2. Company / Firm Name : </span>
                                    {data?.company_name}
                                </p>
                                <p><span className='font-bold'>3. Contact Person Name : </span>
                                    {data?.contact_person_name}
                                </p>
                                <p><span className='font-bold'>4. Contact Number : </span>
                                    {data?.contact_number}
                                </p>
                                <p><span className='font-bold'>5. What's app Number : </span>
                                    {data?.whats_number}
                                </p>
                                <p><span className='font-bold'>6. Product Discussed : </span>
                                    {data?.product_discussed}
                                </p>
                                <p><span className='font-bold'>7. Remark : </span>
                                    {data?.remark}
                                </p>
                                <p><span className='font-bold'>7. Next Meeting Date : </span>
                                    {data?.next_meeting}
                                </p>
                                <p><span className='font-bold'>Address : </span>
                                {data?.house_name} {data?.street_name} {data?.city_name} {data?.landmark} {data?.district} {data?.state} {data?.pincode}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FSworkModal;
