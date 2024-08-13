import React, { useEffect, useState } from 'react';
import Sidebar from '../UserDashbord/Sidebar';
import { Link, useParams } from 'react-router-dom';
import { backendUrl } from '../../../env';
import FormDetailsModal from '../FormDeatils/FormDeatilsModal';
import axios from 'axios';
import { ToastContainer, toast, useToast } from 'react-toastify';
import { MdOutlineTypeSpecimen } from "react-icons/md";
import { FaUpload } from "react-icons/fa";
import { MdUpload } from "react-icons/md";
import { Toast } from 'bootstrap/dist/js/bootstrap.min';

const FormDetailTable = () => {
    const [data, setData] = useState();
    const [heading, setHeading] = useState();
    const [statusEndPoint, setStatusEndPoint] = useState();
    const [deleteEndPoint, setdeleteEndPoint] = useState();
    const [status, setStatus] = useState();
    const [path, setPath] = useState();
    const [excelpath,setExcelPath]=useState();

    const userType = localStorage.getItem("user_type");

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
            setdeleteEndPoint("deletehomeLoan");
            setPath("/homeloan/doc/");
            setExcelPath("home");
        }
        if (endpoint === "getAllGoldForms") {
            setHeading("Gold Loan Form");
            setStatusEndPoint("goldloan_status");
            setdeleteEndPoint("delete_gold_loan");
            setPath('/goldloan/doc/');
            setExcelPath("gold");
        }
        if (endpoint === "get_all_personal_loan") {
            setHeading("Personal Loan Form");
            setStatusEndPoint("update_personal_status");
            setdeleteEndPoint("deletepersonalloan");
            setPath("/personalloan/doc/");
            setExcelPath("persoanl")
        }

        if (endpoint === "get_all_vehicle_loan") {
            setHeading("Vehicle Loan Form");
            setStatusEndPoint("vehicle_loan_status");
            setdeleteEndPoint("delete_vehicle_loan");
            setPath("/vehicleloan/doc/");
            setExcelPath('vehicle');
        }

        if (endpoint === "getAllBusinessLoanForms") {
            setHeading("Business Loan Form");
            setStatusEndPoint("change_business_status");
            setdeleteEndPoint("deletebusinessloan");
            setPath("/businessloan/business-doc/");
            setExcelPath("business");
        }
    }, [endpoint, currentPage])


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
    }, [status]);

    function formatDate(isoString) {

        if (!isoString) {
            return ""
        }
        const date = new Date(isoString);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        const monthName = months[monthIndex];
        const formattedDate = `${day.toString().padStart(2, '0')}-${monthName}-${year}`;

        return formattedDate;
    }


    const downloadExcel = async () => {
        try {
            const response = await axios.get(`${backendUrl}/download-${excelpath}-excel`, {
                responseType: 'blob', // Important: Tell Axios to expect a binary blob
            });

            // Create a blob object URL for the download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'data.xlsx');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            toast.error(error?.message);
            console.error('Error downloading Excel:', error);
            // Handle error
        }
    };

    return (
        <div className='w-100'>
            <ToastContainer />
            <Sidebar>
                <div className='d-flex justify-content-end'>
                        <button className='btn btn-primary' onClick={downloadExcel}>Download {excelpath} Loan data in excel formate</button>
                </div>
                <div className=" w-100 " >
                    
                    <h2 className='mx-4 '>{heading}</h2>
                    <table className="table w-100  mt-5 border " >
                        <thead className='bg-primary text-white w-100'>
                            <tr>
                                <th className='' style={{ width: "10rem", fontSize: "0.9rem" }}>Date</th>
                                <th className='' style={{ width: "10rem", fontSize: "0.9rem" }}>App. No.</th>
                                <th className='' style={{ width: "10rem", fontSize: "0.9rem" }}>User Name</th>
                                <th className='' style={{ width: "10rem", fontSize: "0.9rem" }}>Remark</th>
                                <th className='' style={{ width: "10rem", fontSize: "0.9rem" }}>DSA</th>
                                <th className='' style={{ width: "10rem", fontSize: "0.9rem" }}>Status</th>
                                <th className='' style={{ width: "10rem", fontSize: "0.9rem" }}>Form</th>
                                <th className='' style={{ width: "10rem", fontSize: "0.9rem" }}>Add_Remark</th>
                                <th className='' style={{ width: "10rem", fontSize: "0.9rem" }}>Other</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data && data.map((item) => (
                                    <tr key={item?._id} >
                                        <td style={{ width: "300px" }}>{formatDate(item?.createdAt)}</td>
                                        <td style={{ width: "200px" }}>{item?.application_no}</td>
                                        <td style={{ width: "200px" }}>{item?.applicant_kyc?.fname} {item?.applicant_kyc?.mname} {item?.applicant_kyc?.lname}</td>
                                        <td style={{ width: "200px", fontSize: "11px" }}>{item?.remarks}</td>
                                        <td style={{ width: "70px" }}>
                                            <Link to={`/profile/${item?.connector_id}`} className='btn btn-primary px-2 py-1'><i class="fa-solid fa-address-card"></i></Link>
                                        </td>
                                        <td className=''>

                                            {
                                                <select
                                                    id={`status`}
                                                    name="status"
                                                    className="form-select py-1"
                                                    style={{ width: "9rem", fontSize: "11px" }}
                                                    onChange={(e) => { handleStatus(e, item?._id) }}
                                                >
                                                    <option value="Received" selected={item?.loan_status === "Received" ? true : false}>
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
                                            <p style={{ fontSize: "10px", textAlign: "center" }}>{item?.loan_status}</p>

                                        </td>
                                        <td>
                                            <FormDetailsModal data={item} />
                                        </td>
                                        <td className=''>
                                            {/* <Link to={`/remark/${endpoint}/${item?._id}`} className='btn btn-primary px-2 py-1'>Remarks</Link> */}
                                            <Link to={`/remark/${endpoint}/${item?._id}`} className='btn btn-primary px-1 py-1 mx-1' title='Add Remark'>
                                                <MdOutlineTypeSpecimen style={{ fontSize: "20px" }} />
                                            </Link>
                                            <Link to={`${path}${item?._id}`} className='btn btn-primary px-1 py-1 mx-1' title='Upload Documents'>
                                                <MdUpload style={{ fontSize: "19px" }} />
                                            </Link>
                                        </td>

                                        {
                                            userType === "Admin" &&
                                            <td className='d-flex'>
                                                <button className=' btn btn-danger px-2 py-1' onClick={() => { deleteLoanform(item?._id) }} title='Delete'>
                                                    <i class="fa-solid fa-trash"></i>
                                                </button>
                                                <button className=' btn btn-success mx-1 px-2 py-1' title='Edit'>
                                                    <Link to={`/${endpoint}/${item?._id}`}><i class="fa-solid fa-pen-to-square text-white"></i></Link>
                                                </button>
                                            </td>
                                        }

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
