import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faGlobe, faClipboardQuestion } from "@fortawesome/free-solid-svg-icons";
import { BsFillClipboard2DataFill } from "react-icons/bs";
import { GoSidebarCollapse } from "react-icons/go";
import { GoSidebarExpand } from "react-icons/go";
import {
  AiOutlineDashboard,
  AiOutlineMoneyCollect,
  AiOutlineProfile,
  AiOutlineHistory,
} from "react-icons/ai";
import { WhatsappShareButton } from "react-share";
import icon from '../../assets/images/icon/credit-card-icon-13.svg'

const UserDashboard = ({ children }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Allservices");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const shareUrl = 'http://15.207.195.184:3000/'
  return (
    <div className="container-fluid mt-20 border border-danger">
      <div className="row">
        <div className={`col-lg-3 col-12 mb-3 ${isSidebarOpen ? "d-block" : "d-none d-lg-block"}`}>
          <button
            onClick={handleToggleSidebar}
            className="btn btn-outline-primary d-lg-none mb-2"
          >
            {isSidebarOpen ? <GoSidebarExpand /> : <GoSidebarCollapse />}

          </button>

          <div className="bg-white shadow border rounded p-3 mt-20">
            <img src={icon} alt="icon" className="mb-3 img-fluid" />

            <div className="d-flex justify-content-end ">
              <WhatsappShareButton url={shareUrl}>
                <FontAwesomeIcon icon={faShare} className="text-primary me-2" />
              </WhatsappShareButton>

              <a href="https://legal257.in/" className="text-primary me-2">
                <FontAwesomeIcon icon={faGlobe} />
              </a>

              <Link to="/support" onClick={handleToggleSidebar} className="text-primary">
                <FontAwesomeIcon icon={faClipboardQuestion} />
              </Link>
            </div>

            <ul className="list-unstyled mt-3">
              <li
                className={`d-flex align-items-center ${selectedMenuItem === "Allservices" ? "active" : ""
                  }`}
                onClick={() => setSelectedMenuItem("Allservices")}
              >
                <Link to="/adminUserData" className="text-decoration-none fw-bold fs-3 text-bold">
                  <BsFillClipboard2DataFill className="me-2" />
                  All Data
                </Link>
              </li>

              <li
                className={`d-flex align-items-center text-bold ${selectedMenuItem === "Status" ? "active" : ""
                  }`}
                onClick={() => setSelectedMenuItem("Status")}
              >
                <Link to="/status" className="text-decoration-none fw-bold fs-3 text-bold ">
                  <AiOutlineDashboard className="me-2 text-center fw-bold fs-3 w-8" />
                  Notifications
                </Link>
              </li>

              <li
                className={`d-flex align-items-center text-bold ${selectedMenuItem === "Support" ? "active" : ""
                  }`}
                onClick={() => setSelectedMenuItem("Support")}
              >
                <Link to="/support" className="text-decoration-none fw-bold fs-3 text-bold ">
                  <AiOutlineDashboard className="me-2 text-center fw-bold fs-3 w-8" />
                  Support
                </Link>
              </li>

              {/* Add other menu items as needed */}
            </ul>
          </div>
        </div>

        <div className="col-lg-9 col-12">{children}</div>
      </div>
    </div>
  );
};

export default UserDashboard;
