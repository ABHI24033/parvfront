import React, { useState } from "react";
// import "../About.jsx";
import Featureimg from "../../../assets/images/background/lp-feature-img.jpg";
import axios from 'axios';
import { backendUrl } from "../../../env.js";
// import CarLoanForm from "./CarLoanForm.jsx";
import VehicleLoanForm from "../../Loansform/VehicleLoanForm.jsx";

const CarLone = () => {
  let newformData = new FormData();
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };


  const [dividendArr, setDividendArr] = useState([
    {
      bank_name: "",
      account_type: "",
      account_number: "",
      remark: " ",

    },
  ]);


  const [dividendArr1, setDividendArr1] = useState([
    {
      pan_no: "",
      adhar_no: "",
      spouse_name: "",
      loan_type: "",
      spouse_dob: "",
      dob: "",
      voter_id: "",
      bank_nbfc: "",
      emi: "",
      pandding: "",
    },
  ]);

  const [dividendArr2, setDividendArr2] = useState([
    {
      co_bank_name: "",
      co_account_type: "",
      co_account_number: "",
      co_remark: "",

    },
  ]);

  const [dividendArr3, setDividendArr3] = useState([
    {
      co_pan_no: "",
      co_adhar_no: "",
      co_spouse_name: "",
      co_loan_type: "",
      co_spouse_dob: "",
      co_dob: "",
      co_voter_id: "",
      co_bank_nbfc: "",
      co_emi: "",
      co_pandding: "",
    },
  ]);

  const [textDisabld, setTextDisabld] = useState(false); // Assuming textDisabld is a state variable


  const handleAdd = () => {
    setDividendArr([
      ...dividendArr,
      {
        bank_name: "",
        account_type: "",
        account_number: "",
        remark: " ",

      },
    ]);
  };



  const handleAdd1 = () => {
    setDividendArr1([
      ...dividendArr1,
      {
        pan_no: "",
        adhar_no: "",
        spouse_name: "",
        loan_type: "",
        spouse_dob: "",
        dob: "",
        voter_id: "",
        bank_nbfc: "",
        emi: "",
        pandding: "",

      },
    ]);
  };

  const handleAdd2 = () => {
    setDividendArr2([
      ...dividendArr2,
      {
        co_bank_name: "",
        co_account_type: "",
        co_account_number: "",
        co_remark: "",

      },
    ]);
  };
  const handleAdd3 = () => {
    setDividendArr3([
      ...dividendArr3,
      {
        co_pan_no: "",
        co_adhar_no: "",
        co_spouse_name: "",
        co_loan_type: "",
        co_spouse_dob: "",
        co_dob: "",
        co_voter_id: "",
        co_bank_nbfc: "",
        co_emi: "",
        co_pandding: "",
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
    if (dividendArr2.length > 0) {
      const listArr = [...dividendArr3];
      listArr.splice(index, 1);
      setDividendArr3(listArr);
    }
  };


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    application_no: "",
    salary: "",
    loan_type: "",
    user_loan_type: "",
    spouse_name: "",
    spouse_dob: "",
    address: "",
    business_address: "",
    bank_name: "",
    account_type: "",
    account_number: "",
    remark: "",
    pan_no: "",
    adhar_no: "",
    dob: "",
    voter_id: "",
    three_month_salary: null,
    itr: null,
    income_proof: null,
    registration_proof: null,
    bank_nbfc: "",
    emi: "",
    pandding: "",
    //Co_Application
    co_name: "",
    co_email: "",
    co_phone: "",
    co_application_no: "",
    co_salary: "",
    co_loan_type: "",
    co_user_loan_type: "",
    co_spouse_name: "",
    co_address: "",
    co_business_address: "",
    co_bank_name: "",
    co_account_type: "",
    co_account_number: "",
    co_remark: "",
    co_pan_no: "",
    co_adhar_no: "",
    co_dob: "",
    co_voter_id: "",
    co_bank_nbfc: "",
    co_emi: "",
    co_pandding: "",
    co_spouse_dob: "",
  });

  const [formData2, setFormData2] = useState({
    three_month_salary: null,
    itr: null,
    income_proof: null,
    registration_proof: null,
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
    if (file && file.type === "application/pdf") {
      // Update the specific field in formData
      setFormData2({
        ...formData2,
        [fieldName]: file,
      });
    } else {
      // Handle the case where the selected file is not a PDF
      alert("Please select a PDF file Only.");
      e.target.value = null; // Clear the input field
    }
  };


  const userId=localStorage.getItem("userID");
  console.log(userId);

  const handleClick = async (e) => {
    e.preventDefault();
    // console.log(formData);

    
    const object = { dividendArr, dividendArr1, dividendArr2, dividendArr3, formData,connector_id:userId,approved:null }
    console.log(object);

    // Append all files to the formData
    Object.keys(formData2).forEach((fileType) => {
      const file = formData2[fileType];
      // console.log(fileType);
      if (file) {
        newformData.append(fileType, file);
      }
    });

    try {

      let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
      }

      let bodyContent = JSON.stringify(object);

      let reqOptions = {
        // url: "http://15.207.195.184:8000/api/v1/carLoanForm",
        url: `${backendUrl}/carLoanForm`,
        method: "POST",
        headers: headersList,
        data: bodyContent,
      }


      let response = await axios.request(reqOptions);
      console.log(response.data);

      if (response) {
        // Handle success
        console.log(response.data.id);
        // const response2 = await axios.post(`http://15.207.195.184:8000/api/v1/carformUploadfiles/${response.data.id}`, newformData, {
        const response2 = await axios.post(`${backendUrl}/carformUploadfiles/${response.data.id}`, newformData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response2) {
          alert(response2.data.message);
          // window.location.reload(); // Reload the page after successful submission
        } else {
          console.error('Error sending data to the backend');
        }

      } else {
        // Handle error
        console.error('Error sending data to the backend');
      }
    } catch (error) {
      console.error('Error:', error);
    }

   
  };

  return (
    <>
      <main>
        <section className="py-12 Car-header-page">
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-4 mb-lg-0">
                <div>
                  <h2 className="display-2 text-white fw-bold mb-3">
                    Instant Approval For Vehicle Loan{" "}
                  </h2>
                  <p className="text-white mb-5 lead ">
                    Lowest Interest Rates - Calculate EMI - Check Eligibility -
                    Instant e-Approval - Special Offers{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-lg-4 py-10">
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-4 mb-lg-0">
                <img
                  src={Featureimg}
                  alt="Borrow - Loan Company Responsive Website Templates"
                  className="img-fluid rounded-3 w-80 mb-2 mb-lg-0"
                />
              </div>
              <div className="offset-lg-1 col-lg-5 col-md-12">
                <div className="mb-8">
                  <h1>Reason to Choose us</h1>

                </div>
                <div className="d-flex mb-3">
                  <div className="fs-3 text-primary">
                    <i className="bi bi-check-circle-fill" />
                  </div>
                  <div className="ms-3">
                    <h3>Easy Loan Approvals</h3>

                  </div>
                </div>
                <div className="d-flex mb-3">
                  <div className="fs-3 text-primary">
                    <i className="bi bi-check-circle-fill" />
                  </div>
                  <div className="ms-3">
                    <h3>Lowest Possible Prices</h3>

                  </div>
                </div>
                <div className="d-flex mb-3">
                  <div className="fs-3 text-primary">
                    <i className="bi bi-check-circle-fill" />
                  </div>
                  <div className="ms-3">
                    <h3>Hassle free</h3>

                  </div>
                </div>
                <div className="d-flex">
                  <div className="fs-3 text-primary">
                    <i className="bi bi-check-circle-fill" />
                  </div>
                  <div className="ms-3">
                    <h3>Secure Loan Processs</h3>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-lg-4 py-10 bg-white border-bottom border-top">
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="mb-8 text-center">
                  <h1>Customer Reviews</h1>
                  <p>
                    "Smooth and Hassle-Free Car Loan Experience"
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                {/* testimonial simple start */}
                <div className="mb-8 mb-lg-0 text-center">
                  <p className="lead fst-italic mb-0">
                    “I loved the customer service you guys provided me. That was
                    very nice and patient with questions I had. I would really
                    like definitely come back here”
                  </p>
                  <div>
                    <div className="mt-5">
                      <i className="bi bi-star-fill text-warning" />{" "}
                      <i className="bi bi-star-fill text-warning" />{" "}
                      <i className="bi bi-star-fill text-warning" />{" "}
                      <i className="bi bi-star-fill text-warning" />{" "}
                      <i
                        className="bi bi-star-half text-warning
"
                      />
                    </div>
                    <span className="text-dark fw-semi-bold fs-5">
                      Mukesh Singh (Ara, Bihar)
                    </span>
                  </div>
                </div>
              </div>
              {/* /.testimonial simple start */}
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                {/* testimonial simple start */}
                <div className="mb-8 mb-lg-0 text-center">
                  <p className="lead fst-italic mb-0">
                    “We came out of their offices very happy with their service.
                    They treated us very kind. Definite will come back. The
                    waiting time was very appropriate.”
                  </p>
                  <div>
                    <div className="mt-5">
                      <i className="bi bi-star-fill text-warning" />{" "}
                      <i className="bi bi-star-fill text-warning" />{" "}
                      <i className="bi bi-star-fill text-warning" />{" "}
                      <i className="bi bi-star-fill text-warning" />{" "}
                      <i
                        className="bi bi-star-fill text-warning
"
                      />
                    </div>
                    <span className="text-dark fw-semi-bold fs-5">
                      Kamalnath Yadav (Patna, Bihar)
                    </span>
                  </div>
                </div>
              </div>
              {/* /.testimonial simple start */}
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                {/* testimonial simple start */}
                <div className="mb-8 mb-lg-0 text-center">
                  <p className="lead fst-italic mb-0">
                    "I want to express my appreciation for assistance that you
                    provided over several years to help resolve a difficult
                    financial situation when my debt was out of control”
                  </p>
                  <div>
                    <div className="mt-5">
                      <i className="bi bi-star-fill text-warning" />{" "}
                      <i className="bi bi-star-fill text-warning" />{" "}
                      <i className="bi bi-star-fill text-warning" />{" "}
                      <i className="bi bi-star text-warning" />{" "}
                      <i
                        className="bi bi-star text-warning
"
                      />
                    </div>
                    <span className="text-dark fw-semi-bold fs-5">
                      Mohit Raj (Patna, Bihar)
                    </span>
                  </div>
                </div>
              </div>
              {/* /.testimonial simple start */}
            </div>
          </div>
        </section>
       {
        localStorage.getItem("userID")!==null?<VehicleLoanForm/>:null 
       }



        <section className="py-lg-16 py-10">
          <div className="container">
            <div className="row">
              <div className="offset-xl-3 col-xl-6 offset-md-2 col-md-8 offset-md-2 col-md-8 col-sm-12 col-12">
                <div className="mb-8 text-center">
                  {/* section title*/}
                  <h1 className="mb-2">We are Here to Help You</h1>
                  {/* <p className="lead">
                    
                  </p> */}
                </div>
                {/* /.section title*/}
              </div>
            </div>
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                <div className="card mb-3 mb-lg-0 text-center smooth-shadow-sm">
                  <div className="card-body p-9 ">
                    <div className="mb-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={32}
                        height={32}
                        fill="currentColor"
                        className="bi bi-calendar3 text-primary"
                        viewBox="0 0 16 16"
                      >
                        <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
                        <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                      </svg>
                    </div>
                    <h4 className="mb-3 text-uppercase fw-semi-bold">
                      Apply For Loan
                    </h4>
                    <p className="mb-4">
                      Looking to buy a car Loan then apply for loan
                      now.
                    </p>
                    <a
                      href="#!"
                      className="btn-link border-bottom border-primary border-2 fw-bold fs-5"
                    >
                      Get Appointment
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                <div className="card mb-3 mb-lg-0 text-center smooth-shadow-sm">
                  <div className="card-body p-9">
                    <div className="mb-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={32}
                        height={32}
                        fill="currentColor"
                        className="bi bi-telephone text-primary"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                      </svg>
                    </div>
                    <h4 className="mb-3 text-uppercase fw-semi-bold">
                      Call us at{" "}
                    </h4>
                    <h1 className="fs-3 mb-0">+91 9279142988 </h1>
                    <p>
                      {" "}
                      <a href="mailto:parvmultiservices@gmail.com" className="fs-5">
                      parvmultiservices@gmail.com
                      </a>
                    </p>
                    <a
                      href="/contact"
                      className="btn-link border-bottom border-primary border-2 fw-bold fs-5"
                    >
                      Contact us
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                <div className="card mb-3 mb-lg-0  text-center smooth-shadow-sm">
                  <div className="card-body p-9">
                    <div className="mb-6">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={32}
                        height={32}
                        fill="currentColor"
                        className="bi bi-people text-primary"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                      </svg>
                    </div>
                    <h4 className="mb-3 text-uppercase fw-semi-bold">
                      Talk to Advisor
                    </h4>
                    <p className="mb-4">
                      Need to loan advise? Talk to our Loan advisors.
                    </p>
                    <a
                      href="#!"
                      className="btn-link border-bottom border-primary border-2 fw-bold fs-5"
                    >
                      Meet The Advisor
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CarLone;
