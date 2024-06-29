import React, { useEffect, useState } from 'react';
import Sidebar from '../UserDashbord/Sidebar';
import { backendUrl } from '../../../env';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Connectors = () => {
    const [connectors, setConnectors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;
    const fetchConnectors = async () => {
        try {
            const res = await axios.get(`${backendUrl}/getallconnectorUser?page=${currentPage}&limit=${limit}`);
            const data = res.data;
            console.log(data);
            setConnectors(data?.user);
            setTotalPages(data?.totalPages);
        } catch (error) {
            console.log("Error while fetching connectors", error);
        }
    }
    useEffect(() => {
        fetchConnectors();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const ApproveConnector = async (id) => {
        try {
            const res = await axios.put(`${backendUrl}/update_connector_status/${id}`);
            const data = res.data;
            fetchConnectors();
        } catch (error) {
            console.log("Error while fetching connectors", error);
        }
    }
    const RejectConnector = async (id) => {
        try {
            const res = await axios.put(`${backendUrl}/reject_connector_status/${id}`);
            const data = res.data;
            fetchConnectors();
        } catch (error) {
            console.log("Error while fetching connectors", error);
        }
    }
    const deleteConnector = async (id) => {
        try {
            const res = await axios.delete(`${backendUrl}/delete_connector/${id}`);
            const data = res.data;
            fetchConnectors();
            toast.success("Delete User Successfully");
        } catch (error) {
            console.log("Error while fetching connectors", error);
        }
    }
    return (
        <div>
            <Sidebar>
                <div className="">
                    <h2 className='mx-4'>Connectors List</h2>
                    <table className="table table-striped mt-5">
                        <thead>
                            <tr>
                                <th>Sr.no</th>
                                {/* <th>Form Id</th> */}
                                <th>Name</th>
                                <th>Mobile Number</th>
                                <th>Status</th>
                                <th>Profile</th>
                                <th>Payments</th>
                                <th>Upload Doc</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                connectors && connectors.map((item, index) => (
                                    <tr key={item._id} >
                                        <td>{index + 1}</td>
                                        {/* <td>{item._id.slice(-6)}</td> */}
                                        <td>{item?.full_name}</td>
                                        <td>{item?.mobile_number}</td>
                                        {/* <td>{item?.whats_app_number}</td> */}
                                        <td className=' '>
                                            {item?.approved === true ?
                                                <>
                                                    <button className='btn btn-seconadry px-4 py-2 text-success'>Approved</button>
                                                </>
                                                :
                                                <>
                                                    {item?.approved === false ?
                                                        <button className=' btn btn-white px-4 py-2 text-danger'>Rejected</button>
                                                        :
                                                        <>
                                                            <button
                                                                className='btn py-1 btn-primary px-2 mx-1'
                                                                onClick={() => ApproveConnector(item?._id)}>Approve</button>
                                                            <button
                                                                className='btn py-1 px-2 btn-danger'
                                                                onClick={() => RejectConnector(item?._id)}
                                                            >Reject</button>
                                                        </>
                                                    }
                                                </>
                                            }

                                        </td>
                                        <td className=' d-flex '>
                                            {/* <OpenProfileModal data={item} /> */}
                                            <Link to={`/profile/${item?._id}`}>
                                            <button className='btn btn-primary py-1 px-2'><i class="fa-solid fa-id-card"></i></button>
                                            </Link>
                                            <button
                                                className='btn btn-danger px-2 py-1 mx-1'
                                                onClick={() => { deleteConnector(item?._id) }}><i class="fa-solid fa-trash-can"></i></button>
                                        </td>
                                        <td>
                                            <Link to={`/add_payments/${item?._id}`} className='btn btn-primary px-2 py-1'>Add Payments</Link>
                                            {/* <Link to={`/show_payments`} className='btn btn-primary px-2 py-1 mx-2'>View</Link> */}
                                            {/* <Link to={`/add_payments/${item?._id}`} className='btn btn-primary px-2 py-1'><i class="fa-solid fa-money-check"></i></Link> */}
                                        </td>
                                        <td>
                                            <Link to={`/upload_conn_doc/${item?._id}`}><button className='btn btn-primary px-2 py-1'><i class="fa-solid fa-upload"></i></button></Link>
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

export default Connectors;
