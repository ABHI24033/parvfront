import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../../../env';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddRemarks = () => {
    const [remark, setRemark] = useState();
    const { id, endpoint } = useParams();
    const [path, setPath] = useState();
    const Navigate = useNavigate();
    useEffect(() => {
        if (endpoint === "getallhomeloan") {
            setPath("add_homeloan_remark");
        }
        if (endpoint === "getAllGoldForms") {
            setPath("add_goldloan_remark");
        }
        if (endpoint === "get_all_personal_loan") {
            setPath("add_personal_loan_remark");
        }
        if (endpoint === "get_all_vehicle_loan") {
            setPath("add_vehicleloan_remark");
        }
        if (endpoint === "getAllBusinessLoanForms") {
            setPath("add_businessloan_remark");
        }
    }, []);

    const addRemark = async () => {
        try {
            const res = await axios.put(`${backendUrl}/${path}/${id}`, { remark });

            if (res) {
                toast.success(res?.data?.message);
                Navigate(`/homeservices/formTable/${endpoint}`);
            }
        } catch (error) {
            console.log("Error when try to add remark", error);
        }
    }
    return (
        <div className='my-6 py-6 mx-auto w-25'>
            <h1>Add Remark</h1>

            <div className="" >
                <textarea
                    className="form-control"
                    placeholder="Remarks"
                    id="floatingTextarea"
                    height="600"
                    onChange={(e) => setRemark(e.target.value)}
                    value={remark}
                >
                </textarea>
            </div>
            <div className=''>
                <button className='btn btn-primary' onClick={addRemark}>Add Remark</button>
            </div>
        </div>
    );
}

export default AddRemarks;
