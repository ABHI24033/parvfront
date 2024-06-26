import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../../../env';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const JobDetails = () => {
    const { id } = useParams();
    const navigate=useNavigate();
    const [jobData, setJobData] = useState();
    const [resume,setResume]=useState();
    const [progress,setProgress]=useState();

    const getJobById = async () => {
        try {
            const res = await axios.get(`${backendUrl}/jobposts/${id}`);
            console.log(res);
            if (res) {
                setJobData(res?.data);
            }
        } catch (error) {
            console.log("Error :", error);
        }
    }

    useEffect(() => {
        getJobById();
    }, []);


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        message: "",
      });
    
      const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        message: "",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" }); // Clear error when user starts typing
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Perform validation
        // let newErrors = {};
    
        // if (formData.name.trim() === "") {
        //   newErrors.name = "Name is required";
        // }
    
        // if (formData.email.trim() === "") {
        //   newErrors.email = "Email is required";
        // } else if (!isValidEmail(formData.email)) {
        //   newErrors.email = "Invalid email format";
        // }
    
        // if (formData.phone.trim() === "") {
        //   newErrors.phone = "Phone is required";
        // } else if (!isValidPhone(formData.phone)) {
        //   newErrors.phone = "Invalid phone number";
        // }
    
        // if (formData.password.trim() === "") {
        //   newErrors.password = "Password is required";
        // }
    
        // if (formData.message.trim() === "") {
        //   newErrors.message = "Message is required";
        // }
    
        // if (Object.keys(newErrors).length > 0) {
        //   setErrors(newErrors);
        //   return;
        // }
    
        try {
          const response = await axios.post(`${backendUrl}/careers`, {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            resume:resume,
            job_id:id,
            message: formData.message
          },
          {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: ({ loaded, total }) => {
                setProgress(Math.round((loaded * 100) / total));
            }
        },
        );
          console.log(response)
          if (response.status) {
            toast(response.data.message, "success");
            setTimeout(()=>{
                navigate("/career");
            },[])
          } else {
            toast("error", "error");
            console.error("Submission failed:", response.error);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
    
     
    return (
        <div className='container mt-6 pt-6'>
            <div className='my-4 mt-6'>
                <h2>{jobData?.jobTitle}</h2>
                <p style={{ lineHeight: "7px" }}>{jobData?.companyName}</p>
                <p style={{ lineHeight: "7px" }} className='btn btn-secondary px-2 py-2'>{jobData?.jobType} </p>
                <p style={{ lineHeight: "7px" }}><span style={{ fontWeight: 600 }}>Location :</span> {jobData?.location}</p>
            </div>
            <div>
                <h2>Description</h2>
                <p>{jobData?.description}</p>
            </div>
            <div>
                <h2>Responsibilities</h2>
                <p>{jobData?.responsibilities}</p>
            </div>
            <div>
                <h2>Skills Required</h2>
                <p>{jobData?.requiredSkills}</p>
            </div>
            <div>
                <h2>Experience</h2>
                <p>{jobData?.experience}</p>
            </div>
            <div>
                <h2>Salary Range</h2>
                <p>{jobData?.salaryRange}</p>
            </div>
            <hr />
            <div>
                <h1></h1>
                <div className="offset-xl-1 col-lg-5 offset-lg-2 col-lg-5 col-md-6 col-sm-12 col-12">
                    <div className="card card-body border-0">
                        <h3 className="mb-3">Apply for Career </h3>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="mb-2 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <label className="form-label sr-only" htmlFor="name">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Name"
                                        className="form-control"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required=""
                                    />
                                   
                                </div>

                                <div className="mb-2 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <label className="form-label sr-only" htmlFor="email">
                                        E-Mail
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="text"
                                        placeholder="E-mail"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required=""
                                    />
                                   
                                </div>

                                <div className="mb-2 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <label className="form-label sr-only" htmlFor="phone">
                                        Phone
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        placeholder="Phone"
                                        className="form-control"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required=""
                                    />
                                    
                                </div>

                                <div className="mb-2 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <label className="form-label sr-only" htmlFor="resume">
                                        Phone
                                    </label>
                                    <input
                                        id="resume"
                                        name="resume"
                                        type="file"
                                        placeholder="Resume"
                                        className="form-control"
                                        value={formData?.resume}
                                        // onChange={handleChange}
                                        onChange={(e)=>setResume(e.target.files[0])}
                                        required
                                    />
                                   
                                </div>

                                <div className="mb-2 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="mb-3">
                                        <label
                                            className="sr-only form-label mb-0"
                                            htmlFor="message"
                                        ></label>
                                        <textarea
                                            className="form-control"
                                            id="message"
                                            rows={2}
                                            name="message"
                                            placeholder="Message"
                                            value={formData.message}
                                            onChange={handleChange}
                                        />
                                        
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="d-grid">
                                        <button 
                                        type="submit" 
                                        style={{ backgroundColor: "#0c0c37" }} 
                                        className="btn text-white"
                                        disabled={progress?true:false}
                                        >
                                           { progress?"Uploading":"Apply"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobDetails;
