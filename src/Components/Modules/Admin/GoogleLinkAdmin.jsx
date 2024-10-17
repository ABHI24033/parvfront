import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { backendUrl } from '../../../env';
import Sidebar from '../UserDashbord/Sidebar';
import { toast } from 'react-toastify';

const GoogleLinkAdmin = () => {
  const [sheetData, setSheetdata] = useState([]);
  console.log(sheetData);

  const { id } = useParams();

  const getSheetByuserId = async () => {
    try {
      const res = await axios.get(`${backendUrl}/get_sheet_link_by_id/${id}`);
      if (res?.status === 200) {
        setSheetdata(res?.data)
      }

    } catch (error) {
      console.log("Error while fetching sheet data", error);

    }
  };

  const handleDelete=async(id)=>{
    try {
      const res=await axios.delete(`${backendUrl}/delete_link/${id}`);
      if(res?.status===200){
        toast?.success(res?.data?.message);
        setTimeout(()=>{
          getSheetByuserId();
        },2000);
      }
    } catch (error) {
      toast?.error(error?.message);
      console.log("Error occured during delete sheet",error);
    }
  }
  useEffect(() => {
    getSheetByuserId();
  }, []);

  return (
    <Sidebar>
      <div className=' container'>
        <h1>Total Added Link</h1>
        <table className='table'>
          <thead>
            <th className='fs-4'>Sr. No.</th>
            <th className='fs-4'>Link</th>
            <th className='fs-4'>Action</th>
          </thead>
          <tbody>
            {
              sheetData?.length > 0 ?
                <>
                  {
                    sheetData?.map((item, index) => {
                      return (
                        <tr className='' key={index}>
                          <>
                            <td>{index + 1}</td>
                            <td>
                              <a href={item?.sheeet_url}>{item?.sheeet_url}</a>
                            </td>
                            <td>
                              <button className='btn btn-danger py-2 px-4' onClick={()=>handleDelete(item?._id)}>Delete</button>
                            </td>
                          </>
                        </tr>
                      )
                    })
                  }
                </>
                :
                <>
                  <p className=' my-3 fs-3 font-bold'>No data found</p>
                </>
            }
          </tbody>
        </table>
      </div>
    </Sidebar>

  );
}

export default GoogleLinkAdmin;
