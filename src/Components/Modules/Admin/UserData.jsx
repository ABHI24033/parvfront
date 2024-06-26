
import React, { useState, useEffect } from 'react';
import './admin.css'
import UserDashboard from '../UserDashbord';
import Sidebar from '../UserDashbord/Sidebar';


const UserData = () => {

  useEffect(() => {
    getAllSchoolForms();
    getAllGoldForms();
    getAllProfessionalForms();
    getAllPersonalForms();
    getAllHomeLoanForms();
    getAllCarLoanForms();
    getAllBusinessLoanForms();
  }, [])


  const [selectedUser, setSelectedUser] = useState(null);
  const [type, setType] = useState("");
  const [schoolforms, setSchoolforms] = useState([]);
  const [goldforms, setGoldforms] = useState([]);
  const [professionalforms, setProfessionalforms] = useState([]);
  const [personalforms, setPersonalforms] = useState([]);
  const [homeforms, setHomeforms] = useState([]);
  const [carforms, setCarforms] = useState([]);
  const [businessforms, setBusinessforms] = useState([]);


  const openPopup = (form, type) => {
    setSelectedUser(form);
    setType(type);
  };

  const closePopup = () => {
    setSelectedUser(null);
    setType(null);
  };

  const getAllSchoolForms = async () => {
    const userID = localStorage.getItem("userID");
    try {
      const response = await fetch(
        `http://15.207.195.184:8000/api/v1/getAllSchoolForms/${userID}`,
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
      console.log("gel school form", data.data);
      // console.log("data");
      // this is usestate hook
      setSchoolforms(data.data);
      // console.log()
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }




  const getAllGoldForms = async () => {
    const userID = localStorage.getItem("userID");
    try {
      const response = await fetch(
        `http://15.207.195.184:8000/api/v1/getAllGoldForms/${userID}`,
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
      console.log("Gold Loan Form", data.data);
      // console.log("data");
      setGoldforms(data.data);
      // this is usestate hook
      // console.log()
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const getAllProfessionalForms = async () => {
    try {
      const userID = localStorage.getItem("userID");
      const response = await fetch(
        `http://15.207.195.184:8000/api/v1/getAllProfessionalForms/${userID}`,
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
      console.log("Professional Loan form", data.data);
      // console.log("data");
      // this is usestate hook
      setProfessionalforms(data.data);
      // console.log()
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const getAllPersonalForms = async () => {
    const userID = localStorage.getItem("userID");
    try {
      const response = await fetch(
        `http://15.207.195.184:8000/api/v1/getAllPersonalForms/${userID}`,
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
      console.log("Personal Loan form", data.data);
      // console.log("data");
      // this is usestate hook
      setPersonalforms(data.data);
      // console.log()
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  const getAllHomeLoanForms = async () => {
    const userID = localStorage.getItem("userID");
    try {
      const response = await fetch(
        `http://15.207.195.184:8000/api/v1/getAllHomeLoanForms/${userID}`,
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
      console.log("Home Loan form", data.data);
      // console.log("data");
      // this is usestate hook
      setHomeforms(data.data);
      // console.log()
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  const getAllCarLoanForms = async () => {
    const userID = localStorage.getItem("userID");
    try {
      const response = await fetch(
        `http://15.207.195.184:8000/api/v1/getAllCarLoanForms/${userID}`,
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
      console.log("Car Loan form", data.data);
      // console.log("data");
      // this is usestate hook
      setCarforms(data.data);
      // console.log()
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  const getAllBusinessLoanForms = async () => {
    const userID = localStorage.getItem("userID");
    try {
      const response = await fetch(
        `http://15.207.195.184:8000/api/v1/getAllBusinessLoanForms/${userID}`,
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
      console.log("Business Loan form", data.data);
      // console.log("data");
      // this is usestate hook
      setBusinessforms(data.data);
      // console.log()
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <Sidebar>
      <section className='py-5'>
        <div className='container'>
          <h2 className='heading'>School Loan Form</h2>
          <div className="custom-cards">
            {schoolforms.length > 0 && schoolforms.map((form, index) => (
              <div key={index} className="custom-card" onClick={() => openPopup(form, "type1")}>
                <p>schoolform-{form._id.slice(-6)}</p>
              </div>
            ))}
          </div>

          {selectedUser && (
            type === "type1" ? <Popup1 form={selectedUser} onClose={closePopup} /> : null
          )}
        </div>

        <div className='container'>
          <h2 className='heading'>Gold Loan Form</h2>
          <div className="custom-cards">
            {goldforms.length > 0 && goldforms.map((form, index) => (
              <div key={index} className="custom-card" onClick={() => openPopup(form, "type2")}>
                <p>goldform-{form._id.slice(-6)}</p>
              </div>
            ))}
          </div>

          {selectedUser && (
            type === "type2" ? <Popup2 form={selectedUser} onClose={closePopup} /> : null
          )}
        </div>

        <div className='container'>
          <h2 className='heading'>Professional Loan Form</h2>
          <div className="custom-cards">
            {professionalforms.length > 0 && professionalforms.map((form, index) => (
              <div key={index} className="custom-card" onClick={() => openPopup(form, "type3")}>
                <p>professionalform-{form._id.slice(-6)}</p>
              </div>
            ))}
          </div>

          {/* {selectedUser && ( */}
          {selectedUser && (
            type === "type3" ? <Popup3 form={selectedUser} onClose={closePopup} /> : null
          )}
        </div>

        <div className='container'>
          <h2 className='heading'>Personal Loan Form</h2>
          <div className="custom-cards">
            {personalforms.length > 0 && personalforms.map((form, index) => (
              <div key={index} className="custom-card" onClick={() => openPopup(form, "type4")}>
                <p>personalform-{form._id.slice(-6)}</p>
              </div>
            ))}
          </div>

          {selectedUser && (
            type === "type4" ? <Popup4 form={selectedUser} onClose={closePopup} /> : null
          )}
        </div>

        <div className='container'>
          <h2 className='heading'>Home Loan Form</h2>
          <div className="custom-cards">
            {homeforms.length > 0 && homeforms.map((form, index) => (
              <div key={index} className="custom-card" onClick={() => openPopup(form, "type5")}>
                <p>homeform-{form._id.slice(-6)}</p>
              </div>
            ))}
          </div>

          {selectedUser && (
            type === "type5" ? <Popup5 form={selectedUser} onClose={closePopup} /> : null
          )}
        </div>

        <div className='container'>
          <h2 className='heading'>Car Loan Form</h2>
          <div className="custom-cards">
            {carforms.length > 0 && carforms.map((form, index) => (
              <div key={index} className="custom-card" onClick={() => openPopup(form, "type6")}>
                <p>carform-{form._id.slice(-6)}</p>
              </div>
            ))}
          </div>

          {selectedUser && (
            type === "type6" ? <Popup6 form={selectedUser} onClose={closePopup} /> : null
          )}
        </div>

        <div className='container'>
          <h2 className='heading'>Business Loan Form</h2>
          <div className="custom-cards">
            {businessforms.length > 0 && businessforms.map((form, index) => (
              <div key={index} className="custom-card" onClick={() => openPopup(form, "type7")}>
                <p>businessform-{form._id.slice(-6)}</p>
              </div>
            ))}
          </div>

          {selectedUser && (
            type === "type7" ? <Popup7 form={selectedUser} onClose={closePopup} /> : null
          )}
        </div>


      </section>
    </Sidebar>

  );
};

const Popup1 = ({ form, onClose }) => {
  return (
    <section className='py-lg-20 py-10'>
      <div className="container">
        <div className="popup-overlay">
          <div className="popup1">
            <h2 className='popUpheading'>Applicant Data</h2>

            {/* User Table */}

            <div className='container'>
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <div className="table-container">
                    <table className="responsive-table">
                      <h3>collegeSchooldetails</h3>
                      <tbody>
                        <tr>
                          <td><strong>Name:</strong></td>
                          <td>{form.collegeSchooldetails.name}</td>
                        </tr>
                        <tr>
                          <td><strong>Email:</strong></td>
                          <td>{form.collegeSchooldetails.email}</td>
                        </tr>
                        <tr>
                          <td><strong>Phone Number:</strong></td>
                          <td>{form.collegeSchooldetails.phone}</td>
                        </tr>
                        <tr>
                          <td><strong>conract_person:</strong></td>
                          <td>{form.conract_person}</td>
                        </tr>
                        <tr>
                          <td><strong>business_address:</strong></td>
                          <td>{form.business_address}</td>
                        </tr>
                        <tr>
                          <td><strong>website_link:</strong></td>
                          <td>{form.website_link}</td>
                        </tr>
                        <tr>
                          <td><strong>sclclg_managed:</strong></td>
                          <td>{form.sclclg_managed}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Bank Table */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>trustees</h3>

                    {form.trustees && form.trustees.map((trustee, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>name_trust:</strong></td>
                          <td>{trustee.name_trust}</td>
                        </tr>
                        <tr>
                          <td><strong>dt_email:</strong></td>
                          <td>{trustee.dt_email}</td>
                        </tr>
                        <tr>
                          <td><strong>designation:</strong></td>
                          <td>{trustee.designation}</td>
                        </tr>
                        <tr>
                          <td><strong>contact:</strong></td>
                          <td>{trustee.contact}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>

                {/* Loan Repayment Table */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>institutes</h3>
                    {form.institutes && form.institutes.map((institute, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>name_institue:</strong></td>
                          <td>{institute.name_institue}</td>
                        </tr>
                        <tr>
                          <td><strong>course_faculty:</strong></td>
                          <td>{institute.course_faculty}</td>
                        </tr>
                        <tr>
                          <td><strong>approved_by:</strong></td>
                          <td>{institute.approved_by}</td>
                        </tr>
                        <tr>
                          <td><strong>seats:</strong></td>
                          <td>{institute.seats}</td>
                        </tr>
                        <tr>
                          <td><strong>per_year_fess:</strong></td>
                          <td>{institute.per_year_fess}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>


                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>studenthotel</h3>

                    {form.studenthotel && form.studenthotel.map((studenthotel, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>institutes_host:</strong></td>
                          <td>{studenthotel.institutes_host}</td>
                        </tr>
                        <tr>
                          <td><strong>course_faculty_two:</strong></td>
                          <td>{studenthotel.course_faculty_two}</td>
                        </tr>
                        <tr>
                          <td><strong>approved_two:</strong></td>
                          <td>{studenthotel.approved_two}</td>
                        </tr>
                        <tr>
                          <td><strong>seats_two:</strong></td>
                          <td>{studenthotel.seats_two}</td>
                        </tr>
                        <tr>
                          <td><strong>per_year_fees_hostel:</strong></td>
                          <td>{studenthotel.per_year_fees_hostel}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>students</h3>

                    {form.students && form.students.map((student, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>name_of_inst:</strong></td>
                          <td>{student.name_of_inst}</td>
                        </tr>
                        <tr>
                          <td><strong>course_faculty_one:</strong></td>
                          <td>{student.course_faculty_one}</td>
                        </tr>
                        <tr>
                          <td><strong>approved_bye_one:</strong></td>
                          <td>{student.approved_bye_one}</td>
                        </tr>
                        <tr>
                          <td><strong>seats_one:</strong></td>
                          <td>{student.seats_one}</td>
                        </tr>
                        <tr>
                          <td><strong>per_year_fee_one:</strong></td>
                          <td>{student.per_year_fee_one}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <div className="table-container">
                    <table className="responsive-table">
                      <h3>collegeSchooldetails</h3>
                      <tbody>
                        <tr>
                          <td><strong>school_clg:</strong></td>
                          <td>{form.annualfeescollection.school_clg}</td>
                        </tr>
                        <tr>
                          <td><strong>transport:</strong></td>
                          <td>{form.annualfeescollection.transport}</td>
                        </tr>
                        <tr>
                          <td><strong>hostel:</strong></td>
                          <td>{form.annualfeescollection.hostel}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>files</h3>

                    {form.files && form.files.map((file, index) => (
                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>{file.fieldName}</strong>  </td>
                          {/* <td>{file.originalFileName}</td> */}
                          <td>
                            {/* Use the anchor tag for download */}
                            <a href={`http://15.207.195.184:8000/api/v1/download/${file._id}`} download>
                              Download File
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </section>


  );
};

const Popup2 = ({ form, onClose }) => {
  return (
    <section className='py-lg-20 py-10'>
      <div className="container">
        <div className="popup-overlay">
          <div className="popup1">
            <h2 className='popUpheading'>Applicant Data</h2>

            {/* User Table */}

            <div className='container'>
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <div className="table-container">
                    <table className="responsive-table">
                      <h3>form details</h3>
                      <tbody>
                        <tr>
                          <td><strong>Name:</strong></td>
                          <td>{form.name}</td>
                        </tr>
                        <tr>
                          <td><strong>Email:</strong></td>
                          <td>{form.email}</td>
                        </tr>
                        <tr>
                          <td><strong>Phone Number:</strong></td>
                          <td>{form.phone}</td>
                        </tr>
                        <tr>
                          <td><strong>application_no:</strong></td>
                          <td>{form.application_no}</td>
                        </tr>
                        <tr>
                          <td><strong>dob:</strong></td>
                          <td>{form.dob}</td>
                        </tr>
                        <tr>
                          <td><strong>adhar_no:</strong></td>
                          <td>{form.adhar_no}</td>
                        </tr>
                        <tr>
                          <td><strong>voter_id:</strong></td>
                          <td>{form.voter_id}</td>
                        </tr>
                        <tr>
                          <td><strong>address:</strong></td>
                          <td>{form.address}</td>
                        </tr>
                        <tr>
                          <td><strong>business_address:</strong></td>
                          <td>{form.business_address}</td>
                        </tr>
                        <tr>
                          <td><strong>pan_no:</strong></td>
                          <td>{form.pan_no}</td>
                        </tr>
                        <tr>
                          <td><strong>spouse_name:</strong></td>
                          <td>{form.spouse_name}</td>
                        </tr>
                        <tr>
                          <td><strong>spouse_dob:</strong></td>
                          <td>{form.spouse_dob}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </section>


  );
};

const Popup3 = ({ form, onClose }) => {
  return (
    <section className='py-lg-20 py-10'>
      <div className="container">
        <div className="popup-overlay">
          <div className="popup1">
            <h2 className='popUpheading'>Applicant Data</h2>

            {/* User Table */}

            <div className='container'>
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <div className="table-container">
                    <table className="responsive-table">
                      {/* <h3>collegeSchooldetails</h3> */}
                      <h3>userdetails</h3>
                      <tbody>
                        <tr>
                          <td><strong>Name:</strong></td>
                          {/* <td>{form.collegeSchooldetails.name}</td> */}
                          <td>{form.userdetails.name}</td>
                        </tr>
                        <tr>
                          <td><strong>Email:</strong></td>
                          {/* <td>{form.collegeSchooldetails.email}</td> */}
                          <td>{form.userdetails.email}</td>
                        </tr>
                        <tr>
                          <td><strong>Phone Number:</strong></td>
                          {/* <td>{form.collegeSchooldetails.phone}</td> */}
                          <td>{form.userdetails.phone}</td>
                        </tr>
                        <tr>
                          <td><strong>Degree:</strong></td>
                          {/* <td>{form.collegeSchooldetails.conract_person}</td> */}
                          <td>{form.userdetails.degree}</td>
                        </tr>
                        <tr>
                          <td><strong>Address:</strong></td>
                          {/* <td>{form.collegeSchooldetails.business_address}</td> */}
                          <td>{form.userdetails.business_address}</td>
                        </tr>
                        <tr>
                          <td><strong>Business_address:</strong></td>
                          <td>{form.userdetails.business_address}</td>
                        </tr>
                        {/* <tr>
                          <td><strong>sclclg_managed:</strong></td>
                          <td>{form.collegeSchooldetails.sclclg_managed}</td>
                        </tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Bank Table */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    {/* <h3>trustees</h3> */}
                    <h3>userbankingdeatails</h3>

                    {form.userbankingdeatails && form.userbankingdeatails.map((userbankingdeatail, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>bank_name:</strong></td>
                          <td>{userbankingdeatail.bank_name}</td>
                        </tr>
                        <tr>
                          <td><strong>account_type:</strong></td>
                          <td>{userbankingdeatail.account_type}</td>
                        </tr>
                        <tr>
                          <td><strong>account_number:</strong></td>
                          <td>{userbankingdeatail.account_number}</td>
                        </tr>
                        <tr>
                          <td><strong>remark:</strong></td>
                          <td>{userbankingdeatail.remark}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>

                {/* Loan Repayment Table */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>userloanpaymentdetails</h3>
                    {form.userloanpaymentdetails && form.userloanpaymentdetails.map((userloanpaymentdetail, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>adhar_no:</strong></td>
                          <td>{userloanpaymentdetail.adhar_no}</td>
                        </tr>
                        <tr>
                          <td><strong>bank_nbfc:</strong></td>
                          <td>{userloanpaymentdetail.bank_nbfc}</td>
                        </tr>
                        <tr>
                          <td><strong>dob:</strong></td>
                          <td>{userloanpaymentdetail.dob}</td>
                        </tr>
                        <tr>
                          <td><strong>emi:</strong></td>
                          <td>{userloanpaymentdetail.emi}</td>
                        </tr>
                        <tr>
                          <td><strong>loan_type:</strong></td>
                          <td>{userloanpaymentdetail.loan_type}</td>
                        </tr>
                        <tr>
                          <td><strong>pan_no:</strong></td>
                          <td>{userloanpaymentdetail.pan_no}</td>
                        </tr>
                        <tr>
                          <td><strong>pandding:</strong></td>
                          <td>{userloanpaymentdetail.pandding}</td>
                        </tr>
                        <tr>
                          <td><strong>spouse_name:</strong></td>
                          <td>{userloanpaymentdetail.spouse_name}</td>
                        </tr>
                        <tr>
                          <td><strong>spouse_dob:</strong></td>
                          <td>{userloanpaymentdetail.spouse_dob}</td>
                        </tr>
                        <tr>
                          <td><strong>voter_id:</strong></td>
                          <td>{userloanpaymentdetail.voter_id}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>

                {/* coapplicantdetails */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>coapplicantdetails</h3>

                    {/* {form.studenthotel && form.studenthotel.map((studenthotel, index) => ( */}

                    <tbody className='' >
                      <tr>
                        <td><strong>co_name:</strong></td>
                        <td>{form.coapplicantdetails.co_name}</td>
                      </tr>
                      <tr>
                        <td><strong>co_email:</strong></td>
                        <td>{form.coapplicantdetails.co_email}</td>
                      </tr>
                      <tr>
                        <td><strong>co_phone:</strong></td>
                        <td>{form.coapplicantdetails.co_phone}</td>
                      </tr>
                      <tr>
                        <td><strong>co_address:</strong></td>
                        <td>{form.coapplicantdetails.co_address}</td>
                      </tr>
                      <tr>
                        <td><strong>co_business_address:</strong></td>
                        <td>{form.coapplicantdetails.co_business_address}</td>
                      </tr>
                    </tbody>
                    {/* ))} */}
                  </table>
                </div>

                {/* coapplicantbankingdetails */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>coapplicantbankingdetails</h3>

                    {form.coapplicantbankingdetails && form.coapplicantbankingdetails.map((coapplicantbankingdetail, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>dividendArr2co_account_number:</strong></td>
                          <td>{coapplicantbankingdetail.dividendArr2co_account_number}</td>
                        </tr>
                        <tr>
                          <td><strong>dividendArr2co_account_type:</strong></td>
                          <td>{coapplicantbankingdetail.dividendArr2co_account_type}</td>
                        </tr>
                        <tr>
                          <td><strong>dividendArr2co_bank_name:</strong></td>
                          <td>{coapplicantbankingdetail.dividendArr2co_bank_name}</td>
                        </tr>
                        <tr>
                          <td><strong>dividendArr2co_remark:</strong></td>
                          <td>{coapplicantbankingdetail.dividendArr2co_remark}</td>
                        </tr>
                        {/* <tr>
                          <td><strong>per_year_fee_one:</strong></td>
                          <td>{coapplicantbankingdetail.per_year_fee_one}</td>
                        </tr> */}
                      </tbody>
                    ))}
                  </table>
                </div>

                {/* coapplicantloanpaymentdetails */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <div className="table-container">
                    <table className="responsive-table">
                      <h3>coapplicantloanpaymentdetails</h3>
                      {
                        form.coapplicantloanpaymentdetails && form.coapplicantloanpaymentdetails.map((coapplicantloanpaymentdetail, index) => (
                          <tbody key={index}>
                            <tr>
                              <td><strong>dividendArr3co_adhar_no:</strong></td>
                              <td>{coapplicantloanpaymentdetail.dividendArr3co_adhar_no}</td>
                            </tr>
                            <tr>
                              <td><strong>dividendArr3co_bank_nbfc:</strong></td>
                              <td>{coapplicantloanpaymentdetail.dividendArr3co_bank_nbfc}</td>
                            </tr>
                            <tr>
                              <td><strong>dividendArr3co_dob:</strong></td>
                              <td>{coapplicantloanpaymentdetail.dividendArr3co_dob}</td>
                            </tr>
                            <tr>
                              <td><strong>dividendArr3co_emi:</strong></td>
                              <td>{coapplicantloanpaymentdetail.dividendArr3co_emi}</td>
                            </tr>
                            <tr>
                              <td><strong>dividendArr3co_loan_type:</strong></td>
                              <td>{coapplicantloanpaymentdetail.dividendArr3co_loan_type}</td>
                            </tr>
                            <tr>
                              <td><strong>dividendArr3co_pan_no:</strong></td>
                              <td>{coapplicantloanpaymentdetail.dividendArr3co_pan_no}</td>
                            </tr>
                            <tr>
                              <td><strong>dividendArr3co_pandding:</strong></td>
                              <td>{coapplicantloanpaymentdetail.dividendArr3co_pandding}</td>
                            </tr>
                            <tr>
                              <td><strong>dividendArr3co_spouse_name:</strong></td>
                              <td>{coapplicantloanpaymentdetail.dividendArr3co_spouse_name}</td>
                            </tr>
                            <tr>
                              <td><strong>dividendArr3co_spouse_dob:</strong></td>
                              <td>{coapplicantloanpaymentdetail.dividendArr3co_spouse_dob}</td>
                            </tr>
                            <tr>
                              <td><strong>dividendArr3co_voter_id:</strong></td>
                              <td>{coapplicantloanpaymentdetail.dividendArr3co_voter_id}</td>
                            </tr>
                          </tbody>
                        ))
                      }
                      {/* <tbody>
                        <tr>
                          <td><strong>school_clg:</strong></td>
                          <td>{form.annualfeescollection.school_clg}</td>
                        </tr>
                        <tr>
                          <td><strong>transport:</strong></td>
                          <td>{form.annualfeescollection.transport}</td>
                        </tr>
                        <tr>
                          <td><strong>hostel:</strong></td>
                          <td>{form.annualfeescollection.hostel}</td>
                        </tr>
                      </tbody> */}
                    </table>
                  </div>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>files</h3>

                    {form.files && form.files.map((file, index) => (
                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>{file.fieldName}</strong>  </td>
                          {/* <td>{file.originalFileName}</td> */}
                          <td>
                            {/* Use the anchor tag for download */}
                            <a href={`http://15.207.195.184:8000/api/v1/download/${file._id}`} download>
                              Download File
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </section>


  );
};

const Popup4 = ({ form, onClose }) => {
  return (
    <section className='py-lg-20 py-10'>
      <div className="container">
        <div className="popup-overlay">
          <div className="popup1">
            <h2 className='popUpheading'>Applicant Data</h2>

            {/* User Table */}

            <div className='container'>
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <div className="table-container">
                    <table className="responsive-table">
                      <h3>UserLoanDetails</h3>
                      <tbody>
                        <tr>
                          <td><strong>Name:</strong></td>
                          <td>{form.userdetails.name}</td>
                        </tr>
                        <tr>
                          <td><strong>Email:</strong></td>
                          <td>{form.userdetails.email}</td>
                        </tr>
                        <tr>
                          <td><strong>Phone Number:</strong></td>
                          <td>{form.userdetails.phone}</td>
                        </tr>
                        <tr>
                          <td><strong>Address:</strong></td>
                          <td>{form.userdetails.address}</td>
                        </tr>
                        <tr>
                          <td><strong>Business_address:</strong></td>
                          <td>{form.userdetails.business_address}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>


                {/* CoAplicant Table */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>CoApplicantLoanDetails</h3>
                    <tbody>
                      <tr>
                        <td><strong>Name:</strong></td>
                        <td>{form.coapplicantdetails.co_name}</td>
                      </tr>
                      <tr>
                        <td><strong>Email:</strong></td>
                        <td>{form.coapplicantdetails.co_email}</td>
                      </tr>
                      <tr>
                        <td><strong>Phone Number:</strong></td>
                        <td>{form.coapplicantdetails.co_phone}</td>
                      </tr>
                      <tr>
                        <td><strong>Address:</strong></td>
                        <td>{form.coapplicantdetails.co_address}</td>
                      </tr>
                      <tr>
                        <td><strong>Business_address:</strong></td>
                        <td>{form.coapplicantdetails.co_business_address}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Bank Table */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>User Bank Details</h3>

                    {form.userbankingdeatails && form.userbankingdeatails.map((userbankingdeatails, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>bank_name:</strong></td>
                          <td>{userbankingdeatails.bank_name}</td>
                        </tr>
                        <tr>
                          <td><strong>account_type:</strong></td>
                          <td>{userbankingdeatails.account_type}</td>
                        </tr>
                        <tr>
                          <td><strong>account_number:</strong></td>
                          <td>{userbankingdeatails.account_number}</td>
                        </tr>
                        {/* <tr>
                          <td><strong>_id:</strong></td>
                          <td>{userbankingdeatails._id}</td>
                        </tr> */}
                      </tbody>
                    ))}
                  </table>
                </div>


                {/* CoApplicant Bank Table */}
                {/* <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>CoApplicant Bank Details</h3>

                    {form.userbankingdeatails && form.userbankingdeatails.map((userbankingdeatails, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>bank_name:</strong></td>
                          <td>{userbankingdeatails.bank_name}</td>
                        </tr>
                        <tr>
                          <td><strong>account_type:</strong></td>
                          <td>{userbankingdeatails.account_type}</td>
                        </tr>
                        <tr>
                          <td><strong>account_number:</strong></td>
                          <td>{userbankingdeatails.account_number}</td>
                        </tr>
                        <tr>
                          <td><strong>_id:</strong></td>
                          <td>{userbankingdeatails._id}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div> */}

                {/* User Loan Payment Table */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>User Loan Payment Details</h3>

                    {form.userloanpaymentdetails && form.userloanpaymentdetails.map((userloanpaymentdetails, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>pan_no:</strong></td>
                          <td>{userloanpaymentdetails.pan_no}</td>
                        </tr>
                        <tr>
                          <td><strong>adhar_no:</strong></td>
                          <td>{userloanpaymentdetails.adhar_no}</td>
                        </tr>
                        <tr>
                          <td><strong>spouse_name:</strong></td>
                          <td>{userloanpaymentdetails.spouse_name}</td>
                        </tr>
                        <tr>
                          <td><strong>loan_type:</strong></td>
                          <td>{userloanpaymentdetails.loan_type}</td>
                        </tr>
                        <tr>
                          <td><strong>spouse_dob:</strong></td>
                          <td>{userloanpaymentdetails.spouse_dob}</td>
                        </tr>
                        <tr>
                          <td><strong>dob:</strong></td>
                          <td>{userloanpaymentdetails.dob}</td>
                        </tr>
                        <tr>
                          <td><strong>voter_id:</strong></td>
                          <td>{userloanpaymentdetails.voter_id}</td>
                        </tr>
                        <tr>
                          <td><strong>bank_nbfc:</strong></td>
                          <td>{userloanpaymentdetails.bank_nbfc}</td>
                        </tr>
                        <tr>
                          <td><strong>emi:</strong></td>
                          <td>{userloanpaymentdetails.emi}</td>
                        </tr>
                        <tr>
                          <td><strong>pandding:</strong></td>
                          <td>{userloanpaymentdetails.pandding}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>

                {/* CoAplicant Loan Payment Table */}
                {/* <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>Bank Details</h3>

                    {form.userbankingdeatails && form.userbankingdeatails.map((userbankingdeatails, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>bank_name:</strong></td>
                          <td>{userbankingdeatails.bank_name}</td>
                        </tr>
                        <tr>
                          <td><strong>account_type:</strong></td>
                          <td>{userbankingdeatails.account_type}</td>
                        </tr>
                        <tr>
                          <td><strong>account_number:</strong></td>
                          <td>{userbankingdeatails.account_number}</td>
                        </tr>
                        <tr>
                          <td><strong>_id:</strong></td>
                          <td>{userbankingdeatails._id}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div> */}

                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>files</h3>

                    {form.files && form.files.map((file, index) => (
                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>{file.fieldName}</strong>  </td>
                          {/* <td>{file.originalFileName}</td> */}
                          <td>
                            {/* Use the anchor tag for download */}
                            <a href={`http://15.207.195.184:8000/api/v1/download/${file._id}`} download>
                              Download File
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>

              </div>
            </div>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>

    </section>

  );
};


const Popup5 = ({ form, onClose }) => {
  return (
    <section className='py-lg-20 py-10'>
      <div className="container">
        <div className="popup-overlay">
          <div className="popup1">
            <h2 className='popUpheading'>Applicant Data</h2>

            {/* User Table */}

            <div className='container'>
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <div className="table-container">
                    <table className="responsive-table">
                      <h3>UserLoanDetails</h3>
                      <tbody>
                        <tr>
                          <td><strong>Name:</strong></td>
                          <td>{form.userdetails.name}</td>
                        </tr>
                        <tr>
                          <td><strong>Email:</strong></td>
                          <td>{form.userdetails.email}</td>
                        </tr>
                        <tr>
                          <td><strong>Phone Number:</strong></td>
                          <td>{form.userdetails.phone}</td>
                        </tr>
                        <tr>
                          <td><strong>Address:</strong></td>
                          <td>{form.userdetails.address}</td>
                        </tr>
                        <tr>
                          <td><strong>Business_address:</strong></td>
                          <td>{form.userdetails.business_address}</td>
                        </tr>
                        <tr>
                          <td><strong>User_Loan_Type:</strong></td>
                          <td>{form.userdetails.user_loan_type}</td>
                        </tr>
                        <tr>
                          <td><strong>User_Salaried:</strong></td>
                          <td>{form.userdetails.user_salaried}</td>
                        </tr>
                        <tr>
                          <td><strong>Monthly_Salary:</strong></td>
                          <td>{form.userdetails.monthly_salary}</td>
                        </tr>
                        <tr>
                          <td><strong>Yearly_Income:</strong></td>
                          <td>{form.userdetails.yearly_income}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Bank Table */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>User Bank Details</h3>

                    {form.userbankingdetails && form.userbankingdetails.map((userbankingdetails, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>bank_name:</strong></td>
                          <td>{userbankingdetails.bank_name}</td>
                        </tr>
                        <tr>
                          <td><strong>account_type:</strong></td>
                          <td>{userbankingdetails.account_type}</td>
                        </tr>
                        <tr>
                          <td><strong>account_number:</strong></td>
                          <td>{userbankingdetails.account_number}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_remark:</strong></td>
                          <td>{userbankingdetails.guar_remark}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>


                {/* User Loan Payment Table */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>User Loan Payment Details</h3>

                    {form.userloanpaymentdetails && form.userloanpaymentdetails.map((userloanpaymentdetails, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>aaplication_pan_no:</strong></td>
                          <td>{userloanpaymentdetails.aaplication_pan_no}</td>
                        </tr>
                        <tr>
                          <td><strong>adhar_no:</strong></td>
                          <td>{userloanpaymentdetails.adhar_no}</td>
                        </tr>
                        <tr>
                          <td><strong>spouse_name:</strong></td>
                          <td>{userloanpaymentdetails.spouse_name}</td>
                        </tr>
                        <tr>
                          <td><strong>loan_type:</strong></td>
                          <td>{userloanpaymentdetails.loan_type}</td>
                        </tr>
                        <tr>
                          <td><strong>spouse_dob:</strong></td>
                          <td>{userloanpaymentdetails.spouse_dob}</td>
                        </tr>
                        <tr>
                          <td><strong>dob:</strong></td>
                          <td>{userloanpaymentdetails.dob}</td>
                        </tr>
                        <tr>
                          <td><strong>voter_id:</strong></td>
                          <td>{userloanpaymentdetails.voter_id}</td>
                        </tr>
                        <tr>
                          <td><strong>bank_nbfc:</strong></td>
                          <td>{userloanpaymentdetails.bank_nbfc}</td>
                        </tr>
                        <tr>
                          <td><strong>emi:</strong></td>
                          <td>{userloanpaymentdetails.emi}</td>
                        </tr>
                        <tr>
                          <td><strong>pandding:</strong></td>
                          <td>{userloanpaymentdetails.pandding}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>


                {/* coapplicantdetails Table */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>CoApplicant User Details</h3>

                    {form.coapplicantdetails && form.coapplicantdetails.map((coapplicantdetails, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>Name:</strong></td>
                          <td>{coapplicantdetails.co_name}</td>
                        </tr>
                        <tr>
                          <td><strong>Email:</strong></td>
                          <td>{coapplicantdetails.co_email}</td>
                        </tr>
                        <tr>
                          <td><strong>Phone Number:</strong></td>
                          <td>{coapplicantdetails.co_phone}</td>
                        </tr>
                        <tr>
                          <td><strong>Address:</strong></td>
                          <td>{coapplicantdetails.co_address}</td>
                        </tr>
                        <tr>
                          <td><strong>Business_address:</strong></td>
                          <td>{coapplicantdetails.co_business_address}</td>
                        </tr>
                        <tr>
                          <td><strong>Monthly_salary:</strong></td>
                          <td>{coapplicantdetails.co_monthly_salary}</td>
                        </tr>
                        <tr>
                          <td><strong>Yearly_income:</strong></td>
                          <td>{coapplicantdetails.co_yearly_income}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>



                {/* CoApplicant Bank Table */}
                {/* <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>CoApplicant Bank Details</h3>

                    {form.userbankingdeatails && form.userbankingdeatails.map((userbankingdeatails, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>bank_name:</strong></td>
                          <td>{userbankingdeatails.bank_name}</td>
                        </tr>
                        <tr>
                          <td><strong>account_type:</strong></td>
                          <td>{userbankingdeatails.account_type}</td>
                        </tr>
                        <tr>
                          <td><strong>account_number:</strong></td>
                          <td>{userbankingdeatails.account_number}</td>
                        </tr>
                        <tr>
                          <td><strong>_id:</strong></td>
                          <td>{userbankingdeatails._id}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div> */}


                {/* CoAplicant Loan Payment Table */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>CoAplicant Loan Details</h3>

                    {form.coapplicantloanpaymentdetails && form.coapplicantloanpaymentdetails.map((coapplicantloanpaymentdetails, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>co_bank_nbfc:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_bank_nbfc}</td>
                        </tr>
                        <tr>
                          <td><strong>co_loan_type:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_loan_type}</td>
                        </tr>
                        <tr>
                          <td><strong>co_emi:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_emi}</td>
                        </tr>
                        <tr>
                          <td><strong>co_start_form:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_start_form}</td>
                        </tr>
                        <tr>
                          <td><strong>co_pandding:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_pandding}</td>
                        </tr>
                        <tr>
                          <td><strong>co_aaplication_pan_no:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_aaplication_pan_no}</td>
                        </tr>
                        <tr>
                          <td><strong>co_adhar_no:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_adhar_no}</td>
                        </tr>
                        <tr>
                          <td><strong>co_dob:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_dob}</td>
                        </tr>
                        <tr>
                          <td><strong>co_voter_id:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_voter_id}</td>
                        </tr>
                        <tr>
                          <td><strong>co_spouse_name:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_spouse_name}</td>
                        </tr>
                        <tr>
                          <td><strong>co_spouse_dob:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_spouse_dob}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>

                {/* Guarantor Applicantdetails Table */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>Guarantor User Details</h3>

                    {form.guarantordetails && form.guarantordetails.map((guarantordetails, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>guar_name:</strong></td>
                          <td>{guarantordetails.guar_name}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_email:</strong></td>
                          <td>{guarantordetails.guar_email}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_phone:</strong></td>
                          <td>{guarantordetails.guar_phone}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_address:</strong></td>
                          <td>{guarantordetails.guar_address}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_business_address:</strong></td>
                          <td>{guarantordetails.guar_business_address}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_monthly_salary:</strong></td>
                          <td>{guarantordetails.guar_monthly_salary}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_yearly_income:</strong></td>
                          <td>{guarantordetails.guar_yearly_income}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>

                {/* Guarantor Bank Table */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>CoApplicant Bank Details</h3>

                    {form.guarantorbankdetails && form.guarantorbankdetails.map((guarantorbankdetails, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>bank_name:</strong></td>
                          <td>{guarantorbankdetails.guar_bank_name}</td>
                        </tr>
                        <tr>
                          <td><strong>account_type:</strong></td>
                          <td>{guarantorbankdetails.guar_account_type}</td>
                        </tr>
                        <tr>
                          <td><strong>account_number:</strong></td>
                          <td>{guarantorbankdetails.guar_account_number}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_remark:</strong></td>
                          <td>{guarantorbankdetails.guar_remark}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>

                {/* Guarantor Loan Payment Table */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>Guarantor Loan Details</h3>

                    {form.guarantorloandetails && form.guarantorloandetails.map((guarantorloandetails, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>guar_bank_nbfc:</strong></td>
                          <td>{guarantorloandetails.guar_bank_nbfc}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_loan_type:</strong></td>
                          <td>{guarantorloandetails.guar_loan_type}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_emi:</strong></td>
                          <td>{guarantorloandetails.guar_emi}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_start_form:</strong></td>
                          <td>{guarantorloandetails.guar_start_form}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_pandding:</strong></td>
                          <td>{guarantorloandetails.guar_pandding}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_aaplication_pan_no:</strong></td>
                          <td>{guarantorloandetails.guar_aaplication_pan_no}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_adhar_no:</strong></td>
                          <td>{guarantorloandetails.guar_adhar_no}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_dob:</strong></td>
                          <td>{guarantorloandetails.guar_dob}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_voter_id:</strong></td>
                          <td>{guarantorloandetails.guar_voter_id}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_spouse_name:</strong></td>
                          <td>{guarantorloandetails.guar_spouse_name}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_spouse_dob:</strong></td>
                          <td>{guarantorloandetails.guar_spouse_dob}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>files</h3>

                    {form.files && form.files.map((file, index) => (
                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>{file.fieldName}</strong>  </td>
                          {/* <td>{file.originalFileName}</td> */}
                          <td>
                            {/* Use the anchor tag for download */}
                            <a href={`http://15.207.195.184:8000/api/v1/download/${file._id}`} download>
                              Download File
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>

              </div>
            </div>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>

    </section>

  );
};

const Popup6 = ({ form, onClose }) => {
  return (
    <section className='py-lg-20 py-10'>
      <div className="container">
        <div className="popup-overlay">
          <div className="popup1">
            <h2 className='popUpheading'>Applicant Data</h2>

            {/* User Table */}

            <div className='container'>
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <div className="table-container">
                    <table className="responsive-table">
                      <h3>UserLoanDetails</h3>
                      <tbody>
                        <tr>
                          <td><strong>Name:</strong></td>
                          <td>{form.userdetails.name}</td>
                        </tr>
                        <tr>
                          <td><strong>Email:</strong></td>
                          <td>{form.userdetails.email}</td>
                        </tr>
                        <tr>
                          <td><strong>Phone Number:</strong></td>
                          <td>{form.userdetails.phone}</td>
                        </tr>
                        <tr>
                          <td><strong>Address:</strong></td>
                          <td>{form.userdetails.address}</td>
                        </tr>
                        <tr>
                          <td><strong>Business_address:</strong></td>
                          <td>{form.userdetails.business_address}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>


                {/* Bank Table */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>User Bank Details</h3>

                    {form.userbankingdetails && form.userbankingdetails.map((userbankingdetails, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>bank_name:</strong></td>
                          <td>{userbankingdetails.bank_name}</td>
                        </tr>
                        <tr>
                          <td><strong>account_type:</strong></td>
                          <td>{userbankingdetails.account_type}</td>
                        </tr>
                        <tr>
                          <td><strong>account_number:</strong></td>
                          <td>{userbankingdetails.account_number}</td>
                        </tr>
                        <tr>
                          <td><strong>remark:</strong></td>
                          <td>{userbankingdetails.remark}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>


                {/* User Loan Payment Table */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>User Loan Payment Details</h3>

                    {form.userloanpaymentdetails && form.userloanpaymentdetails.map((userloanpaymentdetails, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>bank_nbfc:</strong></td>
                          <td>{userloanpaymentdetails.bank_nbfc}</td>
                        </tr>
                        <tr>
                          <td><strong>pan_no:</strong></td>
                          <td>{userloanpaymentdetails.pan_no}</td>
                        </tr>
                        <tr>
                          <td><strong>adhar_no:</strong></td>
                          <td>{userloanpaymentdetails.adhar_no}</td>
                        </tr>
                        <td>
                          <td><strong>spouse_name:</strong></td>
                          <td>{userloanpaymentdetails.spouse_name}</td>
                        </td>
                        <tr>
                          <td><strong>loan_type:</strong></td>
                          <td>{userloanpaymentdetails.loan_type}</td>
                        </tr>
                        <tr>
                          <td><strong>spouse_dob:</strong></td>
                          <td>{userloanpaymentdetails.spouse_dob}</td>
                        </tr>
                        <tr>
                          <td><strong>dob:</strong></td>
                          <td>{userloanpaymentdetails.dob}</td>
                        </tr>
                        <tr>
                          <td><strong>voter_id:</strong></td>
                          <td>{userloanpaymentdetails.voter_id}</td>
                        </tr>
                        <tr>
                          <td><strong>emi:</strong></td>
                          <td>{userloanpaymentdetails.emi}</td>
                        </tr>
                        <tr>
                          <td><strong>pandding:</strong></td>
                          <td>{userloanpaymentdetails.pandding}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>

                {/* CoAplicant Table */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>CoApplicantLoanDetails</h3>
                    <tbody>
                      <tr>
                        <td><strong>Name:</strong></td>
                        <td>{form.coapplicantdetails.co_name}</td>
                      </tr>
                      <tr>
                        <td><strong>Email:</strong></td>
                        <td>{form.coapplicantdetails.co_email}</td>
                      </tr>
                      <tr>
                        <td><strong>Phone Number:</strong></td>
                        <td>{form.coapplicantdetails.co_phone}</td>
                      </tr>
                      <tr>
                        <td><strong>Address:</strong></td>
                        <td>{form.coapplicantdetails.co_address}</td>
                      </tr>
                      <tr>
                        <td><strong>Business_address:</strong></td>
                        <td>{form.coapplicantdetails.co_business_address}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>


                {/* CoApplicant Bank Table */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>CoApplicant Bank Details</h3>

                    {form.coapplicantbankingdetails && form.coapplicantbankingdetails.map((coapplicantbankingdetails, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>co_bank_name:</strong></td>
                          <td>{coapplicantbankingdetails.co_bank_name}</td>
                        </tr>
                        <tr>
                          <td><strong>co_account_type:</strong></td>
                          <td>{coapplicantbankingdetails.co_account_type}</td>
                        </tr>
                        <tr>
                          <td><strong>co_account_number:</strong></td>
                          <td>{coapplicantbankingdetails.co_account_number}</td>
                        </tr>
                        <tr>
                          <td><strong>co_remark:</strong></td>
                          <td>{coapplicantbankingdetails.co_remark}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>


                {/* CoAplicant Loan Payment Table */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>CoAplicant Loan Payment Details</h3>

                    {form.coapplicantloanpaymentdetails && form.coapplicantloanpaymentdetails.map((coapplicantloanpaymentdetails, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>co_bank_nbfc:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_bank_nbfc}</td>
                        </tr>
                        <tr>
                          <td><strong>co_pan_no:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_pan_no}</td>
                        </tr>
                        <tr>
                          <td><strong>co_adhar_no:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_adhar_no}</td>
                        </tr>
                        <td>
                          <td><strong>co_spouse_name:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_spouse_name}</td>
                        </td>
                        <tr>
                          <td><strong>co_loan_type:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_loan_type}</td>
                        </tr>
                        <tr>
                          <td><strong>co_spouse_dob:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_spouse_dob}</td>
                        </tr>
                        <tr>
                          <td><strong>co_dob:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_dob}</td>
                        </tr>
                        <tr>
                          <td><strong>co_voter_id:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_voter_id}</td>
                        </tr>
                        <tr>
                          <td><strong>co_emi:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_emi}</td>
                        </tr>
                        <tr>
                          <td><strong>co_pandding:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_pandding}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>files</h3>

                    {form.files && form.files.map((file, index) => (
                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>{file.fieldName}</strong>  </td>
                          {/* <td>{file.originalFileName}</td> */}
                          <td>
                            {/* Use the anchor tag for download */}
                            <a href={`http://15.207.195.184:8000/api/v1/download/${file._id}`} download>
                              Download File
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>

              </div>
            </div>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>

    </section>

  );
};

const Popup7 = ({ form, onClose }) => {
  return (
    <section className='py-lg-20 py-10'>
      <div className="container">
        <div className="popup-overlay">
          <div className="popup1">
            <h2 className='popUpheading'>Applicant Data</h2>

            {/* User Table */}

            <div className='container'>
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <div className="table-container">
                    <table className="responsive-table">
                      <h3>UserLoanDetails</h3>
                      <tbody>
                        <tr>
                          <td><strong>Name:</strong></td>
                          <td>{form.userdetails.name}</td>
                        </tr>
                        <tr>
                          <td><strong>Email:</strong></td>
                          <td>{form.userdetails.email}</td>
                        </tr>
                        <tr>
                          <td><strong>Phone Number:</strong></td>
                          <td>{form.userdetails.phone}</td>
                        </tr>
                        <tr>
                          <td><strong>Address:</strong></td>
                          <td>{form.userdetails.address}</td>
                        </tr>
                        <tr>
                          <td><strong>Business_address:</strong></td>
                          <td>{form.userdetails.business_address}</td>
                        </tr>
                        <tr>
                          <td><strong>User_Loan_Type:</strong></td>
                          <td>{form.userdetails.user_loan_type}</td>
                        </tr>
                        <tr>
                          <td><strong>User_Salaried:</strong></td>
                          <td>{form.userdetails.user_salaried}</td>
                        </tr>
                        <tr>
                          <td><strong>Monthly_Salary:</strong></td>
                          <td>{form.userdetails.monthly_salary}</td>
                        </tr>
                        <tr>
                          <td><strong>Yearly_Income:</strong></td>
                          <td>{form.userdetails.yearly_income}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Bank Table */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>User Bank Details</h3>

                    {form.userbankingdetails && form.userbankingdetails.map((userbankingdetails, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>bank_name:</strong></td>
                          <td>{userbankingdetails.bank_name}</td>
                        </tr>
                        <tr>
                          <td><strong>account_type:</strong></td>
                          <td>{userbankingdetails.account_type}</td>
                        </tr>
                        <tr>
                          <td><strong>account_number:</strong></td>
                          <td>{userbankingdetails.account_number}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_remark:</strong></td>
                          <td>{userbankingdetails.guar_remark}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>


                {/* User Loan Payment Table */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>User Loan Payment Details</h3>

                    {form.userloanpaymentdetails && form.userloanpaymentdetails.map((userloanpaymentdetails, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>pan_no:</strong></td>
                          <td>{userloanpaymentdetails.aaplication_pan_no}</td>
                        </tr>
                        <tr>
                          <td><strong>adhar_no:</strong></td>
                          <td>{userloanpaymentdetails.adhar_no}</td>
                        </tr>
                        <tr>
                          <td><strong>spouse_name:</strong></td>
                          <td>{userloanpaymentdetails.spouse_name}</td>
                        </tr>
                        <tr>
                          <td><strong>loan_type:</strong></td>
                          <td>{userloanpaymentdetails.loan_type}</td>
                        </tr>
                        <tr>
                          <td><strong>spouse_dob:</strong></td>
                          <td>{userloanpaymentdetails.spouse_dob}</td>
                        </tr>
                        <tr>
                          <td><strong>dob:</strong></td>
                          <td>{userloanpaymentdetails.dob}</td>
                        </tr>
                        <tr>
                          <td><strong>voter_id:</strong></td>
                          <td>{userloanpaymentdetails.voter_id}</td>
                        </tr>
                        <tr>
                          <td><strong>bank_nbfc:</strong></td>
                          <td>{userloanpaymentdetails.bank_nbfc}</td>
                        </tr>
                        <tr>
                          <td><strong>emi:</strong></td>
                          <td>{userloanpaymentdetails.emi}</td>
                        </tr>
                        <tr>
                          <td><strong>pandding:</strong></td>
                          <td>{userloanpaymentdetails.pandding}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>


                {/* coapplicantdetails Table */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>CoApplicant User Details</h3>

                    {form.coapplicantdetails && form.coapplicantdetails.map((coapplicantdetails, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>Name:</strong></td>
                          <td>{coapplicantdetails.co_name}</td>
                        </tr>
                        <tr>
                          <td><strong>Email:</strong></td>
                          <td>{coapplicantdetails.co_email}</td>
                        </tr>
                        <tr>
                          <td><strong>Phone Number:</strong></td>
                          <td>{coapplicantdetails.co_phone}</td>
                        </tr>
                        <tr>
                          <td><strong>Address:</strong></td>
                          <td>{coapplicantdetails.co_address}</td>
                        </tr>
                        <tr>
                          <td><strong>Business_address:</strong></td>
                          <td>{coapplicantdetails.co_business_address}</td>
                        </tr>
                        <tr>
                          <td><strong>Monthly_salary:</strong></td>
                          <td>{coapplicantdetails.co_monthly_salary}</td>
                        </tr>
                        <tr>
                          <td><strong>Yearly_income:</strong></td>
                          <td>{coapplicantdetails.co_yearly_income}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>



                {/* CoApplicant Bank Table */}
                {/* <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>CoApplicant Bank Details</h3>

                    {form.userbankingdeatails && form.userbankingdeatails.map((userbankingdeatails, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>bank_name:</strong></td>
                          <td>{userbankingdeatails.bank_name}</td>
                        </tr>
                        <tr>
                          <td><strong>account_type:</strong></td>
                          <td>{userbankingdeatails.account_type}</td>
                        </tr>
                        <tr>
                          <td><strong>account_number:</strong></td>
                          <td>{userbankingdeatails.account_number}</td>
                        </tr>
                        <tr>
                          <td><strong>_id:</strong></td>
                          <td>{userbankingdeatails._id}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div> */}


                {/* CoAplicant Loan Payment Table */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>CoAplicant Loan Details</h3>

                    {form.coapplicantloanpaymentdetails && form.coapplicantloanpaymentdetails.map((coapplicantloanpaymentdetails, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>co_bank_nbfc:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_bank_nbfc}</td>
                        </tr>
                        <tr>
                          <td><strong>co_loan_type:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_loan_type}</td>
                        </tr>
                        <tr>
                          <td><strong>co_emi:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_emi}</td>
                        </tr>
                        <tr>
                          <td><strong>co_start_form:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_start_form}</td>
                        </tr>
                        <tr>
                          <td><strong>co_pandding:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_pandding}</td>
                        </tr>
                        <tr>
                          <td><strong>co_aaplication_pan_no:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_aaplication_pan_no}</td>
                        </tr>
                        <tr>
                          <td><strong>co_adhar_no:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_adhar_no}</td>
                        </tr>
                        <tr>
                          <td><strong>co_dob:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_dob}</td>
                        </tr>
                        <tr>
                          <td><strong>co_voter_id:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_voter_id}</td>
                        </tr>
                        <tr>
                          <td><strong>co_spouse_name:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_spouse_name}</td>
                        </tr>
                        <tr>
                          <td><strong>co_spouse_dob:</strong></td>
                          <td>{coapplicantloanpaymentdetails.co_spouse_dob}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>

                {/* Guarantor Applicantdetails Table */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>Guarantor User Details</h3>

                    {form.guarantordetails && form.guarantordetails.map((guarantordetails, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>guar_name:</strong></td>
                          <td>{guarantordetails.guar_name}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_email:</strong></td>
                          <td>{guarantordetails.guar_email}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_phone:</strong></td>
                          <td>{guarantordetails.guar_phone}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_address:</strong></td>
                          <td>{guarantordetails.guar_address}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_business_address:</strong></td>
                          <td>{guarantordetails.guar_business_address}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_monthly_salary:</strong></td>
                          <td>{guarantordetails.guar_monthly_salary}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_yearly_income:</strong></td>
                          <td>{guarantordetails.guar_yearly_income}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>

                {/* Guarantor Bank Table */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>CoApplicant Bank Details</h3>

                    {form.guarantorbankdetails && form.guarantorbankdetails.map((guarantorbankdetails, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>bank_name:</strong></td>
                          <td>{guarantorbankdetails.guar_bank_name}</td>
                        </tr>
                        <tr>
                          <td><strong>account_type:</strong></td>
                          <td>{guarantorbankdetails.guar_account_type}</td>
                        </tr>
                        <tr>
                          <td><strong>account_number:</strong></td>
                          <td>{guarantorbankdetails.guar_account_number}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_remark:</strong></td>
                          <td>{guarantorbankdetails.guar_remark}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>

                {/* Guarantor Loan Payment Table */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>Guarantor Loan Details</h3>

                    {form.guarantorloandetails && form.guarantorloandetails.map((guarantorloandetails, index) => (

                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>guar_bank_nbfc:</strong></td>
                          <td>{guarantorloandetails.guar_bank_nbfc}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_loan_type:</strong></td>
                          <td>{guarantorloandetails.guar_loan_type}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_emi:</strong></td>
                          <td>{guarantorloandetails.guar_emi}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_start_form:</strong></td>
                          <td>{guarantorloandetails.guar_start_form}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_pandding:</strong></td>
                          <td>{guarantorloandetails.guar_pandding}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_aaplication_pan_no:</strong></td>
                          <td>{guarantorloandetails.guar_aaplication_pan_no}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_adhar_no:</strong></td>
                          <td>{guarantorloandetails.guar_adhar_no}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_dob:</strong></td>
                          <td>{guarantorloandetails.guar_dob}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_voter_id:</strong></td>
                          <td>{guarantorloandetails.guar_voter_id}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_spouse_name:</strong></td>
                          <td>{guarantorloandetails.guar_spouse_name}</td>
                        </tr>
                        <tr>
                          <td><strong>guar_spouse_dob:</strong></td>
                          <td>{guarantorloandetails.guar_spouse_dob}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <table className="responsive-table">
                    <h3>files</h3>

                    {form.files && form.files.map((file, index) => (
                      <tbody className='' key={index}>
                        <tr>
                          <td><strong>{file.fieldName}</strong>  </td>
                          {/* <td>{file.originalFileName}</td> */}
                          <td>
                            {/* Use the anchor tag for download */}
                            <a href={`http://15.207.195.184:8000/api/v1/download/${file._id}`} download>
                              Download File
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>

              </div>
            </div>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>

    </section>

  );
};

export default UserData;
