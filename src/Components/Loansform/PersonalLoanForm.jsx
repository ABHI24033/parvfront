// import React from 'react';
import React, { useState, useEffect } from "react";
// import ".././About.css";
import axios from "axios";
import * as yup from 'yup';
import { useLocation, useNavigate } from "react-router-dom"
// import { backendUrl } from "../../../env";
import { backendUrl } from "../../env";
import { PersoanlLoanValidation } from "./FormValidation";

const PersonalLoanForm = ({ getID }) => {
    let newformData = new FormData();
    const location = useLocation();
    const navigate = useNavigate();
    const [paramvalue, setParamvalue] = useState(null);


    useEffect(() => {
        if (location.state) {
            setParamvalue(location.state.param);
        }

        // Now paramValue contains the value passed through state
    }, [location.state, paramvalue]);
    // const [selectedLanguage, setSelectedLanguage] = useState("");

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
    const [errors, setErrors] = useState({});
    const [progress, setProgress] = useState(0);


    // console.log(formData);

    const [formData2, setFormData2] = useState({
        adhar_front: null,
        adhar_back: null,
        pancard: null,
        applicant_photo: null,
        address_proof: null,

        first_month_salary: null,
        second_month_salary: null,
        third_month_salary: null,
        itr1: null,
        itr2: null,
        // others: null,
        other1: null,
        other2: null,
        other3: null,

        co_adhar_front: null,
        co_adhar_back: null,
        co_pancard: null,
        co_applicant_photo: null,
    });


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
        if (file && (file.type === "application/pdf" || file.type === "image/png" || file.type === "image/jpeg")) {
            // Update the specific field in formData
            setFormData2({
                ...formData2,
                [fieldName]: file,
            });
        } else {
            // Handle the case where the selected file is not a PDF, PNG, or JPG
            alert("Please select a PDF, PNG, or JPG file.");
            e.target.value = null; // Clear the input field
        }
    };


    const handleClick = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            await PersoanlLoanValidation.validate(formData, { abortEarly: false });
            // console.log("form is Valid");

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
                    url: `${backendUrl}/personalLoanForm`,
                    method: "POST",
                    headers: headersList,
                    data: bodyContent,
                };

                let response = await axios.request(reqOptions);
                console.log(response.data);

                if (response) {
                    // Handle success
                    console.log(response.data.id);
                    const response2 = await axios.post(
                        // `http://15.207.195.184:8000/api/v1/personalformUploadfiles/${response.data.id}`,
                        `${backendUrl}/personalformUploadfiles/${response.data.id}`,
                        newformData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                            onUploadProgress: ({ loaded, total }) => {
                                console.log(`current:${loaded}total:${total} percentage${Math.round((loaded / total) * 100)} %`);
                                setProgress(Math.round((loaded * 100) / total));
                            }
                        },

                    );

                    if (response2) {
                        alert(response2.data.message);
                        // getID(response2.data.id);
                        navigate("/");
                        setProgress(0);
                    } else {
                        console.error("Error sending data to the backend");
                    }
                } else {
                    // Handle error
                    console.error("Error sending data to the backend");
                }
            } catch (error) {
                console.log("Error sending data to the backend");
            }
        }
        catch (error) {
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
                                <h1 className="mb-0">Personal Loan Application Form </h1>
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
                                                errors?.fname && <p className="text-danger fs-6">{errors?.fname}</p>
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
                                            {
                                                errors?.mname && <p className="text-danger fs-6">{errors?.mname}</p>
                                            }
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
                                                errors?.lname && <p className="text-danger fs-6">{errors?.lname}</p>
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
                                                errors?.email && <p className="text-danger fs-6">{errors?.email}</p>
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
                                                errors?.phone && <p className="text-danger fs-6">{errors?.phone}</p>
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
                                                errors?.alternate_number && <p className="text-danger fs-6">{errors?.alternate_number}</p>
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
                                                errors?.dob && <p className=" text-danger fs-6">{errors?.dob}</p>
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
                                                errors?.gender && <p className=" text-danger fs-6">{errors?.gender}</p>
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
                                                errors?.marital_status && <p className=" text-danger fs-6">{errors?.marital_status}</p>
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
                                        </div>
                                        {
                                            errors?.father_name && <p className=" text-danger fs-6">{errors?.father_name}</p>
                                        }
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
                                        </div>
                                        {
                                            errors?.mother_name && <p className=" text-danger fs-6">{errors?.mother_name}</p>
                                        }
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
                                        </div>
                                        {
                                            errors?.house_name && <p className=" text-danger fs-6">{errors?.house_name}</p>
                                        }
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
                                        </div>
                                        {
                                            errors?.street_name && <p className=" text-danger fs-6">{errors?.street_name}</p>
                                        }
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
                                        </div>
                                        {
                                            errors?.city_name && <p className=" text-danger fs-6">{errors?.city_name}</p>
                                        }
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
                                        </div>
                                        {
                                            errors?.landmark && <p className=" text-danger fs-6">{errors?.landmark}</p>
                                        }
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
                                        </div>
                                        {
                                            errors?.district && <p className=" text-danger fs-6">{errors?.district}</p>
                                        }
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
                                        </div>
                                        {
                                            errors?.state && <p className=" text-danger fs-6">{errors?.state}</p>
                                        }
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
                                        </div>
                                        {
                                            errors?.pincode && <p className=" text-danger fs-6">{errors?.pincode}</p>
                                        }
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
                                        </div>
                                        {
                                            errors?.present_house_name && <p className=" text-danger fs-6">{errors?.present_house_name}</p>
                                        }
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
                                        </div>
                                        {
                                            errors?.present_street_name && <p className=" text-danger fs-6">{errors?.present_street_name}</p>
                                        }
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
                                        </div>
                                        {
                                            errors?.present_city_name && <p className=" text-danger fs-6">{errors?.present_city_name}</p>
                                        }
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
                                        </div>
                                        {
                                            errors?.present_landmark && <p className=" text-danger fs-6">{errors?.present_landmark}</p>
                                        }
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
                                        </div>
                                        {
                                            errors?.present_district && <p className=" text-danger fs-6">{errors?.present_district}</p>
                                        }
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
                                        </div>
                                        {
                                            errors?.present_state && <p className=" text-danger fs-6">{errors?.present_state}</p>
                                        }
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
                                        </div>
                                        {
                                            errors?.present_pincode && <p className=" text-danger fs-6">{errors?.present_pincode}</p>
                                        }
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

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    ))}

                                    {/* User Bank Detail End */}
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
                                        </div>
                                        {
                                            errors?.co_name && <p className="text-danger fs-6">{errors?.co_name}</p>
                                        }
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
                                        </div>
                                        {
                                            errors?.co_date_of_birth && <p className="text-danger fs-6">{errors?.co_date_of_birth}</p>
                                        }
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
                                        </div>
                                        {
                                            errors?.occupation && <p className="text-danger fs-6">{errors?.occupation}</p>
                                        }
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

                                        </div>
                                        {
                                            errors?.co_relation && <p className="text-danger fs-6">{errors?.co_relation}</p>
                                        }
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
                                            {
                                                errors?.adhar_front && <p className="text-danger fs-6">{errors?.adhar_front}</p>
                                            }
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
                                            {
                                                errors?.adhar_back && <p className="text-danger fs-6">{errors?.adhar_back}</p>
                                            }
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

                                            {errors.pancard && (
                                                <div className="text-danger fs-6">
                                                    {errors.pancard}
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
                                            {errors.applicant_photo && (
                                                <div className="text-danger fs-6">
                                                    {errors.applicant_photo}
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
                                            {errors.address_proof && (
                                                <div className="text-danger fs-6">
                                                    {errors.address_proof}
                                                </div>
                                            )}
                                            {formData2.address_proof && (
                                                <p>
                                                    Selected File: {formData2.address_proof.name}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <h4>Job Documents : </h4>

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
                                            {errors.first_month_salary && (
                                                <div className="text-danger fs-6">
                                                    {errors.first_month_salary}
                                                </div>
                                            )}
                                            {formData2.first_month_salary && (
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
                                            {errors.second_month_salary && (
                                                <div className="text-danger fs-6">
                                                    {errors.second_month_salary}
                                                </div>
                                            )}
                                            {formData2.second_month_salary && (
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
                                            {errors.third_month_salary && (
                                                <div className="text-danger fs-6">
                                                    {errors.third_month_salary}
                                                </div>
                                            )}
                                            {formData2.third_month_salary && (
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
                                                errors.itr1 && (
                                                    <div className="text-danger fs-6">
                                                        {errors.itr1}
                                                    </div>
                                                )
                                            }

                                            {formData2.itr1 && (
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

                                            {formData2.itr2 && (
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

                                            {formData2.others && (
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

                                            {formData2.others && (
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

                                            {formData2.others && (
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
                                            {formData2.co_adhar_front && (
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
                                            {formData2.co_adhar_back && (
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

                                            {errors.co_pancard && (
                                                <div className="text-danger fs-6">
                                                    {errors.co_pancard}
                                                </div>
                                            )}
                                            {formData2.co_pancard && (
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
                                            {errors.co_applicant_photo && (
                                                <div className="text-danger fs-6">
                                                    {errors.co_applicant_photo}
                                                </div>
                                            )}
                                            {formData2.co_applicant_photo && (
                                                <p>
                                                    Selected File: {formData2.co_applicant_photo.name}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Button */}

                                           
                                    <div className=" col-lg-12 col-md-12 col-sm-12 col-12">
                                        <button
                                            onClick={handleClick}
                                            type="submit"
                                            disabled={progress?true:false}
                                            className="btn btn-primary mb-4"
                                        >
                                            {progress ? `Uploading ${progress}%`: "Submit"}
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

export default PersonalLoanForm;
