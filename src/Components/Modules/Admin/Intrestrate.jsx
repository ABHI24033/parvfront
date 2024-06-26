import React, { useState } from "react";
import Sidebar from "../UserDashbord/Sidebar";

const Intrestrate = () => {
  const [formData, setFormData] = useState({
    homeLoan: "",
    personalLoan: "",
    carLoan: "",
    businessLoan: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    setFormData({
      homeLoan: "",
      personalLoan: "",
      carLoan: "",
      businessLoan: "",
    });
    // Add any additional logic or API calls here
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = () => {
    // You can implement your upload logic here
    if (selectedImage) {
      console.log("Uploading image:", selectedImage);
      // Add your upload logic here
    } else {
      console.error("No image selected.");
    }
  };
  return (
    <>
    <Sidebar>
      <section className="">
        <div className="container">
          <h3 className=" py-4">Dyanmic Interest Rate Changes</h3>
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Home Loan */}
              <div className="col-xl-2 col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="mb-3">
                  <label className="sr-only form-label mb-0" htmlFor="homeLoan">
                    <p>Home Loan</p>
                  </label>
                  <input
                    id="homeLoan"
                    name="homeLoan"
                    type="text"
                    placeholder="Home Loan"
                    className="form-control"
                    value={formData.homeLoan}
                    onChange={handleChange}
                    required=""
                  />
                </div>
              </div>

              {/* Personal Loan */}
              <div className="col-xl-2 col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="mb-3">
                  <label
                    className="sr-only form-label mb-0"
                    htmlFor="personalLoan"
                  >
                    <p>Personal Loan</p>
                  </label>
                  <input
                    id="personalLoan"
                    name="personalLoan"
                    type="text"
                    placeholder="Personal Loan"
                    className="form-control"
                    value={formData.personalLoan}
                    onChange={handleChange}
                    required=""
                  />
                </div>
              </div>

              {/* Car Loan */}
              <div className="col-xl-2 col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="mb-3">
                  <label className="sr-only form-label mb-0" htmlFor="carLoan">
                    <p>Car Loan</p>
                  </label>
                  <input
                    id="carLoan"
                    name="carLoan"
                    type="text"
                    placeholder="Car Loan"
                    className="form-control"
                    value={formData.carLoan}
                    onChange={handleChange}
                    required=""
                  />
                </div>
              </div>

              {/* Business Loan */}
              <div className="col-xl-2 col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="mb-3">
                  <label
                    className="sr-only form-label mb-0"
                    htmlFor="businessLoan"
                  >
                    <p>Business Loan</p>
                  </label>
                  <input
                    id="businessLoan"
                    name="businessLoan"
                    type="text"
                    placeholder="Business Loan"
                    className="form-control"
                    value={formData.businessLoan}
                    onChange={handleChange}
                    required=""
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="mb-3">
                  <button type="submit" className="btn btn-primary w-40">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="container max-auto">
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
            <div className="card bg-light mb-4">
              <div className="card-body">
                <h3>Image Upload in Home Page PopUp </h3>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <button onClick={handleUpload}>Upload Image</button>

                {selectedImage && (
                  <div>
                    <h3>Selected Image Preview:</h3>
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected"
                      style={{ maxWidth: "300px", maxHeight: "300px" }}
                    />
                  </div>
                )}
              </div>{" "}
            </div>
          </div>
        </div>
      </section>
      </Sidebar>
    </>
  );
};

export default Intrestrate;
