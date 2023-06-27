import React, { useState } from "react";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from "react-router-dom";



const Create = ({data,setData}) => {
    
    const navigate = useNavigate();
    const[NewVideo, setNewVideo] = useState({
        id:data.length+1,
        name:"",
        url:"",
        discription:"",
        likes:0
    });


    const save=()=> {
      // axios.post('https://648bfcbd8620b8bae7ec02d1.mockapi.io/videos', JSON.stringify(NewVideo))
      // .then(function (response) {
      //   console.log(response);
      //   navigate("/");
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });

      setData([...data, NewVideo])
      console.log(NewVideo);


      fetch("https://648ecdd375a96b6644444aab.mockapi.io/videos", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: data[data.length-1].id + 1,
          name:NewVideo.name,
          url:NewVideo.url,
          discription:NewVideo.discription,
          likes:NewVideo.likes,
          comments: []
        })
      }).then((response)=>{
        console.log(response);
        navigate("/")
      })


    }

    const handleSubmit=()=>{
      var id = data[data.length-1].id + 1;
      console.log({...NewVideo, id:id});
      setNewVideo({...NewVideo, id:id})
      save();

    }


  return (
    <div className="form-container">
      <form>
        <input onChange={(e)=>setNewVideo({...NewVideo, name:e.target.value})} placeholder="Enter Song Name"/>
        <input onChange={(e)=>setNewVideo({...NewVideo, url:e.target.value})} placeholder="Enter URL"/>
        <textarea autoComplete="true" onChange={(e)=>setNewVideo({...NewVideo, discription:e.target.value})} placeholder="Enter discription"/>
        <Button variant="contained" color="secondary"  endIcon={<SendIcon />} onClick={handleSubmit}>
            Submit
        </Button>
      </form>
    </div>
  );
};

export default Create;
