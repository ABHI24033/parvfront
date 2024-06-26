// Assuming this is part of a React component file (JobPostForm.jsx)

import React, { useState } from 'react';
import Sidebar from '../UserDashbord/Sidebar';
import axios from 'axios';
import { backendUrl } from '../../../env';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const JobPost = () => {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        jobTitle: '',
        companyName: '',
        location: '',
        jobType: '',
        description: '',
        responsibilities: '',
        requiredSkills: '',
        experience: '',
        salaryRange: '',
        contactEmail: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res=await axios.post(`${backendUrl}/jobposts`,formData);
            if(res){
                toast.success("Job Posted");
                setTimeout(()=>{
                    navigate("/career")
                },3000);
            }
        } catch (error) {
            console.log("Error While Posting a job",error);
        }
    };

    return (
        <Sidebar>
            <div className='d-flex me-10' style={{float:"right"}}>
                <Link to={`/job_table`}><button className='btn btn-warning '>All Posted job</button></Link>
            </div>
            <div className="container mx-4 my-4 px-6">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='fs-4'>
                            Job Title:
                            <input 
                            type="text" 
                            name="jobTitle" 
                            className='form-control w-75'
                            value={formData.jobTitle} 
                            onChange={handleChange} 
                            required />
                        </label>
                    </div>
                    <div>
                        <label className='fs-4'>
                            Company Name:
                            <input 
                            type="text" 
                            name="companyName" 
                            className='form-control w-75'
                            value={formData.companyName} 
                            onChange={handleChange} 
                            required />
                        </label>
                    </div>
                    <div>
                        <label className='fs-4'>
                            Location:
                            <input type="text" 
                            name="location" 
                            className='form-control w-75'
                            value={formData.location} 
                            onChange={handleChange} 
                            required />
                        </label>
                    </div>
                    <div>
                        <label className='fs-4'>
                            Job Type:
                            <select 
                            name="jobType" 
                            className='form-control w-75'
                            value={formData.jobType} 
                            onChange={handleChange} 
                            required>
                                <option value="">Select Job Type</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label className='fs-4'>
                            Description:
                            <textarea 
                            name="description" 
                            className='form-control w-75'
                            value={formData.description} 
                            onChange={handleChange} 
                            required />
                        </label>
                    </div>
                    <div>
                        <label className='fs-4'>
                            Responsibilities:
                            <textarea 
                            name="responsibilities"
                            className='form-control w-75'
                            value={formData.responsibilities} 
                            onChange={handleChange} 
                            required />
                        </label>
                    </div>
                    <div>
                        <label className='fs-4'>
                            Required Skills:
                            <textarea 
                            name="requiredSkills" 
                            className='form-control w-75'
                            value={formData.requiredSkills} 
                            onChange={handleChange} 
                            required />
                        </label>
                    </div>
                    <div>
                        <label className='fs-4'>
                            Experience (in years):
                            <input 
                            type="text" 
                            name="experience" 
                            className='form-control w-75'
                            value={formData.experience} 
                            onChange={handleChange} 
                            required />
                        </label>
                    </div>
                    <div>
                        <label className='fs-4'>
                            Salary Range:
                            <input 
                            type="text" 
                            name="salaryRange"
                            className='form-control w-75' 
                            value={formData.salaryRange} 
                            onChange={handleChange} />
                        </label>
                    </div>
                    <div>
                        <label className='fs-4'>
                            Contact Email:
                            <input 
                            type="email"
                            name="contactEmail"
                            className='form-control w-75'
                            value={formData.contactEmail} 
                            onChange={handleChange} 
                            required />
                        </label>
                    </div>
                    <button type="submit" className='btn btn-primary'>Submit Job Post</button>
                </form>
            </div>
        </Sidebar>


    );
};

export default JobPost;

