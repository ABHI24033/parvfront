import React, { useState } from "react";
import "./admin.css";
import Sidebar from "../UserDashbord/Sidebar";

const Email = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    content: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://15.207.195.184:8000/api/v1/sendNotification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            subject: formData.subject,
            content: formData.content,
          }),
        }
      );

      if (response.ok) {
        alert("Email sent successfully!");

        console.log("Email sent successfully!");

        // Clear form fields after submission
        setFormData({
          email: "",
          subject: "",
          content: "",
        });
      } else {
        alert("Failed to submit email!");

        console.error("Failed to submit email:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting email:", error);
    }
    console.log("Email submitted:", formData);
    console.log("Email submitted:", formData);
  };

  return (
    <Sidebar>
      <section className="">
        <div className="container">
          <div className=" col-lg-5 offset-lg-2 col-lg-5 col-md-6 col-sm-12 col-12">
            <h2 className="text-center">Email Panel</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-2 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <label htmlFor="email mb-2">Email:</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  className="form-control border-primary mb-2"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-2 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <label htmlFor="subject">Subject:</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="border-primary"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-2 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <label htmlFor="content">Content:</label>
                <textarea
                  id="content"
                  name="content"
                  className="border-primary"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-success">
                Send Email
              </button>
            </form>
          </div>
          <div></div>
        </div>
      </section>
    </Sidebar>
  );
};

export default Email;
