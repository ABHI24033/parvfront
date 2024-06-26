import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import PARV from "../assets/images/brand/logo/PARV.jpg";
// import { Map, GoogleApiWrapper } from 'google-maps-react';

// const mapStyles = {
//   width: '100%',
//   height: '100%'
// };

const Footer = () => {
  return (
    <>
      <div style={{ backgroundColor: "#0c0c37" }} className="footer pt-8">
        <div className="container">
          {"        "}
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-sm-12 col-12">
              <div className="mb-4 mb-lg-0">
                {"                            "}
                <img
                  alt="Borrow  - Loan Company Website Templates"
                  src={PARV}
                  className="logo-img"
                />
              </div>
              {"                      "}
            </div>

            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
              {/* <form
                action="https://easetemplate.com/borrow/newsletter.php"
                className="row g-0 align-items-center newsletter"
                method="post"
              >
                <div className="col-md-4 col-12 mb-3 mb-md-0">
                  <h3 className="text-white mb-0 signup-text">Signup Our Newsletter</h3>
                </div>

                <div className="col-md-8 col-12">
                  <div>
                    <input
                      type="email"
                      className="input"
                      id="Email"
                      name="Email"
                      placeholder="Write email address"
                      autoComplete="off"
                    />
                    <input className="button--submit" value="Go" type="submit" />
                  </div>
                </div>
              </form> */}
            </div>
          </div>

          <hr className="my-6 opacity-25" />

          <div className="row mb-8">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="text-white mb-3">
                <p>
                  Our goal at Parv Financial Services is to provide access to Personal Loans,
                  Vehicle Loan, Home Loan, Business Loan at insight competitive
                  interest rates . We are the financial service provider, you
                  can use our Financial product.
                </p>
                <div xclassName="d-fle">
                  {/* <h2>GST No.-</h2> */}
                  <p>GST NO. : 10OCHPS7931B1ZJ</p>
                </div>

                <div className="row mt-6">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-3 mt-md-0">
                    <div className="d-flex">
                      <svg
                        className="bi bi-telephone text-white mt-1"
                        fill="currentColor"
                        height="20"
                        viewBox="0 0 16 16"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                      </svg>
                      <div className="ms-3 fs-3">9279142988</div>
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="d-flex">
                      <svg
                        className="bi bi-geo-alt text-white mt-1"
                        fill="currentColor"
                        height="28"
                        viewBox="0 0 16 16"
                        width="48"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />

                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                      </svg>

                      <div className="ms-3">
                        <span>REGD. OFFICE-</span>
                        HOTEL NEW MAYUR, DUMRAO ROAD, BIKRAMGANJ, ROHTAS BIHAR 802212.

                      </div>
                      </div>
                      <div className="d-flex">
                        <svg
                          className="bi bi-geo-alt text-white mt-1"
                          fill="currentColor"
                          height="28"
                          viewBox="0 0 16 16"
                          width="48"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />

                          <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>

                        <div className="ms-3">
                          <span>Admin office-</span>
                          Maurya Vihar colony, Near Ultra tech cement godown, Landmark- BMP-16, Phulwarishariff Patna 801505.

                        </div>

                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="d-flex">
                        <svg xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          fill="currentColor"
                          className="bi bi-clock text-white mt-1"
                          viewBox="0 0 16 16">
                          <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                        </svg>
                        <div className="ms-3">
                          <span>WORKING HOURS- </span>
                          10 AM to 6 PM  ( Monday - Saturday)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-6">
                <div className="mb-3 footer-links">
                  {"                            "}
                  <ul className="list-unstyled text-muted">
                    <li className="d-flex">
                      {"                  "}
                      <a className="fs-5" href="/">
                        {"                    "}
                        <i className="bi bi-chevron-right fs-6 me-2" />
                        Home
                      </a>
                    </li>

                    <li className="d-flex">
                      {"                  "}
                      <a className="fs-5" href="/gallery">
                        {"                    "}
                        <i className="bi bi-chevron-right fs-6 me-2" />
                        Gallery
                      </a>
                    </li>

                    <li className="d-flex">
                      {"                  "}
                      <a className="fs-5" href="/about">
                        {"                    "}
                        <i className="bi bi-chevron-right fs-6 me-2" />
                        About Us
                      </a>
                    </li>

                    <li className="d-flex">
                      {"                  "}
                      <a className="fs-5" href="/termcondation">
                        {"                    "}
                        <i className="bi bi-chevron-right fs-6 me-2" />
                        Privacy Policy
                      </a>
                    </li>
                    <li className="d-flex">
                      {"                  "}
                      <a className="fs-5" href="/termcondation">
                        {"                    "}
                        <i className="bi bi-chevron-right fs-6 me-2" />
                        Term & Condition
                      </a>
                    </li>

                    <li className="d-flex">
                      {"                  "}
                      <a className="fs-5" href="/contact">
                        {"                    "}
                        <i className="bi bi-chevron-right fs-6 me-2" />
                        Contact Us
                      </a>
                    </li>
                    {"              "}
                  </ul>
                </div>
                {"                      "}
                <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-6">
                  {/* <iframe
                    // src="https://www.google.com/maps/search/parv+financial+services/@25.4034252,84.0123177,9z/data=!3m1!4b1?entry=ttu"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.3929195665055!2d84.2614758745365!3d25.2236876306288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398d9e2c64cf6b71%3A0x94949031d5d464c7!2sHotel%20new%20Mayur!5e0!3m2!1sen!2sin!4v1709198189136!5m2!1sen!2sin"
                    style={{ border: "0" }}
                    // width="450" height="200" 
                    className="maps"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"></iframe> */}

<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d924004.6081533362!2d83.11046364687493!3d25.223684900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398d9f4fafc4cdc3%3A0xde2573891120ae88!2sPARV%20FINANCIAL%20SERVICES!5e0!3m2!1sen!2sin!4v1715190621513!5m2!1sen!2sin" width="500" height="200" style={{border:0}} allowfullscreen="" className="maps" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
              </div>

              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-6">
                <div className="mb-3 footer-links">
                  {"                            "}
                  <ul className="list-unstyled text-muted">
                    <li className="d-flex">
                      {"                  "}
                      <a className="fs-5" href="/personalloan">
                        {"                    "}
                        <i className="bi bi-chevron-right fs-6 me-2" />
                        {/*Car Loan*/}Personal Loan
                      </a>
                    </li>

                    <li className="d-flex">
                      {"                  "}
                      <a className="fs-5" href="/businessloan">
                        {"                    "}
                        <i className="bi bi-chevron-right fs-6 me-2" />
                        {/*Personal Loan*/}Business Loan
                      </a>
                    </li>

                    <li className="d-flex">
                      {"                  "}
                      <a className="fs-5" href="/homeloan">
                        {"                    "}
                        <i className="bi bi-chevron-right fs-6 me-2" />
                        {/*Gold Loan*/}Home Loan
                      </a>
                    </li>

                    <li className="d-flex">
                      {"                  "}
                      <a className="fs-5" href="/businessloan">
                        {"                    "}
                        <i className="bi bi-chevron-right fs-6 me-2" />
                        {/*Business Loan*/}Loan against property
                      </a>
                    </li>

                    <li className="d-flex">
                      {"                  "}
                      <a className="fs-5" href="https://partner.dealsofloan.com/#/login">
                        {"                    "}
                        <i className="bi bi-chevron-right fs-6 me-2" />
                        {/* Home LoanL & T Personal loan */}
                        {/*Home Loan*/}Micro loan
                      </a>
                    </li>

                    <li className="d-flex">
                      {"                  "}
                      <a className="fs-5" href="/carloan">
                        {"                    "}
                        <i className="bi bi-chevron-right fs-6 me-2" />
                        {/*Student Loan*/}Auto loan
                      </a>
                    </li>
                    {/* <li className="d-flex">
                    {"                  "}
                    <a className="fs-5" href="/studentloan">
                      {"                    "}
                      <i className="bi bi-chevron-right fs-6 me-2" />
                      New loan enquiry form  
                    </a>
                  </li>
                  <li className="d-flex">
                    {"                  "}
                    <a className="fs-5" href="/studentloan">
                      {"                    "}
                      <i className="bi bi-chevron-right fs-6 me-2" />
                      Micro Loan  
                    </a>
                  </li>*/}

                    {"              "}
                  </ul>
                </div>
                {"                      "}
              </div>


              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-6">
                <div className="mb-3">
                  {/* widget footer */}
                  <ul className="list-unstyled text-muted social-icons">
                    <li className="d-flex">
                      <a href="#!">
                        <FontAwesomeIcon
                          icon={faFacebook}
                          className="me-2 fs-5"
                        />
                        Facebook
                      </a>
                    </li>
                    <li className="d-flex">
                      <a href="#!">
                        <FontAwesomeIcon icon={faGoogle} className="me-2 fs-5" />
                        Google
                      </a>
                    </li>
                    <li className="d-flex">
                      <a href="#!">
                        <FontAwesomeIcon icon={faTwitter} className="me-2 fs-5" />
                        Twitter
                      </a>
                    </li>
                    <li className="d-flex">
                      <a href="#!">
                        <FontAwesomeIcon
                          icon={faLinkedin}
                          className="me-2 fs-5"
                        />
                        LinkedIn
                      </a>
                    </li>
                  </ul>
                </div>


                {/* /.widget footer */}
              </div>



              {"        "}
            </div>
            {"        "}
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <p className="fs-6 text-muted">
                  © Copyright 2023 | Parv Finance
                  {"            "}
                  {/* © Copyright 2023 | Joyoglobe Technologies LLP */}
                </p>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 text-md-end">
                <p className="fs-6 text-muted">
                  {"              "}
                  <a className="text-inherit" href="/termcondation">
                    Terms of use
                  </a>{" "}
                  |{"              "}
                  <a className="text-inherit" href="/termcondation">
                    Privacy Policy
                  </a>
                </p>
              </div>
              {"        "}
            </div>
            {"      "}
          </div>
          {"    "}
        </div>
      </>
      );
};

      export default Footer;
