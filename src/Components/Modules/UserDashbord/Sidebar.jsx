import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./sidebar.css";
// import axios from "axios";
// import { backendUrl } from "../../../env";
import ConnectorSidebar from "../connector/ConnectorSidebar";
import Rmsidebar from "../Employee/RM/Rmsidebar";
import { MdWork } from "react-icons/md";

// import EmployeeDashboardTable from "../Admin/Employee/EmployeeDashboardTable";
// import About from "../About";

const Sidebar = ({ children }) => {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();


  const user_type = localStorage.getItem("user_type");

  const handleToggle = () => {
    setToggle(!toggle);
  };


  const handleItemClick = (path) => {
    setToggle(!toggle);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userID");
  }


  return (
    <div className="container-fluid mt-15">
      <button className="toggle-button" onClick={handleToggle}>
        <i className={`bi image-sidebar ${toggle ? 'bi-arrow-left' : 'bi-arrow-right'} fs-4`} />
      </button>
      <div className="row mt-4">
        {toggle && (
          <div className="col-md-3 col-12 bg-white fixed">
            <div className="bg-white px-2">
              <div className="mt-3">
                <span className="brand-name fs-4 text-bold">Dashboard</span>
              </div>
              <hr className="text-dark" />
              <div className="list-group list-group-flush">

                {/* Admin =========================================*/}
                {
                  user_type === "Admin" ?
                    <>
                      <Link
                        to="/homeservices"
                        // to="/sidebar/homeservices"
                        className={`list-group-item list-group-item-action my-2 ${pathname === "/homeservices" ? "active" : null}`}
                        onClick={() => handleItemClick("/homeservices")}
                      >
                        <div className="list-item-hover">
                          <i className="fa-solid fa-house fs-4 me-2"></i>
                          <span className="fs-5 fw-bold fs-3 text-bold ">Home</span>
                        </div>
                      </Link>

                      <Link
                        to="/workReport/rm_work_report"
                        // to="/sidebar/homeservices"
                        className={`list-group-item list-group-item-action my-2
                           ${pathname === "/workReport/rm_work_report" ? "active" : null} ||
                           ${pathname === "/workReport/telecaller" ? "active" : null} ||
                           ${pathname === "/workReport/fieldStaff" ? "active" : null} ||
                           `}
                        onClick={() => handleItemClick("/workReport")}
                      >
                        <div className="list-item-hover">
                          <MdWork className="me-2" />
                          <span className="fs-5 fw-bold fs-3 text-bold ">Work Report</span>
                        </div>
                      </Link>

                      <Link
                        to="/contact_data"
                        // to="/sidebar/homeservices"
                        className={`list-group-item list-group-item-action my-2 ${pathname === "/contact_data" ? "active" : null}`}
                        onClick={() => handleItemClick("/contact_data")}
                      >
                        <div className="list-item-hover">
                          <i class="fa-solid fa-address-book fs-4 me-2"></i>
                          <span className="fs-5 fw-bold fs-3 text-bold ">Contact Data</span>
                        </div>
                      </Link>

                      <Link
                        to="/post_job"
                        // to="/sidebar/homeservices"
                        className={`list-group-item list-group-item-action my-2 ${pathname === "/post_job" ? "active" : null}`}
                        // onClick={() => handleItemClick("/career_data")}
                      >
                        <div className="list-item-hover">
                          {/* <i class="fa-solid fa-user-tie fs-4 me-2"></i> */}
                          <i class="fa-solid fa-newspaper fs-4 me-2"></i>
                          <span className="fs-5 fw-bold fs-3 text-bold ">Post a Job</span>
                        </div>
                      </Link>
                      <Link
                        to="/career_data"
                        // to="/sidebar/homeservices"
                        className={`list-group-item list-group-item-action my-2 ${pathname === "/career_data" ? "active" : null}`}
                        onClick={() => handleItemClick("/career_data")}
                      >
                        <div className="list-item-hover">
                          <i class="fa-solid fa-user-tie fs-4 me-2"></i>
                          <span className="fs-5 fw-bold fs-3 text-bold ">Job Forms Details</span>
                        </div>
                      </Link>


                      <Link
                        to="/profile"
                        className={`list-group-item list-group-item-action my-2 ${pathname === "/profile" ? "active" : null}`}
                        onClick={() => handleItemClick("/profile")}
                      >
                        <div className="list-item-hover">
                          <i className="fa-solid fa-address-card fs-4 me-2"></i>
                          <span className="fs-5 fw-bold fs-3 text-bold">Profile</span>
                        </div>
                      </Link>

                      <Link
                        to="/connectors"
                        className={`list-group-item list-group-item-action my-2 ${pathname === "/connectors" ? "active" : null}`}
                        onClick={() => handleItemClick("/connectors")}
                      >
                        <div className="list-item-hover">
                          {/* <i className="fa-solid fa-message fs-4 me-2"></i> */}
                          <i class="fa-solid fa-circle-nodes fs-4 me-2"></i>
                          <span className="fs-5 fw-bold fs-3 text-bold">Connectors</span>
                        </div>
                      </Link>


                      <Link
                        to="/employees"
                        className={`list-group-item list-group-item-action my-2 ${pathname === "/employees" ? "active" : null}`}
                        onClick={() => handleItemClick("/employees")}
                      >
                        <div className="list-item-hover">
                          {/* <i className="fa-solid fa-message fs-4 me-2"></i> */}
                          <i class="fa-solid fa-users-rectangle fs-4 me-2"></i>
                          <span className="fs-5 fw-bold fs-3 text-bold">Employees</span>
                        </div>
                      </Link>

                      <Link
                        to="/add_employee"
                        className={`list-group-item list-group-item-action my-2 ${pathname === "/add_employee" ? "active" : null}`}
                        onClick={() => handleItemClick("/add_employee")}
                      >
                        <div className="list-item-hover">
                          {/* <i className="fa-solid fa-message fs-4 me-2"></i> */}
                          <i class="fa-solid fa-user-plus fs-4 me-2"></i>
                          <span className="fs-5 fw-bold fs-3 text-bold">Add Employee</span>
                        </div>
                      </Link>

                      <Link
                        to="/testmonial"
                        className={`list-group-item list-group-item-action my-2 ${pathname === "/testmonial" ? "active" : null}`}
                        onClick={() => handleItemClick("/testmonial")}
                      >
                        <div className="list-item-hover">
                          {/* <i className="bi bi-power fs-5 me-2"></i> */}
                          <i className="fa-solid fa-message fs-4 me-2"></i>
                          <span className="fs-5 fw-bold fs-3 text-bold">Add Testimonial</span>
                        </div>
                      </Link>

                      <Link
                        to="/sendblog"
                        className={`list-group-item list-group-item-action my-2 ${pathname === "/sendblog" ? "active" : null}`}
                        onClick={() => handleItemClick("/testmonial")}
                      >
                        <div className="list-item-hover">
                          {/* <i className="bi bi-power fs-5 me-2"></i> */}
                          <i className="fa-brands fa-blogger-b fs-4 me-2"></i>
                          <span className="fs-5 fw-bold fs-3 text-bold">Write Blog</span>
                        </div>
                      </Link>

                      <Link
                        to="/galleryimages"
                        className={`list-group-item list-group-item-action my-2 ${pathname === "/galleryimages" ? "active" : null}`}
                        onClick={() => handleItemClick("/galleryimages")}
                      >
                        <div className="list-item-hover">
                          {/* <i className="bi bi-power fs-5 me-2"></i> */}
                          {/* <i className="fa-solid fa-image fs-4 me-2"></i> */}
                          <i class="fa-solid fa-images fs-4 me-2"></i>
                          <span className="fs-5 fw-bold fs-3 text-bold">Add Carousel Image</span>
                        </div>
                      </Link>
                      <Link
                        to="/upload_gallery"
                        className={`list-group-item list-group-item-action my-2 ${pathname === "/upload_gallery" ? "active" : null}`}
                        onClick={() => handleItemClick("/upload_gallery")}
                      >
                        <div className="list-item-hover">
                          {/* <i className="bi bi-power fs-5 me-2"></i> */}
                          <i className="fa-solid fa-image fs-4 me-2"></i>
                          <span className="fs-5 fw-bold fs-3 text-bold">Add Gallery Images</span>
                        </div>
                      </Link>

                      <Link
                        to="/login"
                        className={`list-group-item list-group-item-action my-2 ${pathname === "/login" ? "active" : null}`}
                        onClick={handleLogout}
                      >
                        <div className="list-item-hover">
                          <i className="bi bi-power fs-5 me-2"></i>
                          <span className="fs-5 fw-bold fs-3 text-bold">Logout</span>
                        </div>
                      </Link>

                    </> : null
                }
                {/* Connector================================================= */}
                {
                  user_type === "Connector" ?
                    <ConnectorSidebar /> : null
                }
                {
                  user_type === "Employee-2" ?
                    <>
                      <Link
                        to="/profile"
                        className={`list-group-item list-group-item-action my-2 ${pathname === "/profile" ? "active" : null}`}
                        onClick={() => handleItemClick("/profile")}
                      >
                        <div className="list-item-hover">
                          <i className="fa-solid fa-address-card fs-4 me-2"></i>
                          <span className="fs-5 fw-bold fs-3 text-bold">Profile</span>
                        </div>
                      </Link>

                      <Link
                        to="/employee_data"
                        // to="/sidebar/homeservices"
                        className={`list-group-item list-group-item-action my-2 ${pathname === "/employee_data" ? "active" : null}`}
                        onClick={() => handleItemClick("/employee_data")}
                      >
                        <div className="list-item-hover">
                          <i className="fa-solid fa-house fs-4 me-2"></i>
                          <span className="fs-5 fw-bold fs-3 text-bold ">Home</span>
                        </div>
                      </Link>

                      <Link
                        to="/login"
                        className={`list-group-item list-group-item-action my-2 ${pathname === "/login" ? "active" : null}`}
                        onClick={handleLogout}
                      >
                        <div className="list-item-hover">
                          <i className="bi bi-power fs-4 me-2"></i>
                          <span className="fs-5 fw-bold fs-3 text-bold">Logout</span>
                        </div>
                      </Link>

                      {/* <EmployeeDashboardTable/> */}
                    </> : null
                }
                {
                  user_type === "Employee-1" ?
                    <>
                      <Rmsidebar />
                    </> : null
                }
                {
                  user_type === "Employee-3" ?
                    <>
                      <Link
                        to="/profile"
                        className={`list-group-item list-group-item-action my-2 ${pathname === "/profile" ? "active" : null}`}
                        onClick={() => handleItemClick("/profile")}
                      >
                        <div className="list-item-hover">
                          <i className="fa-solid fa-address-card fs-4 me-2"></i>
                          <span className="fs-5 fw-bold fs-3 text-bold">Profile</span>
                        </div>
                      </Link>

                      <Link
                        to="/field_staff/work_report"
                        className={`list-group-item list-group-item-action my-2 ${pathname === "/field_staff/work_report" ? "active" : null}`}
                      // onClick={() => handleItemClick("/work_report")}
                      >
                        <div className="list-item-hover">
                          <i class="fa-solid fa-briefcase me-2"></i>
                          <span className="fs-5 fw-bold fs-3 text-bold">Work Report</span>
                        </div>
                      </Link>

                      <Link
                        to="/login"
                        className={`list-group-item list-group-item-action my-2 ${pathname === "/login" ? "active" : null}`}
                        onClick={handleLogout}
                      >
                        <div className="list-item-hover">
                          <i className="bi bi-power fs-4 me-2"></i>
                          <span className="fs-5 fw-bold fs-3 text-bold">Logout</span>
                        </div>
                      </Link>


                      {/* <Rmsidebar /> */}

                    </> : null
                }

              </div>
            </div>
          </div>
        )}

        <div className={`col-${toggle ? '9' : '12'}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
