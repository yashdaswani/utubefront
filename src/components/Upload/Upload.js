import React, { useEffect, useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./Upload.css";
import app from "../../firebase.js"
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const handleChange = (e)=>{
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  const handleTags = (e)=>{
    setTags(e.target.value.split(","));
  }
  const navigate = useNavigate()

  const uploadFile = (file,urlType) =>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
          break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setInputs((prev) => {
        return { ...prev, [urlType]: downloadURL };
      });
    });
  }
);
  }

  useEffect(() => {
    video && uploadFile(video , "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e)=>{
    e.preventDefault();
    const res = await axios.post("/video", {...inputs, tags})
    console.log(res.data)
    setOpen(false)
    res.status===200 && navigate(`/video/${res.data._id}`)
  }


  return (

    <div className="upload_con">
      <div className="upload_wrapper">
        <div className="close" onClick={() => setOpen(false)}>
          X
        </div>
        <h1 className="upload_title">Upload a new video </h1>
        <label className="label">Video : </label>
        {videoPerc > 0 ? (
          "Uploading:" + videoPerc
        ) : (
        <input className="desc" type="file" accept="video/" onChange={e=>setVideo(e.target.files[0])}></input> )}
        <input
          className="upload_input"
          type="text"
          placeholder="Title"
          name="title"
            onChange={handleChange}
        />
        <input
          className="desc"
          placeholder="Description"
          name="desc"
          rows={8}
           onChange={handleChange} 
        />
        <input
          className="desc"
          type="text"
          placeholder="Separate the tags with commas."
            onChance={handleTags}
        />
        <label className="label">Image : </label>
        {imgPerc > 0 ? (
          "Uploading:" + imgPerc + "%"
        ) : (
        <input
          className="desc"
          type="file"
          accept="image/*"
          onChange={(e) => setImg(e.target.files[0])}
        />  )}
        <button className="uplaod_button" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default Upload;
