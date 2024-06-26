import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import "./Navbar.css";

// import "../node_modules/jquery/dist/jquery.min.js";
// import "../../node_modules/bootstrap/dist/js/jquery.min.js";
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";

import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import PARV from "../assets/images/brand/logo/PARV.jpg";
import axios from "axios";
import { backendUrl } from "../env.js";


const Navbar = () => {

  const [userData, setUserData] = useState();
  const { pathname } = useLocation();
  // console.log(pathname);
  const navigate = useNavigate();
  const handlelogout = async () => {
    localStorage.removeItem("userID");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  }

  useEffect(() => {
    const FetchUserDetails = async () => {
      const userID = localStorage.getItem("userID");
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn) {
        try {
          // const res = await axios.get(`https://us-central1-joyomoney-a8630.cloudfunctions.net/joyMoney/api/v1/getuserbyid/${userID}`)
          const res = await axios.get(`${backendUrl}/getuserbyid/${userID}`)
          console.log("Responce", res);
          setUserData(res?.data?.user);
        } catch (error) {
          console.log("error from fetch userDetails: ", error);
        }

      }
    }
    FetchUserDetails();
  }, [])

  return (
    <>

      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand " to="/">
            <img src={PARV} className="logo-img" />
          </Link>
          <button className="navbar-toggler collapsed toggler_button" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
            <ul className="navbar-nav pt-2">
              <li className="nav-item">
                <Link className={`nav-link ${pathname === "/" ? "active" : null}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${pathname === "/about" ? "active" : null}`} to="/about">About Us</Link>
              </li>
              <li className="nav-item dropdown">

                <Link
                  className={`nav-link`}
                  // to="/loan" 
                  // className="nav-link"
                  id="navbarDropdownMenuLink"
                  role="but"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                // activeclass="active"
                >
                  Loans <FontAwesomeIcon icon={faChevronDown} />
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><Link className={`dropdown-item ${pathname === "/homeloan" ? "active" : null}`} to="/homeloan">Home Loan</Link></li>
                  <li><Link className={`dropdown-item ${pathname === "/carloan" ? "active" : null}`} to="/carloan">Vehicle Loan</Link></li>
                  <li><Link className={`dropdown-item ${pathname === "/businessloan" ? "active" : null}`} to="/businessloan">Business Loan</Link></li>
                  <li>
                    <Link className={`dropdown-item ${pathname === "/personalloan" ? "active" : null}`} 
                    to="/personalloan">Personal Loan</Link>
                    </li>
                  
                  <li>
                    <Link className={`dropdown-item ${pathname === "/goldloan1" ? "active" : null}`} to="/goldloan1"> Gold Loan</Link>
                  </li>
                  <li>
                    <Link className={`dropdown-item ${pathname === "/goldloan1" ? "active" : null}`} 
                    to="https://partner.dealsofloan.com/#/login"
                    > Micro Loan</Link>
                  </li>
                 

                </ul>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${pathname === "/gallery" ? "active" : null}`} to="/gallery">Gallery</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${pathname === "/blog" ? "active" : null}`} to="/blog">Blog</Link>

              </li>
              <li className="nav-item">
                <Link className={`nav-link ${pathname === "/career" ? "active" : null}`} to="/career">Career</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${pathname === "/contact" ? "active" : null}`} to="/contact">Contact</Link>
              </li>
              {(localStorage.getItem("userID") === null) ?
                <>
                  <li className="nav-item">
                    <Link className={`nav-link ${pathname === "/login" ? "active" : null}`} to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${pathname === "/signup" ? "active" : null}`} to="/signup">Sign-up</Link>
                  </li>
                </>
                :
                <>
                  <li className="nav-item">
                    {/* <a className="nav-link" href="/sidebar">Dashboard</a> */}
                    {
                      (localStorage.getItem("user_type") === "Admin") ?
                        <Link className={`nav-link ${pathname === "/homeservices" ? "active" : null}`} to="/homeservices">Dashboard</Link>
                        : (localStorage.getItem("user_type") === "Connector") ?
                          <Link className={`nav-link ${pathname === "/profile" ? "active" : null}`} to="/profile">Dashboard</Link>
                          :
                          <Link className={`nav-link ${pathname === "/profile" ? "active" : null}`} to="/profile">Dashboard</Link>
                    }

                  </li>
                  <li className="nav-item">
                    {/* <button onClick={handlelogout} className="nav-link">Logout</button> */}
                    <p className="nav-link avatar" title={userData?.full_name}>{userData?.full_name.charAt(0)}</p>
                  </li>
                  
                </>
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

