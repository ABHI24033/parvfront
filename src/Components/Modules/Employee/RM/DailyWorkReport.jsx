import React, { useState } from 'react';
import Sidebar from '../../UserDashbord/Sidebar';
import axios from 'axios';
import { backendUrl } from '../../../../env';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DailyWorkReport = () => {
  // const date = new Date().toLocaleDateString('en-GB');
  // console.log(date);
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
      const res = await axios.post(`${backendUrl}/rm_daily_report`, { formData });
      // console.log(res);
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
    <div className='my-4 '>
      <ToastContainer />
      <Sidebar>
        <h1>Daily Work Report</h1>
        <form className=' ' onSubmit={SubmitForm}>
          <div className='row'>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
              <div className="mb-3">
                <label className="sr-only form-label mb-0" htmlFor="lname">
                  Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  placeholder="date"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
              <div className="mb-3">
                <label className="sr-only form-label mb-0" htmlFor="lname">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="mb-3">
                <h5>Today I made ……..... Calls for Connectorship</h5>
                <select
                  id={`total_calls`}
                  // disabled={textDisabld}
                  name="total_calls"
                  className="form-select"
                  value={formData.total_calls}
                  onChange={handleInputChange}
                >
                  <option value="" disabled selected>
                    --Total Calls--
                  </option>
                  <option value="0">0</option>
                  <option value="5-10">5-10</option>
                  <option value="10-15">10-15</option>
                  <option value="15-20">15-20</option>
                  <option value="more_20">More than 20</option>
                </select>
                {/* {
              errors?.gender && <p className="fs-6 text-danger">{errors.gender}</p>
            } */}
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="mb-3">
                <h5>Today I made …… call to old connectors</h5>
                <select
                  id={`old_connector_call`}
                  // disabled={textDisabld}
                  name="old_connector_call"
                  className="form-select"
                  value={formData.old_connector_call}
                  onChange={handleInputChange}
                >
                  <option value="" disabled selected>
                    --Old Connector Calls--
                  </option>
                  <option value="0">0</option>
                  <option value="5-10">5-10</option>
                  <option value="10-15">10-15</option>
                  <option value="15-20">15-20</option>
                  <option value="more_20">More than 20</option>
                </select>
                {/* {
              errors?.gender && <p className="fs-6 text-danger">{errors.gender}</p>
            } */}
              </div>
            </div>
          </div>

          <div className='row'>
            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="mb-3">
                <h5>I followed up …… customers for documents collection</h5>
                <select
                  id={`documents_collections`}
                  name="documents_collections"
                  className="form-select"
                  value={formData.documents_collections}
                  onChange={handleInputChange}
                >
                  <option value="" disabled selected>
                    --Documents Collection--
                  </option>
                  <option value="0">0 (VERY BAD)</option>
                  <option value="5">5 (BAD)</option>
                  <option value="5-10">5-10 (AVERAGE)</option>
                  <option value="10-15">10-15 (GOOD)</option>
                  <option value="15-20">15-20 (VERY GOOD)</option>
                  <option value="more_20">More than 20 (EXCELLENT)</option>
                </select>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="mb-3">
                <h5>I have login …… new files today.</h5>
                <select
                  id={`new_file_today`}
                  // disabled={textDisabld}
                  name="new_file_today"
                  className="form-select"
                  value={formData.new_file_today}
                  onChange={handleInputChange}
                >
                  <option value="" disabled selected>
                    --Total Calls--
                  </option>
                  <option value="0">0 (VERY BAD)</option>
                  <option value="5">5 (BAD)</option>
                  <option value="5-10">5-10 (AVERAGE)</option>
                  <option value="10-15">10-15 (GOOD)</option>
                  <option value="15-20">15-20 (VERY GOOD)</option>
                  <option value="more_20">More than 20 (EXCELLENT)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="mb-3">
                <h5>Today I received login fee from …….. customers.</h5>
                <select
                  id={`login_fee`}
                  name="login_fee"
                  className="form-select"
                  value={formData.login_fee}
                  onChange={handleInputChange}
                >
                  <option value="" disabled selected>
                    --LOGIN FEE--
                  </option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>

              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="mb-3">
                <h5>I am made all entries in HUBSPOT.</h5>
                <select
                  id={`entries_hubspot`}
                  // disabled={textDisabld}
                  name="entries_hubspot"
                  className="form-select"
                  value={formData.entries_hubspot}
                  onChange={handleInputChange}
                >
                  <option value="" disabled selected>
                    --Entries in HUBSPOT--
                  </option>
                  <option value="yes">YES</option>
                  <option value="no">NO</option>
                </select>

              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="mb-3">
                <h5>What where work I have today, I am satisfied with that</h5>
                <select
                  id={`satisfied_work`}
                  // disabled={textDisabld}
                  name="satisfied_work"
                  className="form-select"
                  value={formData.satisfied_work}
                  onChange={handleInputChange}
                >
                  <option value="" disabled selected>
                    --Today work satisfaction--
                  </option>
                  <option value="yes">YES</option>
                  <option value="no">NO</option>
                </select>

              </div>
            </div>
          </div>


          <button type='submit' className='btn btn-primary w-25'>Submit</button>
        </form>
      </Sidebar>
    </div>
  );
}

export default DailyWorkReport;
