// import React from 'react';
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from 'yup';
import { useLocation, useNavigate } from "react-router-dom"
import { backendUrl } from "../../env";
import { GoldLoanValidation } from "./FormValidation";
import { toast, ToastContainer } from "react-toastify";
import { Toast } from "bootstrap/dist/js/bootstrap.min";

const GoldLoanForm = () => {
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
            pandding: "",
        },
    ]);

    const [textDisabld, setTextDisabld] = useState(false); // Assuming textDisabld is a state variable

    const handleAdd = () => {
        setDividendArr([
            ...dividendArr,
            {
                bank_name: "",
                account_type: "",
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
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: null });
    };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file && (file.type === "application/pdf" || file.type === "image/png" || file.type === "image/jpeg")) {
            setFormData2({
                ...formData2,
                [fieldName]: file,
            });
        } else {
            alert("Please select a PDF, PNG, or JPG file.");
            e.target.value = null;
        }
    };


    const handleClick = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            await GoldLoanValidation.validate(formData, { abortEarly: false });
            // console.log("form is Valid");

            const userId = localStorage.getItem("userID");
            const object = {
                dividendArr,
                dividendArr1,
                formData,
                loan_check: formData?.loan_check,
                connector_id: userId,
            };

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
                    url: `${backendUrl}/gold_loan_form`,
                    method: "POST",
                    headers: headersList,
                    data: bodyContent,
                    onUploadProgress: ({ loaded, total }) => {
                        // console.log(`current:${loaded}total:${total} percentage${Math.round((loaded / total) * 100)} %`);
                        setProgress(Math.round((loaded * 100) / total));
                    }
                };

                let response = await axios.request(reqOptions);
                if (response) {
                    toast.success(response?.data?.message);
                    setTimeout(() => {
                        navigate(`/goldloan/doc/${response?.data?.id}`);
                    })
                }

                // if (response) {

                //     const response2 = await axios.post(
                //         `${backendUrl}/gold_loanFiles/${response.data.id}`,
                //         newformData,
                //         {
                //             headers: {
                //                 "Content-Type": "multipart/form-data",
                //             },
                //             onUploadProgress: ({ loaded, total }) => {
                //                 console.log(`current:${loaded}total:${total} percentage${Math.round((loaded / total) * 100)} %`);
                //                 setProgress(Math.round((loaded * 100) / total));
                //             }
                //         },

                //     );

                //     if (response2) {
                //         alert(response2.data.message);
                //         navigate("/");
                //         setProgress(0);
                //     }
                //      else {
                //         console.error("Error sending data to the backend");
                //     }
                // } else {
                //     // Handle error
                //     console.error("Error sending data to the backend");
                // }
            } catch (error) {
                toast.error(error?.message);
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
            <ToastContainer />
            {/* Applicant KYC section */}
            <section className="">
                <div className="container">
                    <div className="mb-2">
                        <div className="offset-xl-2 col-xl-8 offset-lg-2 col-lg-8 col-md-12 col-sm-12 col-12">
                            <div className="mb-4 text-center">
                                <h1 className="mb-0">Gold Loan Application Form </h1>
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
                                                            <option value="Current Account">
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

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    ))}

                                    {/* User Bank Detail End */}


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
                                                                    id={`pandding ${index}`}
                                                                    disabled={textDisabld}
                                                                    name="pandding"
                                                                    type="text"
                                                                    value={item.pandding}
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
                                    </div> */}

                                    <div className=" col-lg-12 col-md-12 col-sm-12 col-12">
                                        <button
                                            onClick={handleClick}
                                            type="submit"
                                            disabled={progress ? true : false}
                                            className="btn btn-primary mb-4"
                                        >
                                            {progress ? "Submitting" : "Submit"}
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

export default GoldLoanForm;
