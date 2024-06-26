// JobPostCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const JobPostCard = ({ jobPost }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{jobPost?.jobTitle}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{jobPost?.companyName}</h6>
        <p className="fs-5" style={{fontWeight:400}}>{jobPost?.description?.slice(0,200)}</p>
        {/* <p className="card-text"><strong>Location:</strong> {jobPost.location}</p>
        <p className="card-text"><strong>Job Type:</strong> {jobPost.jobType}</p>
        <p className="card-text"><strong>Experience Required:</strong> {jobPost.experience} years</p>
        <p className="card-text"><strong>Skills Required:</strong> {jobPost.requiredSkills}</p>
        <p className="card-text"><strong>Salary Range:</strong> {jobPost.salaryRange}</p>
        <a href={`mailto:${jobPost.contactEmail}`} className="card-link">Contact</a> */}
        <Link to={`/career/${jobPost?._id}`}><button className='btn btn-primary'>Apply Now</button></Link>
      </div>
    </div>
  );
};

JobPostCard.propTypes = {
  jobPost: PropTypes.shape({
    jobTitle: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    jobType: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    responsibilities: PropTypes.string.isRequired,
    requiredSkills: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    salaryRange: PropTypes.string,
    contactEmail: PropTypes.string.isRequired,
  }).isRequired,
};

export default JobPostCard;
