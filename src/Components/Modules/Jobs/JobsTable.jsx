import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../../../env';
import Sidebar from '../UserDashbord/Sidebar';
import { toast } from 'react-toastify';

const JobsTable = () => {
  const [jobPosts, setJobPosts] = useState([]);

  const fetchJobPosts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/jobposts`);
      setJobPosts(response.data);
    } catch (error) {
      console.error('Error fetching job posts:', error);
    }
  };

  useEffect(() => {
    fetchJobPosts();
  }, []);

  const deleteData = async (id) => {
    try {
      const result = window?.confirm("Do you really want to delete ?");
      if (result) {
        const res = await axios.delete(`${backendUrl}/jobposts/${id}`);
        if (res) {
          toast.success("deleted successfully");
          fetchJobPosts();
        }
      }

    } catch (error) {
      console.log("Error:".error);
    }
  }
  return (
    <div>
      <Sidebar>
        <h1>Total Jobs Post</h1>
        <table className='mt-6 pt-6 table table-striped'>
          <thead>
            <tr>
              <th>Sr.No.</th>
              <th>Job Title</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              jobPosts && jobPosts?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item?.jobTitle}</td>
                    <td><button
                      className='btn btn-danger px-2 py-1'
                      title='Delete'
                      onClick={() => deleteData(item?._id)}
                    ><i class="fa-solid fa-trash"></i></button></td>
                  </tr>
                )
              })
            }

          </tbody>
        </table>
      </Sidebar>

    </div>
  );
}

export default JobsTable;
