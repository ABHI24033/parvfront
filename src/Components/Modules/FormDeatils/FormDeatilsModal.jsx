import React, { useState } from 'react';
import { SlBookOpen } from "react-icons/sl";
import { GiOpenBook } from "react-icons/gi";
import { IoIosPaper } from "react-icons/io";
// import { backendUrl } from '../../../env';

const FormDetailsModal = ({ data }) => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    // console.log(data);
    return (
        <div>
            {/* <button onClick={toggleModal} className='btn btn-primary px-2 py-1 '>View user</button> */}
            <button onClick={toggleModal} className='btn btn-primary px-2 py-1 ' title='Open Form Details'>
                <IoIosPaper style={{fontSize:"19px"}}/>
            </button>
            {showModal && (
                <div className="modal bd-example-modal-lg" tabIndex="-1" role="dialog" style={{ display: 'block', width: "100%" }}>
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content ">
                            <h1 className='mx-auto my-4'>Form Details </h1>
                            {/* Vehicle loan Info */}
                            {
                                data?.vehicle_info &&
                                <div className="modal-body mx-4 my-2">
                                    <div>
                                        <h3 className='border-b border-secondary text-danger'>Vehicle Loan Information  </h3>
                                        <p><span style={{ fontWeight: 800 }}>Vehicle Loan Type : </span>  {data?.vehicle_info?.vehicle_loan_type} </p>
                                        <p><span style={{ fontWeight: 800 }}>Profession : </span>{data?.vehicle_info?.vehicle_profession_type}</p>


                                        <p><span style={{ fontWeight: 800 }}>Do you file ITR? : </span> {data?.vehicle_info?.vehicle_file_itr}</p>
                                        <p> <span style={{ fontWeight: 800 }}>Vehicle estimated cost : </span> {data?.vehicle_info?.vehicle_estimated_cost}</p>
                                        <p><span style={{ fontWeight: 800 }}>When to purchase vehicle : </span>{data?.vehicle_info?.when_purchase_vehicle}</p>
                                        <p><span style={{ fontWeight: 800 }}>Loan you need : </span> {data?.vehicle_info?.loan_you_need}</p>
                                        
                                    </div>
                                </div>
                            }

                            {/* Home_Loan Type */}
                            {
                                data?.home_loan_type &&
                                <div className='modal-body mx-4 my-2'>
                                    <p><span style={{ fontWeight: 800 }}> Loan Type :</span>{data?.home_loan_type}</p>
                                    {
                                        data?.home_loan_type === "Plot purchase Loan" &&
                                        data?.seller_banking_details && data?.seller_banking_details.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    <p><span style={{ fontWeight: 800 }}> Seller's Bank Name :</span>{item?.seller_bank_name}</p>
                                                    <p><span style={{ fontWeight: 800 }}>  Seller's Account Type :</span>{item?.seller_account_type}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                            {/* Appplicant_KYC */}
                            {
                                data?.applicant_kyc && <div className="modal-body mx-4 my-2">
                                    <div>
                                        <h3 className='border-b border-secondary text-danger'>Applicant KYC </h3>
                                        <p><span style={{ fontWeight: 800 }}>Name : </span>  {data?.applicant_kyc?.fname} {data?.applicant_kyc?.mname} {data?.applicant_kyc?.lname}</p>
                                        <p><span style={{ fontWeight: 800 }}>Email : </span>{data?.applicant_kyc?.email}</p>


                                        <p><span style={{ fontWeight: 800 }}>Phone : </span> {data?.applicant_kyc?.phone}</p>
                                        <p> <span style={{ fontWeight: 800 }}>Alternate Number : </span> {data?.applicant_kyc?.alternate_number}</p>
                                        <p><span style={{ fontWeight: 800 }}>Date Of Birth : </span>{data?.applicant_kyc?.dob}</p>
                                        <p><span style={{ fontWeight: 800 }}>Marital Status : </span> {data?.applicant_kyc?.marital_status}</p>
                                        <p><span style={{ fontWeight: 800 }}>Father's Name : </span>{data?.applicant_kyc?.father_name}</p>
                                        <p><span style={{ fontWeight: 800 }}>Mothers's Name : </span> {data?.applicant_kyc?.mother_name}</p>
                                        {
                                            data?.applicant_kyc?.marital_status === "married" &&
                                            <p> <span style={{ fontWeight: 800 }}>Spouse Name : </span> {data?.applicant_kyc?.spouse_name}</p>
                                        }
                                        <p><span style={{ fontWeight: 800 }}>Permanent Address : </span> </p>
                                        <p className='w-75'>
                                            Building :{data?.applicant_kyc?.house_name}<br />
                                            Street: {data?.applicant_kyc?.street_name} <br />
                                            City :{data?.applicant_kyc?.city_name} <br />
                                            Landmark: {data?.applicant_kyc?.landmark} <br />
                                            District: {data?.applicant_kyc?.district} <br />
                                            State : {data?.applicant_kyc?.state} <br />
                                            Pincode :{data?.applicant_kyc?.pincode}
                                        </p>
                                        <p><span style={{ fontWeight: 800 }}>Present Address : </span> </p>
                                        <p className='w-75'>
                                            Building :{data?.applicant_kyc?.present_house_name}<br />
                                            Street: {data?.applicant_kyc?.present_street_name} <br />
                                            City :{data?.applicant_kyc?.present_city_name} <br />
                                            Landmark: {data?.applicant_kyc?.present_landmark} <br />
                                            District: {data?.applicant_kyc?.present_district} <br />
                                            State : {data?.applicant_kyc?.present_state} <br />
                                            Pincode :{data?.applicant_kyc?.present_pincode}
                                        </p>
                                    </div>
                                </div>
                            }
                            {/* User Banking Details */}
                            <div className="modal-body mx-4 my-2">
                                {
                                    data?.applicant_banking_details &&
                                    <div>
                                        <h3 className='text-danger'>Applicant Banking Details</h3>
                                        {
                                            data?.applicant_banking_details && data?.applicant_banking_details.map((item, index) => {
                                                return (
                                                    <div className='index' key={index}>
                                                        <p><span style={{ fontWeight: 800 }}>Bank Name : </span> {item?.bank_name} </p>
                                                        <p><span style={{ fontWeight: 800 }}>Account Type : </span>{item?.account_type}</p>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                }
                            </div>
                            <div className="modal-body mx-4 my-2">
                                {
                                    data?.bank_details &&
                                    <div>
                                        <h3 className='text-danger'>Applicant Banking Details</h3>
                                        {
                                            data?.bank_details && data?.bank_details.map((item, index) => {
                                                return (
                                                    <div className='index' key={index}>
                                                        <p><span style={{ fontWeight: 800 }}>Bank Name : </span> {item?.bank_name} </p>
                                                        <p><span style={{ fontWeight: 800 }}>Account Type : </span>{item?.account_type}</p>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                }
                            </div>

                            {/* Previous Loan History */}
                            <div className="modal-body mx-4 my-2">
                                {
                                    data?.loan_history &&
                                    <div>
                                        {/* <h3>User Loan payment Details</h3> */}
                                        <h3 className='text-danger'>Previous Loan History</h3>
                                        {
                                            data?.loan_history && data?.loan_history.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        <p><span style={{ fontWeight: 800 }}>Bank Name : </span>{item?.loan_bank_name}</p>
                                                        <p><span style={{ fontWeight: 800 }}>Total Loan Amount : </span>{item?.Total_loan_amount}</p>
                                                        <p><span style={{ fontWeight: 800 }}>Current EMI : </span>{item?.emi}</p>
                                                        <p><span style={{ fontWeight: 800 }}>Pending  Amount: </span>{item?.pending}</p>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                }
                            </div>

                            {/* =============================co-applicnt========================= */}
                            <div className="modal-body mx-4 my-2">
                                {data?.co_applicant_kyc &&
                                    <div>
                                        <h3 className='text-danger'>Co-Applicant  Details</h3>
                                        <p><span style={{ fontWeight: 800 }}>Name :</span> {data?.co_applicant_kyc?.co_name} </p>
                                        <p><span style={{ fontWeight: 800 }}>Date Of Birth : </span>{data?.co_applicant_kyc?.co_date_of_birth}</p>
                                        <p> <span style={{ fontWeight: 800 }}>Relation:</span> {data?.co_applicant_kyc?.co_relation}</p>
                                        <p> <span style={{ fontWeight: 800 }}>Occupation:</span> {data?.co_applicant_kyc?.occupation}</p>
                                    </div>
                                }
                            </div>

                            <div className="modal-body mx-4 my-2">
                                {
                                    data?.business_details && data?.business_details?.business_turnover !== "" ?
                                        <div>
                                            <h3 className='text-danger'>Business Details</h3>
                                            {

                                                <div className='index'>
                                                    <p><span style={{ fontWeight: 800 }}>Business Registration Year : </span> {data?.business_details?.business_register_year} </p>
                                                    <p><span style={{ fontWeight: 800 }}>Business Turnover  : </span>{data?.business_details?.business_turnover}</p>
                                                    <p><span style={{ fontWeight: 800 }}>ITR File : </span>{data?.business_details?.file_itr}</p>
                                                    <p><span style={{ fontWeight: 800 }}>Company Name : </span>{data?.business_details?.company_name}</p>
                                                    {
                                                        data?.business_details?.loan_purpose !== '' &&
                                                        <p><span style={{ fontWeight: 800 }}>Loan Purpose : </span>{data?.business_details?.loan_purpose}</p>

                                                    }
                                                    <h3 className='text-danger'>Property Details : </h3>
                                                    <p><span style={{ fontWeight: 800 }}>Property Documents : </span>{data?.business_details?.property_documents}</p>
                                                    <p><span style={{ fontWeight: 800 }}>Property Location : </span>{data?.business_details?.property_location}</p>
                                                    {
                                                        data?.business_details?.property_mortgage !== '' &&
                                                        <p><span style={{ fontWeight: 800 }}>Property for Mortatgage : </span>{data?.business_details?.property_mortgage}</p>

                                                    }
                                                    <p><span style={{ fontWeight: 800 }}>Registration Documents : </span>{data?.business_details?.registration_documents}</p>
                                                    <p><span style={{ fontWeight: 800 }}>Property Owner : </span>{data?.business_details?.property_owner}</p>
                                                </div>
                                            }

                                        </div> : null
                                }
                            </div>
                            <div className="modal-body mx-4 my-2">
                                {
                                    data?.job_details && data?.job_details?.salary_slip !== '' ?
                                        <div>
                                            <h3 className='text-danger'>Job Details</h3>
                                            {

                                                <div className='index'>
                                                    <p><span style={{ fontWeight: 800 }}>Do you get Salary slip : </span> {data?.job_details?.salary_slip} </p>
                                                    <p><span style={{ fontWeight: 800 }}>Do You have form 16 : </span>{data?.job_details?.form16}</p>
                                                    <p><span style={{ fontWeight: 800 }}>Job Experience : </span>{data?.job_details?.job_experience}</p>
                                                    <p><span style={{ fontWeight: 800 }}>Your Desigantion : </span>{data?.business_details?.designation}</p>
                                                    <p><span style={{ fontWeight: 800 }}>Current Salary : </span>{data?.job_details?.current_salary}</p>
                                                    <p><span style={{ fontWeight: 800 }}>Company Name : </span>{data?.job_details?.company_name}</p>
                                                    <p><span style={{ fontWeight: 800 }}>Job Experience in current company : </span>{data?.job_details?.current_job_experience}</p>
                                                    <p><span style={{ fontWeight: 800 }}>Office Address : </span></p>
                                                    <p>Office Building Name :{data?.job_details?.office_building_name}</p>
                                                    <p>Street Name :{data?.job_details?.office_street_name}</p>
                                                    <p>Office City Name :{data?.job_details?.office_city_name}</p>
                                                    <p>Office Landmark :{data?.job_details?.office_landmark}</p>
                                                    <p>Office District :{data?.job_details?.office_district}</p>
                                                    <p>Office State :{data?.job_details?.office_state}</p>
                                                    <p>Office Pincode:{data?.job_details?.office_pincode}</p>
                                                </div>
                                            }

                                        </div> : null
                                }
                            </div>

                            {/* co-applicant previous loan History */}
                            {/* <div className="modal-body mx-4 my-2">
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
                            </div> */}



                            <div className="modal-body mx-4 my-2">
                            <h3 className='text-danger'>Documents</h3>
                                <div className='d-flex flex-wrap'>
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
                                                        {/* <i class="fa-solid fa-xmark ms-2"></i> */}
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

export default FormDetailsModal;
