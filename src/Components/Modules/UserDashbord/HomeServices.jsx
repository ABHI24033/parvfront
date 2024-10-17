import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'
import './homeservices.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLandmark } from "@fortawesome/free-solid-svg-icons";
// import { backendUrl } from '../../../env';
const HomeServices = () => {
  // const [goldform, setGoldforms] = useState();
  // const [schoolForms, setSchoolforms] = useState();

  // const [selectedUser, setSelectedUser] = useState(null);
  // const [type, setType] = useState("");
  // const [goldforms, setGoldforms] = useState([]);
  // const [professionalforms, setProfessionalforms] = useState([]);
  // const [personalforms, setPersonalforms] = useState([]);
  // const [homeforms, setHomeforms] = useState([]);
  // const [carforms, setCarforms] = useState([]);
  // const [businessforms, setBusinessforms] = useState([]);

  // console.log(goldform);
  // useEffect(() => {
  //   getAllGoldForms();
  //   // getAllSchoolForms();
  //   // getAllProfessionalForms();
  //   getAllPersonalForms();
  //   getAllHomeLoanForms();
  //   getAllCarLoanForms();
  //   getAllBusinessLoanForms();
  // }, [])
  // const getAllSchoolForms = async () => {
  //   const userID = localStorage.getItem("userID");
  //   try {
  //     const response = await fetch(
  //       // `http://15.207.195.184:8000/api/v1/getAllSchoolForms/${userID}`,
  //       `${backendUrl}/getAllSchoolForms/${userID}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         }
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     console.log("gel school form", data.data);
  //     // console.log("data");
  //     // this is usestate hook
  //     setSchoolforms(data.data);
  //     // console.log()
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }




  // const getAllGoldForms = async () => {
  //   const userID = localStorage.getItem("userID");
  //   try {
  //     const response = await fetch(
  //       `${backendUrl}/getAllGoldForms/${userID}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         }
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     console.log("Gold Loan Form", data.data);
  //     // console.log("data");
  //     setGoldforms(data.data);
  //     // this is usestate hook
  //     // console.log()
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }

  

  // const getAllPersonalForms = async () => {
  //   const userID = localStorage.getItem("userID");
  //   try {
  //     const response = await fetch(
  //       // `http://15.207.195.184:8000/api/v1/getAllPersonalForms/${userID}`,
  //       `${backendUrl}/getAllPersonalForms/${userID}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         }
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     console.log("Personal Loan form", data.data);
  //     // console.log("data");
  //     // this is usestate hook
  //     setPersonalforms(data.data);
  //     // console.log()
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }


  // const getAllHomeLoanForms = async () => {
  //   const userID = localStorage.getItem("userID");
  //   try {
  //     const response = await fetch(
  //       // `http://15.207.195.184:8000/api/v1/getAllHomeLoanForms/${userID}`,
  //       `${backendUrl}/getAllHomeLoanForms/${userID}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         }
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     console.log("Home Loan form", data.data);
  //     // console.log("data");
  //     // this is usestate hook
  //     setHomeforms(data.data);
  //     // console.log()
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }


 
  // const getAllCarLoanForms = async () => {
  //   // const userID = localStorage.getItem("userID");
  //   try {
  //     const response = await fetch(
  //       // `http://15.207.195.184:8000/api/v1/getAllCarLoanForms/${userID}`,
  //       `${backendUrl}/getAllCarLoanForms/`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         }
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     console.log("Car Loan form", data.data);
  //     // console.log("data");
  //     // this is usestate hook
  //     setCarforms(data.data);
  //     // console.log()
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }


  // const getAllBusinessLoanForms = async () => {
  //   const userID = localStorage.getItem("userID");
  //   try {
  //     const response = await fetch(
  //       // `http://15.207.195.184:8000/api/v1/getAllBusinessLoanForms/${userID}`,
  //       `${backendUrl}/getAllBusinessLoanForms/${userID}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         }
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     console.log("Business Loan form", data.data);
  //     // console.log("data");
  //     // this is usestate hook
  //     setBusinessforms(data.data);
  //     // console.log()
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }
  return (
    <>
      <Sidebar>
        <div className="container mt-5 ">
          <h2 className='text-primary'>All Services</h2>
          <div className="row mt-5">
            <div className="col-md-4 mb-4">
              <div className="border border-secondary rounded p-3">
                <h3 className='text-primary '>
                  <FontAwesomeIcon className='loanIcon' icon={faLandmark} />
                  Home Loan</h3>

                <p className='mt-3'>
                  Home loans made easy with low rates and flexible terms.
                </p>
                {/* <Link to='/admin/homeloantable'> */}
                <Link to='/homeservices/formTable/getallhomeloan'>
                  {/* <button  className="homeServices">Apply Now</button> */}
                  {/* <button className="homeServices px-4">Total Applicants : {homeforms?.length}</button> */}
                  <button className="homeServices px-4">Applications </button>
                </Link>

              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="border border-secondary rounded p-3">
                <h3 className='text-primary '>
                  {/* <FontAwesomeIcon className='loanIcon' icon={faLandmark} /> */}
                  <i className="fa-solid fa-car loanIcon"></i>
                  Vehicle Loan</h3>

                <p className='mt-3'>
                Vehicle loans made easy with low rates and flexible terms.
                </p>
                <Link to='/homeservices/formTable/get_all_vehicle_loan'>
                  {/* <button  className="homeServices">Apply Now</button> */}
                  {/* <button className="homeServices px-4">Total Applicants : {carforms?.length}</button> */}
                  <button className="homeServices px-4">Applications </button>
                </Link>

              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="border border-secondary rounded p-3">
                <h3 className='text-primary '>
                  {/* <FontAwesomeIcon className='loanIcon' icon={faLandmark} /> */}
                  <i class="fa-solid fa-person loanIcon"></i>
                  Personal Loan</h3>

                <p className='mt-3'>
                  Personal loans made easy with low rates and flexible terms.
                </p>
                <Link to='/homeservices/formTable/get_all_personal_loan'>
                  {/* <button className="homeServices px-4">Total Applicants : {personalforms?.length}</button> */}
                  <button className="homeServices px-4">Applications </button>
                </Link>

              </div>
            </div>
           
            <div className="col-md-4 mb-4">
              <div className="border border-secondary rounded p-3">
                <h3 className='text-primary '>
                  {/* <FontAwesomeIcon className='loanIcon' icon={faLandmark} /> */}
                  <i class="fa-solid fa-business-time loanIcon"></i>
                  Business Loan</h3>

                <p className='mt-3'>
                  Business loans made easy with low rates and flexible terms.
                </p>
                <Link to='/homeservices/formTable/getAllBusinessLoanForms'>
                  <button className="homeServices px-4">Applications </button>
                </Link>

              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="border border-secondary rounded p-3">
                <h3 className='text-primary '>
                  <i class="fa-solid fa-coins loanIcon"></i>
                  Gold Loan</h3>

                <p className='mt-3'>
                  Gold loans made easy with low rates and flexible terms.
                </p>
                <Link to='/homeservices/formTable/getAllGoldForms'>
                  <button className="homeServices px-4">Applications </button>
                </Link>

              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  )
}

export default HomeServices