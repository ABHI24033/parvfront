import React, { useEffect, useState } from 'react';
import Sidebar from '../UserDashbord/Sidebar';
import axios from 'axios';
import { backendUrl } from '../../../env';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

const Enquirytable = () => {
    const [enquiryData, setEnquiryData] = useState();

    const fetchEnquiriesdata = async () => {
        try {
            const res = await axios.get(`${backendUrl}/enquiries`);
            if (res.status == 200) {
                setEnquiryData(res?.data?.enquiries);
            }
        } catch (error) {
            console.log("Error while fetching data".error);
        }
    };

    useEffect(() => {
        fetchEnquiriesdata();
    }, []);

    const deleteEnquiry=async(id)=>{
        try {
            const res=await axios.delete(`${backendUrl}/enquiries/${id}`);
            if(res?.status==200){
                toast.success(res?.data?.message);
                fetchEnquiriesdata();
            }
        } catch (error) {
            toast.error(error?.message);
            console.log("Error while Deleting",error);
        }
    };

    return (
        <Sidebar>
            <div className="container mt-5">
                <h2>Enquiries List</h2>
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Mobile Number</th>
                            <th scope="col">Email</th>
                            <th scope="col">PAN Number</th>
                            <th scope="col">Loan Product</th>
                            <th scope="col">Location</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            enquiryData && enquiryData?.map((item,index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index+1}</th>
                                        <td>{item?.customer_name}</td>
                                        <td>{item?.phone}</td>
                                        <td>{item?.email}</td>
                                        <td>{item?.pan_card}</td>
                                        <td>{item?.loan_product}</td>
                                        <td>{item?.location}</td>
                                        <td>
                                            <button 
                                            onClick={()=>deleteEnquiry(item?._id)} 
                                            className='btn btn-danger py-2 px-2' 
                                            title='Delete'
                                            >
                                                <MdDelete className='fs-4'/>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </Sidebar>
    );
}

export default Enquirytable;
