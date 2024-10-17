import React, { useEffect, useState } from 'react';
import Sidebar from '../UserDashbord/Sidebar';
import { backendUrl } from '../../../env';
import axios from 'axios';
import OpenProfileModal from './OpenProfileModal';
import EmployeeModel from '../Employee/Telecaller/EmployeeModel';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Employess = () => {
    const [employee, setEmployee] = useState([]);
    
    const fetchEmployeeData = async () => {
        try {
            const responce = await axios.get(`${backendUrl}/get_employee`);
            if (responce?.data) {
                setEmployee(responce?.data)
            }
        } catch (error) {
            console.log(error, "error");
        }
    }
    useEffect(() => {

        fetchEmployeeData();
    }, []);

    const deleteEmployee = async (id) => {
        try {
            const result = window.confirm("Do you really want to delete ?");
            if (result) {
                const deleteEmployee = await axios.delete(`${backendUrl}/delete_employee/${id}`);
                if (deleteEmployee) {
                    toast.success("Deleted successfully");
                    fetchEmployeeData();
                }
            }

        } catch (error) {

        }
    }

    return (
        <div>
            <Sidebar>
                <div className="">
                    <h2 className='mx-4'>Employee List</h2>
                    <table className="table table-striped mt-5">
                        <thead>
                            <tr>
                                <th>Sr.no</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Employee Type</th>
                                <th></th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                employee && employee.map((item, index) => (
                                    <tr key={item._id} >
                                        <td>{index + 1}</td>
                                        <td>{item?.full_name}</td>
                                        <td>{item?.email}</td>
                                        <td style={{ fontWeight: "bold" }}>
                                            {item?.user_type === "Employee-1" ? "RM" :
                                                item?.user_type === "Employee-2" ? "Telecaller" : "Field Staff"}
                                        </td>

                                        <td className=' d-flex gap-2'>
                                            <OpenProfileModal data={item} />
                                            <button className='btn btn-danger px-3 py-1' onClick={() => deleteEmployee(item?._id)}>Delete</button>
                                            {
                                                <>
                                                    <EmployeeModel id={item?._id} />
                                                </>
                                            }
                                        </td>
                                        <td>
                                            <Link to={`/employee/google-link/${item?._id}`}>Show Link</Link>
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

export default Employess;
