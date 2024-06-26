import React, { useState } from "react";
import "./About.css";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../../env";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear the error when the user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasErrors = false;

    // Validation logic for each field
    if (formData.name === "") {
      setErrors((prevErrors) => ({ ...prevErrors, name: "Name is required" }));
      hasErrors = true;
    }

    if (formData.email === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
      hasErrors = true;
    }

    if (formData.phone === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Phone is required",
      }));
      hasErrors = true;
    }

    if (formData.message === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        message: "Message is required",
      }));
      hasErrors = true;
    }


    // const response = await axios.post("http://15.207.195.184:8000/api/v1/contacts", {
    const response = await axios.post(`${backendUrl}/contacts`, {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message
    })
    console.log(response)
    if (response.status === 201) {
      alert("Message Posted successfully");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    }

  };

  return (
    <>
      <main>
        <section className="pt-18 pb-10 Contact-header-page">
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="bg-white p-5 rounded-top-md">
                  <div className="row align-items-center">
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                      <h1 className="mb-0">Contact us</h1>
                    </div>
                    {/* <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="text-md-end mt-3 mt-md-0">
                        <a href="#!" style={{ backgroundColor: "#0c0c37" }} className="btn text-white">
                          Here To Apply
                        </a>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* content start */}
        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="mt-n6 bg-white mb-10 rounded-3 shadow-sm p-lg-10 p-5">
                  <div className="mb-8">
                    <div className="offset-xl-2 col-xl-8 offset-lg-2 col-lg-8 col-md-12 col-sm-12 col-12">
                      <div className="mb-6 text-center">
                        {/* section title start*/}
                        <h1 className="mb-0">Get In Touch</h1>
                        <p>
                          Reach out to us &amp; we will respond as soon as we
                          can.
                        </p>
                      </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div>
                        {/* Text input*/}
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                            <div className="mb-3">
                              <label
                                className="sr-only form-label mb-0"
                                htmlFor="name"
                              >
                                name
                              </label>
                              <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                                required=""
                              />

                              {errors.name && (
                                <div className="text-danger">{errors.name}</div>
                              )}
                            </div>
                          </div>
                          {/* Text input*/}
                          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                            <div className="mb-3">
                              <label
                                className="sr-only form-label mb-0"
                                htmlFor="email"
                              >
                                Email
                              </label>
                              <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="form-control"
                                required=""
                              />
                              {errors.email && (
                                <div className="text-danger">
                                  {errors.email}
                                </div>
                              )}
                            </div>
                          </div>
                          {/* Text input*/}
                          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                            <div className="mb-3">
                              <label
                                className="sr-only form-label mb-0"
                                htmlFor="phone"
                              >
                                Phone
                              </label>
                              <input
                                id="phone"
                                name="phone"
                                type="text"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                                className="form-control"
                                required=""
                              />
                              {errors.phone && (
                                <div className="text-danger">
                                  {errors.phone}
                                </div>
                              )}
                            </div>
                          </div>
                          {/* Select Basic */}
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="mb-3">
                              <label
                                className="sr-only form-label mb-0"
                                htmlFor="message"
                              ></label>
                              <textarea
                                className="form-control"
                                id="message"
                                rows={5}
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Message"
                                defaultValue={""}
                                required=""
                              />
                              {errors.message && (
                                <div className="text-danger">
                                  {errors.message}
                                </div>
                              )}
                            </div>
                          </div>
                          {/* Button */}
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <button type="submit" style={{ backgroundColor: "#0c0c37" }} className="btn text-white">
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  {/* /.section title start*/}
                  <div className="contact-us mb-8">
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="mb-6">
                          {/* section title start*/}
                          <h1>We are here to help you</h1>
                          <p className="lead">
                          Reach out to us for all your needs. We're here to help!
                          </p>
                        </div>
                        {/* /.section title start*/}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-3">
                        <div className="card shadow-sm text-center h-100">
                          <div className="card-body">
                            <div className="my-5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={32}
                                height={32}
                                fill="currentColor"
                                className="bi bi-briefcase text-primary"
                                viewBox="0 0 16 16"
                              >
                                <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z" />
                              </svg>
                            </div>
                            <h4 className="text-uppercase text-primary fw-semi-bold mb-2">
                              REGD.OFFICE
                            </h4>
                            <p>
                              Hotel new mayur, Dumrao road, Tenduni chowk, Bikramganj, Rohtas, BIhar 802212
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-3">
                        <div className="card shadow-sm text-center h-100">
                          <div className="card-body">
                            <div className="my-5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={32}
                                height={32}
                                fill="currentColor"
                                className="bi bi-telephone-inbound text-primary"
                                viewBox="0 0 16 16"
                              >
                                <path d="M15.854.146a.5.5 0 0 1 0 .708L11.707 5H14.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 1 0v2.793L15.146.146a.5.5 0 0 1 .708 0zm-12.2 1.182a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                              </svg>
                            </div>
                            <h4 className="text-uppercase text-primary fw-semi-bold mb-2">
                              Call us at
                            </h4>
                            <h3 className="text-big"> 9279142988</h3>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-3">
                        <div className="card shadow-sm text-center h-100">
                          <div className="card-body">
                            <div className="my-5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={32}
                                height={32}
                                fill="currentColor"
                                className="bi bi-envelope-open text-primary"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8.47 1.318a1 1 0 0 0-.94 0l-6 3.2A1 1 0 0 0 1 5.4v.818l5.724 3.465L8 8.917l1.276.766L15 6.218V5.4a1 1 0 0 0-.53-.882l-6-3.2zM15 7.388l-4.754 2.877L15 13.117v-5.73zm-.035 6.874L8 10.083l-6.965 4.18A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738zM1 13.117l4.754-2.852L1 7.387v5.73zM7.059.435a2 2 0 0 1 1.882 0l6 3.2A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765l6-3.2z" />
                              </svg>
                            </div>
                            <h4 className="text-uppercase text-primary fw-semi-bold">
                              Email Address
                            </h4>
                            <p><a className="fs-5" href="#">
                              parvmultiservices@gmail.com
                            </a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /.content end */}
      </main>
    </>
  );
};

export default Contact;
