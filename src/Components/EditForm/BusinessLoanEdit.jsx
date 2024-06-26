// import React from 'react';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import * as yup from 'yup';
import { backendUrl } from "../../env";
import { toast } from "react-toastify";
import BusinessLoanDocuments from "./BusinessLoanDocuments";
// import { BusinessLoanValidation } from "./FormValidation";

const BusinessLoanEdit = () => {
    let newformData = new FormData();
    const location = useLocation();
    const navigate = useNavigate();
    const {id}=useParams();
    const [paramvalue, setParamvalue] = useState(null);
    const [progress, setProgress] = useState();
    const [formData, setFormData] = useState();

    async function getFormdataById() {
        try {
            const data = await axios.get(`${backendUrl}${location?.pathname}`);
            console.log(data);
            if (data) {
                setFormData(data?.data?.data);
                setDividendArr(data?.data?.data?.applicant_banking_details);
                setDividendArr1(data?.data?.data?.loan_history);
                // setDividendArr2(data?.data?.data?.seller_banking_details);
            }
        } catch (error) {
            console.log("Error when try to fetch data :", error);
        }
    }

    useEffect(() => {
        getFormdataById();
        if (location.state) {
            setParamvalue(location.state.param);
        }
    }, [location.state, paramvalue]);

    const handleNestedChange = (e, category) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [category]: {
                ...formData[category],
                [name]: value
            }
        });
    };

    const handleInputChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const [dividendArr, setDividendArr] = useState([
        {
            bank_name: "",
            account_type: "",
        },
    ]);

    const [dividendArr1, setDividendArr1] = useState([
        {
            loan_bank_name: '',
            Total_loan_amount: '',
            emi: '',
            pending: '',
        },
    ]);



    // const [textDisabld, setTextDisabld] = useState(false); // Assuming textDisabld is a state variable

    const handleAdd = () => {
        setDividendArr([
            ...dividendArr,
            {
                bank_name: "",
                account_type: "",
                branch_name: "",
            },
        ]);
    };
    const handleAdd1 = () => {
        setDividendArr1([
            ...dividendArr1,
            {
                loan_type: "",
                bank_nbfc: "",
                emi: "",
                pandding: "",
            },
        ]);
    };


    const handleInputChange1 = (e, index) => {
        const { name, value } = e.target;
        // console.log("value", e.target.value);
        const list = [...dividendArr];
        list[index][name] = value;
        setDividendArr(list);
    };

    const handleInputChange2 = (e, index) => {
        const { name, value } = e.target;
        // console.log("value", dividendArr1);
        const list = [...dividendArr1];
        list[index][name] = value;
        setDividendArr1(list);
    };

    const handleRemove = (index) => {
        if (dividendArr.length > 0) {
            const listArr = [...dividendArr];
            listArr.splice(index, 1);
            setDividendArr(listArr);
        }
    };

    const handleRemove1 = (index) => {
        if (dividendArr1.length > 0) {
            const listArr = [...dividendArr1];
            listArr.splice(index, 1);
            setDividendArr1(listArr);
        }
    };



 
    
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${backendUrl}/update_businessLoan/${id}`,
                formData,
                {
                    onUploadProgress: ({ loaded, total }) => {
                        setProgress(Math.round((loaded * 100) / total));
                    }
                }
            );
            // console.log(res);
            if (res) {
                toast.success("Updated Successfully");
                setTimeout(() => {
                    navigate("/homeservices/formTable/getallhomeloan");
                }, 3000);
            }

        } catch (error) {
            toast.error("Something went wrong");
            console.log("Error while updating");
        }
    }




    return (
        <div>
            {/* Applicant KYC section */}
            <section className="mt-6 pt-6">
                <div className="container">
                    <div className="mb-2">
                        <div className="offset-xl-2 col-xl-8 offset-lg-2 col-lg-8 col-md-12 col-sm-12 col-12">
                            <div className="mb-4 text-center">
                                <h1 className="mb-0"> Update Business Loan Application Form </h1>
                            </div>
                        </div>
                        <form>
                            <div>
                                <div className="row">
                                    <h3> Applicant KYC Section </h3>

                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <label className="sr-only form-label mb-0" htmlFor="fname">
                                                First Name
                                            </label>
                                            <input
                                                id="fname"
                                                name="fname"
                                                type="text"
                                                value={formData?.applicant_kyc?.fname}
                                                onChange={(e) => handleNestedChange(e, "applicant_kyc")}
                                                placeholder="First Name"
                                                className="form-control"
                                            />

                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <label className="sr-only form-label mb-0" htmlFor="mname">
                                                Middle Name
                                            </label>
                                            <input
                                                id="mname"
                                                name="mname"
                                                type="text"
                                                value={formData?.applicant_kyc?.mname}
                                                onChange={(e) => handleNestedChange(e, "applicant_kyc")}
                                                placeholder="Middle Name"
                                                className="form-control"
                                            />

                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <label className="sr-only form-label mb-0" htmlFor="lname">
                                                Last Name
                                            </label>
                                            <input
                                                id="lname"
                                                name="lname"
                                                type="text"
                                                value={formData?.applicant_kyc?.lname}
                                                onChange={(e) => handleNestedChange(e, "applicant_kyc")}
                                                placeholder="Last Name"
                                                className="form-control"
                                            />

                                        </div>
                                    </div>


                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <label className="sr-only form-label mb-0" htmlFor="email">
                                                Email
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData?.applicant_kyc?.email}
                                                onChange={(e) => handleNestedChange(e, "applicant_kyc")}
                                                placeholder="Email"
                                                className="form-control"
                                            />

                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <label className="sr-only form-label mb-0" htmlFor="phone">
                                                Phone
                                            </label>
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="text"
                                                value={formData?.applicant_kyc?.phone}
                                                onChange={(e) => handleNestedChange(e, "applicant_kyc")}
                                                placeholder="Phone"
                                                className="form-control"
                                            />

                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <label className="sr-only form-label mb-0" htmlFor="alternate_number">
                                                Alternate Phone Number
                                            </label>
                                            <input
                                                id="alternate_number"
                                                name="alternate_number"
                                                type="text"
                                                value={formData?.applicant_kyc?.alternate_number}
                                                onChange={(e) => handleNestedChange(e, "applicant_kyc")}
                                                placeholder="Alternate Phone"
                                                className="form-control"
                                            />

                                        </div>
                                    </div>
                                    {/* ===============Date of birth and others========== */}
                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <label className="sr-only form-label mb-0" htmlFor="dob">
                                                Date of Birth
                                            </label>
                                            <input
                                                id="dob"
                                                name="dob"
                                                type="date"
                                                value={formData?.applicant_kyc?.dob}
                                                onChange={(e) => handleNestedChange(e, "applicant_kyc")}
                                                placeholder="Date of Birth"
                                                className="form-control"
                                            />

                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <select
                                                id={`gender`}
                                                name="gender"
                                                className="form-select"
                                                value={formData?.applicant_kyc?.gender}
                                                onChange={(e) => handleNestedChange(e, "applicant_kyc")}
                                            >
                                                <option value="" disabled selected>
                                                    Gender
                                                </option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>

                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <select
                                                id={`marital_status`}
                                                name="marital_status"
                                                className="form-select"
                                                value={formData?.applicant_kyc?.marital_status}
                                                onChange={(e) => handleNestedChange(e, "applicant_kyc")}
                                            >
                                                <option value="" disabled selected>
                                                    Marital Status
                                                </option>
                                                <option value="single">Single</option>
                                                <option value="married">Married</option>
                                            </select>

                                        </div>
                                    </div>
                                    {
                                        formData?.applicant_kyc?.marital_status === "married" &&
                                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                            <div className="mb-3">
                                                <label className="sr-only form-label mb-0" htmlFor="spouse_name">
                                                    Spouse Name
                                                </label>
                                                <input
                                                    id="spouse_name"
                                                    name="spouse_name"
                                                    type="text"
                                                    value={formData?.applicant_kyc?.spouse_name}
                                                    onChange={(e) => handleNestedChange(e, "applicant_kyc")}
                                                    placeholder="Spouse Name"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                    }

                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <label className="sr-only form-label mb-0" htmlFor="father_name">
                                                Father's Name
                                            </label>
                                            <input
                                                id="father_name"
                                                name="father_name"
                                                type="text"
                                                value={formData?.applicant_kyc?.father_name}
                                                onChange={(e) => handleNestedChange(e, "applicant_kyc")}
                                                placeholder="Father Name"
                                                className="form-control"
                                            />

                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <label className="sr-only form-label mb-0" htmlFor="mother_name">
                                                Mother's Name
                                            </label>
                                            <input
                                                id="mother_name"
                                                name="mother_name"
                                                type="text"
                                                value={formData?.applicant_kyc?.mother_name}
                                                onChange={(e) => handleNestedChange(e, "applicant_kyc")}
                                                placeholder="Mother's Name"
                                                className="form-control"
                                            />

                                        </div>
                                    </div>

                                    <h4>Permanent Address : </h4>

                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <label className="sr-only form-label mb-0" htmlFor="house_name">
                                                House Name
                                            </label>
                                            <input
                                                id="house_name"
                                                name="house_name"
                                                type="text"
                                                value={formData?.applicant_kyc?.house_name}
                                                onChange={(e) => handleNestedChange(e, "applicant_kyc")}
                                                placeholder="Building / House Name"
                                                className="form-control"
                                            />
                                            
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <label className="sr-only form-label mb-0" htmlFor="street_name">
                                                Street/Road
                                            </label>
                                            <input
                                                id="street_name"
                                                name="street_name"
                                                type="text"
                                                value={formData?.applicant_kyc?.street_name}
                                                onChange={(e) => handleNestedChange(e, "applicant_kyc")}
                                                placeholder="Street / Road name"
                                                className="form-control"
                                            />

                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <label className="sr-only form-label mb-0" htmlFor="city_name">
                                                Town / City Name
                                            </label>
                                            <input
                                                id="city_name"
                                                name="city_name"
                                                type="text"
                                                value={formData?.applicant_kyc?.city_name}
                                                onChange={(e) => handleNestedChange(e, "applicant_kyc")}
                                                placeholder="Town / City Name"
                                                className="form-control"
                                            />

                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <label className="sr-only form-label mb-0" htmlFor="landmark">
                                                Nearest Landmark
                                            </label>
                                            <input
                                                id="landmark"
                                                name="landmark"
                                                type="text"
                                                value={formData?.applicant_kyc?.landmark}
                                                onChange={(e) => handleNestedChange(e, "applicant_kyc")}
                                                placeholder="Nearest Landmark"
                                                className="form-control"
                                            />

                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <label className="sr-only form-label mb-0" htmlFor="district">
                                                District
                                            </label>
                                            <input
                                                id="district"
                                                name="district"
                                                type="text"
                                                value={formData?.applicant_kyc?.district}
                                                onChange={(e) => handleNestedChange(e, "applicant_kyc")}
                                                placeholder="District"
                                                className="form-control"
                                            />

                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <label className="sr-only form-label mb-0" htmlFor="state">
                                                State
                                            </label>
                                            <input
                                                id="state"
                                                name="state"
                                                type="text"
                                                value={formData?.applicant_kyc?.state}
                                                onChange={(e) => handleNestedChange(e, "applicant_kyc")}
                                                placeholder="State"
                                                className="form-control"
                                            />

                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <label className="sr-only form-label mb-0" htmlFor="pincode">
                                                PIN code
                                            </label>
                                            <input
                                                id="pincode"
                                                name="pincode"
                                                type="text"
                                                value={formData?.applicant_kyc?.pincode}
                                                onChange={(e) => handleNestedChange(e, "applicant_kyc")}
                                                placeholder="PIN code"
                                                className="form-control"
                                            />

                                        </div>
                                    </div>

                                    <h4>Present Address : </h4>

                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <label className="sr-only form-label mb-0" htmlFor="present_house_name">
                                                House Name
                                            </label>
                                            <input
                                                id="present_house_name"
                                                name="present_house_name"
                                                type="text"
                                                value={formData?.applicant_kyc?.present_house_name}
                                                onChange={(e) => handleNestedChange(e, "applicant_kyc")}
                                                placeholder="Building / House Name"
                                                className="form-control"
                                            />

                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <label className="sr-only form-label mb-0" htmlFor="present_street_name">
                                                Street/Road
                                            </label>
                                            <input
                                                id="present_street_name"
                                                name="present_street_name"
                                                type="text"
                                                value={formData?.applicant_kyc?.present_street_name}
                                                onChange={(e) => handleNestedChange(e, "applicant_kyc")}
                                                placeholder="Street / Road name"
                                                className="form-control"
                                            />

                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <label className="sr-only form-label mb-0" htmlFor="present_city_name">
                                                Town / City Name
                                            </label>
                                            <input
                                                id="present_city_name"
                                                name="present_city_name"
                                                type="text"
                                                value={formData?.applicant_kyc?.present_city_name}
                                                onChange={(e) => handleNestedChange(e, "applicant_kyc")}
                                                placeholder="Town / City Name"
                                                className="form-control"
                                            />

                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <label className="sr-only form-label mb-0" htmlFor="present_landmark">
                                                Nearest Landmark
                                            </label>
                                            <input
                                                id="present_landmark"
                                                name="present_landmark"
                                                type="text"
                                                value={formData?.applicant_kyc?.present_landmark}
                                                onChange={(e) => handleNestedChange(e, "applicant_kyc")}
                                                placeholder="Nearest Landmark"
                                                className="form-control"
                                            />

                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <label className="sr-only form-label mb-0" htmlFor="present_district">
                                                District
                                            </label>
                                            <input
                                                id="present_district"
                                                name="present_district"
                                                type="text"
                                                value={formData?.applicant_kyc?.present_district}
                                                onChange={(e) => handleNestedChange(e, "applicant_kyc")}
                                                placeholder="District"
                                                className="form-control"
                                            />

                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <label className="sr-only form-label mb-0" htmlFor="present_state">
                                                State
                                            </label>
                                            <input
                                                id="present_state"
                                                name="present_state"
                                                type="text"
                                                value={formData?.applicant_kyc?.present_state}
                                                onChange={(e) => handleNestedChange(e, "applicant_kyc")}
                                                placeholder="State"
                                                className="form-control"
                                            />

                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <label className="sr-only form-label mb-0" htmlFor="present_pincode">
                                                PIN code
                                            </label>
                                            <input
                                                id="present_pincode"
                                                name="present_pincode"
                                                type="text"
                                                value={formData?.applicant_kyc?.present_pincode}
                                                onChange={(e) => handleNestedChange(e, "applicant_kyc")}
                                                placeholder="PIN code"
                                                className="form-control"
                                            />

                                        </div>
                                    </div>

                                    {/* ======================= Applicant Bank Detail Start ============================= */}

                                    {dividendArr?.map((item, index) => (
                                        <div className="" key={index}>
                                            <h3>
                                                {" "}
                                                {index === 0 && "Banking Details"}{" "}
                                                <span>
                                                    {" "}
                                                    <button
                                                        type="button"
                                                        className={`add-button btn btn-primary py-1 px-2 fs-4  ${(index === 0 && "d-none") || ""
                                                            }`}
                                                        onClick={() => handleRemove(index)}
                                                        style={{ backgroundColor: "blue" }}
                                                    >
                                                        -
                                                    </button>
                                                    {index === 0 && (
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary py-1 px-2 fs-4"
                                                            onClick={handleAdd}
                                                            style={{ backgroundColor: "blue" }}
                                                        >
                                                            +
                                                        </button>
                                                    )}
                                                </span>
                                            </h3>

                                            <div className="row">
                                                <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 col-12">
                                                    <div className="mb-3">
                                                        <label className="sr-only form-label mb-0" htmlFor="name">
                                                            Name of Bank
                                                        </label>
                                                        <input
                                                            // id={`dividend_stock_amount${index}`}
                                                            id={`bank_name ${index}`}
                                                            name="bank_name"
                                                            type="text"
                                                            value={item.bank_name}
                                                            onChange={(e) =>
                                                                handleInputChange1(e, index)
                                                            }
                                                            // onChange={handleInputChange}
                                                            placeholder="Name of Bank"
                                                            className="form-control"
                                                            required
                                                        />
                                                        
                                                    </div>
                                                </div>

                                                <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 col-12">
                                                    <div className="mb-3">
                                                        <select
                                                            id={`account_type ${index}`}
                                                            // id="account_type"
                                                            name="account_type"
                                                            className="form-select"
                                                            value={item.account_type}
                                                            onChange={(e) =>
                                                                handleInputChange1(e, index)
                                                            }
                                                        // onChange={handleInputChange}
                                                        >
                                                            <option value="" disabled selected>
                                                                Types of Account
                                                            </option>
                                                            <option value="home">
                                                                Current Account
                                                            </option>
                                                            <option value="student">
                                                                Saving Account
                                                            </option>
                                                            <option value="personal">
                                                                Salary Account
                                                            </option>
                                                            <option value="Car">
                                                                Fixed Deposit Account
                                                            </option>
                                                            <option value="Education">
                                                                NRI Account
                                                            </option>
                                                            <option value="Gold">
                                                                DEMAT Account
                                                            </option>
                                                        </select>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    ))}

                                    {/* User Bank Detail End */}
                                    <h3>Business Details Section </h3>

                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <select
                                                id={`loan_purpose`}
                                                name="loan_purpose"
                                                className="form-select"
                                                value={formData?.business_details?.loan_purpose}
                                                onChange={(e) => handleNestedChange(e, "business_details")}
                                            >
                                                <option value="" disabled selected>
                                                    Loan Purpose
                                                </option>
                                                <option value="to start new business">to start new business</option>
                                                <option value="for growth of existing business">for growth of existing business</option>
                                            </select>
                                            
                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <label className="sr-only form-label mb-0" htmlFor="company_name">
                                                Company Name
                                            </label>
                                            <input
                                                id="company_name"
                                                name="company_name"
                                                type="text"
                                                value={formData?.business_details?.company_name}
                                                onChange={(e) => handleNestedChange(e, "business_details")}
                                                placeholder="Company / Firm Name"
                                                className="form-control"
                                            />
                                            
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <label className="sr-only form-label mb-0" htmlFor="business_register_year">
                                                Business registration year
                                            </label>
                                            <input
                                                id="business_register_year"
                                                name="business_register_year"
                                                type="text"
                                                value={formData?.business_details?.business_register_year}
                                                onChange={(e) => handleNestedChange(e, "business_details")}
                                                placeholder=" Business registration year "
                                                className="form-control"
                                            />
                                            
                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <select
                                                id={`registration_documents`}
                                                name="registration_documents"
                                                className="form-select"
                                                value={formData?.business_details?.registration_documents}
                                                onChange={(e) => handleNestedChange(e, "business_details")}
                                            >
                                                <option value="" disabled selected>
                                                    Select Registration documents
                                                </option>
                                                <option value="GST">GST</option>
                                                <option value="FORM-3">FORM-3</option>
                                                <option value="UDYAM certificate">UDYAM certificate</option>
                                                <option value="other">other</option>
                                            </select>
                                           
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <select
                                                id={`business_turnover`}
                                                name="business_turnover"
                                                className="form-select"
                                                value={formData?.business_details?.business_turnover}
                                                onChange={(e) => handleNestedChange(e, "business_details")}
                                            >
                                                <option value="" disabled selected>
                                                    Select Business Turnover
                                                </option>
                                                <option value="less than 5 lakhs">less than 5 lakhs</option>
                                                <option value="5-10 lakhs">5-10 lakhs</option>
                                                <option value="10-15 lakhs">10-15 lakhs</option>
                                                <option value="15-25 lakhs">15-25 lakhs</option>
                                                <option value="25-50 lakhs">25-50 lakhs</option>
                                                <option value="50-1 crore">50-1 crore</option>
                                                <option value="above 1 crore">above 1 crore</option>
                                            </select>
                                           
                                        </div>
                                    </div>

                                    <div className="d-flex">
                                        <span className=" fs-4 font-weight-bold" style={{ fontWeight: 600 }}>
                                            Do you file Income tax return?
                                        </span>
                                        <div className="mx-2 d-flex">
                                            <label htmlFor="file_itr1" className="fs-4 my-1">YES</label>
                                            <input
                                                type="radio"
                                                id="file_itr1"
                                                name="file_itr"
                                                className="mx-2"
                                                value="yes"
                                                checked={formData?.business_details?.file_itr==="yes"}
                                                onChange={(e) => handleNestedChange(e, "business_details")}
                                            />
                                        </div>
                                        <div className="mx-2 d-flex ">
                                            <label htmlFor="file_itr2" className=" fs-4 my-1 ">NO</label>
                                            <input
                                                type="radio"
                                                id="file_itr2"
                                                name="file_itr"
                                                className="mx-1 "
                                                value="no"
                                                checked={formData?.business_details?.file_itr==="no"}
                                                onChange={(e) => handleNestedChange(e, "business_details")}
                                            />
                                        </div>
                                        
                                    </div>
                                    <div className="d-flex">
                                        <span className=" fs-4 font-weight-bold" style={{ fontWeight: 600 }}>
                                            Do you have property for mortgage?
                                        </span>
                                        <div className="mx-2 d-flex">
                                            <label htmlFor="property_mortgage1" className="fs-4 my-1">YES</label>
                                            <input
                                                type="radio"
                                                id="property_mortgage1"
                                                name="property_mortgage"
                                                className="mx-2"
                                                value="yes"
                                                checked={formData?.business_details?.property_mortgage}
                                                onChange={(e) => handleNestedChange(e, "business_details")}
                                            />
                                        </div>
                                        <div className="mx-2 d-flex ">
                                            <label htmlFor="property_mortgage2" className=" fs-4 my-1 ">NO</label>
                                            <input
                                                type="radio"
                                                id="property_mortgage2"
                                                name="property_mortgage"
                                                className="mx-1 "
                                                value="no"
                                                checked={formData?.business_details?.property_mortgage}
                                                onChange={(e) => handleNestedChange(e, "business_details")}
                                            />
                                        </div>
                                        
                                    </div>

                                    {
                                        formData?.business_details?.property_mortgage === "yes" &&
                                        <div className="row">
                                            <h3>Property Details : </h3>

                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <h5>Property is located in which area?</h5>
                                                <div className="mb-3">
                                                    <select
                                                        id={`property_location`}
                                                        name="property_location"
                                                        className="form-select"
                                                        value={formData?.business_details?.property_location}
                                                        onChange={(e) => handleNestedChange(e, "business_details")}
                                                    >
                                                        <option value="" disabled selected>
                                                            Select Property Location
                                                        </option>
                                                        <option value="Gram panchayat">Gram panchayat</option>
                                                        <option value="Nagar panchayat">Nagar panchayat</option>
                                                        <option value="Nagar parishad">Nagar parishad</option>
                                                        <option value="Municipal corporation">Municipal corporation</option>
                                                    </select>
                                                    
                                                </div>
                                            </div>
                                            {/* <h5>Property is located in which area?</h5> */}
                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <h5>Who is the owner of property?</h5>
                                                <div className="mb-3">
                                                    <select
                                                        id={`property_owner`}
                                                        name="property_owner"
                                                        className="form-select"
                                                        value={formData?.business_details?.property_owner}
                                                        onChange={(e) => handleNestedChange(e, "business_details")}
                                                    >
                                                        <option value="" disabled selected>
                                                            Select Property Owner
                                                        </option>
                                                        <option value="Myself">Myself</option>
                                                        <option value="Father">Father</option>
                                                        <option value="Mother">Mother</option>
                                                        <option value="Spouse">Spouse</option>
                                                        <option value="Grandfather">Grandfather</option>
                                                        <option value="Grandmother">Grandmother</option>
                                                        <option value="other">other</option>
                                                    </select>
                                                    
                                                </div>
                                            </div>
                                            {/* <h5>Property is located in which area?</h5> */}
                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <h5>Select the property documents you have </h5>
                                                <div className="mb-3">
                                                    <select
                                                        id={`property_documents`}
                                                        name="property_documents"
                                                        className="form-select"
                                                        value={formData?.business_details?.property_documents}
                                                onChange={(e) => handleNestedChange(e, "business_details")}
                                                    >
                                                        <option value="" disabled selected>
                                                            Select Property Documents
                                                        </option>
                                                        <option value="Khatiyan/sale deed (kewala)">Khatiyan / sale deed (kewala) </option>
                                                        <option value="Current rashid">Current rashid</option>
                                                        <option value="LPC">LPC </option>
                                                        <option value="13 years Chain deed">13 years Chain deed</option>
                                                    </select>
                                                    
                                                </div>
                                            </div>

                                        </div>

                                    }

                                    {/*========================Loan History Section ============================= */}

                                    {
                                        <div className="d-flex">
                                            <span className=" fs-4 font-weight-bold" style={{ fontWeight: 600 }}>Have you taken loan previously?</span>
                                            <div className="mx-2 d-flex">
                                                <label htmlFor="loan_check1" className="fs-4 my-1">YES</label>
                                                <input
                                                    type="radio"
                                                    id="loan_check1"
                                                    name="loan_check"
                                                    className="mx-2"
                                                    value="yes"
                                                    checked={formData?.loan_check === "yes"}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="mx-2 d-flex ">
                                                <label htmlFor="loan_check2" className=" fs-4 my-1 ">NO</label>
                                                <input
                                                    type="radio"
                                                    id="loan_check2"
                                                    name="loan_check"
                                                    className="mx-1 "
                                                    value="no"
                                                    checked={formData?.loan_check === "no"}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    }
                                    {
                                        formData?.loan_check === "yes" && (
                                            dividendArr1?.map((item, index) => (
                                                <div className="" key={index}>
                                                    <h3>
                                                        {" "}
                                                        {/* {index === 0 && "Loan Repyment Details"}{" "} */}
                                                        {index === 0 && "Previous Loan History"}{" "}
                                                        <span>
                                                            {" "}
                                                            <button
                                                                type="button"
                                                                className={`add-button btn btn-primary py-1 px-2 fs-4  ${(index === 0 && "d-none") || ""
                                                                    }`}
                                                                onClick={() => handleRemove1(index)}
                                                                style={{ backgroundColor: "blue" }}
                                                            >
                                                                -
                                                            </button>
                                                            {index === 0 && (
                                                                <button
                                                                    type="button"
                                                                    className=" btn btn-primary py-1 px-2 fs-4"
                                                                    onClick={handleAdd1}
                                                                    style={{ backgroundColor: "blue" }}
                                                                >
                                                                    +
                                                                </button>
                                                            )}
                                                        </span>
                                                    </h3>

                                                    <div className="row">
                                                        <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                                            <div className="mb-3">
                                                                <label className="sr-only form-label mb-0" htmlFor="loan_bank_name">
                                                                    Bank Name
                                                                </label>
                                                                <input
                                                                    id={`loan_bank_name ${index}`}
                                                                    name="loan_bank_name"
                                                                    type="text"
                                                                    value={item.loan_bank_name}
                                                                    onChange={(e) =>
                                                                        handleInputChange2(e, index)
                                                                    }
                                                                    placeholder="Bank Name"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                                            <div className="mb-3">
                                                                <label className="sr-only form-label mb-0" htmlFor="Total_loan_amount">
                                                                    Total Loan Amount
                                                                </label>
                                                                <input
                                                                    id={`Total_loan_amount ${index}`}
                                                                    name="Total_loan_amount"
                                                                    type="text"
                                                                    value={item.Total_loan_amount}
                                                                    onChange={(e) => handleInputChange2(e, index)}
                                                                    placeholder="Total Loan Amount"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                                            <div className="mb-3">
                                                                <label
                                                                    className="sr-only form-label mb-0"
                                                                    htmlFor="text"
                                                                >
                                                                    Current EMI
                                                                </label>
                                                                <input
                                                                    id={`emi ${index}`}
                                                                    name="emi"
                                                                    type="text"
                                                                    value={item.emi}
                                                                    onChange={(e) =>
                                                                        handleInputChange2(e, index)
                                                                    }
                                                                    placeholder="Current EMI"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                                            <div className="mb-3">
                                                                <label
                                                                    className="sr-only form-label mb-0"
                                                                    htmlFor="text"
                                                                >
                                                                    Remaining amount
                                                                </label>
                                                                <input
                                                                    id={`pending ${index}`}
                                                                    name="pending"
                                                                    type="text"
                                                                    value={item.pending}
                                                                    onChange={(e) =>
                                                                        handleInputChange2(e, index)
                                                                    }
                                                                    placeholder="Remaining amount"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            )))
                                    }
                                    {/* Loan History Section End  */}

                                    {/*============================ Co Applicant Details Start======================= */}

                                    <h3>Co-Applicant Details </h3>

                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <label className="sr-only form-label mb-0" htmlFor="co_name">
                                                Name
                                            </label>
                                            <input
                                                id="co_name"
                                                name="co_name"
                                                type="text"
                                                value={formData?.co_applicant_kyc?.co_name}
                                                onChange={(e) => handleNestedChange(e, "co_applicant_kyc")}
                                                placeholder="Name"
                                                className="form-control"
                                            />
                                            
                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <label className="sr-only form-label mb-0" htmlFor="co_date_of_birth">
                                                Date of Birth
                                            </label>
                                            <input
                                                id="co_date_of_birth"
                                                name="co_date_of_birth"
                                                type="text"
                                                value={formData?.co_applicant_kyc?.co_date_of_birth}
                                                onChange={(e) => handleNestedChange(e, "co_applicant_kyc")}
                                                placeholder="Date of Birth"
                                                className="form-control"
                                            />
                                            
                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <select
                                                id={`occupation`}
                                                name="occupation"
                                                className="form-select"
                                                value={formData?.co_applicant_kyc?.occupation}
                                                onChange={(e) => handleNestedChange(e, "co_applicant_kyc")}
                                            >
                                                <option value="" disabled selected>
                                                    Occupation
                                                </option>
                                                <option value="salaried">Salaried</option>
                                                <option value="selfEmployed">Self-Employed</option>
                                                <option value="others">Others</option>
                                            </select>
                                            
                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <select
                                                id={`co_relation`}
                                                name="co_relation"
                                                className="form-select"
                                                value={formData?.co_applicant_kyc?.co_relation}
                                                onChange={(e) => handleNestedChange(e, "co_applicant_kyc")}
                                            >
                                                <option value="" disabled selected>
                                                    Relation with applicant
                                                </option>
                                                <option value="familymember">Mother</option>
                                                <option value="friend">Father</option>
                                                <option value="realtive">Brother</option>
                                                <option value="realtive">Spouse</option>
                                            </select>
                                            
                                        </div>
                                    </div>
                                    {/* Co Applicant Details End */}

                                    {/* Button */}

                                    <div className=" col-lg-12 col-md-12 col-sm-12 col-12">
                                        <button
                                            onClick={handleUpdate}
                                            type="submit"
                                            disabled={progress ? true : false}
                                            className="btn btn-primary mb-4"
                                        >
                                            {progress ? `Updating ` : "Update"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <BusinessLoanDocuments id={id}/>
        </div>
    );
}

export default BusinessLoanEdit;
