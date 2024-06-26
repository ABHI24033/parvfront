import React, { useEffect, useState } from 'react';
import Sidebar from '../UserDashbord/Sidebar';
import { Link, useParams } from 'react-router-dom';
import { backendUrl } from '../../../env';
// import FormDetailsModal from '../Admin/FormDeatils/FormDeatilsModal';
import FormDetailsModal from '../FormDeatils/FormDeatilsModal';
import axios from 'axios';
import ConnectorViewModal from './ConnectorViewModal';

const ConnecotrFormDetailedTable = () => {
    const [data, setData] = useState();
    const [heading, setHeading] = useState();
    const [updateendpoint, setUpdateendpoint] = useState();
    const [reject, setReject] = useState();
    const param = useParams();
    const { endpoint } = param;

    // console.log(endpoint);
    useEffect(() => {
        getData();

        if (endpoint === "getallhomeloan") {
            setHeading("Home Loan Forms");
            // setStatusEndPoint("home_loan_status");
            // setdeleteEndPoint("deletehomeLoan")
        }
        if (endpoint === "getAllGoldForms") {
            setHeading("Gold Loan Form");
            // setStatusEndPoint("goldloan_status");
            // setdeleteEndPoint("delete_gold_loan")
        }
        if (endpoint === "get_all_personal_loan") {
            setHeading("Personal Loan Form");
            // setStatusEndPoint("update_personal_status");
            // setdeleteEndPoint("deletepersonalloan")
        }

        if (endpoint === "get_all_vehicle_loan") {
            setHeading("Vehicle Loan Form");
            // setStatusEndPoint("vehicle_loan_status");
            // setdeleteEndPoint("delete_vehicle_loan")
        }

        if (endpoint === "getAllBusinessLoanForms") {
            setHeading("Business Loan Form");
            // setStatusEndPoint("change_business_status");
            // setdeleteEndPoint("deletebusinessloan")
        }
    }, [endpoint])

    const user_type = localStorage.getItem("user_type");

    const getData = async () => {
        if (user_type === "Connector") {
            try {
                const userID = localStorage.getItem("userID");
                const response = await fetch(
                    `${backendUrl}${endpoint}`,
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
                console.log(data);
                const filteredData=data?.data?.filter((item)=>{
                    return item.connector_id===userID
                })
                // setData(data.data);
                console.log("filter", filteredData);
                setData(filteredData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

    }



   


    return (
        <div>
            <Sidebar>
            <div className="container ">
                <h2 className='mx-4'>{heading}</h2>
                <table className="table table-striped mt-5">
                    <thead>
                        <tr>
                            <th>Sr.no</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Connector's Profile</th>
                            <th>Status</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data && data.map((item, index) => (
                                <tr key={item._id} >
                                    <td>{index + 1}</td>
                                    <td>{item?.applicant_kyc?.fname}</td>
                                    <td>{item?.applicant_kyc?.email}</td>
                                    <td>
                                        {/* <button className=' btn btn-primary py-1 px-3'>View</button> */}
                                        <ConnectorViewModal data={item?.connector_id} />
                                    </td>
                                    <td className={`${item?.loan_status==='Reject'?"text-danger":""}`}>
                                       {item?.loan_status}
                                    </td>
                                    <td>
                                        <FormDetailsModal data={item} />
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


export default ConnecotrFormDetailedTable;
