import React, { useState, useEffect } from "react";
import "./testmonial.css";
import { Slide } from "react-toastify";
import Sidebar from "../UserDashbord/Sidebar";
import { backendUrl } from "../../../env";
import axios from "axios";
const Testmonial = () => {
  const [form, setForm] = useState({
    name: "",
    testimonial: "",
    isValid: false,
  });
  const [testimonialData, setTestimonialData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        // "http://15.207.195.184:8000/api/v1/getTestimonials",
        `${backendUrl}/getTestimonials`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setTestimonialData(data.images);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleSubmit = async (e, form, setForm) => {
    e.preventDefault();

    // Validate form fields
    if (form.name.trim() !== "" && form.testimonial.trim() !== "") {
      setForm({ ...form, isValid: true });

      try {
        const response = await fetch(
          // "http://15.207.195.184:8000/api/v1/uploadTestimonials",
          `${backendUrl}/uploadTestimonials`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: form.name,
              testimonial: form.testimonial,
            }),
          }
        );

        if (response.ok) {
          alert("Testimonial submitted successfully!");

          console.log("Testimonial submitted successfully!");

          // TODO: Handle form submission, e.g., send data to a server
          console.log("Name:", form.name);
          console.log("Testimonial:", form.testimonial);

          // Clear form fields after submission

          setForm({ name: "", testimonial: "", isValid: false });
        } else {
          alert("Failed to submit testimonial:!");

          console.error("Failed to submit testimonial:", response.statusText);
        }
      } catch (error) {
        console.error("Error submitting testimonial:", error);
      }
    } else {
      setForm({ ...form, isValid: false });
    }
    fetchData();
  };
  const handleDelete = async (imageId) => {
    try {
      await axios.delete(
        // `http://15.207.195.184:8000/api/v1/deleteTestimonial/${imageId}`
        `${backendUrl}/deleteTestimonial/${imageId}`
      );
      setTestimonialData(
        testimonialData.filter((image) => image._id !== imageId)
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Sidebar>
      <div>
        <h1 className="text-center mb-2">Some of our Awesome Testimonials</h1>

        <div className="testimonial-form">
          <h2> Testimonial</h2>
          <form onSubmit={(e) => handleSubmit(e, form, setForm)}>
            <div className="form-group">
              <label htmlFor="name">Your Name:</label>
              <input
                type="text"
                id="name"
                value={form.name}
                placeholder="Name Here..."
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="testimonial">Your Testimonial:</label>
              <textarea
                id="testimonial"
                placeholder="Message ..."
                value={form.testimonial}
                onChange={(e) =>
                  setForm({ ...form, testimonial: e.target.value })
                }
              ></textarea>
            </div>

            <button type="submit" className="testcss">
              Submit Testimonial
            </button>
          </form>

          {/* {form.isValid && (
            <p className="success-message">
              Testimonial submitted successfully!
            </p>
          )} */}

          {!form.isValid && (
            <p className="error-message">
              Please fill out all fields before submitting.
            </p>
          )}
        </div>

        <h1 style={{ marginTop: "3rem" }}>Uploaded Testimonials</h1>
        <table style={{ marginBottom: "3rem" }} class="w3-table-all">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {testimonialData.length ? (
              testimonialData.map((image) => (
                <tr key={image._id}>
                  <td>{image.name}</td>
                  <td>{image.testimonial}</td>
                  <td>{new Date(image.uploadTime).toLocaleDateString()}</td>
                  <td>
                    <button
                      class="w3-button w3-red"
                      onClick={() => handleDelete(image._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <td>No images uploaded yet</td>
            )}
          </tbody>
        </table>
      </div>
    </Sidebar>
  );
};

export default Testmonial;
