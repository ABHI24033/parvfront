import React, { useEffect, useState } from 'react';
import Sidebar from '../UserDashbord/Sidebar';
import { Link, useParams } from 'react-router-dom';
import { backendUrl } from '../../../env';
import FormDetailsModal from '../FormDeatils/FormDeatilsModal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import ConnectorViewModal from '../connector/ConnectorViewModal';

const FormDetailTable = () => {
    const [data, setData] = useState();
    const [heading, setHeading] = useState();
    const [statusEndPoint, setStatusEndPoint] = useState();
    const [deleteEndPoint, setdeleteEndPoint] = useState();
    const [status, setStatus] = useState();

    const param = useParams();
    const { endpoint } = param;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        getData();
        if (endpoint === "getallhomeloan") {
            setHeading("Home Loan Forms");
            setStatusEndPoint("home_loan_status");
            setdeleteEndPoint("deletehomeLoan")
        }
        if (endpoint === "getAllGoldForms") {
            setHeading("Gold Loan Form");
            setStatusEndPoint("goldloan_status");
            setdeleteEndPoint("delete_gold_loan")
        }
        if (endpoint === "get_all_personal_loan") {
            setHeading("Personal Loan Form");
            setStatusEndPoint("update_personal_status");
            setdeleteEndPoint("deletepersonalloan")
        }

        if (endpoint === "get_all_vehicle_loan") {
            setHeading("Vehicle Loan Form");
            setStatusEndPoint("vehicle_loan_status");
            setdeleteEndPoint("delete_vehicle_loan")
        }

        if (endpoint === "getAllBusinessLoanForms") {
            setHeading("Business Loan Form");
            setStatusEndPoint("change_business_status");
            setdeleteEndPoint("deletebusinessloan")
        }
    }, [endpoint,currentPage])


    const getData = async () => {
        try {
            const response = await fetch(`${backendUrl}${endpoint}?page=${currentPage}&limit=${limit}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setData(data.data);
            setTotalPages(data?.totalPages);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const LoanStatus = async (id) => {
        try {
            const res = await axios.put(`${backendUrl}/${statusEndPoint}/${id}`, { status: status });
            const data = res.data;
            toast.success("Status Updated");
            getData();
        } catch (error) {
            console.log("Error while fetching connectors", error);
        }
    }


    const deleteLoanform = async (id) => {
        try {
            const result = window.confirm("Are you sure to delete this item?");
            if (result) {
                const res = await axios.delete(`${backendUrl}/${deleteEndPoint}/${id}`);
                if (res) {
                    toast.success(res.data.message);
                    getData();
                }
            }
        } catch (error) {
            console.log("error while deleteing ", error);
        }
    }


    const [id, setid] = useState();
    const handleStatus = async (e, id) => {
        const { name, value } = e.target;
        setStatus(value);
        setid(id);
    };
    useEffect(() => {
        if (id) {
            LoanStatus(id);
        }
    }, [status])



    return (
        <div>
            <ToastContainer />
            <Sidebar>
                <div className="container w-100">
                    <h2 className='mx-4 '>{heading}</h2>
                    <table className="table  mt-5 overflow-scroll border " >
                        <thead>
                            <tr>
                                <th>App. No.</th>
                                <th>User Name</th>
                                <th>Remark</th>
                                <th>Connector's Profile</th>
                                <th>Status</th>
                                <th>Applicant's Profile</th>
                                <th>Add Remarks</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data && data.map((item) => (
                                    <tr key={item?._id} >
                                        <td>{item?.application_no}</td>
                                        <td >{item?.applicant_kyc?.fname} {item?.applicant_kyc?.mname} {item?.applicant_kyc?.lname}</td>
                                        <td >{item?.remarks}</td>
                                        <td>
                                            {/* <ConnectorViewModal data={item?.connector_id} /> */}
                                            <Link to={`/profile/${item?.connector_id}`} className='btn btn-primary px-2 py-1'><i class="fa-solid fa-address-card"></i></Link>
                                        </td>
                                        <td className='d-flex gap-3'>

                                            {
                                                <select
                                                    id={`status`}
                                                    name="status"
                                                    className="form-select py-1 px-1"
                                                    style={{ width: "12rem" }}
                                                    onChange={(e) => { handleStatus(e, item?._id) }}
                                                >
                                                    <option value="Received" selected={item?.loan_status === "Application Received" ? true : false}>
                                                        Application Received
                                                    </option>
                                                    <option value="InProgress at PARV" selected={item?.loan_status === "InProgress at PARV" ? true : false}>InProgress at PARV</option>
                                                    <option value="Applied To Bank" selected={item?.loan_status === "Applied To Bank" ? true : false}>Applied To Bank</option>
                                                    <option value="Pendency" selected={item?.loan_status === "Pendency" ? true : false}>Pendency</option>
                                                    <option value="Sanctioned" selected={item?.loan_status === "Sanctioned" ? true : false}>Sanctioned</option>
                                                    <option value="Sanctioned" selected={item?.loan_status === "Sanctioned" ? true : false}>Sanctioned</option>
                                                    <option value="Disbursed" selected={item?.loan_status === "Disbursed" ? true : false}>Disbursed</option>
                                                    <option value="Rejected" selected={item?.loan_status === "Rejected" ? true : false}>Rejected</option>
                                                </select>
                                            }


                                        </td>
                                        <td>
                                            <FormDetailsModal data={item} />
                                        </td>
                                        <td>
                                            <Link to={`/remark/${endpoint}/${item?._id}`} className='btn btn-primary px-2 py-1'>Remarks</Link>
                                        </td>

                                        <td className='d-flex'>
                                            <button className=' btn btn-danger px-2 py-1' onClick={() => { deleteLoanform(item?._id) }} title='Delete'>
                                                <i class="fa-solid fa-trash"></i>
                                            </button>
                                            <button className=' btn btn-success mx-1 px-2 py-1' title='Edit'>
                                                <Link to={`/${endpoint}/${item?._id}`}><i class="fa-solid fa-pen-to-square text-white"></i></Link>
                                            </button>
                                        </td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div aria-label="..." className=' d-flex justify-content-center'>
                        <ul class="pagination">
                            <li class={`page-item ${currentPage === 1 ? "disabled" : null}`}>
                                <a class="page-link" href="#" tabindex="-1" onClick={() => handlePageChange(currentPage - 1)}>Previous</a>
                            </li>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <li class={`page-item ${currentPage === index + 1 ? "active" : null}`} onClick={() => handlePageChange(index + 1)}>
                                    <a class="page-link" href="#">{index + 1}</a>
                                </li>
                            ))}
                            <li class={`page-item ${currentPage === totalPages ? "disabled" : null}`}>
                                <a class="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>Next</a>
                            </li>
                        </ul>
                    </div>
                </div>


            </Sidebar>


        </div>
    );
}


export default FormDetailTable;
