import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../../../env';

function ConnectorViewModal({data}) {
    const [user,setuser]=useState();
    // console.log(user);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const getData=async()=>{
    try {
        const res=await axios.get(`${backendUrl}/getuserbyid/${data}`)
        if(res){
            setuser(res?.data?.user);
        }
    } catch (error) {
        console.log("error in fetching data",error);
    }
  }

  useEffect(()=>{
    getData();
  },[])

  return (
    <div>
      <button className="btn btn-primary px-4 py-1" onClick={handleShow}>
        View
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
                <p><span className='font-bold'>Name : </span>{user?.full_name}</p>
                <p><span className='font-bold'>Email : </span>{user?.email}</p>
                <p><span className='font-bold'>Mobile Number : </span>{user?.mobile_number}</p>
                <p><span className='font-bold'>What's up Number : </span>{user?.whats_app_number}</p>
                <p><span className='font-bold'>Current Profession : </span>{user?.current_profession}</p>
                <p><span className='font-bold'>Company Name : </span>{user?.company_name}</p>
                <p><span className='font-bold'>Address : </span>{
                    user && user?.address?.map((add,index)=>{
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

export default ConnectorViewModal;
