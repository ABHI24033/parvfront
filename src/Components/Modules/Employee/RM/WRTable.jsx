import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import Sidebar from '../../UserDashbord/Sidebar';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../../../../env';
import RMworkModal from './RMworkModals';
import { toast } from 'react-toastify';
import FSworkModal from '../FieldStaff/FSworkModal';

const WRTable = () => {
    const [data, setData] = useState();
    const [deletePath, setDeletepath] = useState();
    // console.log(data);
    const param = useParams();
    const { endPoint } = param;
    useEffect(() => {
        if (endPoint === "rm_work_report") {
            setDeletepath("delete_work_report")
        }
        if (endPoint === "fieldStaff") {
            setDeletepath("delete_fieldstaff_report")
        }
        getData();
    }, [endPoint]);

    const getData = async () => {
        try {
            const res = await axios.get(`${backendUrl}/${endPoint}`);
            setData(res?.data?.data);
        } catch (error) {
            console.log("Error : ", error);
        }
    }

    const DeleteReport = async (id) => {

        try {
            const result = window?.confirm("Do you really want to delete ?");
            if (result) {
                const res = await axios.delete(`${backendUrl}/${deletePath}/${id}`);
                if (res.status === 200) {
                    toast.success("Deleted Successfully");
                    getData();
                }
            }
        } catch (error) {
            console.log("Error while Deleting :", error);
        }
    }
    return (
        <div>
            <Sidebar>
                <nav >
                    <Link className={`text-white ${endPoint === "rm_work_report" ? "bg-warning px-4 py-1 rounded" : ""}`} to={'/workReport/rm_work_report'}>RM</Link>
                    {/* <Link className={`text-white  ${endPoint === "telecaller" ? "bg-warning px-4 py-1 rounded" : ""}`} to={'/workReport/telecaller'}>Tele Caller</Link> */}
                    <Link className={`text-white  ${endPoint === "fieldStaff" ? "bg-warning px-4 py-1 rounded" : ""}`} to={'/workReport/fieldStaff'}>Field Staff</Link>
                </nav>

                <table className="table" >
                    <thead>
                        <tr>
                            <th>SR. No.</th>
                            <th>Date</th>
                            <th>Employee Name</th>
                            <th>Details</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data?.map((item, index) => {
                                let dateObj = new Date(item?.date);
                                let day = String(dateObj.getUTCDate()).padStart(2, '0');
                                let month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
                                let year = dateObj.getUTCFullYear();
                                let formattedDate = `${day}-${month}-${year}`;
                                const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                                let dayName = daysOfWeek[dateObj.getUTCDay()];
                                return (
                                    <tr key={item?._id}>
                                        <td>{index + 1}</td>
                                        <td>{formattedDate} {`(${dayName})`}</td>
                                        <td>{item?.name ? item?.name : item?.emp_name}</td>
                                        <td>
                                            {
                                                endPoint === "rm_work_report" ? <RMworkModal data={item} /> : <FSworkModal data={item} />
                                            }
                                            {/* <RMworkModal data={item} /> */}
                                        </td>
                                        <td>
                                            <button className='btn btn-danger px-2 py-1' title='delete'>
                                                <MdDelete onClick={() => DeleteReport(item?._id)} />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </Sidebar>

        </div>
    );
}

export default WRTable;
