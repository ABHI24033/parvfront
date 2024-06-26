// import React from 'react';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { backendUrl } from "../../env";
import { toast } from "react-toastify";

const GoldLoanEdit = () => {
    let newformData = new FormData();
    const location = useLocation();
    const navigate = useNavigate();
    const [paramvalue, setParamvalue] = useState(null);

    const [formData, setFormData] = useState();
    const { id } = useParams();
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
    async function getFormdataById() {
        try {
            const data = await axios.get(`${backendUrl}${location?.pathname}`);
            if (data) {
                setFormData(data?.data?.data);
                setDividendArr(data?.data?.data?.bank_details);
                setDividendArr1(data?.data?.data?.loan_history);
                // setFormData2(data?.data?.data?.files)
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



    const [errors, setErrors] = useState({});
    const [progress, setProgress] = useState(0);
    const [docProgress, setDocProgress] = useState(0);


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
            e.target.value = null; // Clear the input field
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${backendUrl}/update_goldLoan/${id}`, 
                formData,
                {
                    onUploadProgress: ({ loaded, total }) => {
                        setProgress(Math.round((loaded * 100) / total));
                    }
                }
            );
            if (res) {
                toast.success("Updated Successfully");
                setTimeout(() => {
                    navigate("/homeservices/formTable/getAllGoldForms");
                },3000);
            }

        } catch (error) {
            toast.error("Something went wrong");
            console.log("Error while updating");
        }
    }

    const handleDocumentsUpdate = async (e) => {

        e.preventDefault();

        try {

            Object.keys(formData2).forEach((fileType) => {
                const file = formData2[fileType];
                if (file) {
                    newformData.append(fileType, file);
                }
            });

           
            const response2 = await axios.put(`${backendUrl}/update_gold_Doc/${id}`,
                newformData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: ({ loaded, total }) => {
                        setDocProgress(Math.round((loaded * 100) / total));
                    }
                },

            );

            if (response2) {
                // alert(response2.data.message);
                toast.success("Updated Successfully");
                setTimeout(()=>{
                navigate("/homeservices/formTable/getAllGoldForms");
                },3000);
            } else {
                console.error("Error sending data to the backend");
            }
           
        } catch (error) {
            console.error("Error:", error);
        }
    }



    // const handleDocuments = async () => {
    //     const response2 = await axios.post(
    //         `${backendUrl}/gold_loanFiles/${id}`,
    //         newformData,
    //         {
    //             headers: {
    //                 "Content-Type": "multipart/form-data",
    //             },
    //             onUploadProgress: ({ loaded, total }) => {
    //                 // console.log(`current:${loaded}total:${total} percentage${Math.round((loaded / total) * 100)} %`);
    //                 setProgress(Math.round((loaded * 100) / total));
    //             }
    //         },

    //     );

    //     if (response2) {
    //         alert(response2.data.message);
    //         // getID(response2.data.id);
    //         navigate("/");
    //         setProgress(0);
    //     }
    // }

    // };

    return (
        <div>
            {/* Applicant KYC section */}
            <section className="mt-6 pt-6">
                <div className="container">
                    <div className="mb-2">
                        <div className="offset-xl-2 col-xl-8 offset-lg-2 col-lg-8 col-md-12 col-sm-12 col-12">
                            <div className="mb-4 text-center">
                                <h1 className="mb-0">Update Gold Loan Application Form </h1>
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
                                                disabled={textDisabld}
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
                                                disabled={textDisabld}
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
                                        // formData.marital_status === "married" &&
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
                                    {/* {console.log(dividendArr)} */}
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
                                            ))
                                        )
                                    }
                                    <button className="btn btn-primary w-25"
                                        onClick={handleUpdate}
                                        disabled={progress ? true : false}
                                    >
                                        {progress ? "Updating" : "Update"}
                                    </button>
                                    {/* Loan History Section End  */}


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
                                                Application Selfie
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

                                    <div className=" col-lg-12 col-md-12 col-sm-12 col-12">
                                        <button
                                            onClick={handleDocumentsUpdate}
                                            type="submit"
                                            disabled={docProgress ? true : false}
                                            className="btn btn-primary mb-4"
                                        >
                                            {docProgress ? `Uploading ${progress}%` : "Upload"}
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

export default GoldLoanEdit;
