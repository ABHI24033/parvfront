import React, { useState } from "react";

function Profile({ userinfo }) {
   const [state, setstate] = useState();
   if(userinfo.user?.user_type==="Employee-1"){
      setstate("RM");
   }
   if(userinfo.user?.user_type==="Employee-2"){
      setstate("Telecaller");
   }
   if(userinfo.user?.user_type==="Employee-3"){
      setstate("Field Staff");
   }
   if(userinfo.user?.user_type==="Connector"){
      setstate("Connector");
   }
   if(userinfo.user?.user_type==="Admin"){
      setstate("Admin");
   }
  return (
    <>
      <section>
        <div class="container py-5">
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

                  <p class="mt-3 mb-1">{userinfo.user?.full_name}</p>
                </div>
              </div>
              <div class="card mb-4 mb-lg-0">
                <div class="card-body p-0">
                  <ul class="list-group list-group-flush rounded-3">
                    <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                      <p class="mb-0">User Type</p>
                      {/* <p class="text-muted mb-0">{userinfo.user?.user_type}</p> */}
                      <p class="text-muted mb-0">{state}</p>
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
                      <p class="text-muted mb-0">{userinfo.user?.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Password</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">{userinfo.user?.password}</p>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Mobile Number</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">
                        {userinfo.user?.mobile_number}
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
                        {userinfo.user?.whats_app_number}
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
                        {userinfo.user?.current_profession}
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
                        {userinfo.user?.company_name}
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
                        {userinfo.user?.address[0]?.street}
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
                        {userinfo.user?.address[0]?.city}
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
                        {userinfo.user?.address[0]?.pincode}
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
                        {userinfo.user?.address[0]?.landmark}
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
                        {userinfo.user?.address[0]?.district}
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
                        {userinfo.user?.address[0]?.state}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
