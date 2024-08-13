import React, { useState } from 'react';
import Sidebar from '../UserDashbord/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { backendUrl } from '../../../env';

const UploadConnectorDoc = () => {
    let newformData = new FormData();
    const navigate = useNavigate();
    const { id } = useParams();
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


    const [progress, setProgress] = useState(0);

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

            Object.keys(formData2).forEach((fileType) => {
                const file = formData2[fileType];
                if (file) {
                    newformData.append(fileType, file);
                }
            });
            const response2 = await axios.put(`${backendUrl}/upload_users_doc/${id}`,
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
                toast.success("Uploaded Successfully");
                setTimeout(() => {
                    navigate("/connectors");
                }, 3000);
            } else {
                setProgress(0);
                console.error("Error sending data to the backend");
            }
        } catch (error) {
            toast.error(error?.message);
            setProgress(0);
            console.error("Error:", error);
        }
    }
    return (
        <Sidebar>
            <div className='container'>
                <ToastContainer/>
                <h3>Documents Upload </h3>
                <h4>KYC Documents : </h4>
                <div className="row">
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
                                Formal Picture
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
                                Office Picture
                            </h6>
                            <label
                                className="sr-only form-label mb-0"
                                htmlFor="text"
                            ></label>
                            <input
                                id="office_photo"
                                name="office_photo"
                                type="file"
                                onChange={(e) =>
                                    handleFileChange(e, "office_photo")
                                }
                                className="form-control"
                            />

                            {formData2.office_photo && (
                                <p>
                                    Selected File: {formData2.office_photo.name}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="col-xl-4 col-lg-2 col-md-12 col-sm-12 col-12">
                        <div className="mb-3">
                            <h6 className="text-center">
                                Bank Details
                            </h6>
                            <label
                                className="sr-only form-label mb-0"
                                htmlFor="text"
                            ></label>
                            <input
                                id="bank_details"
                                name="bank_details"
                                type="file"
                                onChange={(e) =>
                                    handleFileChange(e, "bank_details")
                                }
                                className="form-control"
                            />

                            {formData2.bank_details && (
                                <p>
                                    Selected File: {formData2.bank_details.name}
                                </p>
                            )}
                        </div>
                    </div>

                    {
                        localStorage.getItem("user_type") === "Admin" &&
                        <>
                            <h4 className='text-danger'>Upload Id & Certificate</h4>
                            <div className="col-xl-4 col-lg-2 col-md-12 col-sm-12 col-12">
                                <div className="mb-3">
                                    <h6 className="text-center">
                                    Authorization certificate 
                                    </h6>
                                    <label
                                        className="sr-only form-label mb-0"
                                        htmlFor="text"
                                    ></label>
                                    <input
                                        id="auth_certificate"
                                        name="auth_certificate"
                                        type="file"
                                        onChange={(e) =>
                                            handleFileChange(e, "auth_certificate")
                                        }
                                        className="form-control"
                                    />

                                    {formData2.auth_certificate && (
                                        <p>
                                            Selected File: {formData2.auth_certificate.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-2 col-md-12 col-sm-12 col-12">
                                <div className="mb-3">
                                    <h6 className="text-center">
                                        Id Card
                                    </h6>
                                    <label
                                        className="sr-only form-label mb-0"
                                        htmlFor="text"
                                    ></label>
                                    <input
                                        id="id_card"
                                        name="id_card"
                                        type="file"
                                        onChange={(e) =>
                                            handleFileChange(e, "id_card")
                                        }
                                        className="form-control"
                                    />

                                    {formData2.id_card && (
                                        <p>
                                            Selected File: {formData2.id_card.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </>
                    }
                    <div>
                        <button
                            className='btn btn-primary'
                            disabled={progress ? true : false}
                            onClick={handleClick}
                        >
                            {progress ? "Uploading" : "Upload"}
                        </button>
                    </div>
                </div>
            </div>
        </Sidebar>

    );
}

export default UploadConnectorDoc;
