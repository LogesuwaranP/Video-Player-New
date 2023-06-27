import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Badge from "@mui/material/Badge";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Player = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [video, setVideo] = useState({});
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [like, setLike] = useState();
  useEffect(() => {
    axios
      .get(`https://648ecdd375a96b6644444aab.mockapi.io/videos/${id}`)
      .then((response) => {
        setVideo(response.data);
        setLike(response.data.likes);
        setCommentList(response.data.comments);
      });
  }, [id]);

  function update() {
    axios
      .put(`https://648ecdd375a96b6644444aab.mockapi.io/videos/${id}`, {
        likes: like + 1,
      })
      .then(() => {
        console.log(like);
      });
  }

  function handleComment(e) {
    e.preventDefault();
    setCommentList([...commentList,comment]);
    axios
      .put(`https://648ecdd375a96b6644444aab.mockapi.io/videos/${id}`, {
        comments: [...commentList,comment],
      })
      setComment("");
  }


  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`https://648ecdd375a96b6644444aab.mockapi.io/videos/${id}`)
      .then(() => navigate("/"));
  };
  


  return (
    <div className="player-container">
      <div className="player-main">
        <div className="frame">
          <iframe
            width="98%"
            height="98%"
            src={video.url}
            title={"video.name"}
            allow="autoplay;"
            muted="unmuted"
            allowFullscreen
            frameborder="0"
          ></iframe>
          {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/X7WXHhokylc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
        </div>
        <div className="info">
          <h2>{video.name}</h2>
          <div className="icons">
            <IconButton>
              <Badge
                badgeContent={like}
                color="secondary"
                onClick={() => {
                  setLike(like + 1);
                  update();
                }}
              >
                <FavoriteOutlinedIcon fontSize="large" color="secondary" />
              </Badge>
            </IconButton>
            <IconButton>
              <DeleteIcon
                fontSize="large"
                color="error"
                onClick={() => handleDelete(video.id)}
              />
            </IconButton>
            <IconButton onClick={() => navigate(`/edit/${video.id}`)}>
              <EditIcon fontSize="large" color="warning" />
            </IconButton>
            <IconButton onClick={() => navigate("/create")}>
              <AddBoxIcon fontSize="large" color="primary" />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="discription">
        <h3>Discription</h3>
        <p>{video.discription}</p>
      </div>
      <div className="command-container">
        <form onSubmit={handleComment}>
          <input
            placeholder="Write a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <IconButton>
            <AddBoxIcon
              fontSize="large"
              color="primary"
              className="add-comment"
              onClick={handleComment}
            />
          </IconButton>
        </form>
        {commentList.map((cmt) => <p>{cmt}</p>)}
      </div>
    </div>
  );
};

export default Player;
