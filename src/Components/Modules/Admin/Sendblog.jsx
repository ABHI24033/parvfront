import React, { useState, useEffect } from "react";
import "./admin.css";
import Sidebar from "../UserDashbord/Sidebar";
import axios from "axios";
import { backendUrl } from "../../../env";
import { toast } from "react-toastify";

const Sendblog = () => {
  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    category: "",
    created_at: "",
  });
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${backendUrl}/getBlogs`);
      console.log("Blog Data = ", response.data);
      setBlogs(response.data.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleFileChange = (e) => {
  //   setImage(e.target.files[0]);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!image) {
    //   setErrorMessage("Please select an image.");
    //   return;
    // }

    const formData2 = new FormData();
    formData2.append("image", image);

    try {
      const response = await axios.post(`${backendUrl}/sendblog`, formData);
      // const blogId = response.data.id;

      // const uploadResponse = await axios.post(
      //   `${backendUrl}/uploadImage/${blogId}`,
      //   formData2,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );
      if(response){
        alert("Blog Uploded"); 
      }

      setFormData({
        heading: "",
        description: "",
        category: "",
        created_at: "",
      });
      // setImage(null);
      // setErrorMessage("");
      fetchBlogs(); // Fetch updated list of blogs after uploading
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while uploading the blog.");
    }
  };

  const handleDelete = async (blogId) => {
    try {
      const response = await axios.delete(`${backendUrl}/deleteBlog/${blogId}`);
      toast.success("deleted Successfully");
      console.log(response.data.message); // Log success message
      // setBlogs(blogs.filter((blog) => blog._id !== blogId)); // Filter out the deleted blog from the state
      fetchBlogs(); // Fetch updated list of blogs after deletion
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Sidebar>
      <section className="">
        <div className="container">
          <div className=" col-lg-5 offset-lg-2 col-lg-5 col-md-6 col-sm-12 col-12">
            <h2 className="text-center fs-2">Blog</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-2 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <label htmlFor="heading" className="fs-4">Heading:</label>
                <input
                  id="heading"
                  name="heading"
                  type="text"
                  className="form-control border-primary mb-2"
                  value={formData.heading}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-2 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <label htmlFor="description" className="fs-4">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  className="border-primary "
                  style={{height:"7rem"}}
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <div className="mb-2 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <label htmlFor="category" className="fs-4">Category:</label>
                <select
                  name="category"
                  className="form-control"
                  id="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select category</option>
                  <option value="Homeloan">Homeloan</option>
                  <option value="Vehicle Loan">Vehicle Loan</option>
                  <option value="Business Loan">Business Loan</option>
                  <option value="Personal Loan">Personal Loan</option>
                  <option value="Gold Loan">Gold Loan</option>
                  <option value="Another category">Another category</option>
                </select>
              </div>

              {/* <div className="mb-2 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <label htmlFor="selectedImage">Select Image:</label>
                <input
                  type="file"
                  id="selectedImage"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </div>

              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} */}

              <button type="submit" className="btn btn-success mb-4">
                Send
              </button>
            </form>
          </div>
          <h1 style={{ marginTop: "3rem" }}>Uploaded Blogs</h1>
          <table style={{ marginBottom: "3rem" }} className="w3-table-all">
            <thead>
              <tr>
                <th>Blog Heading</th>
                {/* <th>Image ID</th> */}
                <th>Date of Upload</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length ? (
                blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td>{blog.heading}</td>
                    {/* <td>{blog._id}</td> */}
                    <td>{formatDate(blog.created_at)}</td>
                    <td>
                      <button
                        className="w3-button w3-red"
                        onClick={() => handleDelete(blog?._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No blogs uploaded yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </Sidebar>
  );
};

export default Sendblog;
