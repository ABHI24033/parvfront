import React, { useEffect, useState } from "react";
import "./Businessloan.css";

import { tns } from "tiny-slider/src/tiny-slider";
import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  // faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
// import Logoimg1 from "../../assets/images/brand/company-logo/lender-logo-1.png";
import Logoimg1 from "../../../assets/images/brand/company-logo/lender-logo-1.png";
import Logoimg2 from "../../../assets/images/brand/company-logo/lender-logo-2.png";
import Logoimg3 from "../../../assets/images/brand/company-logo/lender-logo-3.png";
import Logoimg4 from "../../../assets/images/brand/company-logo/lender-logo-4.png";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { backendUrl } from "../../../env";
// import BusinessLoanForm from "../..Loansform/BusinessLoanForm";
import BusinessLoanForm from "../../Loansform/BusinessLoanForm";

const BusinessLoan = () => {


  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    // Initialize the Tiny Slider
    const slider = tns({
      container: ".sliderFirst",
      items: 1,
      controlsContainer: "#sliderFirstControls",
      prevButton: ".prev",
      nextButton: ".next",
    });
    document.querySelector(".tns-nav").style.display = "none";
    // Clean up on component unmount
    return () => {
      slider.destroy();
    };
  }, []);

  const [paramvalue, setParamvalue] = useState(null);


  useEffect(() => {
    if (location.state) {
      setParamvalue(location.state.param);
    }
    // Now paramValue contains the value passed through state
  }, [location.state, paramvalue]);

  const [textDisabld, setTextDisabld] = useState(false);

  const [dividendArr, setDividendArr] = useState([
    {
      bank_name: "",
      account_type: "",
      branch_name: "",
      salary: "",
    },
  ]);

  const [dividendArr1, setDividendArr1] = useState([
    {
      bank_nbfc: '',
      account_type: "",
      emi: "",
      pandding: "",

    },
  ]);
  const [dividendArr2, setDividendArr2] = useState([
    {
      co_bank_name: "",
      co_account_type: "",
      co_branch_name: "",
    },
  ]);

  const [dividendArr3, setDividendArr3] = useState([
    {
      co_loan_type: "",
      co_bank_nbfc: "",
      co_emi: "",
      co_pandding: "",
    },
  ]);

  const [dividendArr4, setDividendArr4] = useState([
    {
      guar_fname: "",
      guar_mname: "",
      guar_lname: "",
      guar_email: "",
      guar_phone: "",
      guar_purpose_of_loan: "",
      guar_fathers_name: "",
      guar_mothers_name: "",
      guar_marital_status: "",
      guar_spouse_name: "",
      guar_alternate_number: "",
      guar_date_of_birth: "",
      guar_pancard_number: "",
      guar_permanent_address: "",
      guar_land_mark: "",
      guar_village: "",
      guar_city: "",
      guar_state: "",
      guar_pincode: "",
      guar_relation: "",
    },
  ]);
  const [dividendArr5, setDividendArr5] = useState([
    {
      guar_bank_name: '',
      guar_account_type: '',
      guar_branch_name: '',
    },
  ]);
  const [dividendArr6, setDividendArr6] = useState([
    {
      guar_bank_nbfc: '',
      guar_loan_type: '',
      guar_emi: '',
      guar_pandding: '',
    },
  ]);


  const handleAdd = () => {
    setDividendArr([
      ...dividendArr,
      {
        bank_name: "",
        account_type: "",
        branch_name: "",
        salary: "",
      },
    ]);
  };
  const handleAdd1 = () => {
    setDividendArr1([
      ...dividendArr1,
      {
        bank_nbfc: '',
        loan_type: '',
        emi: '',
        pandding: '',
      },
    ]);
  };
  const handleAdd2 = () => {
    setDividendArr2([
      ...dividendArr2,
      {
        co_bank_name: "",
        co_account_type: "",
        co_branch_name: "",
      },
    ]);
  };
  const handleAdd3 = () => {
    setDividendArr3([
      ...dividendArr3,
      {
        co_bank_nbfc: '',
        co_loan_type: '',
        co_emi: '',
        co_pandding: '',
      },
    ]);
  };
  const handleAdd4 = () => {
    setDividendArr4([
      ...dividendArr4,
      {

        guar_fname: "",
        guar_mname: "",
        guar_lname: "",
        guar_email: "",
        guar_phone: "",
        guar_purpose_of_loan: "",
        guar_fathers_name: "",
        guar_mothers_name: "",
        guar_marital_status: "",
        guar_spouse_name: "",
        guar_alternate_number: "",
        guar_date_of_birth: "",
        guar_pancard_number: "",
        guar_permanent_address: "",
        // guar_residential_address: "",
        guar_land_mark: "",
        guar_village: "",
        guar_city: "",
        guar_state: "",
        guar_pincode: "",
        guar_relation: "",

      },
    ]);
  };
  const handleAdd5 = () => {
    setDividendArr5([
      ...dividendArr5,
      {
        guar_bank_name: '',
        guar_account_type: '',
        guar_branch_name: '',
      },
    ]);
  };

  const handleAdd6 = () => {
    setDividendArr6([
      ...dividendArr6,
      {
        guar_bank_nbfc: '',
        guar_loan_type: '',
        guar_emi: '',
        guar_pandding: '',
      },
    ]);
  };


  const handleInputChange1 = (e, index) => {
    const { name, value } = e.target;
    console.log("value", e.target.value);
    const list = [...dividendArr];
    list[index][name] = value;
    setDividendArr(list);
  };

  const handleInputChange2 = (e, index) => {
    const { name, value } = e.target;
    console.log("value", e.target.value);
    const list = [...dividendArr1];
    list[index][name] = value;
    setDividendArr1(list);
  };
  const handleInputChange3 = (e, index) => {
    const { name, value } = e.target;
    console.log("value", e.target.value);
    const list = [...dividendArr2];
    list[index][name] = value;
    setDividendArr2(list);
  };
  const handleInputChange4 = (e, index) => {
    const { name, value } = e.target;
    console.log("value", e.target.value);
    const list = [...dividendArr3];
    list[index][name] = value;
    setDividendArr3(list);
  };

  const handleInputChange5 = (e, index) => {
    const { name, value } = e.target;
    console.log("value", e.target.value);
    const list = [...dividendArr4];
    list[index][name] = value;
    setDividendArr4(list);
  };
  const handleInputChange6 = (e, index) => {
    const { name, value } = e.target;
    console.log("value", e.target.value);
    const list = [...dividendArr5];
    list[index][name] = value;
    setDividendArr5(list);
  };

  const handleInputChange7 = (e, index) => {
    const { name, value } = e.target;
    console.log("value", e.target.value);
    const list = [...dividendArr6];
    list[index][name] = value;
    setDividendArr6(list);
  };

  const handleRemove = (index) => {
    if (dividendArr.length > 0) {
      const listArr = [...dividendArr];
      listArr.splice(index, 1);
      setDividendArr(listArr);
    }
  };
  const handleRemove1 = (index) => {
    if (dividendArr1.length > 0) {
      const listArr = [...dividendArr1];
      listArr.splice(index, 1);
      setDividendArr1(listArr);
    }
  };

  const handleRemove2 = (index) => {
    if (dividendArr2.length > 0) {
      const listArr = [...dividendArr2];
      listArr.splice(index, 1);
      setDividendArr2(listArr);
    }
  };

  const handleRemove3 = (index) => {
    if (dividendArr3.length > 0) {
      const listArr = [...dividendArr3];
      listArr.splice(index, 1);
      setDividendArr3(listArr);
    }
  };

  const handleRemove4 = (index) => {
    if (dividendArr4.length > 0) {
      const listArr = [...dividendArr4];
      listArr.splice(index, 1);
      setDividendArr4(listArr);
    }
  };
  const handleRemove5 = (index) => {
    if (dividendArr5.length > 0) {
      const listArr = [...dividendArr5];
      listArr.splice(index, 1);
      setDividendArr5(listArr);
    }
  };

  const handleRemove6 = (index) => {
    if (dividendArr6.length > 0) {
      const listArr = [...dividendArr6];
      listArr.splice(index, 1);
      setDividendArr6(listArr);
    }
  };


  const [selectedLanguage, setSelectedLanguage] = useState("");

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  let newformData = new FormData();
  const userId = localStorage.getItem("userID");
  const [formData, setFormData] = useState({
    userID: localStorage.getItem("userID"),
    application_no: "",
    fname: "",
    mname: "",
    lname: "",
    email: "",
    phone: "",
    purpose_of_loan: "",
    fathers_name: "",
    mothers_name: "",
    marital_status: "",
    spouse_name: "",
    alternate_number: "",
    date_of_birth: "",
    pancard_number: "",
    permanent_address: "",
    residential_address: "",
    landmark: "",
    village: "",
    city: "",
    state: "",
    pincode: "",
    branch_name: "",
    bank_name: "",
    account_type: "",
    loan_type: "",
    emi: "",
    pandding: "",
    salary: "",

    co_application_no: "",
    co_fname: "",
    co_mname: "",
    co_lname: "",
    co_email: "",
    co_phone: "",
    co_purpose_of_loan: "",
    co_fathers_name: "",
    co_mothers_name: "",
    co_marital_status: "",
    co_spouse_name: "",
    co_alternate_number: "",
    co_date_of_birth: "",
    co_pancard_number: "",
    co_permanent_address: "",
    co_land_mark: "",
    co_village: "",
    co_city: "",
    co_state: "",
    co_pincode: "",
    co_branch_name: "",
    co_bank_name: "",
    co_account_type: "",
    co_emi: "",
    co_pandding: "",
    co_relation: "",

    guar_fname: "",
    guar_mname: "",
    guar_lname: "",
    guar_email: "",
    guar_phone: "",
    guar_purpose_of_loan: "",
    guar_fathers_name: "",
    guar_mothers_name: "",
    guar_marital_status: "",
    guar_spouse_name: "",
    guar_alternate_number: "",
    guar_date_of_birth: "",
    guar_pancard_number: "",
    guar_permanent_address: "",
    guar_land_mark: "",
    guar_village: "",
    guar_city: "",
    guar_state: "",
    guar_pincode: "",
    guar_bank_name: '',
    guar_account_type: '',
    guar_branch_name: '',
    guar_bank_nbfc: '',
    guar_loan_type: '',
    guar_emi: '',
    guar_pandding: '',
    guar_relation: "",

  });

  const [formData2, setFormData2] = useState({
    first_month_bank_statement: null,
    second_month_bank_statement: null,
    third_month_bank_statement: null,
    itr: null,
    address_proof: null,
    adhar_front: null,
    adhar_back: null,
    pancard: null,
    applicant_photo: null,
    vintage_proof: null,
    form_three: null,
    trade_licence: null,
    business_registration_certificate: null,
    guar_registration_proof: null,
  })


  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: null }); // Clear errors for the changed field
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];

    // Ensure the selected file is a PDF file
    if (file && (file.type === "application/pdf" || file.type === "image/png" || file.type === "image/jpeg")) {
      // Update the specific field in formData
      setFormData2({
        ...formData2,
        [fieldName]: file,
      });
    } else {
      // Handle the case where the selected file is not a PDF
      alert("Please select a PDF file.");
      e.target.value = null; // Clear the input field
    }
  };

  // console.log(formData2);

 

  return (
    <>
      <main>
        <section>
          <div className="position-relative">
            <ul className="controls" id="sliderFirstControls">
              <li className="prev">
                <FontAwesomeIcon icon={faArrowLeft} />
              </li>

              <li className="next">
                <FontAwesomeIcon icon={faArrowRight} />
              </li>
            </ul>
            <div className="sliderFirst">
              <div className="item">
                <div className="py-22 businessloan-banner-one">
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-8 col-lg-9 col-md-12 col-sm-12 col-12">
                        <div>
                          {/* slider-captions */}
                          <h1 className="display-2 text-white fw-bold">
                            Hassle free Small Business loan up to 3000000.00

                          </h1>
                          <p className="d-none d-xl-block d-lg-block d-sm-block text-white mb-4">
                            Business Loan From parv Financial Services At An Attractive Rate Of Interest. Apply Now!
                          </p>
                        </div>
                        {/* /.slider-captions */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="py-22 businessloan-banner-two ">
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-9 col-md-12 col-sm-12 col-12">
                        <div>
                          {/* slider-captions */}
                          <h1 className="display-2 text-white fw-bold">
                            The key to business growth with Borrow Theme{" "}
                          </h1>
                          <p className=" d-none d-xl-block d-lg-block d-sm-block text-white mb-4">
                            The low rate you need for the need you want! Call
                            <strong>02269620449</strong>
                          </p>
                        </div>
                        {/* /.slider-captions */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="py-22 businessloan-banner-three">
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-8 col-lg-9 col-md-12 col-sm-12 col-12">
                        <div>
                          {/* slider-captions */}
                          <h1 className="display-2 text-white fw-bold">
                            Looking to set up or expand your business?{" "}
                          </h1>
                          <p className=" d-none d-xl-block d-lg-block d-sm-block text-white mb-4">
                            {" "}
                            Award winning car loans with low fixed rates and no
                            ongoing fees.
                          </p>
                        </div>
                        {/* /.slider-captions */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="py-2 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-sm-6 col-12 ">
                <p className="mb-3 mb-lg-0 fw-semi-bold text-dark text-xl-center d-lg-flex d-xl-block">
                  <i className="bi bi-check-circle-fill text-success me-2" />{" "}
                  Approval within 24 hours{" "}
                </p>
              </div>
              <div className="col-md-3 col-sm-6 col-12 ">
                <p className="mb-3 mb-lg-0 fw-semi-bold text-dark text-xl-center d-lg-flex d-xl-block">
                  <i className="bi bi-check-circle-fill text-success me-2" />{" "}
                  Nominal interest rates
                </p>
              </div>
              <div className="col-md-3 col-sm-6 col-12 ">
                <p className="mb-3 mb-lg-0 fw-semi-bold text-dark text-xl-center d-lg-flex d-xl-block">
                  <i className="bi bi-check-circle-fill text-success me-2" /> No
                  guarantors{" "}
                </p>
              </div>
              <div className="col-md-3 col-sm-6 col-12 ">
                <p className="mb-3 mb-lg-0 fw-semi-bold text-dark text-xl-center d-lg-flex d-xl-block">
                  <i className="bi bi-check-circle-fill text-success me-2" />{" "}
                  Minimum documentation
                </p>
              </div>
            </div>
          </div>
        </div>
        <section className="py-lg-6 py-8 bg-white border-bottom border-top ">
          <div className="container">
            <div className="row">
              <div className="offset-xl-2 col-xl-8  col-md-12 col-12">
                <div className="mb-10 text-center">
                  {/* section title start*/}
                  <h1>Features of business loan</h1>
                  <p className="lead">
                    Here is an exhaustive list of all the fees and charges to be
                    paid for the education loan.
                  </p>
                </div>
                {/* /.section title start*/}
              </div>
            </div>
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                <div className="card text-center mb-4 mb-lg-0">
                  <div className="card-body py-6">
                    <div className="icon-shape icon-xxxl bg-light-primary rounded-circle mb-4 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={32}
                        height={32}
                        fill="currentColor"
                        className="bi bi-lightning-fill text-dark-primary"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5z" />
                      </svg>
                    </div>
                    <div>
                      <h3>Quick approval </h3>
                      <p>

                        "Swift loan approval—get the funds you need quickly. Hassle-free process for immediate financial support."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                <div className="card text-center mb-4 mb-lg-0">
                  <div className="card-body py-6">
                    <div className="icon-shape icon-xxxl bg-light-success rounded-circle mb-4 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={32}
                        height={32}
                        fill="currentColor"
                        className="bi bi-arrow-clockwise text-dark-success"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                        />
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                      </svg>
                    </div>
                    <div>
                      <h3>Easy Loan Repayment</h3>
                      <p>

                        "Simplify your life with easy loan repayment options. Manage finances effortlessly with flexible and convenient repayment ."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="card text-center mb-4 mb-lg-0">
                  <div className="card-body py-6">
                    <div className="icon-shape icon-xxxl bg-light-warning rounded-circle mb-4 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={32}
                        height={32}
                        fill="currentColor"
                        className="bi bi-cup-straw text-dark-warning"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.902.334a.5.5 0 0 1-.28.65l-2.254.902-.4 1.927c.376.095.715.215.972.367.228.135.56.396.56.82 0 .046-.004.09-.011.132l-.962 9.068a1.28 1.28 0 0 1-.524.93c-.488.34-1.494.87-3.01.87-1.516 0-2.522-.53-3.01-.87a1.28 1.28 0 0 1-.524-.93L3.51 5.132A.78.78 0 0 1 3.5 5c0-.424.332-.685.56-.82.262-.154.607-.276.99-.372C5.824 3.614 6.867 3.5 8 3.5c.712 0 1.389.045 1.985.127l.464-2.215a.5.5 0 0 1 .303-.356l2.5-1a.5.5 0 0 1 .65.278zM9.768 4.607A13.991 13.991 0 0 0 8 4.5c-1.076 0-2.033.11-2.707.278A3.284 3.284 0 0 0 4.645 5c.146.073.362.15.648.222C5.967 5.39 6.924 5.5 8 5.5c.571 0 1.109-.03 1.588-.085l.18-.808zm.292 1.756C9.445 6.45 8.742 6.5 8 6.5c-1.133 0-2.176-.114-2.95-.308a5.514 5.514 0 0 1-.435-.127l.838 8.03c.013.121.06.186.102.215.357.249 1.168.69 2.438.69 1.27 0 2.081-.441 2.438-.69.042-.029.09-.094.102-.215l.852-8.03a5.517 5.517 0 0 1-.435.127 8.88 8.88 0 0 1-.89.17zM4.467 4.884s.003.002.005.006l-.005-.006zm7.066 0-.005.006c.002-.004.005-.006.005-.006zM11.354 5a3.174 3.174 0 0 0-.604-.21l-.099.445.055-.013c.286-.072.502-.149.648-.222z" />
                      </svg>
                    </div>
                    <div>
                      <h3>100% Transparency</h3>
                      <p>

                        "Unmatched integrity: Embrace clarity with our commitment to 100% transparency. Your trust is our priority. "
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-lg-6 py-6">
          <div className="container">
            <div className="row">
              <div className="offset-xl-3 col-xl-6 offset-md-2 col-md-8 offset-md-2 col-md-8 col-sm-12 col-12">
                <div className="mb-6 text-center">
                  {/* section title start*/}
                  <h1>Our Business Loan Products</h1>
                  <p className="mb-0 lead">
                    If you know which productyou would like to apply for, choose
                    one from below:
                  </p>
                </div>
                {/* /.section title start*/}
              </div>
            </div>
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-4 col-12">
                <div className="card smooth-shadow-sm border-0 text-center mb-4">
                  <div className="card-body px-6 py-5">
                    <div className="mb-3">
                      <i className="flaticon-get-money fs-1 text-primary" />
                    </div>
                    <div className>
                      <h3>Fast Business Cash</h3>
                      <p className="mb-0">

                        "Fuel your business with rapid cash solutions, Accelerate success with us."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-4 col-12">
                <div className="card smooth-shadow-sm border-0 text-center mb-4">
                  <div className="card-body px-6 py-5">
                    <div className="mb-3">
                      <i className="flaticon-time-is-money  fs-1 text-primary" />
                    </div>
                    <div className>
                      <h3>Flexible Credit Line</h3>
                      <p className="mb-0">


                        "Unlock financial freedom with our flexible credit line.  evolving needs and aspirations."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-4 col-12">
                <div className="card smooth-shadow-sm border-0 text-center mb-4">
                  <div className="card-body px-6 py-5">
                    <div className="mb-3">
                      <i className="flaticon-rich  fs-1 text-primary" />
                    </div>
                    <div className>
                      <h3>Unsecured Term Loan</h3>
                      <p className="mb-0">

                        "Secure your goals with an unsecured term loan, without collateral worries.".
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-4 col-12">
                <div className="card smooth-shadow-sm border-0 text-center mb-4">
                  <div className="card-body px-6 py-5">
                    <div className="mb-3">
                      <i className="flaticon-store-1  fs-1 text-primary" />
                    </div>
                    <div className>
                      <h3>Merchant Funding Loan</h3>
                      <p className="mb-0">
                        "Empower your business with our Merchant Funding Loan Yours"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-4 col-12">
                <div className="card smooth-shadow-sm border-0 text-center mb-4">
                  <div className="card-body px-6 py-5">
                    <div className="mb-3">
                      <i className="flaticon-stand  fs-1 text-primary" />
                    </div>
                    <div className="loan-products-content">
                      <h3>Small Business owner</h3>
                      <p className="mb-0">
                        "Attention, small business owners! Navigate growth confidently"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-4 col-12">
                <div className="card smooth-shadow-sm border-0 text-center">
                  <div className="card-body px-6 py-5">
                    <div className="mb-3">
                      <i className="flaticon-safebox-1  fs-1 text-primary" />
                    </div>
                    <div className="loan-products-content">
                      <h3>Secured Business Loan </h3>
                      <p className="mb-0">

                        "Secure your business's future with our tailored Secured Business Loan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {
          // localStorage.getItem("userID") !== null ? <BusinessLoanForm /> : null
          localStorage.getItem("userID") !== null ? <BusinessLoanForm /> : null
        }


      
      </main>
    </>
  );
};

export default BusinessLoan;
