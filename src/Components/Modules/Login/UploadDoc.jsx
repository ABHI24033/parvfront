import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../../../env';

const UploadDoc = () => {
    let newformData = new FormData();
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData2, setFormData2] = useState({
        adhar_front: null,
        adhar_back: null,
        pancard: null,
        applicant_photo: null,
        bank_details: null,
        office_pic:null,

        other1: null,
        other2: null,
        other3: null,

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
                    navigate("/login");
                }, 3000);
            } else {
                setProgress(0);
                console.error("Error sending data to the backend");
            }
        } catch (error) {
            setProgress(0);
            console.error("Error:", error);
        }
    }
    return (
        // <Sidebar>
        <div className='container mt-6 pt-6 my-6'>
            <Link to="/login" className='btn btn-primary my-5 py-2'>Go to Login</Link>
            <h3>Documents Upload </h3>
            <h5>Upload some necessary Documents</h5>
            <div className="row my-4">
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
                            Applicant Photo
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

                <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
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
                <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12">
                    <div className="mb-3">
                        <h6 className="text-center">
                            Office Picture
                        </h6>
                        <label
                            className="sr-only form-label mb-0"
                            htmlFor="text"
                        ></label>
                        <input
                            id="office_pic"
                            name="office_pic"
                            type="file"
                            onChange={(e) =>
                                handleFileChange(e, "office_pic")
                            }
                            className="form-control"
                        />

                        {formData2.office_pic && (
                            <p>
                                Selected File: {formData2.office_pic.name}
                            </p>
                        )}
                    </div>
                </div>

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
        // </Sidebar>

    );
}

export default UploadDoc;
