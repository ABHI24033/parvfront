import React, { useState } from 'react';
// import { backendUrl } from '../../../../env';

const AutoLoanModal = ({ data }) => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    // console.log(data);
    return (
        <div>
            <button onClick={toggleModal} className='btn btn-primary px-2 py-1 w-100'>View user </button>
            {showModal && (
                <div className="modal bd-example-modal-lg" tabIndex="-1" role="dialog" style={{ display: 'block', width: "100%" }}>
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content ">
                            {/* User details */}
                            {
                                data?.userdetails && <div className="modal-body mx-4 my-2">
                                    <div>
                                        <h3 className='border-b border-secondary'>User Details </h3>
                                        <p>Vehicle Type: {data?.userdetails?.vehicle_type} </p>
                                        <p>Name: {data?.userdetails?.name} </p>
                                        <p>Email: {data?.userdetails?.email}</p>
                                        <p>Phone: {data?.userdetails?.phone}</p>
                                        <p> Address: {data?.userdetails?.address}</p>
                                        <p>Residential Address: {data?.userdetails?.business_address}</p>
                                    </div>
                                </div>
                            }
                            {/* User Banking Details */}
                            <div className="modal-body mx-4 ">
                                {
                                    data?.userbankingdeatails &&
                                    <div>
                                        <h3>User Banking Details</h3>
                                        {
                                            data?.userbankingdetails && data?.userbankingdetails.map((item, index) => {
                                                return (
                                                    <div className='index'>
                                                        <p><span>Bank Name : </span> {item?.bank_name} </p>
                                                        <p><span>Branch Name : </span>{item?.branch_name}</p>
                                                        <p><span>Account Type : </span>{item?.account_type}</p>
                                                        <p> <span>IFSC Code : </span>{item?.salary}</p>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                }
                            </div>

                            {/* Previous Loan History */}
                            <div className="modal-body mx-4 my-1">
                                {
                                    data?.userloanpaymentdetails &&
                                    <div>
                                        {/* <h3>User Loan payment Details</h3> */}
                                        <h3>Previous Loan History</h3>
                                        {
                                            data?.userloanpaymentdetails && data?.userloanpaymentdetails.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        <p><span>Bank NBFC : </span>{item?.bank_nbfc}</p>
                                                        <p> <span>Loan Type : </span>{item?.loan_type}</p>
                                                        <p> <span>EMI : </span>{item?.emi}</p>
                                                        <p> <span>Pending : </span>{item?.pandding}</p>
                                                        <p> <span>Pan No. : </span>{item?.pan_no}</p>
                                                        {/* <p> <span>Aadhaar No. : </span>{item?.pandding}</p> */}
                                                        <p> <span>Date Of Birth : </span>{item?.dob}</p>
                                                        <p> <span>Spouse Name : </span>{item?.spouse_name}</p>
                                                        <p> <span>Spouse's Date Of Birth : </span>{item?.spouse_dob}</p>
                                                        
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                }
                            </div>

                            {/* =============================co-applicnt========================= */}
                            <div className="modal-body mx-4 my-1">
                                {data?.coapplicantdetails &&
                                    <div>
                                        <h3>Co-Applicant  Details</h3>
                                        <p>Name: {data?.coapplicantdetails?.co_name} </p>
                                        <p>Email: {data?.coapplicantdetails?.co_email}</p>
                                        {/* <p>Date Of Birth: {data?.coapplicantdetails?.co_date_of_birth}</p> */}
                                        <p>Phone: {data?.coapplicantdetails?.co_phone}</p>
                                        {/* <p>Alternate Number: {data?.coapplicantdetails?.co_alternate_number}</p> */}
                                        {/* <p>Father's Name: {data?.coapplicantdetails?.co_fathers_name}</p> */}
                                        {/* <p>Mother's Name: {data?.coapplicantdetails?.co_mothers_name}</p> */}
                                        {/* <p>Marital Status: {data?.coapplicantdetails?.co_marital_status}</p> */}
                                        {/* <p>Pan Card: {data?.coapplicantdetails?.co_pancard_number}</p> */}
                                        <p>Relation: {data?.coapplicantdetails?.co_relation}</p>
                                        <p>Address: {data?.coapplicantdetails?.co_address}</p>
                                        <p>Business Address: {data?.coapplicantdetails?.co_business_address}</p>
                                    </div>
                                }
                            </div>

                            <div className="modal-body mx-4 my-1">
                                {
                                    data?.coapplicantbankingdetails &&
                                    <div>
                                        <h3>Co-Applicant Banking Details</h3>
                                        {
                                            data?.coapplicantbankingdetails && data?.coapplicantbankingdetails.map((item, index) => {
                                                return (
                                                    <div className='index'>
                                                        <p><span>Bank Name : </span> {item?.co_bank_name} </p>
                                                        <p><span>Branch Name : </span>{item?.co_branch_name}</p>
                                                        <p><span>Account Type : </span>{item?.co_account_type}</p>
                                                        <p> <span>Salary : </span>{item?.co_salary}</p>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                }
                            </div>

                            {/* co-applicant previous loan History */}
                            <div className="modal-body mx-4 my-1">
                                {
                                    data?.coapplicantloanpaymentdetails &&
                                    <div>
                                        <h3>Co-applicant Previous Loan History</h3>
                                        {
                                            data?.coapplicantloanpaymentdetails && data?.coapplicantloanpaymentdetails.map((item, index) => {
                                                return (
                                                    <div className='index'>
                                                        <p><span>Bank NBFC : </span> {item?.co_bank_nbfc} </p>
                                                        <p><span>EMI : </span>{item?.co_emi}</p>
                                                        <p><span>Loan Type : </span>{item?.co_loan_type}</p>
                                                        <p> <span>Pending : </span>{item?.co_pandding}</p>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                }
                            </div>



                            <div className="modal-body mx-4 my-1">
                                <div>
                                    <h3>Documents</h3>
                                    {
                                        data?.files && data?.files?.map((item, index) => {
                                            return (
                                                <div key={index} className='my-2 d-flex'>
                                                    <a
                                                        // href={`http://localhost:8000/temp/${item?.fileName}`}
                                                        href={item?.url}
                                                        target='_blanks'
                                                        className='mx-3 bg-primary text-white px-2 py-2 rounded'
                                                    >
                                                        {item?.fieldName}
                                                    </a>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary py-2 px-3" onClick={toggleModal}>Close</button>
                                {/* Additional buttons or actions can be added here */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AutoLoanModal;
