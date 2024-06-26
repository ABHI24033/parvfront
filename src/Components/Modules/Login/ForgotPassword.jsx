import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css"
import { backendUrl } from "../../../env";
import { IoEyeSharp } from "react-icons/io5";
import { PiEyeSlashFill } from "react-icons/pi";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // email: "",
    // otp:"",
    password: "",
    cpassword: "",
    // user_type: "Connector",
  });
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  console.log(formData, email, otp);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const success = () =>
    toast.success("Login successfull", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post(`${backendUrl}/reset_password`, {
        email: email,
        password: formData.password,
        // user_type: formData.user_type,
      });
      console.log("This is login responwe ", response);

      if (response.data.user) {
        const data = response.data.user;
        // Store the user ID in localStorage
        // console.log(data?.user?.user_type, "userType");
        // localStorage.setItem("userID", data._id);
        // localStorage.setItem("user_type", data?.user_type);
        setTimeout(() => {
          // navigate('/sidebar');
          // const user_type = localStorage.getItem("user_type");
          // console.log(user_type,"user_type");
          if (data?.user_type === "Employee") {
            navigate('/employee_data');
          }
          if (data?.user_type === "Connector") {
            navigate('/profile');
          }
          if (data?.user_type === "Admin") {
            navigate('/homeservices');
          }
          window.location.reload();
        }, 1500);
        localStorage.setItem("isLoggedIn", true);
        success();
      } else {
        console.log(response?.data.message);
        toast.error(response.data.message, "error");
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };
  const [eye, setEye] = useState(false);
  const [otpId, setOtpId] = useState(false);

  const toggleEye = () => {
    setEye(!eye);
  }
  const getOpt = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/req_otp`, email);
      console.log(res);
      setOtpId(res?.data?.storeotp);
      if (res) {
        toast.success("Please Check your gmail for OTP ");
      }
    } catch (error) {
      console.log("Error :",error);
    }
  }

  return (
    <>
      <section className="py-lg-12 py-10 bg-light">
        <div className="container ">
          <div className=" mx-auto py-10 ">
            <div className=" col-lg-5 offset-lg-2 col-lg-5 col-md-6 col-sm-12 col-12 mx-auto">
              <div className="card card-body border-0 bg-white px-4 login-form">
                <h3 className="mb-3 text-center">Reset Your Password</h3>
                {/* <form onSubmit={handleSubmit}> */}
                <form >
                  {/* <div className="mb-2 col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                    <p className="mb-1">User Type</p>
                    <label className="form-label sr-only" htmlFor="userType">
                      User Type
                    </label>
                    <select
                      id="userType"
                      name="user_type"
                      className="form-control mt-1"
                      value={formData.user_type}
                      onChange={handleChange}
                      required
                    >
                      <option value="Admin">Admin</option>
                      <option value="Employee">Employee</option>
                      <option value="Connector">Connector</option>
                    </select>
                  </div> */}
                  <div className="mb-2 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    {/* <p>User Name</p> */}
                    <p className="mb-1">E-Mail</p>
                    <label className="form-label sr-only" htmlFor="email">
                      E-Mail
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="E-mail"
                      className="form-control mt-1"
                      value={formData.email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button className="btn btn-success py-1" onClick={getOpt}>Request for OTP</button>
                  </div>
                  <div className="mb-2 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 password">
                    <p className=" mb-1">OTP</p>
                    <label className="form-label sr-only" htmlFor="otp">
                      OTP
                    </label>
                    <input
                      id="otp"
                      name="otp"
                      type="text"
                      placeholder="Enter OTP send to your registered email"
                      className="form-control mt-1 password"
                      value={formData.otp}
                      onChange={(e) => { setOtp(e.target.value) }}
                    // required
                    />
                    <button className="btn btn-primary py-1">Submit OTP</button>
                  </div>
                  <div className="mb-2 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 password">
                    <p className=" mb-1"> Password</p>
                    <label className="form-label sr-only" htmlFor="password">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type={`${eye ? "text" : "password"}`}
                      placeholder="Password"
                      className="form-control mt-1 password"
                      value={formData.password}
                      onChange={handleChange}
                      // required
                      disabled
                    />
                    <div className="eye_container">
                      {
                        eye === true ? <PiEyeSlashFill onClick={toggleEye} /> : <IoEyeSharp onClick={toggleEye} />
                      }

                    </div>
                  </div>
                  <div className="mb-2 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 password">
                    <p className=" mb-1"> Confirm Password</p>
                    <label className="form-label sr-only" htmlFor="cpassword">
                      Confirm Password
                    </label>
                    <input
                      id="cpassword"
                      name="cpassword"
                      type={`${eye ? "text" : "password"}`}
                      placeholder="Confirm Password"
                      className="form-control mt-1 password"
                      value={formData.cpassword}
                      onChange={handleChange}
                      // required
                      disabled
                    />
                    <div className="eye_container">
                      {
                        eye === true ? <PiEyeSlashFill onClick={toggleEye} /> : <IoEyeSharp onClick={toggleEye} />
                      }

                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 py-4">
                    <div className="d-grid">
                      <button
                        type="submit"
                        style={{ backgroundColor: "#0c0c37" }}
                        className="btn text-white"
                        disabled
                      >
                        Update Password
                      </button>
                      <Link to={'/login'} className=" fs-6 text-end mt-2">Back to Login</Link>
                      <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
