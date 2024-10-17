import axios from 'axios';
import React, { useState } from 'react';
import { backendUrl } from '../../../env';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

const AddPayment = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        paymentDate: '',
        paymentAmount: '',
        incentives: '',
        applicationNumber: '',
        loan_product: "",
        payment:"",
        month:"",
        connector_id: id,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        console.log(formData);
        e.preventDefault();
        try {
            const res = await axios.post(`${backendUrl}/payments`, formData);
            if (res) {
                toast.success("Payments Added");
                setTimeout(() => {
                    navigate("/connectors")
                }, 3000);
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.log('Error while submitting');
        }
    };

    return (
        <div className='mx-auto'>
            <ToastContainer />
            <div className="container mt-5 pt-6 w-50 row mx-auto my-5">
                <h2>Payment Form</h2>
                <form onSubmit={handleSubmit} className=' mx-4 my-4' >

                    <div className="form-group col-11">
                        <p htmlFor="applicationNumber">Application Number</p>
                        <input
                            type="text"
                            className="form-control"
                            id="applicationNumber"
                            name="applicationNumber"
                            value={formData.applicationNumber}
                            onChange={handleChange}
                            placeholder='Application Number'
                            required
                        />
                    </div>
                    <div className="form-group col-11">
                        <p className='' htmlFor="loan_product">Loan Product</p>
                        <select
                            id={`loan_product`}
                            name="loan_product"
                            className="form-select"
                            value={formData.loan_product}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled selected>
                                Select Loan Product
                            </option>
                            <option value="HOME LOAN">HOME LOAN</option>
                            <option value="BUSINESS LOAN">BUSINESS LOAN</option>
                            <option value="VEHICLE LOAN">VEHICLE LOAN</option>
                            <option value="PERSONAL LOAN">PERSONAL LOAN</option>
                            <option value="GOLD LOAN">GOLD LOAN</option>

                        </select>
                    </div>
                    <div className="form-group  col-11 ">
                        <p htmlFor="incentives">Incentives</p>
                        <input
                            type="text"
                            className="form-control"
                            id="incentives"
                            name="incentives"
                            value={formData.incentives}
                            onChange={handleChange}
                            placeholder='Incentives'
                            required
                        />
                    </div>
                    <div className="form-group col-11">
                        <p className='' htmlFor="paymentDate">Payments date</p>
                        <input
                            type="date"
                            className="form-control"
                            id="paymentDate"
                            name="paymentDate"
                            value={formData.paymentDate}
                            onChange={handleChange}
                            placeholder='Payments date'
                            required
                        />
                    </div>

                    <div className="form-group  col-11">
                        <p htmlFor="paymentAmount fs-6">Payment Amount</p>
                        <input
                            type="number"
                            className="form-control"
                            id="paymentAmount"
                            name="paymentAmount"
                            value={formData?.paymentAmount}
                            onChange={handleChange}
                            placeholder='Payment Amount'
                            required
                        />
                    </div>


                    <div className="form-group col-11">
                    <p htmlFor="month"> Months</p>
                        <select
                            id={`month`}
                            name="month"
                            className="form-select"
                            value={formData?.month}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled selected>
                                Select Month
                            </option>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                        </select>
                    </div>
                    <div className="form-group col-11">
                        <select name="payment" 
                        id="payment" 
                        value={formData?.payment} 
                        onChange={handleChange} 
                        className='form-select'>
                            <option disabled selected>Paid or Unpaid</option>
                            <option value="paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary my-3">Submit</button>
                </form>
            </div>
        </div>

    );
};

export default AddPayment;

