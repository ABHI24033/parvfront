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
    password: "",
    cpassword: "",
  });
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [eye, setEye] = useState(false);
  const [coneye, setConEye] = useState(false);

  const [inputDisable, setInputDisable] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleEye = () => {
    setEye(!eye);
    setConEye(!coneye);
  }

  const getOpt = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/req_otp`, {email});
      console.log(res);
      if (res?.status===200) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("Error :", error?.message);
    }
  }

  const VerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/verify_otp`, { otp, email });
      if (res) {
        toast.success("Verified");
        setInputDisable(true);
      }
    } catch (error) {
      // toast.error("Something went wrong !");
      toast.error(error?.response?.data?.message);
      console.log("Error : ", error);
    }
  }

  const updatepPassword = async (e) => {
    e.preventDefault();
    if (formData?.password !== formData?.cpassword) {
      toast.warn("Password and Confirm password not matching");
      return;
    }
    try {
      const res = await axios.patch(`${backendUrl}/updatePassword`, { email, newpassword: formData?.password });
      console.log(res);
      if (res) {
        toast.success("Password Updated Successfully");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log("Something went wrong", error);
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
                <form >
                  <div className="mb-2 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
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
                      disabled={inputDisable === true}
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
                      disabled={inputDisable === true}
                    />
                    <button className="btn btn-primary py-1" onClick={VerifyOTP}>Submit OTP</button>
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
                      disabled={inputDisable === false}
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
                      disabled={inputDisable === false}
                    />
                    <div className="eye_container">
                      {
                        coneye === true ? <PiEyeSlashFill onClick={toggleEye} /> : <IoEyeSharp onClick={toggleEye} />
                      }

                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 py-4">
                    <div className="d-grid">
                      <button
                        // type="submit"
                        style={{ backgroundColor: "#0c0c37" }}
                        className="btn btn-primary text-white"
                        disabled={inputDisable === false ? true : false}
                        onClick={updatepPassword}
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
