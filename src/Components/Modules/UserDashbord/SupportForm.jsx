import React, { useState } from 'react';
import UserDashboard from '../UserDashbord';
import Sidebar from './Sidebar';

const SupportForm = () => {
  const [formData, setFormData] = useState({
    subject: '',
    text: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <Sidebar>
      <div className="container  d-flex justify-content-center">
        <div className="">
          <h2 className="">Get Support</h2>
          <p className="">Have a question or need assistance? Fill out the form below, and we'll get back to you as soon as possible.</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">
                Subject
              </label>
              <input
                type="text"
                className="form-control  border-primary"
                id="subject"
                name="subject"
                placeholder='Subject'
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="text" className="form-label">
                Text
              </label>
              <textarea
                className="form-control  border-primary"
                id="text"
                name="text"
                placeholder='Type Your Message Here...'
                rows="4"
                value={formData.text}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary mb-5">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Sidebar>
  );
};

export default SupportForm;
