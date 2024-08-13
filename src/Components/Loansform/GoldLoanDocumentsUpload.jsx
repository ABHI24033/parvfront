import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { backendUrl } from '../../env';

const GoldLoanDocumentsUpload = () => {

    const [progress, setProgress] = useState();
    const { formId } = useParams();
    const navigate = useNavigate();
    const newformData=new FormData();
    const [formData2, setFormData2] = useState({
        adhar_front: null,
        adhar_back: null,
        pancard: null,
        applicant_photo: null,
        address_proof: null,
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
                `${backendUrl}/gold_loanFiles/${formId}`,
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
                setTimeout(() => {
                    navigate("/")
                }, 3000);
            }
        } catch (error) {
            toast.error(error?.message);
            console.log("Error when try to upload files", error);
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

                        {formData2.address_proof && (
                            <p>
                                Selected File: {formData2.address_proof.name}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <button
                type='button'
                className='btn btn-primary'
                disabled={progress ? true : false}
                onClick={handleClick}
            >
                {progress ? "Uploading" : "Upload"}
            </button>
        </div>
    );
}

export default GoldLoanDocumentsUpload;
