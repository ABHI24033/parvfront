import React, { useEffect, useState } from 'react';
// import Sidebar from '../UserDashbord/Sidebar';
import Sidebar from '../UserDashbord/Sidebar';
import { Link, useParams } from 'react-router-dom';
// import { backendUrl } from '../../../env';
import { backendUrl } from '../../../env';
// import FormDetailsModal from '../../Admin/FormDeatils/FormDeatilsModal';
import FormDetailsModal from '../FormDeatils/FormDeatilsModal';
import axios from 'axios';
import { toast } from 'react-toastify';
// import AutoLoanModal from '../../FormDeatils/AutoLoanModal';
import AutoLoanModal from '../FormDeatils/AutoLoanModal'
// import OpenProfileModal from '../Admin/OpenProfileModal';
// import ConnectorViewModal from '../../Admin/connector/ConnectorViewModal';
import ConnectorViewModal from './ConnectorViewModal';

const HomeLoanTable = () => {
    const [data, setData] = useState();
    const [heading, setHeading] = useState();
    const [updateendpoint, setUpdateendpoint] = useState();
    const [reject, setReject] = useState();
    const [deleteEndPoint, setdeleteEndPoint] = useState();
    const param = useParams();
    const { endpoint } = param;

    // console.log(endpoint);
    useEffect(() => {
        getData();
    }, []);


    const getData = async () => {
        try {
            // const userID = localStorage.getItem("userID");
            const response = await fetch(`${backendUrl}/getallhomeloan`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            console.log(data);
            setData(data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const ApproveLoan = async (id) => {
        // console.log("Working", id);
        try {
            const res = await axios.put(`${backendUrl}/${updateendpoint}/${id}`);
            const data = res.data;
            console.log(data);
            // setConnectors(data?.user);
            window.location.reload();
        } catch (error) {
            console.log("Error while fetching connectors", error);
        }
    }
    const rejectLoan = async (id) => {
        // console.log("Working", id);
        try {
            const res = await axios.put(`${backendUrl}/${reject}/${id}`);
            const data = res.data;
            console.log(data);
            // setConnectors(data?.user);
            window.location.reload();
        } catch (error) {
            console.log("Error while fetching connectors", error);
        }
    }

    const deleteLoanform = async (id) => {
        //
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




    return (
        <div>
            <Sidebar>
                <div className="container ">
                    {/* <h2 className='mx-4'>Professional loan forms </h2> */}
                    <h2 className='mx-4'>Home Loan Forms</h2>
                    <table className="table table-striped mt-5">
                        <thead>
                            <tr>
                                <th>Sr.no</th>
                                {/* <th>Form Id</th> */}
                                <th>User Name</th>
                                <th>Email</th>
                                <th>Connector's Profile</th>
                                <th>Status</th>
                                {/* <th>Timestamp</th> */}
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data && data.map((item, index) => (
                                    <tr key={item._id} >
                                        <td>{index + 1}</td>
                                        <td>{item?.applicant_kyc?.fname} {item?.applicant_kyc?.mname} {item?.applicant_kyc?.lname}</td>
                                        <td>{item?.applicant_kyc?.email}</td>
                                        <td>
                                            {/* <button className=' btn btn-primary py-1 px-3'>View</button> */}
                                            <ConnectorViewModal data={item?.connector_id} />
                                        </td>
                                        {/* <td className='d-flex gap-3'>
                                            {item?.approved === true ?
                                                <>
                                                    <button className='btn btn-seconadry px-4 py-2 text-success'>Approved</button>
                                                </>
                                                :
                                                <>
                                                    {item?.approved === false ?
                                                        <button className=' btn btn-white px-4 py-2 text-danger'>Rejected</button> :
                                                        <>
                                                            <button
                                                                className='btn py-1 btn-primary px-2'
                                                                onClick={() => ApproveLoan(item?._id)}>Approve</button>
                                                            <button
                                                                className='btn py-1 px-2 btn-danger'
                                                                onClick={() => rejectLoan(item?._id)}
                                                            >Reject</button>
                                                        </>
                                                    }

                                                </>
                                            }

                                        </td> */}
                                        <td>
                                            {item?.loan_status}
                                        </td>
                                        <td>
                                            {endpoint === "getAllCarLoanForms"
                                                ? <AutoLoanModal data={item} />
                                                : endpoint === "getAllGoldForms" ? <>Gold Loan Modal</> : <FormDetailsModal data={item} />}
                                        </td>
                                        {/* <td>
                                            <button className=' btn btn-danger px-2 py-1' onClick={() => { deleteLoanform(item?._id) }}>Delete</button>
                                        </td> */}

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


export default HomeLoanTable;
