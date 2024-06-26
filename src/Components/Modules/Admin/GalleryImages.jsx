import React, { useState, useEffect, useRef } from "react";
import "./galleryimg.css";
import Sidebar from "../UserDashbord/Sidebar";
import axios from "axios";
import { backendUrl } from "../../../env";

const GalleryImages = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([])
  const [data, setData] = useState({});

  // console.log(images);

  const handleImageChange = (file) => {
    setSelectedImage(file);
  };
  const inputRef = useRef(null);


  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    // console.log(name, value);
  }
  let bodyContent = new FormData();
  const handleSubmit = async (e) => {
    e.preventDefault();
    inputRef.current.value = "";
    if (selectedImage) {
      bodyContent.append("file", selectedImage);
      // console.log("body conetbt",bodyContent);
      const body = {
        heading: data?.heading,
        description: data?.description,
      }

      try {
        const response = await axios.post(
          // "http://15.207.195.184:8000/api/v1/uploadImage",
        // "https://us-central1-joyomoney-a8630.cloudfunctions.net/joyMoney/api/v1/uploadImage",
        `${backendUrl}/uploadImage`,
          {
            file: selectedImage,
            body
          },
          {
            headers: {
              'Content-Type': `multipart/form-data`,
            }
          }
        );
        if (response) {
          alert(response.data.message);
          setSelectedImage(null);
          // Fetch the updated list of images
          fetchImages();
        } // Handle the response, e.g., show a success message
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("please select the image");
    }
    // Reset the selected image
  };
  // console.log(selectedImage);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        // "http://15.207.195.184:8000/api/v1/getImages"
        // "https://us-central1-joyomoney-a8630.cloudfunctions.net/joyMoney/api/v1/getImages"
        `${backendUrl}/getImages`
      );
      if (response) {
        setImages(response.data.images);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);

  const handleDelete = async (imageId) => {
    try {
      // await axios.delete(`https://us-central1-joyomoney-a8630.cloudfunctions.net/joyMoney/api/v1/deleteImage/${imageId}`);
      await axios.delete(`${backendUrl}/deleteImage/${imageId}`);
      setImages(images.filter((image) => image._id !== imageId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Sidebar>
        <section className="">
          <div className="image-form-container">
            <h1>Image Input Form</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group mt-4">
                <label htmlFor="selectedImage ">Select Image:</label>
                <input
                  type="file"
                  id="selectedImage"
                  accept="image/*"
                  ref={inputRef}
                  onChange={(e) => handleImageChange(e.target.files[0])}
                />
              </div>
              <div className="form-group mt-4">
                <label htmlFor="heading ">Heading:</label>
                <input
                  type="text"
                  id="heading"
                  name="heading"
                  value={data?.heading}
                  // accept="image/*"
                  // ref={inputRef}
                  onChange={(e) => handleDataChange(e)}
                />
              </div>
              <div className="form-group mt-4">
                <label htmlFor="description ">Description:</label>
                <textarea
                  name="description"
                  id="description"
                  value={data?.description}
                  onChange={handleDataChange}
                  cols="30"
                  rows="5"
                >

                </textarea>
              </div>
              <button type="submit" className="buttonUSer">
                Submit
              </button>
            </form>
          </div>
          <h1 style={{ marginTop: "3rem" }}>Uploaded Images</h1>
          <table style={{ marginBottom: "3rem" }} class="w3-table-all">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Image ID</th>
                <th>Date of Upload</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {images.length ? (
                images.map((image) => (
                  <tr key={image._id}>
                    <td>{image.fileName}</td>
                    <td>{image._id}</td>
                    <td>{new Date(image.uploadTime).toLocaleDateString()}</td>
                    <td>
                      <button
                        class="w3-button w3-red"
                        onClick={() => handleDelete(image._id)}
                      >
                        Delete
                      </button>
                    </td>

                    {/* <input type="text" /> */}
                  </tr>
                ))
              ) : (
                <td>No images uploaded yet</td>
              )}
            </tbody>
          </table>
        </section>
      </Sidebar>
    </>
  );
};

export default GalleryImages;
