import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { backendUrl } from '../../env';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const HomeLoanDocumentsUpload = () => {
    const {formId}=useParams();
    const newformData=new FormData();
    const [progress, setProgress] = useState();
    const navigate=useNavigate();

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

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        setFormData2({
            ...formData2,
            [fieldName]: file,
        });
    };

    const handleClick = async () => {
        Object.keys(formData2).forEach((fileType) => {
            const file = formData2[fileType];
            if (file) {
                newformData.append(fileType, file);
            }
        });
        try {
            const response2 = await axios.post(`${backendUrl}/home_loan_uploadFiles/${formId}`,
                newformData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: ({ loaded, total }) => {
                        setProgress(Math.round((loaded * 100) / total));
                    }
                },

            );

            if (response2) {
                toast.success(response2?.data?.message);
                setTimeout(()=>{
                    navigate(`/`);
                },3000);
               
            }
        } catch (error) {
            toast.error(error?.message);
            console.log("Error while submitting documets",error);
        }

    }
    return (
        <div className='container my-16 py-5 mx-auto'>
            <ToastContainer />
            <h3 className='text-center text-danger' style={{ fontSize: '2rem' }}>Upload Documents </h3>

            <div className="row">
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
                        {formData2?.address_proof && (
                            <p>
                                Selected File: {formData2?.address_proof.name}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="row">
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
            </div>

            <div className="row">
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

                        {formData2?.other3 && (
                            <p>
                                Selected File: {formData2.other3.name}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="row">
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
                        {formData2?.co_applicant_photo && (
                            <p>
                                Selected File: {formData2.co_applicant_photo.name}
                            </p>
                        )}
                    </div>
                </div>
            </div>

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

                        {formData2?.property_map && (
                            <p>
                                Selected File: {formData2.property_map.name}
                            </p>
                        )}
                    </div>
                </div>
                {/* <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
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
                            className="form-control"
                        />
                        {formData2?.property_video && (
                            <p>
                                Selected File: {formData2.property_video.name}
                            </p>
                        )}
                    </div>
                </div> */}
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
                            className="form-control"
                        />
                        {formData2?.chain_deed && (
                            <p>
                                Selected File: {formData2.chain_deed.name}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            

            <button 
            type='button'
            className='btn btn-primary'
            onClick={handleClick}
            disabled={progress?true:false}
            >
                {progress?"Uploading":"Upload"}
            </button>

        </div>
    );
}

export default HomeLoanDocumentsUpload;
