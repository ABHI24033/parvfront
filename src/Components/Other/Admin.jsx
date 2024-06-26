import React, { useState } from "react";
import { Link } from "react-router-dom";
import SamplePdf from  "../../assets/css/sample.pdf";
// import '../Modules/Admin/admin.css'
const Admin = () => {

  // const handleDownload = async () => {
  //   try {
  //     // Fetch the PDF file content
  //     const response = await fetch("../../assets/css/sample.pdf");
  //     const pdfContent = await response.blob();

  //     // Create a download link
  //     const downloadLink = document.createElement('a');
  //     downloadLink.href = URL.createObjectURL(pdfContent);
  //     downloadLink.download = 'sample.pdf';

  //     // Append the link to the body
  //     document.body.appendChild(downloadLink);

  //     // Trigger the click event to start the download
  //     downloadLink.click();

  //     // Remove the link from the body
  //     document.body.removeChild(downloadLink);
  //   } 
    
  //   catch (error) {
  //     console.error('Error fetching or downloading the PDF file:', error);
  //   }
  // };
  return (
    <section className="py-lg-16 py-10">
      <div className="container">
        <div className="button-container">
          <div className="centered-buttons-container">
            <Link to="/adminEmail">
              <button className="btn btn-secondary m-2">Email</button>
            </Link>

            <Link to="/adminHistor">
              <button className="btn btn-primary m-2">History</button>
            </Link>


            <Link to="/adminUserData">
              <button className="btn btn-info m-2">UserData</button>
            </Link>
            <Link to="/adminPending">
              <button className="btn btn-success m-3">PendingData</button>
            </Link>

           
            <Link to="/Intrestrate">
              <button className="btn btn-warning">Intrestrate</button>
            </Link>

            <Link to="/testmonial">
              <button className="btn btn-success m-2">Testmonial</button>
            </Link>

            <Link to="/galleryimages">
              <button className="btn btn-secondary m-2">GalleryImages</button>
            </Link>
              <a
               href={SamplePdf}
               download="sample.pdf" >
              <button className="btn btn-info m-2">PDF Download</button>
              </a>
          </div>
        </div>
      </div>
     
    </section>
  );
};

export default Admin;
