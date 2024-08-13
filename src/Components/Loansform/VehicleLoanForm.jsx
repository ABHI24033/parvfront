// import React from 'react';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom"
import * as yup from 'yup';
import { backendUrl } from "../../env";
import { BusinessLoanValidation } from "./FormValidation";
import { toast } from "react-toastify";

const VehicleLoanForm = () => {
    let newformData = new FormData();
    const location = useLocation();
    const navigate = useNavigate();
    const [paramvalue, setParamvalue] = useState(null);
    useEffect(() => {
        if (location.state) {
            setParamvalue(location.state.param);
        }
    }, [location.state, paramvalue]);

    const [dividendArr, setDividendArr] = useState([
        {
            bank_name: "",
            account_type: "",
        },
    ]);

    const [dividendArr1, setDividendArr1] = useState([
        {
            loan_bank_name: "",
            Total_loan_amount: "",
            emi: "",
            pending: "",
        },
    ]);


    const [textDisabld, setTextDisabld] = useState(false); // Assuming textDisabld is a state variable

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
        console.log("value", e.target.value);
        const list = [...dividendArr];
        list[index][name] = value;
        setDividendArr(list);
    };

    const handleInputChange2 = (e, index) => {
        const { name, value } = e.target;
        console.log("value", dividendArr1);
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

    const [progress, setProgress] = useState();
    const [formData, setFormData] = useState({
        //vehicle details
        vehicle_loan_type: "",
        vehicle_profession_type: "",
        when_purchase_vehicle: "",
        vehicle_estimated_cost: "",
        loan_you_need: "",
        vehicle_file_itr: "",
        // User Details
        userID: localStorage.getItem("userID"),
        fname: "",
        mname: "",
        lname: "",
        email: "",
        phone: "",
        alternate_number: "",
        dob: "",
        gender: "",
        marital_status: "",
        spouse_name: "",
        father_name: "",
        mother_name: "",
        house_name: "",
        street_name: "",
        city_name: "",
        landmark: "",
        district: "",
        state: "",
        pincode: "",
        present_house_name: "",
        present_street_name: "",
        present_city_name: "",
        present_landmark: "",
        present_district: "",
        present_state: "",
        present_pincode: "",
        // Bank details section
        // loan history
        loan_check: "",
        // Co_Application User 
        co_name: "",
        co_date_of_birth: "",
        occupation: "",
        co_relation: "",
        // business details
        loan_purpose: "",
        company_name: "",
        business_register_year: "",
        registration_documents: "",
        business_turnover: "",
        file_itr: "",
        property_mortgage: "",
        property_location: "",
        property_owner: "",
        property_documents: "",

        // job details
        salary_slip: "",
        form16: "",
        job_experience: "",
        designation: "",
        current_salary: "",
        company_name: "",
        current_job_experience: "",
        office_building_name: "",
        office_street_name: "",
        office_city_name: "",
        office_landmark: "",
        office_district: "",
        office_state: "",
        office_pincode: "",
    });

    console.log(formData);

    const [formData2, setFormData2] = useState({
        adhar_front: null,
        adhar_back: null,
        pancard: null,
        applicant_photo: null,
        address_proof: null,
        //business documents
        business_electricity_bill: null,
        shop_pic: null,
        shop_inside_pic: null,
        business_registration: null,
        itr1: null,
        itr2: null,
        other1: null,
        other2: null,
        other3: null,
        //job details
        first_month_salary: null,
        second_month_salary: null,
        third_month_salary: null,
        //property documents
        khatiyan: null,
        mutation: null,
        rashid: null,
        lpc: null,
        property_front_pic: null,
        property_map: null,
        property_video: null,
        chain_deed: null,
        //co_applicant
        co_adhar_front: null,
        co_adhar_back: null,
        co_pancard: null,
        co_applicant_photo: null,
        //vehicle details


    });

    const [errors, setErrors] = useState();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        setFormData2({
            ...formData2,
            [fieldName]: file,
        });
    };


    const handleClick = async (e) => {
        e.preventDefault();

        try {
            await BusinessLoanValidation.validate(formData, { abortEarly: false });
            const userId = localStorage.getItem("userID");
            const object = {
                dividendArr,
                dividendArr1,
                formData,
                connector_id: userId,
            };

            // Append all files to the formData
            Object.keys(formData2).forEach((fileType) => {
                const file = formData2[fileType];
                if (file) {
                    newformData.append(fileType, file);
                }
            });

            try {
                let headersList = {
                    Accept: "*/*",
                    "Content-Type": "application/json",
                };

                let bodyContent = JSON.stringify(object);

                let reqOptions = {
                    url: `${backendUrl}/vehicle_loan`,
                    method: "POST",
                    headers: headersList,
                    data: bodyContent,
                    onUploadProgress: function (progressEvent) {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setProgress(percentCompleted);
                    }
                };

                let response = await axios.request(reqOptions);

                if(response){
                    toast.success("Form Submitted");
                    setTimeout(()=>{
                        navigate(`/vehicleloan/doc/${response?.data?.id}`);
                    },3000);
                }

                // if (response) {
                //     const response2 = await axios.post(
                //         `${backendUrl}/vehicle_loan_uploadFiles/${response.data.id}`,
                //         newformData,
                //         {
                //             headers: {
                //                 "Content-Type": "multipart/form-data",
                //             },
                //             onUploadProgress: ({ loaded, total }) => {
                //                 console.log(`current:${loaded}total:${total}`);
                //                 setProgress(Math.round((loaded * 100) / total));
                //             }
                //         },

                //     );

                //     if (response2) {
                //         alert(response2.data.message);
                //         navigate("/");
                //     } else {
                //         console.error("Error sending data to the backend");
                //     }
                // } else {
                //     // Handle error
                //     console.error("Error sending data to the backend");
                // }
            } catch (error) {
                console.error("Error:", error);
            }
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const newError = {};
                error.inner.forEach((err) => {
                    newError[err.path] = err.message;
                });
                setErrors(newError);
            }
            toast.error(error?.message);
        }
    };

    return (
        <div>
            {/* Applicant KYC section */}
            <section className="">
                <div className="container">
                    <div className="mb-2">
                        <div className="offset-xl-2 col-xl-8 offset-lg-2 col-lg-8 col-md-12 col-sm-12 col-12">
                            <div className="mb-4 text-center">
                                <h1 className="mb-0">Vehicle Loan Application Form </h1>
                            </div>
                        </div>
                        <form>
                            <div>
                                <div className="row">
                                    <h3>Vehicle Loan Section</h3>
                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <select
                                                id={`vehicle_loan_type`}
                                                name="vehicle_loan_type"
                                                className="form-select"
                                                value={formData.vehicle_loan_type}
                                                onChange={handleInputChange}
                                            >
                                                <option value="" disabled selected>
                                                    Select Vehicle loan type
                                                </option>
                                                <option value="Two- wheeler loan">Two- wheeler loan </option>
                                                <option value="New Car loan">New Car loan</option>
                                                <option value="Light commercial vehicle loan">Light commercial vehicle loan</option>
                                                <option value="Heavy commercial vehicle loan">Heavy commercial vehicle loan</option>
                                                <option value="Tractor loan">Tractor loan</option>
                                                <option value="Old vehicle purchase">Old vehicle purchase</option>
                                                <option value="Vehicle refinance">Vehicle refinance</option>
                                            </select>
                                            {
                                                errors?.vehicle_loan_type && <p className="fs-6 text-danger">{errors.vehicle_loan_type}</p>
                                            }
                                        </div>
                                    </div>
                                    {
                                        formData?.vehicle_loan_type === "" || formData?.vehicle_loan_type !== "Two- wheeler loan" &&
                                        <>
                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <h5>Select Profession type :</h5>
                                                <div className="mb-3">
                                                    <select
                                                        id={`vehicle_profession_type`}
                                                        name="vehicle_profession_type"
                                                        className="form-select"
                                                        value={formData.vehicle_profession_type}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="" disabled selected>
                                                            Select profession type
                                                        </option>
                                                        <option value="Job">Job</option>
                                                        <option value="Business">Business</option>
                                                        <option value="Others">Others</option>
                                                    </select>
                                                    {
                                                        errors?.vehicle_profession_type && <p className="fs-6 text-danger">{errors.vehicle_profession_type}</p>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <h5>When you have to purchase vehicle?</h5>
                                                <div className="mb-3">
                                                    <select
                                                        id={`when_purchase_vehicle`}
                                                        name="when_purchase_vehicle"
                                                        className="form-select"
                                                        value={formData.when_purchase_vehicle}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="" disabled selected>
                                                            When you have to purchase vehicle
                                                        </option>
                                                        <option value="Within 7 days">Within 7 days</option>
                                                        <option value="10-15 days">10-15 days</option>
                                                        <option value="15-30 days">15-30 days</option>
                                                        <option value="30-90 days">30-90 days</option>
                                                        <option value="Later">Later</option>
                                                    </select>
                                                    {
                                                        errors?.when_purchase_vehicle && <p className="fs-6 text-danger">{errors.when_purchase_vehicle}</p>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <h5>What is estimated cost of vehicle?</h5>
                                                <div className="mb-3">
                                                    <select
                                                        id={`vehicle_estimated_cost`}
                                                        name="vehicle_estimated_cost"
                                                        className="form-select"
                                                        value={formData.vehicle_estimated_cost}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="" disabled selected>
                                                            Estimated cost of Vehicle
                                                        </option>
                                                        <option value="5-10 lakhs">5-10 lakhs</option>
                                                        <option value="10–15 lakhs">10–15 lakhs</option>
                                                        <option value="15-20 lakhs">15-20 lakhs</option>
                                                        <option value="20-30 lakhs">20-30 lakhs</option>
                                                        <option value="30-50 lakhs">30-50 lakhs</option>
                                                        <option value="More than 50 lakhs">More than 50 lakhs</option>
                                                    </select>
                                                    {
                                                        errors?.vehicle_estimated_cost && <p className="fs-6 text-danger">{errors.vehicle_estimated_cost}</p>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <h5>How much loan you need?</h5>
                                                <div className="mb-3">
                                                    <select
                                                        id={`loan_you_need`}
                                                        name="loan_you_need"
                                                        className="form-select"
                                                        value={formData.loan_you_need}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="" disabled selected>
                                                            Loan you need
                                                        </option>
                                                        <option value="3-5 lakhs">3-5 lakhs</option>
                                                        <option value="6-10 lakhs">6-10 lakhs</option>
                                                        <option value="10-12 lakhs">10-12 lakhs</option>
                                                        <option value="12-20 lakhs">12-20 lakhs</option>
                                                        <option value="20-30 lakhs">20-30 lakhs</option>
                                                        <option value="30-50 lakhs">30-50 lakhs</option>
                                                        <option value="More than 50 lakhs">More than 50 lakhs</option>
                                                    </select>
                                                    {
                                                        errors?.loan_you_need && <p className="fs-6 text-danger">{errors.loan_you_need}</p>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <h5>Do you file ITR?</h5>
                                                <div className="mb-3">
                                                    <select
                                                        id={`vehicle_file_itr`}
                                                        name="vehicle_file_itr"
                                                        className="form-select"
                                                        value={formData.vehicle_file_itr}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="" disabled selected>
                                                            Do you file ITR?
                                                        </option>
                                                        <option value="yes">Yes</option>
                                                        <option value="no">NO</option>
                                                    </select>
                                                    {
                                                        errors?.vehicle_file_itr && <p className="fs-6 text-danger">{errors.vehicle_file_itr}</p>
                                                    }
                                                </div>
                                            </div>
                                        </>
                                    }
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
                                                value={formData.fname}
                                                onChange={handleInputChange}
                                                placeholder="First Name"
                                                className="form-control"
                                            />
                                            {
                                                errors?.fname && <p className="fs-6 text-danger">{errors.fname}</p>
                                            }
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
                                                value={formData.mname}
                                                onChange={handleInputChange}
                                                placeholder="Middle Name"
                                                className="form-control"
                                            />
                                            {/* {
                                                errors?.fname && <p className="fs-6 text-danger">{errors.fname}</p>
                                            } */}
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
                                                value={formData.lname}
                                                onChange={handleInputChange}
                                                placeholder="Last Name"
                                                className="form-control"
                                            />
                                            {
                                                errors?.lname && <p className="fs-6 text-danger">{errors.lname}</p>
                                            }
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
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="Email"
                                                className="form-control"
                                            />
                                            {
                                                errors?.email && <p className="fs-6 text-danger">{errors?.email}</p>
                                            }
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
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="Phone"
                                                className="form-control"
                                            />
                                            {
                                                errors?.phone && <p className="fs-6 text-danger">{errors.phone}</p>
                                            }
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
                                                value={formData.alternate_number}
                                                onChange={handleInputChange}
                                                placeholder="Alternate Phone"
                                                className="form-control"
                                            />
                                            {
                                                errors?.alternate_number && <p className="fs-6 text-danger">{errors?.alternate_number}</p>
                                            }
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
                                                value={formData.dob}
                                                onChange={handleInputChange}
                                                placeholder="Date of Birth"
                                                className="form-control"
                                            />
                                            {
                                                errors?.dob && <p className="fs-6 text-danger">{errors?.dob}</p>
                                            }
                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <select
                                                id={`gender`}
                                                name="gender"
                                                className="form-select"
                                                value={formData.gender}
                                                onChange={handleInputChange}
                                            >
                                                <option value="" disabled selected>
                                                    Gender
                                                </option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                            {
                                                errors?.gender && <p className="fs-6 text-danger">{errors.gender}</p>
                                            }
                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <select
                                                id={`marital_status`}
                                                name="marital_status"
                                                className="form-select"
                                                value={formData.marital_status}
                                                onChange={handleInputChange}
                                            >
                                                <option value="" disabled selected>
                                                    Marital Status
                                                </option>
                                                <option value="single">Single</option>
                                                <option value="married">Married</option>
                                            </select>
                                            {
                                                errors?.marital_status && <p className="fs-6 text-danger">{errors.marital_status}</p>
                                            }
                                        </div>
                                    </div>
                                    {
                                        formData.marital_status === "married" &&
                                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                            <div className="mb-3">
                                                <label className="sr-only form-label mb-0" htmlFor="spouse_name">
                                                    Spouse Name
                                                </label>
                                                <input
                                                    id="spouse_name"
                                                    name="spouse_name"
                                                    type="text"
                                                    value={formData.spouse_name}
                                                    onChange={handleInputChange}
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
                                                value={formData.father_name}
                                                onChange={handleInputChange}
                                                placeholder="Father Name"
                                                className="form-control"
                                            />
                                            {
                                                errors?.father_name && <p className="fs-6 text-danger">{errors.father_name}</p>
                                            }
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
                                                value={formData.mother_name}
                                                onChange={handleInputChange}
                                                placeholder="Mother's Name"
                                                className="form-control"
                                            />
                                            {
                                                errors?.mother_name && <p className="fs-6 text-danger">{errors.mother_name}</p>
                                            }
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
                                                value={formData.house_name}
                                                onChange={handleInputChange}
                                                placeholder="Building / House Name"
                                                className="form-control"
                                            />
                                            {
                                                errors?.house_name && <p className="fs-6 text-danger">{errors.house_name}</p>
                                            }
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
                                                value={formData.street_name}
                                                onChange={handleInputChange}
                                                placeholder="Street / Road name"
                                                className="form-control"
                                            />
                                            {
                                                errors?.street_name && <p className="fs-6 text-danger">{errors.street_name}</p>
                                            }
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
                                                value={formData.city_name}
                                                onChange={handleInputChange}
                                                placeholder="Town / City Name"
                                                className="form-control"
                                            />
                                            {
                                                errors?.city_name && <p className="fs-6 text-danger">{errors.city_name}</p>
                                            }
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
                                                value={formData.landmark}
                                                onChange={handleInputChange}
                                                placeholder="Nearest Landmark"
                                                className="form-control"
                                            />
                                            {
                                                errors?.landmark && <p className="fs-6 text-danger">{errors.landmark}</p>
                                            }
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
                                                value={formData.district}
                                                onChange={handleInputChange}
                                                placeholder="District"
                                                className="form-control"
                                            />
                                            {
                                                errors?.district && <p className="fs-6 text-danger">{errors.district}</p>
                                            }
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
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                placeholder="State"
                                                className="form-control"
                                            />
                                            {
                                                errors?.state && <p className="fs-6 text-danger">{errors.state}</p>
                                            }
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
                                                value={formData.pincode}
                                                onChange={handleInputChange}
                                                placeholder="PIN code"
                                                className="form-control"
                                            />
                                            {
                                                errors?.pincode && <p className="fs-6 text-danger">{errors.pincode}</p>
                                            }
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
                                                value={formData.present_house_name}
                                                onChange={handleInputChange}
                                                placeholder="Building / House Name"
                                                className="form-control"
                                            />
                                            {
                                                errors?.present_house_name && <p className="fs-6 text-danger">{errors.present_house_name}</p>
                                            }
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
                                                value={formData.present_street_name}
                                                onChange={handleInputChange}
                                                placeholder="Street / Road name"
                                                className="form-control"
                                            />
                                            {
                                                errors?.present_street_name && <p className="fs-6 text-danger">{errors.present_street_name}</p>
                                            }
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
                                                value={formData.present_city_name}
                                                onChange={handleInputChange}
                                                placeholder="Town / City Name"
                                                className="form-control"
                                            />
                                            {
                                                errors?.present_city_name && <p className="fs-6 text-danger">{errors.present_city_name}</p>
                                            }
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
                                                value={formData.present_landmark}
                                                onChange={handleInputChange}
                                                placeholder="Nearest Landmark"
                                                className="form-control"
                                            />
                                            {
                                                errors?.present_landmark && <p className="fs-6 text-danger">{errors.present_landmark}</p>
                                            }
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
                                                value={formData.present_district}
                                                onChange={handleInputChange}
                                                placeholder="District"
                                                className="form-control"
                                            />
                                            {
                                                errors?.present_district && <p className="fs-6 text-danger">{errors.present_district}</p>
                                            }
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
                                                value={formData.present_state}
                                                onChange={handleInputChange}
                                                placeholder="State"
                                                className="form-control"
                                            />
                                            {
                                                errors?.present_state && <p className="fs-6 text-danger">{errors.present_state}</p>
                                            }
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
                                                value={formData.present_pincode}
                                                onChange={handleInputChange}
                                                placeholder="PIN code"
                                                className="form-control"
                                            />
                                            {
                                                errors?.present_pincode && <p className="fs-6 text-danger">{errors.present_pincode}</p>
                                            }
                                        </div>
                                    </div>

                                    {/* ======================= Applicant Bank Detail Start ============================= */}

                                    {dividendArr.map((item, index) => (
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
                                                            disabled={textDisabld}
                                                            value={item.bank_name}
                                                            onChange={(e) =>
                                                                handleInputChange1(e, index)
                                                            }
                                                            // onChange={handleInputChange}
                                                            placeholder="Name of Bank"
                                                            className="form-control"
                                                            required
                                                        />
                                                        {
                                                            errors?.bank_name && <p className="fs-6 text-danger">{errors.bank_name}</p>
                                                        }
                                                    </div>
                                                </div>

                                                <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 col-12">
                                                    <div className="mb-3">
                                                        <select
                                                            id={`account_type ${index}`}
                                                            // id="account_type"
                                                            name="account_type"
                                                            className="form-select"
                                                            disabled={textDisabld}
                                                            value={item.account_type}
                                                            onChange={(e) =>
                                                                handleInputChange1(e, index)
                                                            }
                                                        >
                                                            <option value="" disabled selected>
                                                                Types of Account
                                                            </option>
                                                            <option value=" Current Account">
                                                                Current Account
                                                            </option>
                                                            <option value="Saving Account">
                                                                Saving Account
                                                            </option>
                                                            <option value="Salary Account">
                                                                Salary Account
                                                            </option>
                                                            <option value="Fixed Deposit Account">
                                                                Fixed Deposit Account
                                                            </option>
                                                            <option value="NRI Account">
                                                                NRI Account
                                                            </option>
                                                            <option value="DEMAT Account">
                                                                DEMAT Account
                                                            </option>
                                                        </select>
                                                        {
                                                            errors?.account_type && <p className="fs-6 text-danger">{errors.account_type}</p>
                                                        }
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    ))}

                                    {/* User Bank Detail End */}
                                    {

                                        <>
                                            {/* <h4>Are You </h4> */}
                                            <div className="d-flex w-100 ">
                                                <span className=" fs-4 font-weight-bold mt-1" style={{ fontWeight: 600 }}>
                                                    Are You :
                                                </span>
                                                <div className="mx-1 d-flex ">
                                                    <label htmlFor="salaried" className="fs-4 my-1">Salaried</label>
                                                    <input
                                                        type="radio"
                                                        id="salaried"
                                                        name="employment_type"
                                                        className="mx-1"
                                                        value="salaried"
                                                        checked={formData.employment_type === "salaried"}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="mx-1 d-flex ">
                                                    <label htmlFor="self_employed" className=" fs-4 my-1 w-100">Self_Employed</label>
                                                    <input
                                                        type="radio"
                                                        id="self_employed"
                                                        name="employment_type"
                                                        className="mx-1 "
                                                        value="self_employed"
                                                        checked={formData.employment_type === "self_employed"}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                {
                                                    errors?.employment_type && <p className="fs-6 text-danger">{errors?.employment_type}</p>
                                                }
                                            </div>
                                        </>

                                    }

                                    {
                                        formData.employment_type === "self_employed" &&
                                        <>
                                            <h3>Business Details Section </h3>

                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <select
                                                        id={`loan_purpose`}
                                                        disabled={textDisabld}
                                                        name="loan_purpose"
                                                        className="form-select"
                                                        value={formData.loan_purpose}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="" disabled selected>
                                                            Loan Purpose
                                                        </option>
                                                        <option value="to start new business">to start new business</option>
                                                        <option value="for growth of existing business">for growth of existing business</option>
                                                    </select>
                                                    {
                                                        errors?.loan_purpose && <p className="fs-6 text-danger">{errors?.loan_purpose}</p>
                                                    }
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
                                                        value={formData.company_name}
                                                        onChange={handleInputChange}
                                                        placeholder="Company / Firm Name"
                                                        className="form-control"
                                                    />
                                                    {
                                                        errors?.company_name && <p className="fs-6 text-danger">{errors?.company_name}</p>
                                                    }
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
                                                        value={formData.business_register_year}
                                                        onChange={handleInputChange}
                                                        placeholder=" Business registration year "
                                                        className="form-control"
                                                    />
                                                    {
                                                        errors?.business_register_year && <p className="fs-6 text-danger">{errors?.business_register_year}</p>
                                                    }
                                                </div>
                                            </div>

                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <select
                                                        id={`registration_documents`}
                                                        disabled={textDisabld}
                                                        name="registration_documents"
                                                        className="form-select"
                                                        value={formData.registration_documents}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="" disabled selected>
                                                            Select Registration documents
                                                        </option>
                                                        <option value="GST">GST</option>
                                                        <option value="FORM-3">FORM-3</option>
                                                        <option value="UDYAM certificate">UDYAM certificate</option>
                                                        <option value="other">other</option>
                                                    </select>
                                                    {
                                                        errors?.registration_documents && <p className="fs-6 text-danger">{errors?.registration_documents}</p>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <select
                                                        id={`business_turnover`}
                                                        disabled={textDisabld}
                                                        name="business_turnover"
                                                        className="form-select"
                                                        value={formData.business_turnover}
                                                        onChange={handleInputChange}
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
                                                    {
                                                        errors?.business_turnover && <p className="fs-6 text-danger">{errors?.business_turnover}</p>
                                                    }
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
                                                        checked={formData.file_itr === "yes"}
                                                        onChange={handleInputChange}
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
                                                        checked={formData.file_itr === "no"}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                {
                                                    errors?.file_itr && <p className="fs-6 text-danger">{errors?.file_itr}</p>
                                                }
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
                                                        checked={formData.property_mortgage === "yes"}
                                                        onChange={handleInputChange}
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
                                                        checked={formData.property_mortgage === "no"}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                {
                                                    errors?.property_mortgage && <p className="fs-6 text-danger">{errors?.property_mortgage}</p>
                                                }
                                            </div>
                                        </>
                                    }
                                    {
                                        formData.employment_type === "salaried" &&
                                        // }
                                        <>
                                            <h3>Job Details Section </h3>

                                            <div className="d-flex">
                                                <span className=" fs-4 font-weight-bold" style={{ fontWeight: 600 }}>
                                                    Do you get salary slip?
                                                </span>
                                                <div className="mx-2 d-flex">
                                                    <label htmlFor="salary_slip1" className="fs-4 my-1">YES</label>
                                                    <input
                                                        type="radio"
                                                        id="salary_slip1"
                                                        name="salary_slip"
                                                        className="mx-2"
                                                        value="yes"
                                                        checked={formData.salary_slip === "yes"}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="mx-2 d-flex ">
                                                    <label htmlFor="salary_slip2" className=" fs-4 my-1 ">NO</label>
                                                    <input
                                                        type="radio"
                                                        id="salary_slip2"
                                                        name="salary_slip"
                                                        className="mx-1 "
                                                        value="no"
                                                        checked={formData.salary_slip === "no"}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                {
                                                    errors?.salary_slip && <div className="text-danger fs-6">{errors.salary_slip}</div>
                                                }
                                            </div>
                                            <div className="d-flex">
                                                <span className=" fs-4 font-weight-bold" style={{ fontWeight: 600 }}>
                                                    Do you have form 16?
                                                </span>
                                                <div className="mx-2 d-flex">
                                                    <label htmlFor="form161" className="fs-4 my-1">YES</label>
                                                    <input
                                                        type="radio"
                                                        id="form161"
                                                        name="form16"
                                                        className="mx-2"
                                                        value="yes"
                                                        checked={formData.form16 === "yes"}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="mx-2 d-flex ">
                                                    <label htmlFor="form162" className=" fs-4 my-1 ">NO</label>
                                                    <input
                                                        type="radio"
                                                        id="form162"
                                                        name="form16"
                                                        className="mx-1 "
                                                        value="no"
                                                        checked={formData.form16 === "no"}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                {
                                                    errors?.form16 && <div className="text-danger fs-6">{errors.form16}</div>
                                                }
                                            </div>

                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <label className="sr-only form-label mb-0" htmlFor="job_experience">
                                                        Job Experience
                                                    </label>
                                                    <input
                                                        id="job_experience"
                                                        name="job_experience"
                                                        type="text"
                                                        value={formData.job_experience}
                                                        onChange={handleInputChange}
                                                        placeholder="Total job experience (in months)"
                                                        className="form-control"
                                                    />

                                                </div>
                                                {
                                                    errors?.job_experience && <div className="text-danger fs-6">{errors.job_experience}</div>
                                                }
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <label className="sr-only form-label mb-0" htmlFor="designation">
                                                        Your Designation
                                                    </label>
                                                    <input
                                                        id="designation"
                                                        name="designation"
                                                        type="text"
                                                        value={formData.designation}
                                                        onChange={handleInputChange}
                                                        placeholder="Your Designation"
                                                        className="form-control"
                                                    />

                                                </div>
                                                {
                                                    errors?.designation && <div className="text-danger fs-6">{errors.designation}</div>
                                                }
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <label className="sr-only form-label mb-0" htmlFor="current_salary">
                                                        Current Salary
                                                    </label>
                                                    <input
                                                        id="current_salary"
                                                        name="current_salary"
                                                        type="text"
                                                        value={formData.current_salary}
                                                        onChange={handleInputChange}
                                                        placeholder="Current Salary"
                                                        className="form-control"
                                                    />
                                                </div>
                                                {
                                                    errors?.current_salary && <div className="text-danger fs-6">{errors.current_salary}</div>
                                                }
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
                                                        value={formData.company_name}
                                                        onChange={handleInputChange}
                                                        placeholder="Company Name"
                                                        className="form-control"
                                                    />

                                                </div>
                                                {
                                                    errors?.company_name && <div className="text-danger fs-6">{errors.company_name}</div>
                                                }
                                            </div>

                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <label className="sr-only form-label mb-0" htmlFor="current_job_experience">
                                                        Job experience in current company? (in months)
                                                    </label>
                                                    <input
                                                        id="current_job_experience"
                                                        name="current_job_experience"
                                                        type="text"
                                                        value={formData.current_job_experience}
                                                        onChange={handleInputChange}
                                                        placeholder="Job experience in current company? (in months)"
                                                        className="form-control"
                                                    />
                                                </div>
                                                {
                                                    errors?.current_job_experience && <div className="text-danger fs-6">{errors.current_job_experience}</div>
                                                }
                                            </div>

                                            <h4>Office address : </h4>

                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <label className="sr-only form-label mb-0" htmlFor="office_building_name">
                                                        Building Name
                                                    </label>
                                                    <input
                                                        id="office_building_name"
                                                        name="office_building_name"
                                                        type="text"
                                                        value={formData.office_building_name}
                                                        onChange={handleInputChange}
                                                        placeholder="Building Name"
                                                        className="form-control"
                                                    />
                                                </div>
                                                {
                                                    errors?.office_building_name && <div className="text-danger fs-6">{errors.office_building_name}</div>
                                                }
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <label className="sr-only form-label mb-0" htmlFor="office_street_name">
                                                        Street/Road
                                                    </label>
                                                    <input
                                                        id="office_street_name"
                                                        name="office_street_name"
                                                        type="text"
                                                        value={formData.office_street_name}
                                                        onChange={handleInputChange}
                                                        placeholder="Street Name / No. "
                                                        className="form-control"
                                                    />
                                                </div>
                                                {
                                                    errors?.office_street_name && <div className="text-danger fs-6">{errors.office_street_name}</div>
                                                }
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <label className="sr-only form-label mb-0" htmlFor="office_city_name">
                                                        Town / City Name
                                                    </label>
                                                    <input
                                                        id="office_city_name"
                                                        name="office_city_name"
                                                        type="text"
                                                        value={formData.office_city_name}
                                                        onChange={handleInputChange}
                                                        placeholder="Town / City Name"
                                                        className="form-control"
                                                    />
                                                </div>
                                                {
                                                    errors?.office_city_name && <div className="text-danger fs-6">{errors.office_city_name}</div>
                                                }
                                            </div>

                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <label className="sr-only form-label mb-0" htmlFor="office_landmark">
                                                        Nearest Landmark
                                                    </label>
                                                    <input
                                                        id="office_landmark"
                                                        name="office_landmark"
                                                        type="text"
                                                        value={formData.office_landmark}
                                                        onChange={handleInputChange}
                                                        placeholder="Nearest Landmark"
                                                        className="form-control"
                                                    />
                                                </div>
                                                {
                                                    errors?.office_landmark && <div className="text-danger fs-6">{errors.office_landmark}</div>
                                                }
                                            </div>

                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <label className="sr-only form-label mb-0" htmlFor="office_district">
                                                        District
                                                    </label>
                                                    <input
                                                        id="office_district"
                                                        name="office_district"
                                                        type="text"
                                                        value={formData.office_district}
                                                        onChange={handleInputChange}
                                                        placeholder="District"
                                                        className="form-control"
                                                    />
                                                </div>
                                                {
                                                    errors?.office_district && <div className="text-danger fs-6">{errors.office_district}</div>
                                                }
                                            </div>

                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <label className="sr-only form-label mb-0" htmlFor="office_state">
                                                        State
                                                    </label>
                                                    <input
                                                        id="office_state"
                                                        name="office_state"
                                                        type="text"
                                                        value={formData.office_state}
                                                        onChange={handleInputChange}
                                                        placeholder="State"
                                                        className="form-control"
                                                    />
                                                </div>
                                                {
                                                    errors?.office_state && <div className="text-danger fs-6">{errors.office_state}</div>
                                                }
                                            </div>

                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <label className="sr-only form-label mb-0" htmlFor="office_pincode">
                                                        PIN code
                                                    </label>
                                                    <input
                                                        id="office_pincode"
                                                        name="office_pincode"
                                                        type="text"
                                                        value={formData.office_pincode}
                                                        onChange={handleInputChange}
                                                        placeholder="PIN code"
                                                        className="form-control"
                                                    />
                                                </div>
                                                {
                                                    errors?.office_pincode && <div className="text-danger fs-6">{errors.office_pincode}</div>
                                                }
                                            </div>
                                        </>
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
                                                    checked={formData.loan_check === "yes"}
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
                                                    checked={formData.loan_check === "no"}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    }
                                    {
                                        formData.loan_check === "yes" && (
                                            dividendArr1.map((item, index) => (
                                                <div className="" key={index}>
                                                    <h3>
                                                        {" "}
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
                                                                    disabled={textDisabld}
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
                                                                    disabled={textDisabld}
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
                                                                    disabled={textDisabld}
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
                                                                    disabled={textDisabld}
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
                                                value={formData.co_name}
                                                onChange={handleInputChange}
                                                placeholder="Name"
                                                className="form-control"
                                            />
                                            {
                                                errors?.co_name && <p className="fs-6 text-danger">{errors?.co_name}</p>
                                            }
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
                                                type="date"
                                                value={formData.co_date_of_birth}
                                                onChange={handleInputChange}
                                                placeholder="Date of Birth"
                                                className="form-control"
                                            />
                                            {
                                                errors?.co_date_of_birth && <p className="fs-6 text-danger">{errors?.co_date_of_birth}</p>
                                            }
                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <select
                                                id={`occupation`}
                                                disabled={textDisabld}
                                                name="occupation"
                                                className="form-select"
                                                value={formData.occupation}
                                                onChange={handleInputChange}
                                            >
                                                <option value="" disabled selected>
                                                    Occupation
                                                </option>
                                                <option value="salaried">Salaried</option>
                                                <option value="selfEmployed">Self-Employed</option>
                                                <option value="others">Others</option>
                                            </select>
                                            {
                                                errors?.occupation && <p className="fs-6 text-danger">{errors?.occupation}</p>
                                            }
                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <select
                                                id={`co_relation`}
                                                disabled={textDisabld}
                                                name="co_relation"
                                                className="form-select"
                                                value={formData.co_relation}
                                                onChange={handleInputChange}
                                            >
                                                <option value="" disabled selected>
                                                    Relation with applicant
                                                </option>
                                                <option value="Mother">Mother</option>
                                                <option value="Father">Father</option>
                                                <option value="Brother">Brother</option>
                                                <option value="Spouse">Spouse</option>
                                            </select>
                                            {
                                                errors?.co_relation && <p className="fs-6 text-danger">{errors?.co_relation}</p>
                                            }
                                        </div>
                                    </div>
                                    {/* Co Applicant Details End */}



                                    {/* <h3>Documents Upload </h3> */}
                                    {/* <h4>KYC Documents : </h4>
                                    <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <h6 className="text-center">
                                                Aadhaar Front Photo
                                            </h6>
                                            <label
                                                className="sr-only form-label mb-0"
                                                htmlFor="text"
                                            ></label>
                                            <input
                                                id="adhar_front"
                                                name="adhar_front"
                                                type="file"
                                                onChange={(e) =>
                                                    handleFileChange(e, "adhar_front")
                                                }
                                                // placeholder="bank_statement."
                                                className="form-control"
                                            />
                                            {formData2.adhar_front && (
                                                <p>
                                                    Selected File: {formData2.adhar_front.name}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <h6 className="text-center">
                                                Aadhaar Back Photo
                                            </h6>
                                            <label
                                                className="sr-only form-label mb-0"
                                                htmlFor="text"
                                            ></label>
                                            <input
                                                id="adhar_back"
                                                name="adhar_back"
                                                type="file"
                                                onChange={(e) =>
                                                    handleFileChange(e, "adhar_back")
                                                }
                                                // placeholder="bank_statement."
                                                className="form-control"
                                            />
                                            {formData2.adhar_back && (
                                                <p>
                                                    Selected File: {formData2.adhar_back.name}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <h6 className="text-center">
                                                Pan Card
                                            </h6>
                                            <label
                                                className="sr-only form-label mb-0"
                                                htmlFor="text"
                                            ></label>
                                            <input
                                                id="pancard"
                                                name="pancard"
                                                type="file"
                                                onChange={(e) =>
                                                    handleFileChange(e, "pancard")
                                                }
                                                // placeholder="bank_statement."
                                                className="form-control"
                                            />
                                            {errors?.pancard && (
                                                <div className="text-danger">
                                                    {errors?.pancard}
                                                </div>
                                            )}
                                            {formData2.pancard && (
                                                <p>
                                                    Selected File: {formData2.pancard.name}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <h6 className="text-center">
                                                Applicant Selfie
                                            </h6>
                                            <label
                                                className="sr-only form-label mb-0"
                                                htmlFor="text"
                                            ></label>
                                            <input
                                                id="applicant_photo"
                                                name="applicant_photo"
                                                type="file"
                                                onChange={(e) =>
                                                    handleFileChange(e, "applicant_photo")
                                                }
                                                className="form-control"
                                            />
                                            {errors?.applicant_photo && (
                                                <div className="text-danger">
                                                    {errors?.applicant_photo}
                                                </div>
                                            )}
                                            {formData2.applicant_photo && (
                                                <p>
                                                    Selected File: {formData2.applicant_photo.name}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <h6 className="text-center">
                                                Present Address Proof ( Electricity Bill )
                                            </h6>
                                            <label
                                                className="sr-only form-label mb-0"
                                                htmlFor="text"
                                            ></label>
                                            <input
                                                id="address_proof"
                                                name="address_proof"
                                                type="file"
                                                onChange={(e) =>
                                                    handleFileChange(e, "address_proof")
                                                }
                                                // placeholder="bank_statement."
                                                className="form-control"
                                            />
                                            {errors?.address_proof && (
                                                <div className="text-danger">
                                                    {errors.address_proof}
                                                </div>
                                            )}
                                            {formData2?.address_proof && (
                                                <p>
                                                    Selected File: {formData2?.address_proof.name}
                                                </p>
                                            )}
                                        </div>
                                    </div> */}
                                    {/* {
                                        formData?.employment_type === 'self_employed' &&
                                        <>
                                            <h4>Business Documents : </h4>

                                            <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <h6 className="text-center">
                                                        House Electricity bill
                                                    </h6>
                                                    <label
                                                        className="sr-only form-label mb-0"
                                                        htmlFor="business_electricity_bill"
                                                    ></label>

                                                    <input
                                                        id="business_electricity_bill"
                                                        name="business_electricity_bill"
                                                        type="file"
                                                        onChange={(e) =>
                                                            handleFileChange(e, "business_electricity_bill")
                                                        }
                                                        className="form-control"
                                                    />
                                                    {errors?.business_electricity_bill && (
                                                        <div className="text-danger">
                                                            {errors.business_electricity_bill}
                                                        </div>
                                                    )}
                                                    {formData2?.business_electricity_bill && (
                                                        <p>
                                                            Selected File:{" "}
                                                            {formData2.business_electricity_bill.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <h6 className="text-center">
                                                        Shop Front Picture
                                                    </h6>
                                                    <label
                                                        className="sr-only form-label mb-0"
                                                        htmlFor="shop_pic"
                                                    ></label>

                                                    <input
                                                        id="shop_pic"
                                                        name="shop_pic"
                                                        type="file"
                                                        onChange={(e) =>
                                                            handleFileChange(e, "shop_pic")
                                                        }
                                                        className="form-control"
                                                    />
                                                    {errors?.shop_pic && (
                                                        <div className="text-danger">
                                                            {errors.shop_pic}
                                                        </div>
                                                    )}
                                                    {formData2?.shop_pic && (
                                                        <p>
                                                            Selected File:{" "}
                                                            {formData2.shop_pic.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <h6 className="text-center">
                                                        Shop inside pic
                                                    </h6>
                                                    <label
                                                        className="sr-only form-label mb-0"
                                                        htmlFor="text"
                                                    ></label>

                                                    <input
                                                        id="shop_inside_pic"
                                                        name="shop_inside_pic"
                                                        type="file"
                                                        onChange={(e) =>
                                                            handleFileChange(e, "shop_inside_pic")
                                                        }
                                                        className="form-control"
                                                    />
                                                    {errors?.shop_inside_pic && (
                                                        <div className="text-danger">
                                                            {errors.shop_inside_pic}
                                                        </div>
                                                    )}
                                                    {formData2?.shop_inside_pic && (
                                                        <p>
                                                            Selected File:{" "}
                                                            {formData2.shop_inside_pic.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <h6 className="text-center">
                                                        Business Registration Proof
                                                    </h6>
                                                    <label
                                                        className="sr-only form-label mb-0"
                                                        htmlFor="text"
                                                    ></label>
                                                    <input
                                                        id="business_registration"
                                                        name="business_registration"
                                                        type="file"
                                                        onChange={(e) => handleFileChange(e, "business_registration")}
                                                        // placeholder="itr."
                                                        className="form-control"
                                                    />

                                                    {formData2?.business_registration && (
                                                        <p>Selected File: {formData2.business_registration.name}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <h6 className="text-center">
                                                        ITR-1
                                                    </h6>
                                                    <label
                                                        className="sr-only form-label mb-0"
                                                        htmlFor="text"
                                                    ></label>
                                                    <input
                                                        id="itr1"
                                                        name="itr1"
                                                        type="file"
                                                        onChange={(e) =>
                                                            handleFileChange(e, "itr1")
                                                        }
                                                        // placeholder="bank_statement."
                                                        className="form-control"
                                                    />

                                                    {formData2.itr1 && (
                                                        <p>
                                                            Selected File: {formData2.itr1.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <h6 className="text-center">
                                                        ITR-2
                                                    </h6>
                                                    <label
                                                        className="sr-only form-label mb-0"
                                                        htmlFor="text"
                                                    ></label>
                                                    <input
                                                        id="itr2"
                                                        name="itr2"
                                                        type="file"
                                                        onChange={(e) =>
                                                            handleFileChange(e, "itr2")
                                                        }
                                                        // placeholder="bank_statement."
                                                        className="form-control"
                                                    />

                                                    {formData2?.itr2 && (
                                                        <p>
                                                            Selected File: {formData2.itr2.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <h6 className="text-center">
                                                        Other-1
                                                    </h6>
                                                    <label
                                                        className="sr-only form-label mb-0"
                                                        htmlFor="text"
                                                    ></label>
                                                    <input
                                                        id="other1"
                                                        name="other1"
                                                        type="file"
                                                        multiple
                                                        onChange={(e) =>
                                                            handleFileChange(e, "other1")
                                                        }
                                                        // placeholder="bank_statement."
                                                        className="form-control"
                                                    />

                                                    {formData2?.other1 && (
                                                        <p>
                                                            Selected File: {formData2.other1.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <h6 className="text-center">
                                                        Other-2
                                                    </h6>
                                                    <label
                                                        className="sr-only form-label mb-0"
                                                        htmlFor="text"
                                                    ></label>
                                                    <input
                                                        id="other2"
                                                        name="other2"
                                                        type="file"
                                                        multiple
                                                        onChange={(e) =>
                                                            handleFileChange(e, "other2")
                                                        }
                                                        // placeholder="bank_statement."
                                                        className="form-control"
                                                    />

                                                    {formData2?.other2 && (
                                                        <p>
                                                            Selected File: {formData2.other2.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <h6 className="text-center">
                                                        Other-3
                                                    </h6>
                                                    <label
                                                        className="sr-only form-label mb-0"
                                                        htmlFor="text"
                                                    ></label>
                                                    <input
                                                        id="other3"
                                                        name="other3"
                                                        type="file"
                                                        multiple
                                                        onChange={(e) =>
                                                            handleFileChange(e, "other3")
                                                        }
                                                        // placeholder="bank_statement."
                                                        className="form-control"
                                                    />

                                                    {formData2?.other3 && (
                                                        <p>
                                                            Selected File: {formData2.other3.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    } */}
                                    {/* {
                                        formData?.employment_type === 'salaried' &&
                                        <>
                                            <h4>Job's Documents : </h4>

                                            <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <h6 className="text-center">
                                                        Salary Slip-1
                                                    </h6>
                                                    <label
                                                        className="sr-only form-label mb-0"
                                                        htmlFor="text"
                                                    ></label>

                                                    <input
                                                        id="first_month_salary"
                                                        name="first_month_salary"
                                                        type="file"
                                                        onChange={(e) =>
                                                            handleFileChange(e, "first_month_salary")
                                                        }
                                                        className="form-control"
                                                    />
                                                    {errors?.first_month_salary && (
                                                        <div className="text-danger fs-6">
                                                            {errors.first_month_salary}
                                                        </div>
                                                    )}
                                                    {formData2?.first_month_salary && (
                                                        <p>
                                                            Selected File:{" "}
                                                            {formData2.first_month_salary.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <h6 className="text-center">
                                                        Salary Slip-2
                                                    </h6>
                                                    <label
                                                        className="sr-only form-label mb-0"
                                                        htmlFor="text"
                                                    ></label>

                                                    <input
                                                        id="second_month_salary"
                                                        name="second_month_salary"
                                                        type="file"
                                                        onChange={(e) =>
                                                            handleFileChange(e, "second_month_salary")
                                                        }
                                                        className="form-control"
                                                    />
                                                    {errors?.second_month_salary && (
                                                        <div className="text-danger fs-6">
                                                            {errors.second_month_salary}
                                                        </div>
                                                    )}
                                                    {formData2?.second_month_salary && (
                                                        <p>
                                                            Selected File:{" "}
                                                            {formData2.second_month_salary.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <h6 className="text-center">
                                                        Salary Slip-3
                                                    </h6>
                                                    <label
                                                        className="sr-only form-label mb-0"
                                                        htmlFor="text"
                                                    ></label>

                                                    <input
                                                        id="third_month_salary"
                                                        name="third_month_salary"
                                                        type="file"
                                                        onChange={(e) =>
                                                            handleFileChange(e, "third_month_salary")
                                                        }
                                                        className="form-control"
                                                    />
                                                    {errors?.third_month_salary && (
                                                        <div className="text-danger fs-6">
                                                            {errors.third_month_salary}
                                                        </div>
                                                    )}
                                                    {formData2?.third_month_salary && (
                                                        <p>
                                                            Selected File:{" "}
                                                            {formData2.third_month_salary.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <h6 className="text-center">
                                                        Form 16 / ITR-1
                                                    </h6>
                                                    <label
                                                        className="sr-only form-label mb-0"
                                                        htmlFor="text"
                                                    ></label>
                                                    <input
                                                        id="itr1"
                                                        name="itr1"
                                                        type="file"
                                                        onChange={(e) => handleFileChange(e, "itr1")}
                                                        // placeholder="itr."
                                                        className="form-control"
                                                    />
                                                    {
                                                        errors?.itr1 && (
                                                            <div className="text-danger fs-6">
                                                                {errors.itr1}
                                                            </div>
                                                        )
                                                    }

                                                    {formData2?.itr1 && (
                                                        <p>Selected File: {formData2.itr1.name}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <h6 className="text-center">
                                                        Form 16 / ITR-2
                                                    </h6>
                                                    <label
                                                        className="sr-only form-label mb-0"
                                                        htmlFor="text"
                                                    ></label>
                                                    <input
                                                        id="itr2"
                                                        name="itr2"
                                                        type="file"
                                                        onChange={(e) =>
                                                            handleFileChange(e, "itr2")
                                                        }
                                                        // placeholder="bank_statement."
                                                        className="form-control"
                                                    />
                                                    {
                                                        errors?.itr2 && (
                                                            <div className="text-danger fs-6">
                                                                {errors?.itr2}
                                                            </div>
                                                        )

                                                    }

                                                    {formData2?.itr2 && (
                                                        <p>
                                                            Selected File: {formData2.itr2.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <h6 className="text-center">
                                                        Other-1
                                                    </h6>
                                                    <label
                                                        className="sr-only form-label mb-0"
                                                        htmlFor="text"
                                                    ></label>
                                                    <input
                                                        id="other1"
                                                        name="other1"
                                                        type="file"
                                                        onChange={(e) =>
                                                            handleFileChange(e, "other1")
                                                        }
                                                        // placeholder="bank_statement."
                                                        className="form-control"
                                                    />

                                                    {formData2?.others && (
                                                        <p>
                                                            Selected File: {formData2.other1.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <h6 className="text-center">
                                                        Other-2
                                                    </h6>
                                                    <label
                                                        className="sr-only form-label mb-0"
                                                        htmlFor="other2"
                                                    ></label>
                                                    <input
                                                        id="other2"
                                                        name="other2"
                                                        type="file"
                                                        onChange={(e) =>
                                                            handleFileChange(e, "other2")
                                                        }
                                                        // placeholder="bank_statement."
                                                        className="form-control"
                                                    />

                                                    {formData2?.others && (
                                                        <p>
                                                            Selected File: {formData2.other2.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <h6 className="text-center">
                                                        Other-3
                                                    </h6>
                                                    <label
                                                        className="sr-only form-label mb-0"
                                                        htmlFor="other3"
                                                    ></label>
                                                    <input
                                                        id="other3"
                                                        name="other3"
                                                        type="file"
                                                        onChange={(e) =>
                                                            handleFileChange(e, "other3")
                                                        }
                                                        // placeholder="bank_statement."
                                                        className="form-control"
                                                    />

                                                    {formData2?.others && (
                                                        <p>
                                                            Selected File: {formData2.other3.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    } */}


                                    {/* <h4>Co-Applicant KYC Documents :</h4>
                                    <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <h6 className="text-center">
                                                Aadhaar Front Photo
                                            </h6>
                                            <label
                                                className="sr-only form-label mb-0"
                                                htmlFor="text"
                                            ></label>
                                            <input
                                                id="co_adhar_front"
                                                name="co_adhar_front"
                                                type="file"
                                                onChange={(e) =>
                                                    handleFileChange(e, "co_adhar_front")
                                                }
                                                // placeholder="bank_statement."
                                                className="form-control"
                                            />
                                            {
                                                errors?.co_adhar_front && <p className="text-danger fs-6">{errors?.co_adhar_front}</p>
                                            }
                                            {formData2?.co_adhar_front && (
                                                <p>
                                                    Selected File: {formData2.co_adhar_front.name}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <h6 className="text-center">
                                                Aadhaar Back Photo
                                            </h6>
                                            <label
                                                className="sr-only form-label mb-0"
                                                htmlFor="text"
                                            ></label>
                                            <input
                                                id="co_adhar_back"
                                                name="co_adhar_back"
                                                type="file"
                                                onChange={(e) =>
                                                    handleFileChange(e, "co_adhar_back")
                                                }
                                                // placeholder="bank_statement."
                                                className="form-control"
                                            />
                                            {
                                                errors?.co_adhar_back && <p className="text-danger fs-6">{errors?.co_adhar_back}</p>
                                            }
                                            {formData2?.co_adhar_back && (
                                                <p>
                                                    Selected File: {formData2.co_adhar_back.name}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <h6 className="text-center">
                                                Pan Card
                                            </h6>
                                            <label
                                                className="sr-only form-label mb-0"
                                                htmlFor="text"
                                            ></label>
                                            <input
                                                id="co_pancard"
                                                name="co_pancard"
                                                type="file"
                                                onChange={(e) =>
                                                    handleFileChange(e, "co_pancard")
                                                }
                                                // placeholder="bank_statement."
                                                className="form-control"
                                            />

                                            {errors?.co_pancard && (
                                                <div className="text-danger fs-6">
                                                    {errors.co_pancard}
                                                </div>
                                            )}
                                            {formData2?.co_pancard && (
                                                <p>
                                                    Selected File: {formData2.co_pancard.name}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                        <div className="mb-3">
                                            <h6 className="text-center">
                                                Application Selfie
                                            </h6>
                                            <label
                                                className="sr-only form-label mb-0"
                                                htmlFor="text"
                                            ></label>
                                            <input
                                                id="co_applicant_photo"
                                                name="co_applicant_photo"
                                                type="file"
                                                onChange={(e) =>
                                                    handleFileChange(e, "co_applicant_photo")
                                                }
                                                // placeholder="bank_statement."
                                                className="form-control"
                                            />
                                            {errors?.co_applicant_photo && (
                                                <div className="text-danger fs-6">
                                                    {errors.co_applicant_photo}
                                                </div>
                                            )}
                                            {formData2?.co_applicant_photo && (
                                                <p>
                                                    Selected File: {formData2.co_applicant_photo.name}
                                                </p>
                                            )}
                                        </div>
                                    </div> */}

                                    {/* Button */}

                                    <div className=" col-lg-12 col-md-12 col-sm-12 col-12">
                                        <button
                                            onClick={handleClick}
                                            type="submit"
                                            disabled={progress ? true : false}
                                            className="btn btn-primary mb-4"
                                        >
                                            {progress ? `uploading files` : "Submit"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default VehicleLoanForm;
