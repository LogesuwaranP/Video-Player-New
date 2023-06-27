import React, { useState } from "react";
import VideoCard from "./VideoCard";
import "./Feed.css";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const Feed = ({ data }) => {
  const navigate = useNavigate();
  const[search,setSearch] = useState("");

  return (
    <>
      <div>
        <input className="search" type="text" placeholder="Search songs ..." onChange={(e)=>{setSearch(e.target.value)}}/>
        <div className="add-icon" onClick={() => navigate("/create")}>
          <AddIcon />
        </div>
      </div>
      <div className="video-container">
       {
          data.filter((item) => {
            return item.name.toLowerCase().includes(search.toLowerCase());
            }).map((video) => (<VideoCard video={video} key={video.id} />))
       }
      </div>
    </>
  );
};

export default Feed;


// {data.map((video) => (
//   <VideoCard video={video} key={video.id} />
// ))}
