import React, { useState } from 'react';
import Sidebar from '../UserDashbord/Sidebar';
import axios from 'axios';
import { backendUrl } from '../../../env';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EnquiryForm = () => {
    const [EnquiryForm, setEnquiryForm] = useState({
        customer_name: '',
        phone: '',
        email: '',
        pan_card: "",
        loan_product: "",
        location: '',
    });
    const navigate=useNavigate();

    const handleInputChange = async (e) => {
        const { name, value } = e?.target;
        setEnquiryForm({ ...EnquiryForm, [name]: value });
    };

   const sunmitEnquiry=async(e)=>{
    e.preventDefault();
    try {
        const res=await axios.post(`${backendUrl}/submitEnquiry`,EnquiryForm);
        if(res?.status===201){
            toast.success(res?.data?.message);
            setTimeout(()=>{
                navigate("/profile");
            },2000)
        }
    } catch (error) {
        toast.error(error?.message);
        console.log("Error while submitting query",error);
    }
   }

    return (
        <Sidebar>
            <form className='container px-5 py-4 my-4 card ' style={{ width: "80%", margin: "auto", marginTop: "-2rem" }}>
                <h1 className='text-center fs-3'>Enquiry Form</h1>
                <div className='d-md-flex w-100 '>
                    <div className='mx-4 w-md-50 '>
                        <div className="mb-3">
                            <label for="customer_name" style={{ fontSize: "1rem" }} className="form-label">Customer Name</label>
                            <input
                                type="text"
                                className="form-control "
                                id="customer_name"
                                name='customer_name'
                                value={EnquiryForm?.customer_name}
                                onChange={handleInputChange}
                                placeholder='Enter Customer Name'
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label for="phone" style={{ fontSize: "1rem" }} className="form-label">Mobile Number</label>
                            <input
                                type="number"
                                className="form-control "
                                name='phone'
                                value={EnquiryForm?.phone}
                                onChange={handleInputChange}
                                placeholder='Enter Your Phone Number'
                                id="phone"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label for="email" style={{ fontSize: "1rem" }} className="form-label">Email </label>
                            <input
                                type="email"
                                className="form-control "
                                name='email'
                                value={EnquiryForm?.email}
                                onChange={handleInputChange}
                                id="email"
                                placeholder='Email'
                                required
                            />
                        </div>
                    </div>

                    <div className='mx-4 w-md-50'>
                        <div className="mb-3">
                            <label for="pan_card" style={{ fontSize: "1rem" }} className="form-label">Pan Card Number</label>
                            <input
                                type="text"
                                className="form-control "
                                id="pan_card"
                                name='pan_card'
                                value={EnquiryForm?.pan_card}
                                onChange={handleInputChange}
                                placeholder='Pan Card'
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label for="loan_product" style={{ fontSize: "1rem" }} className="form-label">Loan Product </label>
                            <select className='form-control ' name="loan_product" id="loan_product" value={EnquiryForm?.loan_product} onChange={handleInputChange}>
                                <option value="" selected disabled>Loan Product</option>
                                <option value="Home Loan" >Home Loan</option>
                                <option value="business Loan">Business Loan</option>
                                <option value="Persoanl" >Persoanl Loan</option>
                                <option value="Vehicle Loan">Vehicle Loan</option>
                                <option value="Gold Loan">Gold Loan</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label for="location" style={{ fontSize: "1rem" }} className="form-label">Location</label>
                            <input
                                type="text"
                                className="form-control "
                                id="location"
                                placeholder='Landmark, town/city/village, pin code'
                                name='location'
                                value={EnquiryForm?.location}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className='mx-4'>
                    <button type="submit" onClick={sunmitEnquiry} className="btn btn-primary">Submit</button>
                </div>


            </form>
        </Sidebar>
    );
}

export default EnquiryForm;
