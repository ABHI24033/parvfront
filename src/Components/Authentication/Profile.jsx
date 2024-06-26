import React, { useEffect, useState } from "react";
// import Sidebar from "../UserDashbord/Sidebar";
import Sidebar from "../Modules/UserDashbord/Sidebar";
// import { backendUrl } from "../../../env";
import axios from "axios";
import { auth, db } from "./Firebase";
function Profile() {
  const [userinfo, SetUSerinfo] = useState([]);

  const id = localStorage.getItem("userID");

  // const fetchUserById = async (id) => {
  //   try {
  //     const response = await axios.get(
  //       // `http://15.207.195.184:8000/api/v1/getuserbyid/${id}`
  //       `${backendUrl}/getuserbyid/${id}`
  //     );
  //     if (response) {
  //       SetUSerinfo(response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUserById(id);
  // }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // setUser(user);
        console.log("User", user?.uid);
        const userDoc = await db.collection("users").doc(user?.uid).get();
        // setUserData(userDoc.data());
        console.log(userDoc.data());
        SetUSerinfo(userDoc.data());
      } else {
        // setUser(null);
        SetUSerinfo(null);
      }
    });

    return unsubscribe;
  }, []);
  return (
    <>
      <Sidebar>
        <section>
          <div class="container">
            <div class="row">
              <div class="col-lg-4">
                <div class="card mb-4">
                  <div class="card-body text-center">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      alt="avatar"
                      class="rounded-circle img-fluid"
                      style={{ width: "150px" }}
                    />

                    <p class="mt-3 mb-1">{userinfo?.full_name}</p>
                  </div>
                </div>
                <div class="card mb-4 mb-lg-0">
                  <div class="card-body p-0">
                    <ul class="list-group list-group-flush rounded-3">
                      <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                        <p class="mb-0">User Type</p>
                        <p class="text-muted mb-0">
                          {userinfo?.user_type}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-lg-8">
                <div class="card mb-4">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-sm-3">
                        <p class="mb-0">Email</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">{userinfo?.email}</p>
                      </div>
                    </div>
                    <hr />
                    {/* <div class="row">
                      <div class="col-sm-3">
                        <p class="mb-0">Password</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">{userinfo?.password}</p>
                      </div>
                    </div> */}
                    {/* <hr /> */}
                    <div class="row">
                      <div class="col-sm-3">
                        <p class="mb-0">Mobile Number</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">
                          {userinfo?.mobile_number}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <p class="mb-0">Whatsapp Number</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">
                          {userinfo?.whats_app_number}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <p class="mb-0">Current Profession</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">
                          {userinfo?.current_profession}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <p class="mb-0">Company Name</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">
                          {userinfo?.company_name}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <p class="mb-0">Street</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">
                          {userinfo?.street}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <p class="mb-0">City</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">
                          {userinfo?.city}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <p class="mb-0">Pincode</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">
                          {userinfo?.pincode}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <p class="mb-0">Landmark</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">
                          {userinfo?.landmark}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <p class="mb-0">District</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">
                          {userinfo?.district}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <p class="mb-0">State</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">
                          {userinfo?.state}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Sidebar>
    </>
  );
}

export default Profile;
