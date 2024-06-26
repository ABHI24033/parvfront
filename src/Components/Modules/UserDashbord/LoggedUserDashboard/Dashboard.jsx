import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Profile from "./Profile";
import Form from "./Form";
import File from "./File";
import "./Dashboard.css";
import axios from "axios";
function Dashboard() {
  const [isCollapsed, setCollapsed] = useState(false);
  const [userinfo, SetUSerinfo] = useState([]);
  const { id } = useParams();
  const handleToggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  const [profile, setProfile] = useState(true);
  const [form, setForm] = useState(false);
  const [file, setFile] = useState(false);
  const handleProfile = () => {
    setProfile(true);
    setForm(false);
    setFile(false);
  };
  const handleForm = () => {
    setProfile(false);
    setForm(true);
    setFile(false);
  };

  const handleFile = () => {
    setProfile(false);
    setForm(false);
    setFile(true);
  };

  const fetchUserById = async (id) => {
    try {
      const response = await axios.get(
        `http://15.207.195.184:8000/api/v1/getuserbyid/${id}`
      );
      if (response) {
        SetUSerinfo(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUserById(id);
  }, []);
  return (
    <>
      <div className="container-fluid mt-12">
        <div className="row">
          {!isCollapsed ? (
            <div className="col-lg-2 ps-0">
              <div
                className={`sidebar ${isCollapsed ? "collapsed" : "not-collapsed"
                  }`}
              >
                <i
                  onClick={handleToggleCollapse}
                  class="fa-solid fa-arrow-left"
                ></i>

                <ul
                  className="mt-3"
                  style={{
                    textAlign: "left",
                    justifyContent: "space-evenly",
                    fontSize: "18px",
                  }}
                >
                  <center className="dashhboard-btn">
                    <button onClick={handleProfile}>profile</button>

                    <button onClick={handleForm}>form</button>

                    <button onClick={handleFile}>file</button>
                  </center>
                </ul>
              </div>
            </div>
          ) : (
            <div className="col-lg-2 ps-0">
              <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
                <i
                  onClick={handleToggleCollapse}
                  class="fa-solid fa-arrow-right"
                ></i>
              </div>
            </div>
          )}

          <div className="col-lg-10">
            {profile && <Profile userinfo={userinfo} />}
            {form && <Form />}
            {file && <File />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
