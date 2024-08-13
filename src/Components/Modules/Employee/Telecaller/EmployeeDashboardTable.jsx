import React, { useEffect, useState } from 'react';
//import Sidebar from '../';
import Sidebar from '../../UserDashbord/Sidebar';
import { Link, useParams } from 'react-router-dom';
import { backendUrl } from '../../../../env';
// import FormDetailsModal from '../Admin/FormDeatils/FormDeatilsModal';
import axios from 'axios';

const EmployeeDashboardTable = () => {
    const [data, setData] = useState();
    const [heading, setHeading] = useState();
    // const [updateendpoint, setUpdateendpoint] = useState();


    // console.log(endpoint);
    const userId = localStorage.getItem("userID");
    useEffect(() => {
        getData();

    }, [])


    const getData = async () => {
        try {
            const userID = localStorage.getItem("userID");
            const response = await fetch(`${backendUrl}/get_sheet_link`,
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
            // console.log(userID);
            const filterdata = data?.filter((item) => item?.employee_id == userID);
            // console.log(filterdata);
            setData(filterdata);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }




    return (
        <div>
            <Sidebar>
                <div className="container ">
                    {/* <h2 className='mx-4'>Professional loan forms </h2> */}
                    <h2 className='mx-4'>Employee Data</h2>
                    {/* <table className="table table-striped mt-5">
                        <thead>
                            <tr>
                                <th>Sr.no</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Alternate No.</th>
                                <th>Loan Type</th>
                                <th>Location</th>
                                <th>Connector Name</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data && data.map((item, index) => (
                                    item?.employee_id === userId
                                        ?
                                        <>
                                            <tr key={item._id} >
                                                <td>{index + 1}</td>
                                                <td>{item?.name}</td>
                                                <td>{item?.email}</td>
                                                <td>{item?.phone}</td>
                                                <td>{item?.alternate_number}</td>
                                                <td>{item?.loanType}</td>
                                                <td>{item?.location}</td>
                                                <td>{item?.connector_name}</td>
                                                <td>{item?.remarks}</td>
                                                {/* <td>{item?.employeeId}</td> 

                                            </tr>
                                        </>
                                        :
                                        null
                                ))
                            }
                        </tbody>
                    </table> */}

                    {
                        data && data?.map((item, index) => {
                            return (
                                <p key={index} className='mx-4'>
                                    <span style={{fontWeight:700}}>Google sheet Link :</span> 
                                    <a href={item?.sheeet_url} target='_blanks'>{index}. Open Google Sheet</a>
                                </p>
                            )
                        })
                    }

                </div>


            </Sidebar>


        </div>
    );
}


export default EmployeeDashboardTable;
