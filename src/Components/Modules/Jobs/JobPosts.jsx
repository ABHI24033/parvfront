// JobPosts.jsx
import React, { useEffect, useState } from 'react';
import JobPostCard from './JobPostCard';
import axios from 'axios';
import { backendUrl } from '../../../env';

const JobPosts = () => {
  const [jobPosts, setJobPosts] = useState([]);

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/jobposts`);
        setJobPosts(response.data);
      } catch (error) {
        console.error('Error fetching job posts:', error);
      }
    };

    fetchJobPosts();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        {jobPosts.map((jobPost) => (
          <div className="col-md-4" key={jobPost._id}>
            <JobPostCard jobPost={jobPost} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPosts;
