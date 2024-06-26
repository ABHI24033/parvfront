import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../UserDashbord/Sidebar';
import { backendUrl } from '../../../env';
import { toast } from 'react-toastify';

const UploadGalleryForm = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [data, setData] = useState();

    const fetchImages = async () => {
        const response = await axios.get(`${backendUrl}/getAllGalleryImages`);
        // const data=await response.json();
        console.log(response);
        setData(response?.data);
    }
    useEffect(() => {

        fetchImages();
    }, []);

    const handleFileChange = (e) => {
        setSelectedFiles(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('images', selectedFiles[i]);
        }

        try {
            const response = await axios.post(`${backendUrl}/upload_gallery_images`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            // console.log('Response:', response.data);
            alert('Images uploaded successfully!');
            fetchImages();
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    const deleteImage = async (id) => {
        try {
            const res = await axios.delete(`${backendUrl}/delete_image/${id}`);
            if (res.data) {
                toast.success('Image deleted successfully!');
                fetchImages();
            }
        } catch (error) {
            console.log("Error in deleting image", error);
        }
    }



    return (
        <>
            <Sidebar>
                <div className='  mx-auto'>
                    <h2>Upload Multiple Images</h2>
                    <p className='fs-6'>
                        You can't upload more than 10 images at a time.
                    </p>
                    <form onSubmit={handleSubmit} className='  w-50'>
                        <input type="file" name='images' multiple onChange={handleFileChange} />
                        <button type="submit" className='btn btn-primary'>Upload</button>
                    </form>
                </div>

                {/* table  */}
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Sr.no</th>
                            {/* <th scope="col">Image Name</th> */}
                            <th scope="col">Image</th>
                            {/* <th scope="col">Handle</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        {/* <td>{item?.originalname}</td> */}
                                        {/* <td>{item?.url}</td> */}
                                        <td>
                                            <img src={item?.url} alt="" width={100} height={50} />
                                        </td>
                                        <td>
                                            <button className='btn btn-danger py-1 px-3' onClick={() => deleteImage(item?._id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </Sidebar>

        </>

    );
};

export default UploadGalleryForm;

