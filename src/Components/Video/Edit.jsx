import Button from '@mui/material/Button';
import React, { useEffect,  useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import SendIcon from '@mui/icons-material/Send';
const Edit = () => {


  const navigate = useNavigate();
  const {id} = useParams();
  const[video,setVideo] = useState({});

  useEffect(()=>{
    axios.get(`https://648ecdd375a96b6644444aab.mockapi.io/videos/${id}`).then((response)=>
    {
      setVideo(response.data);
    })
  },[id])

  const handleSave = ()=>{
      axios.put(`https://648ecdd375a96b6644444aab.mockapi.io/videos/${id}`,video)
      .then(()=>{
        navigate("/");
      });
  } 

  return (
    <div>
      <form>
        <input value={video.name} onChange={(e)=>setVideo({...video, name:e.target.value})} placeholder="Enter Song Name"/>
        <input value={video.url}onChange={(e)=>setVideo({...video, url:e.target.value})} placeholder="Enter URL"/>
        <textarea value={video.discription} onChange={(e)=>setVideo({...video, discription:e.target.value})} placeholder="Enter discription"/>
        <Button variant="contained" color="secondary"  endIcon={<SendIcon />} onClick={handleSave}>
            Save
        </Button>
      </form>
    </div>
  )
}

export default Edit
