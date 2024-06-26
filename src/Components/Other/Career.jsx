import React, { useState } from "react";
import Featureimg from "../../assets/images/background/lp-feature-img.jpg";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../../env";
import JobPosts from "../Modules/Jobs/JobPosts";
const Career = () => {
  

  return (
    <>
      <section className="pt-18 pb-10 galary-header-page">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="bg-white p-5 rounded-top-md">
                <div className="row align-items-center">
                  <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                    <h1 className="mb-0">Career </h1>
                  </div>
                  
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-lg-8 py-10 ">
        <div className="container">
          <h1>Job :</h1>{" "}
          <span className=" ml-4">
            As a dynamic financial service provider, our company is committed to
            fostering a culture of excellence, innovation, and
            client-centricity. Joining our team means being part of an
            organization that values integrity, professionalism, and a passion
            for financial well-being. We offer a collaborative and
            growth-oriented work environment where each team member contributes
            to the success of our clients and the company as a whole. Whether
            you're an experienced professional or someone looking to embark on a
            fulfilling career in the financial sector, our company provides
            opportunities for learning, career development, and making a
            meaningful impact in the lives of those we serve. Come be a part of
            our dedicated team as we navigate the complexities of the financial
            landscape together, shaping a future of prosperity for both our
            clients and our employees.
          </span>
          <h1>Become A Partner:</h1> Becoming a partner with our esteemed
          financial service provider company opens the door to a collaborative
          journey towards mutual success. We value strategic alliances that
          bring together expertise, innovation, and shared commitment to client
          satisfaction. As a partner, you'll have access to a suite of
          cutting-edge financial solutions, collaborative resources, and a
          network of professionals dedicated to excellence. Whether you're an
          established institution, an independent financial advisor, or an
          aspiring entrepreneur, we invite you to join hands with us in shaping
          the future of financial services. Together, we can leverage our
          collective strengths to provide unparalleled value to clients and
          build lasting relationships. Partner with us and embark on a
          transformative.
        </div>
      </section>
      <section className="py-lg-2 py-4 ">
        <div className="container">
          <div className="row ">
            <div className="col-xl-6 col-lg-5 col-md-6 col-sm-12 col-12">
              <div className="mb-6 mb-lg-0 ">
                {/* section title start*/}
                <h1 className=" mb-3"> </h1>
               
                <h3 className="">Choosing the Right Career Path:</h3>
                <div className="none">
                  <p>Financing Your Education:</p>
                  <p>Loans for Career Advancement</p>
                  <p>Managing Debt Responsibly</p>
                </div>
                <h3 className="">Choosing the Right Career Path:</h3>
                <div className="none">
                  <p>1. Fill the online form. Apply Now</p>
                  <p>2. Fill in the mandatory details, &amp; click Submit</p>
                  <p>3. Our representative will get in touch with you</p>
                </div>
              </div>
              {/* /.section title start*/}
            </div>
            <section>
              <h2>Jobs at PARV Finance </h2>
              <JobPosts/>
            </section>

          </div>
        </div>
      </section>
    </>
  );
};

export default Career;
