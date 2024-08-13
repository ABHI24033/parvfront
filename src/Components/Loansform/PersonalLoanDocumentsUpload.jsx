import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { backendUrl } from '../../env';
import { toast, ToastContainer } from 'react-toastify';

const PersonalLoanDocumentsUpload = () => {
    let newformData = new FormData();
    const [progress, setProgress] = useState();
    const navigate = useNavigate();
    const { formId } = useParams();

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

    const handleClick = async () => {
        Object.keys(formData2).forEach((fileType) => {
            const file = formData2[fileType];
            if (file) {
                newformData.append(fileType, file);
            }
        });
        try {

            const response2 = await axios.post(
                `${backendUrl}/personalformUploadfiles/${formId}`,
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
                toast.success(response2?.data?.message);
                setTimeout(() => {
                    navigate("/");
                }, 3000);
                setProgress(0);
            }
        } catch (error) {
            toast.error(error?.message);
            setProgress(0);
            console.log(error);
        }
    }
    return (
        <div className=' container my-16 py-5 mx-auto'>
            <ToastContainer />
            <h3 className='text-center text-danger' style={{ fontSize: '2rem' }}>Upload Documents </h3>
            <div className="row">
                <h4>KYC Documents : </h4>
                <div className="col-xl-4 col-lg-2 col-md-12 col-sm-12 col-12">
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
                            className="form-control"
                        />

                        {formData2.adhar_front && (
                            <p>
                                Selected File: {formData2.adhar_front.name}
                            </p>
                        )}
                    </div>
                </div>

                <div className="col-xl-4 col-lg-2 col-md-12 col-sm-12 col-12">
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
                            className="form-control"
                        />

                        {formData2.adhar_back && (
                            <p>
                                Selected File: {formData2.adhar_back.name}
                            </p>
                        )}
                    </div>
                </div>

                <div className="col-xl-4 col-lg-2 col-md-12 col-sm-12 col-12">
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

                <div className="col-xl-4 col-lg-2 col-md-12 col-sm-12 col-12">
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

                <div className="col-xl-4 col-lg-2 col-md-12 col-sm-12 col-12">
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

                        {formData2.address_proof && (
                            <p>
                                Selected File: {formData2.address_proof.name}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className='row'>
                <h4>Job Documents : </h4>

                <div className="col-xl-4 col-lg-2 col-md-12 col-sm-12 col-12">
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

                        {formData2.first_month_salary && (
                            <p>
                                Selected File:{" "}
                                {formData2.first_month_salary.name}
                            </p>
                        )}
                    </div>
                </div>
                <div className="col-xl-4 col-lg-2 col-md-12 col-sm-12 col-12">
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

                        {formData2.second_month_salary && (
                            <p>
                                Selected File:{" "}
                                {formData2.second_month_salary.name}
                            </p>
                        )}
                    </div>
                </div>
                <div className="col-xl-4 col-lg-2 col-md-12 col-sm-12 col-12">
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

                        {formData2.third_month_salary && (
                            <p>
                                Selected File:{" "}
                                {formData2.third_month_salary.name}
                            </p>
                        )}
                    </div>
                </div>
                <div className="col-xl-4 col-lg-2 col-md-12 col-sm-12 col-12">
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


                        {formData2.itr1 && (
                            <p>Selected File: {formData2.itr1.name}</p>
                        )}
                    </div>
                </div>
                <div className="col-xl-4 col-lg-2 col-md-12 col-sm-12 col-12">
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


                        {formData2.itr2 && (
                            <p>
                                Selected File: {formData2.itr2.name}
                            </p>
                        )}
                    </div>
                </div>
                <div className="col-xl-4 col-lg-2 col-md-12 col-sm-12 col-12">
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

                        {formData2.other1 && (
                            <p>
                                Selected File: {formData2.other1.name}
                            </p>
                        )}
                    </div>
                </div>
                <div className="col-xl-4 col-lg-2 col-md-12 col-sm-12 col-12">
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

                        {formData2.other2 && (
                            <p>
                                Selected File: {formData2.other2.name}
                            </p>
                        )}
                    </div>
                </div>
                <div className="col-xl-4 col-lg-2 col-md-12 col-sm-12 col-12">
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

                        {formData2.other3 && (
                            <p>
                                Selected File: {formData2.other3.name}
                            </p>
                        )}
                    </div>
                </div>
            </div>


            <div className='row'>
                <h4>Co-Applicant KYC Documents :</h4>
                <div className="col-xl-4 col-lg-2 col-md-12 col-sm-12 col-12">
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

                        {formData2.co_adhar_front && (
                            <p>
                                Selected File: {formData2.co_adhar_front.name}
                            </p>
                        )}
                    </div>
                </div>

                <div className="col-xl-4 col-lg-2 col-md-12 col-sm-12 col-12">
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

                        {formData2.co_adhar_back && (
                            <p>
                                Selected File: {formData2.co_adhar_back.name}
                            </p>
                        )}
                    </div>
                </div>

                <div className="col-xl-4 col-lg-2 col-md-12 col-sm-12 col-12">
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


                        {formData2.co_pancard && (
                            <p>
                                Selected File: {formData2.co_pancard.name}
                            </p>
                        )}
                    </div>
                </div>

                <div className="col-xl-4 col-lg-2 col-md-12 col-sm-12 col-12">
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

                        {formData2.co_applicant_photo && (
                            <p>
                                Selected File: {formData2.co_applicant_photo.name}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <button
                onClick={handleClick}
                disabled={progress ? true : false}
                className='btn btn-primary my-2'>
                {progress ? "Uploading" : "Upload"}
            </button>

        </div>
    );
}

export default PersonalLoanDocumentsUpload;
