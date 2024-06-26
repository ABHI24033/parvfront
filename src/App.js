import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./assets/css/theme.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./assets/fonts/flat-font-icons/css/flaticon.css";
import "./assets/fonts/fontello-icons/fontello.css";
import "./assets/libs/bootstrap-icons/font/bootstrap-icons.css";
import "./assets/libs/jquery-ui/dist/themes/base/jquery-ui.min.css";
import "./assets/libs/magnific-popup/dist/magnific-popup.css";
import "./assets/libs/nouislider/dist/nouislider.min.css";
import "./assets/libs/tiny-slider/dist/tiny-slider.css";
import Home from "./Components/Other/Home";
import About from "./Components/Other/About";
import Contact from "./Components/Other/Contact";
import Blog from "./Components/Other/Blog";
import Loan from "./Components/Other/Loan";
// import StudentLoan from "./Components/Other/Loans/StudentLoan";
import HomeLoan from "./Components/Modules/Loans/HomeLoan";
import BusinessLoan from "./Components/Modules/Loans/BusinessLoan";
import PersonalLoan from "./Components/Modules/Loans/PersonalLoan";
import CarLoan from "./Components/Modules/Loans/CarLoan";
import Footer from "./Common/Footer";
// import EducationLoan from "./Components/Modules/EducationLoan";
import Navbar from "./Common/Navbar";
import Gallery from "./Components/Other/Gallery";
import Career from "./Components/Other/Career";
import Login from "./Components/Modules/Login/Login";
// import Signup from "./Components/Other/Signup";
import Signup from "./Components/Modules/Login/Signup";
// import Admin from "./Components/Modules/Admin";
// import Agent from "./Components/Modules/Agent";
import Termcondation from "./Components/Other/Termcondation";
// import UserDashbord from "./Components/Modules/UserDashbord";
// import Email from "./Components/Modules/Admin/Email";
// import History from "./Components/Modules/Admin/History";
// import PendingWork from "./Components/Modules/Admin/PendingWork";
// import UserData from "./Components/Modules/Admin/UserData";
//import Intrestrate from "./Components/Modules/Admin/Intrestrate";
import Testmonial from "./Components/Modules/Admin/Testmonial";
import GalleryImages from "./Components/Modules/Admin/GalleryImages";
import Sendblog from "./Components/Modules/Admin/Sendblog";
import BankForm from "./Components/Modules/UserDashbord/BankForm";
import ProfileAdmin from "./Components/Modules/Admin/ProfileAdmin";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ProfessionalLoan from "./Components/Modules/Loans/ProfessionalLoan";
import GoldLoan1 from "./Components/Modules/Loans/GoldLoan1";

// import Buttone from "./Components/Modules/Buttone";
// import UserDashboard from "./Components/Modules/UserDashbord";
// import Status from "./Components/Modules/UserDashbord/Status";
// import SupportForm from "./Components/Modules/UserDashbord/SupportForm";
import Sidebar from "./Components/Modules/UserDashbord/Sidebar";
import HomeServices from "./Components/Modules/UserDashbord/HomeServices";
import FormDetailTable from "./Components/Modules/UserDashbord/FormDetailTable";
import FormModel from "./Components/Modules/UserDashbord/FormModel";
import Dashboard from "./Components/Modules/UserDashbord/LoggedUserDashboard/Dashboard";
import Connectors from "./Components/Modules/Admin/Connectors";
import Employess from "./Components/Modules/Admin/Employess";
import AddEmoloyee from "./Components/Modules/Admin/AddEmoloyee";
import ConnecotrFormDetailedTable from "./Components/Modules/connector/ConnectorFormDetailedTable";
import EmployeeDashboardTable from "./Components/Modules/Employee/Telecaller/EmployeeDashboardTable";
import ContactTable from "./Components/Modules/UserDashbord/ContactTable";
// import HomeLoanTable from "./Components/Modules/Loans/HomeLoan/HomeLoanTable";

// import AdminHomeLoanTable from "./Components/Modules/Loans/HomeLoan/AdminHomeLoanTable";
import UploadGalleryForm from "./Components/Modules/Admin/UploadGalleryForm";
import LoanCalculator from "./Common/LoanCalculator";
import CareerTable from "./Components/Modules/UserDashbord/CareerTable";

import AdminHomeLoanTable from "./Components/Modules/connector/HomeLoanTable";
// import HomeLoanTable from "./Components/Modules/connector/HomeLoanTable";
import ForgotPassword from "./Components/Modules/Login/ForgotPassword";
import AddRemarks from "./Components/Modules/Admin/AddRemarks";
import DailyWorkReport from "./Components/Modules/Employee/RM/DailyWorkReport";
// import TCWorkReport from "./Components/Modules/Employee/Telecaller/TCWorkReport";
import RegisterConnector from "./Components/Authentication/RegisterConnector";
import LoginUser from "./Components/Authentication/LoginUser";
import Profile from "./Components/Authentication/Profile";
import WorkReport from "./Components/Modules/Admin/WorkReport";
import WRTable from "./Components/Modules/Employee/RM/WRTable";
import FSWorkReport from "./Components/Modules/Employee/FieldStaff/FSWorkReport";
import BlogDesc from "./Components/Other/BlogDesc";
import HomeLoanForm from "./Components/Loansform/HomeLoanForm";
import HomeLoanEdit from "./Components/EditForm/HomeLoanEdit";
import GoldLoanEdit from "./Components/EditForm/GoldLoanEdit";
import BusinessLoanEdit from "./Components/EditForm/BusinessLoanEdit";
import PersonalLoanEdit from "./Components/EditForm/PersonalLoanEdit";
import VehicleLoanEdit from "./Components/EditForm/VehicleLoanEdit";
import JobPost from "./Components/Modules/Jobs/JobPost";
import JobDetails from "./Components/Modules/Jobs/JobDetails";
import JobsTable from "./Components/Modules/Jobs/JobsTable";
import UploadConnectorDoc from "./Components/Modules/connector/UploadConnectorDoc";
import ConnectorProfile from "./Components/Modules/connector/ConnectorProfile";
import AddPayment from "./Components/Modules/connector/AddPayments";
import Paymentstable from "./Components/Modules/connector/Paymentstable";

function App() {
  console.log("userloggedin" + " = " + localStorage.getItem("userID"))

  return (
    <>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route index path="/*" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/loan" element={<Loan />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDesc />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/homeloan" element={<HomeLoan />} />
        <Route path="/connector/:endpoint" element={localStorage.getItem("userID") !== null ?<ConnecotrFormDetailedTable />:<Login/>} />
        <Route path="/emp_rm/:endpoint" element={localStorage.getItem("userID") !== null ?<FormDetailTable />:<Login/>} />
        <Route path="/emp_rm/work_report" element={localStorage.getItem("userID") !== null ?<DailyWorkReport />:<Login/>} />
        {/* <Route path="/tc/work_report" element={localStorage.getItem("userID") !== null ?<FSWorkReport />:<Login/>} /> */}
        <Route path="/field_staff/work_report" element={localStorage.getItem("userID") !== null ?<FSWorkReport />:<Login/>} />
        <Route path="/admin/homeloantable" element={localStorage.getItem("userID") !== null ?<AdminHomeLoanTable />:<Login/>} />
{/* =========================using firebase authentication==================================== */}
        {/* <Route path="/abhi" element={<RegisterConnector />} />
        <Route path="/abhilog" element={<LoginUser />} />
        <Route path="/abhipro" element={<Profile />} /> */}
        {/* ========================================================= */}
        <Route path="/workReport/:endPoint" element={<WRTable />} />

        <Route path="/businessloan" element={<BusinessLoan />} />
        <Route path="/carloan" element={<CarLoan />} />
        <Route path="/personalloan" element={<PersonalLoan />} />
        <Route path="/goldloan1" element={<GoldLoan1 />} />
        <Route path="/career" element={<Career />} />
        <Route path="/career/:id" element={<JobDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ForgotPassword/>}/>
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/loan_calculator" element={<LoanCalculator />} />
        <Route path="/Termcondation" element={<Termcondation />} />

        {/* AdminRoutes */}
        {/* edit form */}
        <Route path="/getallhomeloan/:id" element={localStorage.getItem("userID") !== null ? <HomeLoanEdit /> : <Login />} />
        <Route path="/getAllGoldForms/:id" element={localStorage.getItem("userID") !== null ? <GoldLoanEdit /> : <Login />} />
        <Route path="/get_all_personal_loan/:id" element={localStorage.getItem("userID") !== null ? <PersonalLoanEdit /> : <Login />} />
        <Route path="/get_all_vehicle_loan/:id" element={localStorage.getItem("userID") !== null ? <VehicleLoanEdit /> : <Login />} />
        <Route path="/getAllBusinessLoanForms/:id" element={localStorage.getItem("userID") !== null ? <BusinessLoanEdit /> : <Login />} />
        <Route path="/add_payments/:id" element={localStorage.getItem("userID") !== null ? <AddPayment /> : <Login />} />
        <Route path="/show_payments" element={localStorage.getItem("userID") !== null ? <Paymentstable /> : <Login />} />
        {/* = */}

        {/* <Route path="/remark/:id" element={localStorage.getItem("userID") !== null ? <AddRemarks /> : <Login />} /> */}
        <Route path="/remark/:endpoint/:id" element={localStorage.getItem("userID") !== null ? <AddRemarks /> : <Login />} />
        <Route path="/testmonial" element={localStorage.getItem("userID") !== null ? <Testmonial /> : <Login />} />
        <Route path="/galleryimages" element={localStorage.getItem("userID") !== null ? <GalleryImages /> : <Login />} />

        <Route path="sidebar" element={localStorage.getItem("userID") !== null ? <Sidebar /> : <Login />} />

        <Route path="/contact_data" element={localStorage.getItem("userID") !== null ? <ContactTable /> : <Login />} />
        <Route path="/post_job" element={localStorage.getItem("userID") !== null ? <JobPost /> : <Login />} />
        <Route path="/job_table" element={localStorage.getItem("userID") !== null ? <JobsTable /> : <Login />} />
        <Route path="/career_data" element={localStorage.getItem("userID") !== null ? <CareerTable /> : <Login />} />
        <Route path="/homeservices" element={localStorage.getItem("userID") !== null ? <HomeServices /> : <Login />} />
        <Route path="/employee_data" element={localStorage.getItem("userID") !== null ? <EmployeeDashboardTable /> : <Login />} />
        <Route path="/connectors" element={localStorage.getItem("userID") !== null ? <Connectors /> : <Login />} />
        <Route path="/employees" element={localStorage.getItem("userID") !== null ? <Employess /> : <Login />} />
        <Route path="/add_employee" element={localStorage.getItem("userID") !== null ? <AddEmoloyee /> : <Login />} />
        <Route path="/sendblog" element={localStorage.getItem("userID") !== null ? <Sendblog /> : <Login />} />
        <Route path="/profile" element={localStorage.getItem("userID") !== null ? <ProfileAdmin /> : <Login />} />
        <Route path="/profile/:id" element={localStorage.getItem("userID") !== null ? <ConnectorProfile /> : <Login />} />
        <Route path="/upload_gallery" element={localStorage.getItem("userID") !== null ? <UploadGalleryForm /> : <Login />} />
        <Route path="/upload_conn_doc/:id" element={localStorage.getItem("userID") !== null ? <UploadConnectorDoc /> : <Login />} />


        <Route path="/dashboard/:id" element={localStorage.getItem("userID") !== null ? <Dashboard /> : <Login />} />
        {
          localStorage.getItem("user_type") === "Connector" ?
            <>
              <Route path="/homeservices/formTable/:endpoint" element={localStorage.getItem("userID") !== null ? <ConnecotrFormDetailedTable /> : <Login />} />
            </>
            :
            <>
              <Route path="/homeservices/formTable/:endpoint" element={localStorage.getItem("userID") !== null ? <FormDetailTable /> : <Login />} />
            </>
        }
        {/* <Route path="/homeservices/formTable/:endpoint" element={localStorage.getItem("userID") !== null ? <FormDetailTable /> : <Login />} /> */}


        <Route path="/formModel/:endpoint/:formid" element={<FormModel></FormModel>} />

       



      </Routes>
      <Footer />
    </>
  );
}

export default App;
