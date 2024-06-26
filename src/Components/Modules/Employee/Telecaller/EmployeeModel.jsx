import React, { useState } from 'react';
import { backendUrl } from '../../../../env';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
// import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeeModel = ({ id }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [sheeturl, setSheeturl] = useState('');

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleInputChange = (e) => {
    setSheeturl(e.target.value);
  }

  // const handleUpload = () => {
  //   if (selectedFile) {
  //     console.log('File to upload:', selectedFile.name);
  //     // Here, you can add logic to upload the file to a backend server

  //     // Reset and close the modal after upload
  //     setSelectedFile(null);
  //     setShowModal(false);
  //   }
  // };
  const postData = async () => {
    try {
      const res = await axios.post(`${backendUrl}/add_sheet_link/${id}`, { url: sheeturl });
      console.log(res);
      if (res) {
        toast.success("successfully added");
        setTimeout(() => {
          setShowModal(false);
        }, 3000);
      }
    } catch (error) {
      console.log("Error while posting data", error);
    }
  }

  // const handleUpload = async () => {
  //   if (selectedFile) {
  //     // Create a FormData object to send the file
  //     const formData = new FormData();
  //     formData.append('file', selectedFile);

  //     try {
  //       // Send a POST request to the server
  //       const response = await fetch(`${backendUrl}upload_data/${id}`, {
  //         method: 'POST',
  //         body: formData,
  //       });

  //       if (response.ok) {
  //         setUploadStatus('File uploaded successfully');
  //         alert("File uploaded successfully");
  //       } else {
  //         setUploadStatus('Error uploading file');
  //       }
  //     } catch (error) {
  //       setUploadStatus(`Error: ${error.message}`);
  //     }
  //   } else {
  //     setUploadStatus('No file selected');
  //   }
  // };

  return (
    <div>
      <ToastContainer/>
      <button className="btn btn-primary py-1 px-3" onClick={toggleModal}>
        Add Data
      </button>

      {showModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="d-flex justify-content-between align-item-center bg-primary">
                <h5 className="fs-3 my-2 mx-2">Upload Excel File</h5>
                {/* <button type="button" 
                className="close bg-primary " 
                style={{border:"none",height:"2rem", width:"3rem"}} 
                onClick={toggleModal}>
                  <span className='fs-3 mx-auto mb-3'>&times;</span>
                </button> */}
              </div>
              {/* <div className="">
                <input type="file" accept=".xlsx" onChange={handleFileChange} />
                <p>{uploadStatus}</p>
              </div> */}
              <div className="mx-4">
                <input type="text" placeholder='Paste your google sheet link' name='sheet_url' onChange={handleInputChange} />
                {/* <p>{uploadStatus}</p> */}
              </div>


              <div className="modal-footer py-1">
                <button className="btn btn-secondary py-1 " onClick={toggleModal}>
                  Close
                </button>
                <button
                  className="btn btn-primary py-1"
                  onClick={postData}
                // disabled={!selectedFile}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeModel;
