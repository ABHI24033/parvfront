import React from "react";
// import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./Signup.css";
import { auth, db } from "./Firebase";
function RegisterConnector() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
    mobile_number: "",
    whats_app_number: "",
    current_profession: "",
    company_name: "",
    street: "",
    city: "",
    pincode: "",
    landmark: "",
    district: "",
    state: "",
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
    toast.success("Sign up successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const unsuccess = () =>
    toast.error("Something went wrong,please try again", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(formData?.email, formData?.password);
      const user = userCredential.user;

      // Store user details in Firestore
      const response = await db.collection("users").doc(user.uid).set({
        uid: user.uid,
        email: user.email,
        full_name: formData?.full_name,
        mobile_number: formData?.mobile_number,
        whats_app_number: formData?.whats_app_number,
        current_profession: formData?.current_profession,
        company_name: formData?.company_name,
        street: formData?.street,
        city: formData?.city,
        pincode: formData?.pincode,
        landmark: formData?.landmark,
        district: formData?.district,
        state: formData?.state,
        user_type: "Connector",
      });
      console.log(response);
      // if (response) {
      //   // const data = response.data.message;
      //   // alert(data);
      //   setTimeout(() => {
      //     navigate("/login");
      //   }, 1500);
      //   localStorage.setItem("isLoggedIn", true);
      //   success();
      // } else {
      //   unsuccess();
      // }

    } catch (error) {
      console.log("Error :",error);
    }
  }
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     // Basic validation
  //     if (!formData.email || !formData.password || !formData.user_type) {
  //       alert("Please fill all three email, password,usertype.");
  //       return;
  //     }

  //     try {
  //       const response = await axios.post(
  //         // "http://15.207.195.184:8000/api/v1/register",
  //         // "https://us-central1-joyomoney-a8630.cloudfunctions.net/joyMoney/api/v1/register",
  //         `${backendUrl}/register`,
  //         {
  //           email: formData.email,
  //           password: formData.password,
  //           full_name: formData.full_name,
  //           mobile_number: formData.mobile_number,
  //           whats_app_number: formData.whats_app_number,
  //           current_profession: formData.current_profession,
  //           company_name: formData.company_name,
  //           street: formData.street,
  //           city: formData.city,
  //           pincode: formData.pincode,
  //           landmark: formData.landmark,
  //           district: formData.district,
  //           state: formData.state,
  //           user_type: formData.user_type,
  //         }
  //       );
  //       console.log(response);

  //       if (response) {
  //         const data = response.data.message;
  //         alert(data);
  //         setTimeout(() => {
  //           navigate("/login");
  //         }, 1500);
  //         localStorage.setItem("isLoggedIn", true);
  //         success();
  //       } else {
  //         unsuccess();
  //       }
  //     } catch (error) {
  //       console.error("Login error:", error.message);
  //     }
  //   };
  return (
    <>
      <section className="py-lg-12 py-10 bg-light">
        <div className="container ">
          <div className=" mx-auto py-10 ">
            <div className=" col-lg-12 offset-lg-2  col-md-10 col-sm-12 col-12 mx-auto">
              <div className="card card-body border-0 bg-white px-4 signup-form">
                <h3 className="mb-3 text-center">Signup Here</h3>
                <form onSubmit={handleRegister}>
                  <div className="form-inputs">
                    {/* <div className="mb-2 col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
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
                    <div className="mb-2 col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                      <p className="mb-1">Full Name</p>
                      <label className="form-label sr-only" htmlFor="full_name">
                        Full Name
                      </label>
                      <input
                        id="full_name"
                        name="full_name"
                        type="text"
                        placeholder="Full Name"
                        className="form-control mt-1"
                        value={formData.full_name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-2 col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
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
                    <div className="mb-2 col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                      <p className=" mb-1"> Password</p>
                      <label className="form-label sr-only" htmlFor="password">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="form-control mt-1"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-2 col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                      <p className="mb-1">Mobile Number</p>
                      <label
                        className="form-label sr-only"
                        htmlFor="mobile_number"
                      >
                        Mobile Number
                      </label>
                      <input
                        id="mobile_number"
                        name="mobile_number"
                        type="tel"
                        placeholder="Mobile Number"
                        className="form-control mt-1"
                        value={formData.mobile_number}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-2 col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                      <p className="mb-1">WhatsApp Number</p>
                      <label
                        className="form-label sr-only"
                        htmlFor="whats_app_number"
                      >
                        WhatsApp Number
                      </label>
                      <input
                        id="whats_app_number"
                        name="whats_app_number"
                        type="tel"
                        placeholder="WhatsApp Number"
                        className="form-control mt-1"
                        value={formData.whats_app_number}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-2 col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                      <p className="mb-1">Current Profession</p>
                      <label
                        className="form-label sr-only"
                        htmlFor="current_profession"
                      >
                        Current Profession
                      </label>

                      <select
                        id="current_profession"
                        name="current_profession"
                        className="form-control mt-1"
                        value={formData.current_profession}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Profession</option>
                        <option value="Job">Job</option>
                        <option value="business">business</option>
                        <option value="Self-employed">Self-employed</option>
                        <option value="professional">professional</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="mb-2 col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                      <p className="mb-1">Company Name</p>
                      <label
                        className="form-label sr-only"
                        htmlFor="company_name"
                      >
                        Company Name
                      </label>
                      <input
                        id="company_name"
                        name="company_name"
                        type="text"
                        placeholder="Company Name"
                        className="form-control mt-1"
                        value={formData.company_name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-2 col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                      <p className="mb-1">Street</p>
                      <label className="form-label sr-only" htmlFor="street">
                        Street
                      </label>
                      <input
                        id="street"
                        name="street"
                        type="text"
                        placeholder="Street"
                        className="form-control mt-1"
                        value={formData.street}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-2 col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                      <p className="mb-1">City</p>
                      <label className="form-label sr-only" htmlFor="city">
                        City
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        placeholder="City"
                        className="form-control mt-1"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-2 col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                      <p className="mb-1">Pincode</p>
                      <label className="form-label sr-only" htmlFor="pincode">
                        Pincode
                      </label>
                      <input
                        id="pincode"
                        name="pincode"
                        type="number"
                        placeholder="Pincode"
                        className="form-control mt-1"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-2 col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                      <p className="mb-1">Landmark</p>
                      <label className="form-label sr-only" htmlFor="landmark">
                        Landmark
                      </label>
                      <input
                        id="landmark"
                        name="landmark"
                        type="text"
                        placeholder="Landmark"
                        className="form-control mt-1"
                        value={formData.landmark}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-2 col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                      <p className="mb-1">District</p>
                      <label className="form-label sr-only" htmlFor="district">
                        District
                      </label>
                      <input
                        id="district"
                        name="district"
                        type="text"
                        placeholder="District"
                        className="form-control mt-1"
                        value={formData.district}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-2 col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                      <p className="mb-1">State</p>
                      <label className="form-label sr-only" htmlFor="state">
                        State
                      </label>
                      <input
                        id="state"
                        name="state"
                        type="text"
                        placeholder="State"
                        className="form-control mt-1"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 py-4 mx-auto">
                    <div className="d-grid">
                      <button
                        type="submit"
                        style={{ backgroundColor: "#0c0c37" }}
                        className="btn text-white fs-4"
                      >
                        Signup
                      </button>
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
}

export default RegisterConnector;
