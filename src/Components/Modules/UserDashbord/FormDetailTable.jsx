import React, { useEffect, useState } from 'react';
import Sidebar from '../UserDashbord/Sidebar';
import { Link, useParams } from 'react-router-dom';
import { backendUrl } from '../../../env';
import FormDetailsModal from '../FormDeatils/FormDeatilsModal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
// import AutoLoanModal from '../Admin/FormDeatils/AutoLoanModal';
// import OpenProfileModal from '../Admin/OpenProfileModal';
import ConnectorViewModal from '../connector/ConnectorViewModal';

const FormDetailTable = () => {
    const [data, setData] = useState();
    const [heading, setHeading] = useState();
    const [statusEndPoint, setStatusEndPoint] = useState();
    // const [reject, setReject] = useState();
    const [deleteEndPoint, setdeleteEndPoint] = useState();
    const [status, setStatus] = useState();
    // console.log(status);

    const param = useParams();
    const { endpoint } = param;

    // console.log(endpoint);
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
    }, [endpoint])

    const HandleStatusChange = (e) => {

    }

    const getData = async () => {
        try {
            // const userID = localStorage.getItem("userID");
            const response = await fetch(`${backendUrl}${endpoint}`,
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
            // console.log(data);
            setData(data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const LoanStatus = async (id) => {
        // console.log("Working", id);
        try {
            const res = await axios.put(`${backendUrl}/${statusEndPoint}/${id}`, { status: status });
            const data = res.data;
            // console.log(data);
            toast.success("Status Updated");
            // setConnectors(data?.user);
            // window.location.reload();
            getData();
        } catch (error) {
            console.log("Error while fetching connectors", error);
        }
    }


    const deleteLoanform = async (id) => {
        // window?.confirm("Do you really want to delete ?");
        try {
            const result = window.confirm("Are you sure to delete this item?");
            if (result) {
                const res = await axios.delete(`${backendUrl}/${deleteEndPoint}/${id}`);
                if (res) {
                    toast.success(res.data.message);
                    getData();
                }
            }
            // const res=await axios.delete(`${backendUrl}/deletecarloan/${id}`);
            // window.location.reload();
        } catch (error) {
            console.log("error while deleteing ", error);
        }
    }


    const [id, setid] = useState();
    const handleStatus = async (e, id) => {
        const { name, value } = e.target;
        // setStatus({ ...status, [name]: value });
        setStatus(value);
        setid(id);
        // formid=id;
        // if(status){
        // await LoanStatus(id);
        console.log("Hello");
        // }
        // setErrors({ ...errors, [name]: null });
        // Clear errors for the changed field
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
                    {/* <h2 className='mx-4'>Professional loan forms </h2> */}
                    <h2 className='mx-4 '>{heading}</h2>
                    <table className="table  mt-5 overflow-scroll border " >
                        <thead>
                            <tr>
                                <th>App. No.</th>
                                <th>User Name</th>
                                <th>Remark</th>
                                <th>Connector's Profile</th>
                                <th>Status</th>
                                {/* <th>Timestamp</th> */}
                                <th>Applicant's Profile</th>
                                <th>Add Remarks</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data && data.map((item, index) => (
                                    <tr key={item?._id} >
                                        <td>{item?.application_no}</td>
                                        <td >{item?.applicant_kyc?.fname} {item?.applicant_kyc?.mname} {item?.applicant_kyc?.lname}</td>
                                        <td >{item?.remarks}</td>
                                        <td>
                                            <ConnectorViewModal data={item?.connector_id} />
                                        </td>
                                        <td className='d-flex gap-3'>

                                            {
                                                <select
                                                    id={`status`}
                                                    name="status"
                                                    className="form-select py-1 px-1"
                                                    style={{ width: "10rem" }}
                                                    //    value={status}
                                                    onChange={(e) => { handleStatus(e, item?._id) }}
                                                >
                                                    <option value="Received" selected={item?.loan_status === "Received" ? true : false}>
                                                        Received
                                                    </option>
                                                    <option value="Pending" selected={item?.loan_status === "Pending" ? true : false}>Pending</option>
                                                    <option value="InProgress" selected={item?.loan_status === "InProgress" ? true : false}>In Progress</option>
                                                    <option value="Approved" selected={item?.loan_status === "Approved" ? true : false}>Approved</option>
                                                    <option value="Reject" selected={item?.loan_status === "Reject" ? true : false}>Reject</option>
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
                </div>


            </Sidebar>


        </div>
    );
}


export default FormDetailTable;
