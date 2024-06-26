import React, { useEffect, useState } from "react";
import "./Blog.css";

import Blogimg1 from "../../assets/images/blog/blog-post-1.jpg";
import Blogimg2 from "../../assets/images/blog/blog-post-2.jpg";
import Blogimg3 from "../../assets/images/blog/blog-post-3.jpg";
import Blogimg4 from "../../assets/images/blog/blog-post-4.jpg";
import Recentimg1 from "../../assets/images/blog/recent-img-1.jpg";
import Recentimg2 from "../../assets/images/blog/recent-img-2.jpg";
import Recentimg3 from "../../assets/images/blog/recent-img-3.jpg";
import { backendUrl } from "../../env";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  // const [blogImages, setBlogImages] = useState([]);
  // console.log("blogphotos = ", blogphotos);

  // useEffect(() => {
  //   setBlogImages(blogphotos);
  // }, [blogphotos])


  useEffect(() => {
    getAllBlogs();
  }, [])

  const getAllBlogs = async () => {
    try {
      const response = await fetch(
        // "http://15.207.195.184:8000/api/v1/getBlogs",
        `${backendUrl}/getBlogs`,

        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }

        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setBlogs(data.data);
      console.log("API Data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  console.log(blogs);


  return (
    <>
      <main>
        <section className="pt-18 pb-10 blog-banner-img">
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="bg-white p-5 rounded-top-md">
                  <div className="row align-items-center">
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                      <h1 className="mb-0">Blog</h1>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="text-md-end mt-3 mt-md-0">
                        <a href="/contact" style={{ backgroundColor: "#0c0c37" }} className="btn text-white">
                          How To Apply
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* content start */}
        <section>
          <div className="container">
            <div className="mt-n6 bg-white mb-10 rounded-3 shadow-sm p-5">
              <div className="row">
                <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 mb-8 mb-lg-0">
                  <div className="row">

                    {/* add logic here */}
                    {blogs.length > 0 && blogs.map((blog, index) => (
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" key={blog._id}>
                        <div className="mb-3 border-bottom">
                          <div className="mb-4">
                            {blog.image && <img
                              src={blog.image.path}
                              alt={blog.image.originalFileName}
                              className="img-fluid rounded-3"
                            />}
                          </div>
                          {blog.heading && (
                            <div>
                              <h2 className="mb-2">
                                {blog.heading}
                              </h2>
                              <p className="fs-6 text-uppercase fw-bold">
                                <span className="border-end pe-2 me-2 border-2">
                                  {new Date(blog.created_at).toLocaleDateString()}
                                </span>
                                <span className="border-end pe-2 me-2 border-2">
                                  By <a href="#!">Admin</a>
                                </span>
                                <span className="border-end pe-2 me-2 border-2">
                                  <a href="#!">{blog.category}</a>
                                </span>
                              </p>
                              <p>
                                {blog.description.slice(0,200)+" ......."}
                                <Link to={`/blog/${blog?._id}`}>Read More</Link>
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}



                    {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div>
                     
                        <div className=" bg-light-primary mb-4 p-5">
                        
                          <h2>Quote of the day</h2>
                          <p className="text-uppercase fs-6 text-dark fw-bold mb-4">
                            Jan 28, 2020
                          </p>
                          <blockquote className="border-start border-4 border-primary">
                            <p className="ms-4 lead fst-italic mb-0">
                              “The blockquote element is used to indicate the
                              sector quotation of a large section of text from
                              lorem another source.”
                            </p>
                          </blockquote>
                        </div>
                     
                      </div>
                  
                    </div> */}
                    {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                  
                      <nav aria-label="...">
                        <ul className="pagination ">
                          <li className="page-item disabled">
                            <span className="page-link">Previous</span>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              1
                            </a>
                          </li>
                          <li className="page-item active" aria-current="page">
                            <span className="page-link">2</span>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              3
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              Next
                            </a>
                          </li>
                        </ul>
                      </nav>
                   
                    </div> */}
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <div className="card bg-light mb-4">
                    <div className="card-body">
                      <h3 className="mb-3">Search</h3>
                      <form>
                        <input
                          type="search"
                          className="form-control"
                          id="loansearchform"
                          placeholder="Search here"
                        />
                      </form>
                    </div>

                  </div>
                  <div className="card bg-light mb-4">
                    <div className="card-body">
                      <h3 className="mb-3">Categories</h3>
                      <ul className="list-unstyled mb-0 fs-5">
                        <li className="mb-1">
                          <a href="#!" className="text-inherit">
                            <i className="bi bi-arrow-right-circle me-2 text-muted fs-6" />
                            Personal Loan
                          </a>
                        </li>
                        <li className="mb-1">
                          <a href="#!" className="text-inherit">
                            <i className="bi bi-arrow-right-circle me-2 text-muted fs-6" />
                            Education Loan
                          </a>
                        </li>
                        <li className="mb-1">
                          <a href="#!" className="text-inherit">
                            <i className="bi bi-arrow-right-circle me-2 text-muted fs-6" />
                            Car Loan
                          </a>
                        </li>
                        <li className="mb-1">
                          <a href="#!" className="text-inherit">
                            <i className="bi bi-arrow-right-circle me-2 text-muted fs-6" />
                            Home Loan
                          </a>
                        </li>
                        <li className="mb-1">
                          <a href="#!" className="text-inherit">
                            <i className="bi bi-arrow-right-circle me-2 text-muted fs-6" />
                            Business Loan
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card bg-light mb-4">
                    <div className="card-body">
                      <h3 className="mb-3">Recent post</h3>
                      <ul className="list-unstyled mb-0">
                        <li>
                          <div className="d-flex mb-4">
                            <div>
                              <a href="#!">
                                <img
                                  src={Recentimg1}
                                  alt="Borrow - Loan Company Website Template"
                                  className="img-fluid rounded-3"
                                />
                              </a>
                            </div>
                            <div className="ms-3">
                              <h4 className="mb-2">
                                <a href="#!" className="text-inherit">
                                  Bigger home still the goal
                                </a>
                              </h4>
                              {/* post meta */}
                              <span className="fs-6 text-uppercase fw-bold text-primary">
                                Aug 22, 2020{" "}
                              </span>
                            </div>
                            {/* /.post meta */}
                          </div>
                        </li>
                        <li>
                          <div className="d-flex mb-4">
                            <div>
                              <a href="#!">
                                <img
                                  src={Recentimg2}
                                  alt="Borrow - Loan Company Website Template"
                                  className="img-fluid rounded-3"
                                />
                              </a>
                            </div>
                            <div className="ms-3">
                              <h4>
                                <a href="#!" className="text-inherit">
                                  5 Essential Financial Habits
                                </a>
                              </h4>
                              {/* post meta */}
                              <span className="fs-6 text-uppercase fw-bold text-primary">
                                Aug 24, 2020
                              </span>
                            </div>
                            {/* /.post meta */}
                          </div>
                        </li>
                        <li>
                          <div className="d-flex">
                            <div>
                              <a href="#!">
                                <img
                                  src={Recentimg3}
                                  alt="Borrow - Loan Company Website Template"
                                  className="img-fluid rounded-3"
                                />
                              </a>
                            </div>
                            <div className="ms-3">
                              <h4>
                                <a href="#!" className="text-inherit">
                                  Choosing right loan
                                </a>
                              </h4>
                              {/* post meta */}
                              <span className="fs-6 text-uppercase fw-bold text-primary">
                                Aug 24, 2020
                              </span>
                            </div>
                            {/* /.post meta */}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card bg-light mb-4">
                    <div className="card-body">
                      <h3 className="mb-3">Archives</h3>
                      <ul className="list-unstyled mb-0 fs-5">
                        <li className="mb-1">
                          <a href="#!" className="text-inherit">
                            <i className="bi bi-arrow-right-circle me-2 text-muted fs-6" />
                            August 2020
                          </a>
                        </li>
                        <li className="mb-1">
                          <a href="#!" className="text-inherit">
                            <i className="bi bi-arrow-right-circle me-2 text-muted fs-6" />
                            July 2020
                          </a>
                        </li>
                        <li className="mb-1">
                          <a href="#!" className="text-inherit">
                            <i className="bi bi-arrow-right-circle me-2 text-muted fs-6" />
                            June 2020
                          </a>
                        </li>
                        <li className="mb-1">
                          <a href="#!" className="text-inherit">
                            <i className="bi bi-arrow-right-circle me-2 text-muted fs-6" />
                            May 2020
                          </a>
                        </li>
                        <li className="mb-1">
                          <a href="#!" className="text-inherit">
                            <i className="bi bi-arrow-right-circle me-2 text-muted fs-6" />
                            April 2020
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/*  tags */}

                  {/* /.widget well bg */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /.content end */}
      </main>
    </>
  );
};

export default Blog;
