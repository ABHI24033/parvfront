import React, { useEffect, useState } from "react";
import "./Blog.css";

import Recentimg1 from "../../assets/images/blog/recent-img-1.jpg";
import Recentimg2 from "../../assets/images/blog/recent-img-2.jpg";
import Recentimg3 from "../../assets/images/blog/recent-img-3.jpg";
import { backendUrl } from "../../env";
import { useParams } from "react-router-dom";

const BlogDesc = () => {
    const [blogs, setBlogs] = useState([]);
    const {id}=useParams();
    
    useEffect(() => {
        getBlogByID();
    }, [])

    const getBlogByID = async () => {
        try {
            const response = await fetch(
                `${backendUrl}/getBlogsbyId/${id}`,

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
                                        {/* {blogs.length > 0 && blogs.map((blog, index) => ( */}
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" >
                                                <div className="mb-3 border-bottom">
                                                    <div className="mb-4">
                                                        {blogs.image && <img
                                                            src={blogs.image.path}
                                                            alt={blogs.image.originalFileName}
                                                            className="img-fluid rounded-3"
                                                        />}
                                                    </div>
                                                    {blogs.heading && (
                                                        <div>
                                                            <h2 className="mb-2">
                                                                {blogs.heading}
                                                            </h2>
                                                            <p className="fs-6 text-uppercase fw-bold">
                                                                <span className="border-end pe-2 me-2 border-2">
                                                                    {new Date(blogs.created_at).toLocaleDateString()}
                                                                </span>
                                                                <span className="border-end pe-2 me-2 border-2">
                                                                    By <a href="#!">Admin</a>
                                                                </span>
                                                                <span className="border-end pe-2 me-2 border-2">
                                                                    <a href="#!">{blogs.category}</a>
                                                                </span>
                                                            </p>
                                                            <p>
                                                                {blogs.description}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        {/* ))} */}


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

export default BlogDesc;
