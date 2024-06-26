import React, { useState } from 'react';
import Sidebar from '../../UserDashbord/Sidebar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendUrl } from '../../../../env';

const FSWorkReport = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    try {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    } catch (error) {
      console.log("Error when during onchange", error);
    }
  }

  async function SubmitForm(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/fieldStaff_daily_report`, { formData });
      if (res?.status === 201) {
        setTimeout(() => {
          toast.success(res?.data?.message);
        }, 3000)
        navigate("/profile");
      }
    } catch (error) {
      console.log("Error occured during post data : ", error);
    }
  }
  return (
    <div className=''>
      <Sidebar>
        <section className=''>
          <h1>Daily Work Report</h1>
          <form onSubmit={SubmitForm}>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
              <div className="mb-3">
                <h5>Current Date</h5>
                <label className="sr-only form-label mb-0" htmlFor="current_date">
                  Date
                </label>
                <input
                  id="current_date"
                  name="current_date"
                  type="date"
                  value={formData.current_date}
                  onChange={handleInputChange}
                  placeholder="Current Date"
                  className="form-control"
                />
                {/* {
                  errors?.fname && <p className="text-danger fs-6">{errors?.fname}</p>
                } */}
              </div>
            </div>
            <div className='row'>

              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="mb-3">
                  <label className="sr-only form-label mb-0" htmlFor="emp_name">
                    Employee name
                  </label>
                  <input
                    id="emp_name"
                    name="emp_name"
                    type="text"
                    value={formData.emp_name}
                    onChange={handleInputChange}
                    placeholder="Employee Name"
                    className="form-control"
                  />
                  {/* {
                  errors?.fname && <p className="text-danger fs-6">{errors?.fname}</p>
                } */}
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="mb-3">
                  <label className="sr-only form-label mb-0" htmlFor="cli_name">
                    Client Name
                  </label>
                  <input
                    id="cli_name"
                    name="cli_name"
                    type="text"
                    value={formData.cli_name}
                    onChange={handleInputChange}
                    placeholder="Client Name"
                    className="form-control"
                  />
                  {/* {
                  errors?.fname && <p className="text-danger fs-6">{errors?.fname}</p>
                } */}
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="mb-3">
                  <label className="sr-only form-label mb-0" htmlFor="company_name">
                    Firm/company name
                  </label>
                  <input
                    id="company_name"
                    name="company_name"
                    type="text"
                    value={formData.company_name}
                    onChange={handleInputChange}
                    placeholder="Firm/Company Name"
                    className="form-control"
                  />
                  {/* {
                  errors?.fname && <p className="text-danger fs-6">{errors?.fname}</p>
                } */}
                </div>
              </div>
            </div>

            <div className='row'>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="mb-3">
                  <label className="sr-only form-label mb-0" htmlFor="contact_person_name">
                    Contact Person Name
                  </label>
                  <input
                    id="contact_person_name"
                    name="contact_person_name"
                    type="text"
                    value={formData.contact_person_name}
                    onChange={handleInputChange}
                    placeholder="Contact Person Name"
                    className="form-control"
                  />
                  {/* {
                  errors?.fname && <p className="text-danger fs-6">{errors?.fname}</p>
                } */}
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="mb-3">
                  <label className="sr-only form-label mb-0" htmlFor="contact_number">
                    Contact Number
                  </label>
                  <input
                    id="contact_number"
                    name="contact_number"
                    type="text"
                    value={formData.contact_number}
                    onChange={handleInputChange}
                    placeholder="Contact Number"
                    className="form-control"
                  />
                  {/* {
                  errors?.fname && <p className="text-danger fs-6">{errors?.fname}</p>
                } */}
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="mb-3">
                  <label className="sr-only form-label mb-0" htmlFor="whats_number">
                    Watsapp Number
                  </label>
                  <input
                    id="whats_number"
                    name="whats_number"
                    type="text"
                    value={formData.whats_number}
                    onChange={handleInputChange}
                    placeholder="Watsapp Number"
                    className="form-control"
                  />
                  {/* {
                  errors?.fname && <p className="text-danger fs-6">{errors?.fname}</p>
                } */}
                </div>
              </div>
            </div>

            <div className='row'>
              <h5>Company or Client Address : </h5>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="mb-3">
                  <label className="sr-only form-label mb-0" htmlFor="house_name">
                    House Name
                  </label>
                  <input
                    id="house_name"
                    name="house_name"
                    type="text"
                    value={formData.house_name}
                    onChange={handleInputChange}
                    placeholder="Building / House Name"
                    className="form-control"
                  />
                </div>
                {/* {
                  errors?.house_name && <p className=" text-danger fs-6">{errors?.house_name}</p>
                } */}
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="mb-3">
                  <label className="sr-only form-label mb-0" htmlFor="street_name">
                    Street/Road
                  </label>
                  <input
                    id="street_name"
                    name="street_name"
                    type="text"
                    value={formData.street_name}
                    onChange={handleInputChange}
                    placeholder="Street / Road name"
                    className="form-control"
                  />
                </div>
                {/* {
                  errors?.street_name && <p className=" text-danger fs-6">{errors?.street_name}</p>
                } */}
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="mb-3">
                  <label className="sr-only form-label mb-0" htmlFor="city_name">
                    Town / City Name
                  </label>
                  <input
                    id="city_name"
                    name="city_name"
                    type="text"
                    value={formData.city_name}
                    onChange={handleInputChange}
                    placeholder="Town / City Name"
                    className="form-control"
                  />
                </div>
                {/* {
                  errors?.city_name && <p className=" text-danger fs-6">{errors?.city_name}</p>
                } */}
              </div>

              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="mb-3">
                  <label className="sr-only form-label mb-0" htmlFor="landmark">
                    Nearest Landmark
                  </label>
                  <input
                    id="landmark"
                    name="landmark"
                    type="text"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    placeholder="Nearest Landmark"
                    className="form-control"
                  />
                </div>
                {/* {
                  errors?.landmark && <p className=" text-danger fs-6">{errors?.landmark}</p>
                } */}
              </div>

              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="mb-3">
                  <label className="sr-only form-label mb-0" htmlFor="district">
                    District
                  </label>
                  <input
                    id="district"
                    name="district"
                    type="text"
                    value={formData.district}
                    onChange={handleInputChange}
                    placeholder="District"
                    className="form-control"
                  />
                </div>
                {/* {
                  errors?.district && <p className=" text-danger fs-6">{errors?.district}</p>
                } */}
              </div>

              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="mb-3">
                  <label className="sr-only form-label mb-0" htmlFor="state">
                    State
                  </label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="form-control"
                  />
                </div>
                {/* {
                  errors?.state && <p className=" text-danger fs-6">{errors?.state}</p>
                } */}
              </div>

              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="mb-3">
                  <label className="sr-only form-label mb-0" htmlFor="pincode">
                    PIN code
                  </label>
                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="PIN code"
                    className="form-control"
                  />
                </div>
                {/* {
                  errors?.pincode && <p className=" text-danger fs-6">{errors?.pincode}</p>
                } */}
              </div>
            </div>

            <div className='row'>

              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="mb-3">
                  <h5>Product Discussed</h5>
                  <select
                    id={`product_discussed`}
                    // disabled={textDisabld}
                    name="product_discussed"
                    className="form-select"
                  value={formData.product_discussed}
                  onChange={handleInputChange}
                  >
                    <option value="" disabled selected>
                      Product Discussed
                    </option>
                    <option value="Connectorship">Connectorship</option>
                    <option value=" Personal loan"> Personal loan</option>
                    <option value=" Business loan"> Business loan</option>
                    <option value=" Home loan "> Home loan </option>
                    <option value=" Vehicle loan "> Vehicle loan </option>
                    <option value=" Gold loan"> Gold loan</option>
                  </select>
                  {/* {
                    errors?.marital_status && <p className=" text-danger fs-6">{errors?.marital_status}</p>
                  } */}
                </div>
              </div>

              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="mb-3">
                  <h5>Remark</h5>
                  <label className="sr-only form-label mb-0" htmlFor="remark">
                    Remark /Comment
                  </label>
                  <input
                    id="remark"
                    name="remark"
                    type="text"
                    value={formData.remark}
                    onChange={handleInputChange}
                    placeholder="Reamrk / Comment"
                    className="form-control"
                  />
                  {/* {
                  errors?.fname && <p className="text-danger fs-6">{errors?.fname}</p>
                } */}
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="mb-3">
                  <h5>Next Meeting Date</h5>
                  <label className="sr-only form-label mb-0" htmlFor="next_meeting">
                    Your next meeting date
                  </label>
                  <input
                    id="next_meeting"
                    name="next_meeting"
                    type="date"
                    value={formData.next_meeting}
                    onChange={handleInputChange}
                    placeholder="Your next meeting date"
                    className="form-control"
                  />
                  {/* {
                  errors?.fname && <p className="text-danger fs-6">{errors?.fname}</p>
                } */}
                </div>
              </div>
            </div>

            <button className='btn btn-primary mb-5'>Submit</button>

          </form>
        </section>
      </Sidebar>

    </div>
  );
}

export default FSWorkReport;
