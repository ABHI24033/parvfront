import React, { useState } from 'react';

function OpenProfileModal({data}) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div>
      <button className="btn btn-primary py-1 px-3" onClick={handleShow}>
        Profile
      </button>

      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content white">
              <div className="modal-header">
                <h5 className="modal-title fs-3"> Profile</h5>
                <button type="button" className="close" onClick={handleClose} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body mx-3 my-3">
                <p><span className='font-bold'>Name : </span>{data?.full_name}</p>
                <p><span className='font-bold'>Email : </span>{data?.email}</p>
                <p><span className='font-bold'>Mobile Number : </span>{data?.mobile_number}</p>
                <p><span className='font-bold'>What's up Number : </span>{data?.whats_app_number}</p>
                <p><span className='font-bold'>Address : </span>{
                    data?.address?.map((add,index)=>{
                        return (
                            <span key={index}>{add?.street},{add?.city},{add?.district},{add?.pincode}<br/> {add?.state}</span>
                        )
                    })
                }</p>
                {/* <p><span className='font-bold'>Name : </span></p>
                <p><span className='font-bold'>Name : </span></p>
                <p><span className='font-bold'>Name : </span></p> */}
              </div>
              {/* <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  Close
                </button> */}
                {/* <button type="button" className="btn btn-primary" onClick={handleClose}>
                  Save Changes
                </button> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OpenProfileModal;
