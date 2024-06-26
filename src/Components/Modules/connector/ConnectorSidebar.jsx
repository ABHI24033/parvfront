import React from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

const ConnectorSidebar = () => {
    const { pathname } = useLocation();
    const {endpoint}=useParams();
    // console.log(pathname);
    const navigate = useNavigate();
    const [toggle, setToggle] = React.useState(false);

    const handleItemClick = (path) => {
        // Close the drawer when an item is clicked
        setToggle(!toggle);
        // Navigate to the corresponding route
        navigate(path);
    };


    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userID");
    }
    return (
        <div>
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
                    to="/connector/getallhomeloan"
                    className={`list-group-item list-group-item-action my-2 
                    ${pathname === "/connector/getAllSalariedHomeLoanForm" || pathname === "/connector/getAllSalariedHomeLoanForm" ? "active" : null}`}
                    onClick={() => handleItemClick("/connector/getAllSalariedHomeLoanForm")}
                >
                    <div className="list-item-hover">
                        <i className="fa-solid fa-house fs-4 me-2"></i>
                        <span className="fs-5 fw-bold fs-3 text-bold ">Home Loan</span>
                    </div>
                </Link>
              

                <Link
                    // to="/homeservices/formTable/getAllCarLoanForms"
                    to="/connector/get_all_vehicle_loan"
                    className={`list-group-item list-group-item-action my-2 ${pathname === "/connector/getAllCarLoanForms" ? "active" : null}`}
                    onClick={() => handleItemClick("/getAllCarLoanForms")}
                >
                    <div className="list-item-hover">
                        <i className="fa-solid fa-car loanIcon"></i>
                        <span className="fs-5 fw-bold fs-3 text-bold">Vehicle Loan</span>
                    </div>
                </Link>
                
                <Link
                    // to="/homeservices/formTable/getAllPersonalForms"
                    to="/connector/get_all_personal_loan"
                    className={`list-group-item list-group-item-action my-2 ${pathname === "/connector/getAllPersonalForms" ? "active" : null}`}
                    onClick={() => handleItemClick("/getAllPersonalForms")}
                >
                    <div className="list-item-hover">
                    <i class="fa-solid fa-person loanIcon"></i>
                        <span className="fs-5 fw-bold fs-3 text-bold">Personal Loan</span>
                    </div>
                </Link>
                <Link
                    // to="/homeservices/formTable/getAllBusinessLoanForms"
                    to="/connector/getAllBusinessLoanForms"
                    className={`list-group-item list-group-item-action my-2 ${pathname === "/connector/getAllBusinessLoanForms" ? "active" : null}`}
                    onClick={() => handleItemClick("/getAllBusinessLoanForms")}
                >
                    <div className="list-item-hover">
                    <i class="fa-solid fa-business-time loanIcon"></i>
                        <span className="fs-5 fw-bold fs-3 text-bold">Business Loan</span>
                    </div>
                </Link>

                {/* <Link
                    to="/connector/getAllProfessionalForms"
                    className={`list-group-item list-group-item-action my-2 ${pathname === "/connector/getAllProfessionalForms" ? "active" : null}`}
                    onClick={() => handleItemClick("/getAllProfessionalForms")}
                >
                    <div className="list-item-hover">
                        <i className="fa-solid fa-user-tie loanIcon"></i>
                        <span className="fs-5 fw-bold fs-3 text-bold">Professional Loan</span>
                    </div>
                </Link> */}
                <Link
                    // to="/homeservices/formTable/getAllGoldForms"
                    to="/connector/getAllGoldForms"
                    className={`list-group-item list-group-item-action my-2 ${pathname === "/connector/getAllGoldForms" ? "active" : null}`}
                    onClick={() => handleItemClick("/getAllGoldForms")}
                >
                    <div className="list-item-hover">
                        {/* <i className="bi bi-table fs-5 me-2"></i> */}
                        <i class="fa-solid fa-coins loanIcon"></i>
                        <span className="fs-5 fw-bold fs-3 text-bold">Gold Loan</span>
                    </div>
                </Link>
                <Link
                    to="/show_payments"
                    className={`list-group-item list-group-item-action my-2 ${pathname === "/show_payments" ? "active" : null}`}
                    // onClick={() => handleItemClick("/getAllSchoolForms")}
                >
                    <div className="list-item-hover">
                    <i class="fa-solid fa-indian-rupee-sign loanIcon"></i>
                        <span className="fs-5 fw-bold fs-3 text-bold"> Payments</span>
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


            </>
        </div>
    );
}

export default ConnectorSidebar;
