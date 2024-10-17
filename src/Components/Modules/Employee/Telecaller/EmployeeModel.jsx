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

  const postData = async () => {
    try {
      const res = await axios.post(`${backendUrl}/add_sheet_link/${id}`, { url: sheeturl });
      // console.log(res);
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
                
              </div>

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
