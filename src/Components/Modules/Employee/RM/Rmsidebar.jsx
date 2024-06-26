import React from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../UserDashbord/Sidebar';

const Rmsidebar = () => {
    const { pathname } = useLocation();
    const { endpoint } = useParams();
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
                        to="/emp_rm/getallhomeloan"
                        className={`list-group-item list-group-item-action my-2 
                    ${pathname === "/emp_rm/getallhomeloan" ? "active" : null}`}
                        // onClick={() => handleItemClick("/connector/getAllSalariedHomeLoanForm")}
                    >
                        <div className="list-item-hover">
                            <i className="fa-solid fa-house fs-4 me-2"></i>
                            <span className="fs-5 fw-bold fs-3 text-bold ">Home Loan</span>
                        </div>
                    </Link>


                    <Link
                        // to="/homeservices/formTable/getAllCarLoanForms"
                        to="/emp_rm/get_all_vehicle_loan"
                        className={`list-group-item list-group-item-action my-2 ${pathname === "/emp_rm/get_all_vehicle_loan" ? "active" : null}`}
                        onClick={() => handleItemClick("/getAllCarLoanForms")}
                    >
                        <div className="list-item-hover">
                            <i className="fa-solid fa-car loanIcon"></i>
                            <span className="fs-5 fw-bold fs-3 text-bold">Vehicle Loan</span>
                        </div>
                    </Link>

                    <Link
                        // to="/homeservices/formTable/getAllPersonalForms"
                        to="/emp_rm/get_all_personal_loan"
                        className={`list-group-item list-group-item-action my-2 ${pathname === "/emp_rm/get_all_personal_loan" ? "active" : null}`}
                        onClick={() => handleItemClick("/getAllPersonalForms")}
                    >
                        <div className="list-item-hover">
                            <i class="fa-solid fa-person loanIcon"></i>
                            <span className="fs-5 fw-bold fs-3 text-bold">Personal Loan</span>
                        </div>
                    </Link>
                    <Link
                        // to="/homeservices/formTable/getAllBusinessLoanForms"
                        to="/emp_rm/getAllBusinessLoanForms"
                        className={`list-group-item list-group-item-action my-2 ${pathname === "/emp_rm/getAllBusinessLoanForms" ? "active" : null}`}
                        onClick={() => handleItemClick("/getAllBusinessLoanForms")}
                    >
                        <div className="list-item-hover">
                            <i class="fa-solid fa-business-time loanIcon"></i>
                            <span className="fs-5 fw-bold fs-3 text-bold">Business Loan</span>
                        </div>
                    </Link>

                    <Link
                        // to="/homeservices/formTable/getAllGoldForms"
                        to="/emp_rm/getAllGoldForms"
                        className={`list-group-item list-group-item-action my-2 ${pathname === "/emp_rm/getAllGoldForms" ? "active" : null}`}
                        onClick={() => handleItemClick("/getAllGoldForms")}
                    >
                        <div className="list-item-hover">
                            {/* <i className="bi bi-table fs-5 me-2"></i> */}
                            <i class="fa-solid fa-coins loanIcon"></i>
                            <span className="fs-5 fw-bold fs-3 text-bold">Gold Loan</span>
                        </div>
                    </Link>
                    <Link
                        // to="/homeservices/formTable/getAllGoldForms"
                        to="/emp_rm/work_report"
                        className={`list-group-item list-group-item-action my-2 ${pathname === "/emp_rm/work_report" ? "active" : null}`}
                        onClick={() => handleItemClick("/work_report")}
                    >
                        <div className="list-item-hover">
                            <i class="fa-solid fa-briefcase me-2"></i>
                            <span className="fs-5 fw-bold fs-3 text-bold">Daily Work Report</span>
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
        </div>
    );
}

export default Rmsidebar;
