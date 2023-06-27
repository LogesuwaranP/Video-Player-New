import React from "react";
import "./VCard.css";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
const VideoCard = ({video}) => {
  const navigate = useNavigate();
  return (
    <div className="card-container" onClick={()=>navigate("/play/"+video.id)}>
      <iframe width="100%" height="75%" src={video.url} frameborder="0" title={video.name} ></iframe>
      <div className="title" >
        <p >{video.name.length>18?video.name.slice(0,17)+"...":video.name}</p>
        <Badge badgeContent={video.likes} color="secondary">
            <FavoriteOutlinedIcon fontSize="large" color="secondary"/>
        </Badge>
      </div>
    </div>
  );
};

export default VideoCard;
