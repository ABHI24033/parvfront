import React, { useEffect, useState } from 'react';
import Sidebar from '../UserDashbord/Sidebar';
import { backendUrl } from '../../../env';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const CareerTable = () => {
    const [data, setData] = useState();

    const getData = async () => {
        try {
            
            const response = await fetch(`${backendUrl}/careers`,
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
            setData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const deleteData=async(id)=>{
        try {
            const res=await axios.delete(`${backendUrl}/delete_career/${id}`)
            console.log(res);
            if(res.status===200){
                getData();
                toast.success(res?.data?.message,{
                    position: "top-right",
                });
            }
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        getData();
    },[])
  return (
    <div>
        <Sidebar>
            <div className="container ">
                {/* <h2 className='mx-4'>Professional loan forms </h2> */}
                <h2 className=''>Job Applied Form Data</h2>
                <p>All Person's details who wanted to work with you. </p>
                <table className="table table-striped mt-5">
                    <thead>
                        <tr>
                            <th>Sr.no</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Resumes</th>
                            <th>Message</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data && data.map((item, index) => (
                                <tr key={item._id} >
                                    <td>{index + 1}</td>
                                    <td>{item?.name}</td>
                                    <td>{item?.email}</td>
                                    <td>{item?.phone}</td>
                                    <td>
                                        <a href={item?.resume?.url} target='_blank' className='btn btn-secondary py-1 px-2'>Resume</a>
                                    </td>
                                    <td>{item?.message}</td>
                                    <td>
                                        <button className=' btn btn-danger py-1 px-3' onClick={()=>deleteData(item?._id)} title='Delete'><i class="fa-solid fa-trash"></i></button>
                                    </td>
                                    
                                  <td>
                                  <Link to={`/career/${item?.job_id}`} className='btn btn-primary px-2 py-1' title='View Job Details'>Job</Link>
                                  </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>


            </Sidebar>
            <ToastContainer/>
    </div>
  );
}

export default CareerTable;
