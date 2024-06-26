import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const Status = () => {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notificationData, setNotificationData] = useState([]);
  // console.log(notificationData)
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
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://15.207.195.184:8000/api/v1/getNotification",
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
      console.log("notification", data.notifications);
      setNotificationData(data.notifications);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

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
    fetchData();
  };

  const openModal = (notification) => {
    setSelectedNotification(notification);
  };

  const closeModal = () => {
    setSelectedNotification(null);
  };
  const handleDelete = async (imageId) => {
    try {
      await axios.delete(
        `http://15.207.195.184:8000/api/v1/deleteNotification/${imageId}`
      );
      setNotificationData(
        notificationData.filter((image) => image._id !== imageId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Sidebar>
      <div className="container mb-5">
        <div className=" col-lg-5 offset-lg-2 col-lg-5 col-md-6 col-sm-12 col-12 mx-auto">
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
              Send Notification
            </button>
          </form>
        </div>
        <div></div>
      </div>
      <div className="">
        <h2 className="mx-4">Notification </h2>
        <table className="w3-table-all mb-5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Subject</th>
              <th>Content</th>
              <th>Timestamp</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {notificationData.length ? (
              notificationData.map((notification, index) => (
                <tr
                  key={notification.index}
                  onClick={() => openModal(notification)}
                >
                  <td>{index}</td>
                  <td>{notification.subject}</td>
                  <td>{notification.content}</td>
                  <td>{notification.createdAt}</td>
                  <td>
                    <button
                      class="w3-button w3-red"
                      onClick={() => handleDelete(notification._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <td>No Emails Received yet</td>
            )}
          </tbody>
        </table>
      </div>

      {selectedNotification && (
        <div
          id="notificationModal"
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedNotification.title}</h5>
                <button
                  type="button"
                  className="close"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>{selectedNotification.content}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Sidebar>
  );
};

export default Status;
