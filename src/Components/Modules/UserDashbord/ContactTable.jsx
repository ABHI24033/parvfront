import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { backendUrl } from '../../../env';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const ContactTable = () => {
    const [data, setData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5;

    const getData = async () => {
        try {
            const response = await fetch(`${backendUrl}/getAllContacts?page=${currentPage}&limit=${limit}`,
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
            setData(data?.data);
            setTotalPages(data?.totalPages);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const deleteData = async (id) => {
        try {
            const res = await axios.delete(`${backendUrl}/contact_delete/${id}`)
            if (res.status === 201) {
                getData();
                toast.success(res.data.message, {
                    position: "top-right",
                });
            }
        } catch (error) {
            toast.error("Something went wrong !");
            console.log("Error while deleting :", error);
        }
    }

    useEffect(() => {
        getData();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    function formatDate(isoDateString) {
        if(isoDateString===undefined){
            return null;
        }
        const date = new Date(isoDateString);
    
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getUTCFullYear();
    
        return `${day}/${month}/${year}`;
    }
    return (
        <div>
            <Sidebar>
                <div className="container ">
                    <h2 className=''>Contact Data</h2>
                    <p>All Person's details who try to contact you </p>
                    <table className="table table-striped mt-5">
                        <thead>
                            <tr>
                                <th>Sr.no</th>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Message</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data && data.map((item, index) => (
                                    <tr key={item._id} >
                                        <td>{index + 1}</td>
                                        <td>{formatDate(item?.date)}</td>
                                        <td>{item?.name}</td>
                                        <td>{item?.email}</td>
                                        <td>{item?.phone}</td>
                                        <td>{item?.message}</td>
                                        <td>
                                            <button
                                                className=' btn btn-danger py-1 px-3'
                                                onClick={() => deleteData(item?._id)}
                                            >
                                                <i class="fa-solid fa-trash" title='Delete'></i>
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
            <ToastContainer />
        </div>
    );
}

export default ContactTable;
