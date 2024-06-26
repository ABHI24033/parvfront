import React, { useState } from 'react';

function RMworkModal({ data }) {
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
                                <p><span className='font-bold'>Name : </span>{data?.name}</p>
                                <hr />
                                <p><span className='font-bold'>1. Today I made …… Calls for Connectorship : </span>
                                    {data?.total_calls}
                                </p>
                                <p><span className='font-bold'>2. Today I made …… call to old connectors : </span>
                                    {data?.old_connector_call}
                                </p>
                                <p><span className='font-bold'>3. I followed up …… customers for documents collection: </span>
                                    {data?.documents_collections}
                                </p>
                                <p><span className='font-bold'>4. I have login …… new files today : </span>
                                    {data?.new_file_today}
                                </p>
                                <p><span className='font-bold'>5. Today I received login fee from …….. customers: </span>
                                    {data?.login_fee}
                                </p>
                                <p><span className='font-bold'>6. I am made all entries in HUBSPOT: </span>
                                    {data?.entries_hubspot}
                                </p>
                                <p><span className='font-bold'>7. What where work I have today, I am satisfied with that: </span>
                                    {data?.satisfied_work}
                                </p>
                                {/* <p><span className='font-bold'>Address : </span>{
                    data?.address?.map((add,index)=>{
                        return (
                            <span key={index}>{add?.street},{add?.city},{add?.district},{add?.pincode}<br/> {add?.state}</span>
                        )
                    })
                }</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RMworkModal;
