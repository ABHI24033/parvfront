import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css"
import { backendUrl } from "../../../env";
import { IoEyeSharp } from "react-icons/io5";
import { PiEyeSlashFill } from "react-icons/pi";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    user_type: "Connector",
  });

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

    // Basic validation
    if (!formData.email || !formData.password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/login`, {
        email: formData.email,
        password: formData.password,
        user_type: formData.user_type,
      });
      console.log("This is login responwe ", response);

      if (response.data.user) {
        const data = response.data.user;
        localStorage.setItem("userID", data._id);
        localStorage.setItem("user_type", data?.user_type);
        setTimeout(() => {
          if (data?.user_type === "Employee-1") {
            navigate('/profile');
          }
          if (data?.user_type === "Employee-3") {
            navigate('/profile');
          }
          if (data?.user_type === "Employee-2") {
            navigate('/profile');
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

  const toggleEye = () => {
    setEye(!eye);
  }

  return (
    <>
      <section className="py-lg-12 py-10 bg-light">
        <div className="container ">
          <div className=" mx-auto py-10 ">
            <div className=" col-lg-5 offset-lg-2 col-lg-5 col-md-6 col-sm-12 col-12 mx-auto">
              <div className="card card-body border-0 bg-white px-4 login-form">
                <h3 className="mb-3 text-center">Login Here</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-2 col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
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
                      <option value="Employee-1">Employee(E1)</option>
                      <option value="Employee-2">Employee(E2)</option>
                      <option value="Employee-3">Employee(E3)</option>
                      <option value="Connector">Connector</option>
                    </select>
                  </div>
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
                      onChange={handleChange}
                      required
                    />
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
                      required
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
                      >
                        Login
                      </button>
                      <Link to={'/reset-password'} className=" fs-6 text-end mt-2">Forgot Password </Link>
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

export default Login;
