// import React from 'react';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom"
import * as yup from 'yup';
import { backendUrl } from "../../env";
import { BusinessLoanValidation } from "./FormValidation";

const BusinessLoanForm = ({ getID }) => {
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
            loan_bank_name: '',
            Total_loan_amount: '',
            emi: '',
            pending: '',
        },
    ]);

    // const [dividendArr2, setDividendArr2] = useState([
    //     {
    //         co_bank_name: "",
    //         co_account_type: "",
    //         co_branch_name: "",
    //     },
    // ]);

    // const [dividendArr3, setDividendArr3] = useState([
    //     {
    //         co_loan_type: "",
    //         co_bank_nbfc: "",
    //         co_emi: "",
    //         co_pandding: "",
    //     },
    // ]);

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
    // const handleAdd2 = () => {
    //     setDividendArr2([
    //         ...dividendArr2,
    //         {
    //             co_bank_name: "",
    //             co_account_type: "",
    //             co_branch_name: "",
    //         },
    //     ]);
    // };
    // const handleAdd3 = () => {
    //     setDividendArr3([
    //         ...dividendArr3,
    //         {
    //             co_loan_type: "",
    //             co_bank_nbfc: "",
    //             co_emi: "",
    //             co_pandding: "",
    //         },
    //     ]);
    // };

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

    // const handleInputChange3 = (e, index) => {
    //     const { name, value } = e.target;
    //     console.log("value", e.target.value);
    //     const list = [...dividendArr2];
    //     list[index][name] = value;
    //     setDividendArr2(list);
    // };

    // const handleInputChange4 = (e, index) => {
    //     const { name, value } = e.target;
    //     console.log("value", e.target.value);
    //     const list = [...dividendArr3];
    //     list[index][name] = value;
    //     setDividendArr3(list);
    // };

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

    const [progress,setProgress]=useState();
    const [formData, setFormData] = useState({
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
        //property details
        property_mortgage: "",
        property_location: "",
        property_owner: "",
        property_documents: "",
    });

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

    });

    const [errors, setErrors] = useState();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: null });
        // Clear errors for the changed field
        //  console.log(formData);
    };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];

        // Ensure the selected file is a PDF file
        // if (file && file.type === "application/pdf") {
        // if (file && (file.type === "application/pdf" || file.type === "image/png" || file.type === "image/jpeg")) {
            // Update the specific field in formData
            setFormData2({
                ...formData2,
                [fieldName]: file,
            });
        // } else {
            // Handle the case where the selected file is not a PDF, PNG, or JPG
            // alert("Please select a PDF, PNG, or JPG file.");
            // e.target.value = null; // Clear the input field
        // }
    };


    const handleClick = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            await BusinessLoanValidation.validate(formData,{abortEarly:false});
            const userId = localStorage.getItem("userID");
            const object = {
                dividendArr,
                dividendArr1,
                // dividendArr2,
                // dividendArr3,
                formData,
                connector_id: userId,
            };
            console.log(object);
    
            // Validate the form
            // if (!validateForm()) {
            //   // If form validation fails, do not submit
            //   return;
            // }
    
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
                    // url: "http://15.207.195.184:8000/api/v1/personalLoanForm",
                    url: `${backendUrl}/businessLoanForm`,
                    method: "POST",
                    headers: headersList,
                    data: bodyContent,
                    onUploadProgress: function (progressEvent) {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        console.log(`Upload Progress: ${percentCompleted}%`);
                    }
                };
    
                let response = await axios.request(reqOptions);
                console.log(response.data);
                // alert("form uploaded");
    
                if (response) {
                    // Handle success
                    // console.log(response.data.id);
                    const response2 = await axios.post(
                        // `http://15.207.195.184:8000/api/v1/personalformUploadfiles/${response.data.id}`,
                        `${backendUrl}/businessformUploadfiles/${response.data.id}`,
                        newformData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                            onUploadProgress: ({ loaded, total }) => {
                                console.log(`current:${loaded}total:${total}`);
                                setProgress(Math.round((loaded * 100) / total));
                                // setProgress(``)
                            }
                        },
    
                    );
    
                    if (response2) {
                        alert(response2.data.message);
                        // getID(response2.data.id);
                        navigate("/");
                    } else {
                        console.error("Error sending data to the backend");
                    }
                } else {
                    // Handle error
                    console.error("Error sending data to the backend");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        } catch (error) {
            // if(error instanceof )
            if (error instanceof yup.ValidationError) {
                const newError = {};
                error.inner.forEach((err) => {
                    newError[err.path] = err.message;
                });
                setErrors(newError);
            }
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
                                <h1 className="mb-0">Business Loan Application Form </h1>
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
                                                disabled={textDisabld}
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
                                                disabled={textDisabld}
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
                                                        {
                                                errors?.account_type && <p className="fs-6 text-danger">{errors.account_type}</p>
                                            }
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

                                    {
                                        formData.property_mortgage === "yes" &&
                                        <div className="row">
                                            <h3>Property Details : </h3>

                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <h5>Property is located in which area?</h5>
                                                <div className="mb-3">
                                                    <select
                                                        id={`property_location`}
                                                        disabled={textDisabld}
                                                        name="property_location"
                                                        className="form-select"
                                                        value={formData.property_location}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="" disabled selected>
                                                            Select Property Location
                                                        </option>
                                                        <option value="Gram panchayat">Gram panchayat</option>
                                                        <option value="Nagar panchayat">Nagar panchayat</option>
                                                        <option value="Nagar parishad">Nagar parishad</option>
                                                        <option value="Municipal corporation">Municipal corporation</option>
                                                    </select>
                                                    {
                                                errors?.property_location && <p className="fs-6 text-danger">{errors?.property_location}</p>
                                            }
                                                </div>
                                            </div>
                                            {/* <h5>Property is located in which area?</h5> */}
                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <h5>Who is the owner of property?</h5>
                                                <div className="mb-3">
                                                    <select
                                                        id={`property_owner`}
                                                        disabled={textDisabld}
                                                        name="property_owner"
                                                        className="form-select"
                                                        value={formData.property_owner}
                                                        onChange={handleInputChange}
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
                                                    {
                                                errors?.property_owner && <p className="fs-6 text-danger">{errors?.property_owner}</p>
                                            }
                                                </div>
                                            </div>
                                            {/* <h5>Property is located in which area?</h5> */}
                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <h5>Select the property documents you have </h5>
                                                <div className="mb-3">
                                                    <select
                                                        id={`property_documents`}
                                                        disabled={textDisabld}
                                                        name="property_documents"
                                                        className="form-select"
                                                        value={formData.property_documents}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="" disabled selected>
                                                            Select Property Documents
                                                        </option>
                                                        <option value="Khatiyan/sale deed (kewala)">Khatiyan / sale deed (kewala) </option>
                                                        <option value="Current rashid">Current rashid</option>
                                                        <option value="LPC">LPC </option>
                                                        <option value="13 years Chain deed">13 years Chain deed</option>
                                                    </select>
                                                    {
                                                errors?.property_documents && <p className="fs-6 text-danger">{errors?.property_documents}</p>
                                            }
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
                                                type="text"
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
                                                <option value="familymember">Mother</option>
                                                <option value="friend">Father</option>
                                                <option value="realtive">Brother</option>
                                                <option value="realtive">Spouse</option>
                                            </select>
                                            {
                                                errors?.co_relation && <p className="fs-6 text-danger">{errors?.co_relation}</p>
                                            }
                                        </div>
                                    </div>
                                    {/* Co Applicant Details End */}



                                    <h3>Documents Upload </h3>
                                    <h4>KYC Documents : </h4>
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
                                                // placeholder="bank_statement."
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
                                    </div>

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

                                    <h4>Co-Applicant KYC Documents :</h4>
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
                                    </div>

                                    {
                                        formData?.property_mortgage === "yes" &&
                                        <div className="row">
                                            <h4>Property Documents : </h4>
                                            <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <h6 className="text-center">
                                                        SALE DEED/KHATIYAN
                                                    </h6>
                                                    <label
                                                        className="sr-only form-label mb-0"
                                                        htmlFor="text"
                                                    ></label>
                                                    <input
                                                        id="khatiyan"
                                                        name="khatiyan"
                                                        type="file"
                                                        onChange={(e) =>
                                                            handleFileChange(e, "khatiyan")
                                                        }
                                                        // placeholder="bank_statement."
                                                        className="form-control"
                                                    />
                                                    {errors?.khatiyan && (
                                                        <div className="text-danger fs-6">
                                                            {errors.khatiyan}
                                                        </div>
                                                    )}
                                                    {formData2?.khatiyan && (
                                                        <p>
                                                            Selected File: {formData2.khatiyan.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <h6 className="text-center">
                                                        DAKHIL-KHARIJ/MUTATION
                                                    </h6>
                                                    <label
                                                        className="sr-only form-label mb-0"
                                                        htmlFor="text"
                                                    ></label>
                                                    <input
                                                        id="mutation"
                                                        name="mutation"
                                                        type="file"
                                                        onChange={(e) =>
                                                            handleFileChange(e, "mutation")
                                                        }
                                                        // placeholder="bank_statement."
                                                        className="form-control"
                                                    />
                                                    {errors?.mutation && (
                                                        <div className="text-danger fs-6">
                                                            {errors?.mutation}
                                                        </div>
                                                    )}
                                                    {formData2?.mutation && (
                                                        <p>
                                                            Selected File: {formData2.mutation.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <h6 className="text-center">
                                                        CURRENT RASHID
                                                    </h6>
                                                    <label
                                                        className="sr-only form-label mb-0"
                                                        htmlFor="text"
                                                    ></label>
                                                    <input
                                                        id="rashid"
                                                        name="rashid"
                                                        type="file"
                                                        onChange={(e) =>
                                                            handleFileChange(e, "rashid")
                                                        }
                                                        // placeholder="bank_statement."
                                                        className="form-control"
                                                    />
                                                    {errors?.rashid && (
                                                        <div className="text-danger fs-6">
                                                            {errors.rashid}
                                                        </div>
                                                    )}
                                                    {formData2?.rashid && (
                                                        <p>
                                                            Selected File: {formData2.rashid.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <h6 className="text-center">
                                                        LPC
                                                    </h6>
                                                    <label
                                                        className="sr-only form-label mb-0"
                                                        htmlFor="text"
                                                    ></label>
                                                    <input
                                                        id="lpc"
                                                        name="lpc"
                                                        type="file"
                                                        onChange={(e) =>
                                                            handleFileChange(e, "lpc")
                                                        }
                                                        // placeholder="bank_statement."
                                                        className="form-control"
                                                    />
                                                    {errors?.lpc && (
                                                        <div className="text-danger fs-6">
                                                            {errors.lpc}
                                                        </div>
                                                    )}
                                                    {formData2?.lpc && (
                                                        <p>
                                                            Selected File: {formData2.lpc.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <h6 className="text-center">
                                                        PROPERTY FRONT PICTURE
                                                    </h6>
                                                    <label
                                                        className="sr-only form-label mb-0"
                                                        htmlFor="text"
                                                    ></label>
                                                    <input
                                                        id="property_front_pic"
                                                        name="property_front_pic"
                                                        type="file"
                                                        onChange={(e) =>
                                                            handleFileChange(e, "property_front_pic")
                                                        }
                                                        // placeholder="bank_statement."
                                                        className="form-control"
                                                    />
                                                    {errors?.property_front_pic && (
                                                        <div className="text-danger fs-6">
                                                            {errors.property_front_pic}
                                                        </div>
                                                    )}
                                                    {formData2?.property_front_pic && (
                                                        <p>
                                                            Selected File: {formData2.property_front_pic.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <h6 className="text-center">
                                                        PROPERTY MAP/NAKSHA
                                                    </h6>
                                                    <label
                                                        className="sr-only form-label mb-0"
                                                        htmlFor="text"
                                                    ></label>
                                                    <input
                                                        id="property_map"
                                                        name="property_map"
                                                        type="file"
                                                        onChange={(e) =>
                                                            handleFileChange(e, "property_map")
                                                        }
                                                        // placeholder="bank_statement."
                                                        className="form-control"
                                                    />
                                                    {errors?.property_map && (
                                                        <div className="text-danger fs-6">
                                                            {errors.property_map}
                                                        </div>
                                                    )}
                                                    {formData2?.property_map && (
                                                        <p>
                                                            Selected File: {formData2.property_map.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <h6 className="text-center">
                                                        PROPERTY 30 SEC VIDEO
                                                    </h6>
                                                    <label
                                                        className="sr-only form-label mb-0"
                                                        htmlFor="text"
                                                    ></label>
                                                    <input
                                                        id="property_video"
                                                        name="property_video"
                                                        type="file"
                                                        onChange={(e) =>
                                                            handleFileChange(e, "property_video")
                                                        }
                                                        // placeholder="bank_statement."
                                                        className="form-control"
                                                    />
                                                    {errors?.property_video && (
                                                        <div className="text-danger fs-6">
                                                            {errors.property_video}
                                                        </div>
                                                    )}
                                                    {formData2?.property_video && (
                                                        <p>
                                                            Selected File: {formData2.property_video.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                                                <div className="mb-3">
                                                    <h6 className="text-center">
                                                        CHAIN DEED
                                                    </h6>
                                                    <label
                                                        className="sr-only form-label mb-0"
                                                        htmlFor="text"
                                                    ></label>
                                                    <input
                                                        id="chain_deed"
                                                        name="chain_deed"
                                                        type="file"
                                                        onChange={(e) =>
                                                            handleFileChange(e, "chain_deed")
                                                        }
                                                        // placeholder="bank_statement."
                                                        className="form-control"
                                                    />
                                                    {errors?.chain_deed && (
                                                        <div className="text-danger fs-6">
                                                            {errors.chain_deed}
                                                        </div>
                                                    )}
                                                    {formData2?.chain_deed && (
                                                        <p>
                                                            Selected File: {formData2.chain_deed.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                    }



                                    {/* Button */}

                                    <div className=" col-lg-12 col-md-12 col-sm-12 col-12">
                                        <button
                                            onClick={handleClick}
                                            type="submit"
                                            disabled={progress?true:false}
                                            className="btn btn-primary mb-4"
                                        >
                                            {progress?`uploading files` : "Submit"}
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

export default BusinessLoanForm;
