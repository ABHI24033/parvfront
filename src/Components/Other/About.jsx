import React from "react";
import CountUp from "react-countup";
import "./About.css";

import Avatarimg1 from "../../assets/images/avatar/avatar-1.jpg";
import Avatarimg2 from "../../assets/images/avatar/avatar-2.jpg";

import why1 from "../../assets/images/team/why1.jpeg";
import why2 from "../../assets/images/team/why2.jpeg";
import why3 from "../../assets/images/team/why3.jpeg";
// import LoanCalculator from "../../Common/LoanCalculator";

const About = () => {
  return (
    <>
      <main>
        {/* <LoanCalculator/> */}
        <section className="pt-18 pb-10 about-header-page">
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="bg-white p-5 rounded-top-md">
                  <div className="row align-items-center">
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                      <h1 className="mb-0">About</h1>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="text-md-end mt-3 mt-md-0">
                        <a href="/contact" style={{ backgroundColor: "#0c0c37" }} className="btn text-white">
                          {/* How To Apply */}
                          Contact
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* content start */}
        <section>
         
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="mt-n6 bg-white mb-5 rounded-3 shadow-sm">
                  <div className="p-5 p-lg-10">
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <h2 className="mb-4">Who We Are?</h2>
                        <p className="lead mb-4">
                          Step into the vibrant world of PARV FINANCIAL SERVICES ( a unit of PARV MULTI SERVICES), a rapidly ascending brand with a mission to weave a tapestry of positive impact in the lives of individuals. Our journey commenced on the auspicious date of November 25, 2021, fueled by a vision to touch the lives of people and provide assistance in every possible manner.

                          We take pride in our dynamic and youthful energy, cultivating an environment where innovation and compassion intertwine seamlessly. At the heart of our ethos lies a commitment to enriching lives, and this commitment resonates in every service we offer. PARV FINANCIAL SERVICES is not merely a brand; it's a dynamic force, a catalyst for change, and a beacon of hope.


                          {/*As a leading financial service provider, we pride
                          ourselves on being a trusted partner in the pursuit of
                          your financial goals. Our identity is rooted in a
                          commitment to excellence, transparency, and customer
                          satisfaction. With a team of seasoned professionals,
                          we bring a wealth of expertise to the table, ensuring
                          that our clients receive tailored solutions that meet
                          their unique needs. Choose us as your financial
                          partner, and experience the difference of working with
                          a service provider that understands and values your
                          financial aspirations.*/}
                        </p>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="mb-8">
                          <h2 className="mb-4">What We Offer?</h2>
                          <p className="lead mb-4">
                            As we continue to grow, our focus remains on fostering a culture of excellence and reliability. We understand the challenges individuals face in their daily lives, and we stand as a pillar of support, providing solutions that are not only easy but also secure. Whether you are a student, a professional, or an aspiring entrepreneur, PARV FINANCIAL SERVICES welcomes you to join us on this transformative journey.

                            So, if you are ready to be part of something greater, to contribute to a positive change, and to witness the unfolding of a vision set in motion on November 25, 2021, we invite you to connect with us. Together, let's shape a future where every interaction is a step towards making a meaningful difference in the world.
                            {/*As a dedicated financial service provider, we offer
                            a comprehensive range of solutions designed to meet
                            the diverse needs of our clients. From personalized
                            wealth management and investment advisory services
                            to flexible loan options and strategic financial
                            planning, we provide a holistic approach to
                            financial well-being. Our team of experienced
                            professionals is committed to delivering excellence,
                            ensuring that each client receives tailored
                            solutions aligned with their unique goals.*/}
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <div className="text-center pt-6 pb-1">
                          <h2>Our Vision &amp; Mission</h2>
                          <p>
                            In the contemporary landscape, the need for financial support is an inevitable part of everyone's journey – be it for personal aspirations, business expansion, educational pursuits, or unforeseen emergencies. Navigating the labyrinth of loans can, however, prove to be a complex and daunting task for many individuals, leaving them apprehensive about the process.

                            Enter Parv Financial Services, guided by a singular vision – to make the acquisition of loans accessible and secure for everyone, all from the comfort of their homes, without disrupting their daily routines, jobs, or businesses. In a world where financial decisions can be overwhelming, we strive to simplify the lending process, ensuring that obtaining a loan is not just a necessity but a hassle-free and safe experience for every individual.

                            Our commitment revolves around creating a seamless and user-friendly platform, recognizing that financial assistance should be a facilitator rather than a barrier. Whether you're dreaming of pursuing higher education, expanding your entrepreneurial ventures, or managing unforeseen expenses, Parv Financial Services stands as a reliable partner, offering a helping hand when it's needed the most.

                            We understand the importance of simplicity and security in financial transactions, and our mission is to redefine the loan landscape by providing a trustworthy and straightforward solution. Embrace a new era of financial empowerment with Parv Financial Services – where obtaining a loan is not just a transaction but a step towards realizing your dreams, all within the safety and convenience of your home. Join us on this transformative journey, where financial assistance becomes a conduit for growth and prosperity.
                            {/*At our core, our vision is to be a beacon of
                            financial empowerment, guiding individuals and
                            businesses towards sustained prosperity. We envision
                            a future where everyone has access to sound
                            financial solutions that pave the way for growth and
                            security, Aligned with this vision, our mission is
                            to provide comprehensive and innovative financial
                            services that transcend expectations. We are
                            committed to fostering financial literacy,
                            instilling confidence in decision-making, and
                            building lasting relationships based on trust and
                            integrity.*/}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-lg-10 p-5 bg-light-primary">
                    <div className="row">
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                        <div className="text-center mb-6 mb-md-0">
                          <div className="mb-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={56}
                              height={56}
                              fill="currentColor"
                              className="bi bi-people text-primary"
                              viewBox="0 0 16 16"
                            >
                              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                            </svg>
                          </div>
                          <h1 className="display-4 fw-bold mb-0">
                            <CountUp start={0} end={10000} duration={10} />
                            <span>+</span>
                          </h1>
                          <div className="text-dark fs-5">
                            Customers Empowered
                          </div>
                        </div>
                      </div>
                      {/* <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                        <div className="text-center mb-6 mb-md-0">
                          <div className="mb-3">

                            <p className=" text-primary">
                              {" "}
                              <span className="display-3">&#x20B9;</span>
                            </p>
                          </div>

                          {/* <h1 className="display-4 fw-bold mb-0">
                            &#x20B9;
                            <CountUp start={0} end={10} duration={10} />
                            Billion+
                          </h1>
                          <div className="text-dark fs-5">Borrowed</div> */}
                        {/* </div>
                      </div> */} 
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                        <div className="text-center">
                          <div className="mb-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={56}
                              height={56}
                              fill="currentColor"
                              className="bi bi-chat-left-text text-primary"
                              viewBox="0 0 16 16"
                            >
                              <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                              <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                            </svg>
                          </div>
                          <div className="mb-0 fs-3 text-dark">
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill ms-1" />
                            <i className="bi bi-star-fill ms-1" />
                            <i className="bi bi-star-fill ms-1" />
                            <i className="bi bi-star-fill ms-1" />
                          </div>
                          <div className="text-dark fs-5">Customer Rating</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-lg-10 p-5">
                    <div>
                      <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <div className="text-center mb-8">
                            <h2>Why apply with us</h2>
                            <p>
                              Apply with us for unparalleled financial
                              expertise, tailored solutions, and a commitment to
                              your long-term financial success
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">

                          <div className="card text-center mb-4 py-5">
                            {/* <img className="card-img-top" src="https://www.w3schools.com/howto/img_avatar.png" alt="Card image cap" /> */}
                            <img className="card-img-top" src={why1} alt="Card image cap" />
                            <div className="card-body">
                              <h3 className="card-title">Excellence</h3>
                              {/* <p className="card-text">I am self employed person from Rohtas Bihar. I  was in need of money for marriage of my sister. Without any rush and tension I got  the loan of 30 lakhs against my property easily. Thank you to PARV FINANCIAL SERVICES </p> */}
                              <p className="card-text">Excellence is not an act but a habit. </p>
                              {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
                            </div>

                          </div>

                          {/*<div className="card text-center mb-4 py-5">
                            <h3 className="mb-2">Multiple Loan Options</h3>
                            <p>
                              Explore a multitude of loan options tailored to
                              your needs and financial goals
                            </p>
                          </div>*/}
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                          <div className="card text-center mb-4 py-5">
                            <img className="card-img-top" src={why2} alt="Card image cap" />
                            <div className="card-body">
                              <h3 className="card-title">Professionalism</h3>
                              <p className="card-text">Elevate Excellence: Where Professionalism Takes Center Stage. </p>
                              {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
                            </div>
                          </div>
                        </div>
                        {/*<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                          <div className=" card text-center mb-4 py-5">
                            <h3 className="mb-2">Competitive Rate</h3>
                            <p>
                              Benefit from our competitive rates, ensuring
                              cost-effective and value-driven financial
                              solutions
                            </p>
                          </div>
                        </div>*/}
                        {/*<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                          <div className="card text-center mb-4 py-5">
                            <h3 className="mb-2">Safe &amp; Secure</h3>
                            <p>
                              Experience peace of mind with our safe and secure
                              financial services, and protection of your
                              information
                            </p>
                          </div>
                        </div>*/}
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                          <div className="card text-center mb-4 py-5">
                            <img className="card-img-top" src={why3} alt="Card image cap" height={170} />
                            <div className="card-body">
                              <h3 className="card-title">Expertise</h3>
                              <p className="card-text">Masters of Mastery: Unleashing the Power of Expertise.</p>
                              {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-lg-1 p-5">
                    <div className="container">
                      <div className="row">
                        <div className="offset-xl-2 col-xl-8 col-md-12 col-12">
                          <div className="mb-8 text-center">
                            {/* section title*/}
                            <h1 className="mb-1">We are Here to Help You</h1>
                            <p className="lead">
                              Our mission is to deliver reliable, latest news
                              and opinions.
                            </p>
                          </div>
                          {/* /.section title*/}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                          <div className="card mb-3 mb-lg-0 text-center">
                            <div className="card-body p-6">
                              <div className="mb-5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={48}
                                  height={48}
                                  fill="currentColor"
                                  className="bi bi-calendar3 text-primary"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
                                  <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                </svg>
                              </div>
                              <h4 className="mb-3 text-uppercase fw-semi-bold">
                                Apply For Loan
                              </h4>
                              <p className="mb-4">
                                Looking to for loan? Then apply for loan now.
                              </p>
                              <a
                                href="/contact"
                                className="btn-link border-bottom border-primary border-2 fw-bold fs-5"
                              >
                                Get Appointment
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                          <div className="card mb-3 mb-lg-0 text-center">
                            <div className="card-body p-6">
                              <div className="mb-5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={48}
                                  height={48}
                                  fill="currentColor"
                                  className="bi bi-telephone text-primary"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                </svg>
                              </div>
                              <h4 className="mb-3 text-uppercase fw-semi-bold">
                                Call us at
                              </h4>
                              <h1 className="fs-3"> 9279142988</h1>
                              <p>
                                <a href="#" className="fs-5">
                                  parvmultiservices@gmail.com
                                </a>
                              </p>
                              <a
                                href="/contact"
                                className="btn-link border-bottom border-primary border-2 fw-bold fs-5"
                              >
                                Contact us
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                          <div className="card mb-3 mb-lg-0 text-center">
                            <div className="card-body p-6">
                              <div className="mb-5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={48}
                                  height={48}
                                  fill="currentColor"
                                  className="bi bi-people text-primary"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                                </svg>
                              </div>
                              <h4 className="mb-3 text-uppercase fw-semi-bold">
                                Talk to Advisor
                              </h4>
                              <p className="mb-4">
                                Need to loan advise? Talk to our Loan advisors.
                              </p>
                              <a
                                href="/contact"
                                className="btn-link border-bottom border-primary border-2 fw-bold fs-5"
                              >
                                Meet The Advisor
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /.content end */}
      </main>
    </>
  );
};

export default About;
