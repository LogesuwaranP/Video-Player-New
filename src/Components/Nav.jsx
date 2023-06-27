import React,{useState} from "react";
import "./Nav.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import { Hamburger } from "./Hamburger";



const Nav = () => {
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] =useState(false);
  const style= showNavbar? {borderRadius:"10px 10px 0px 10px"}: {borderRadius:"10px"};
  

  return (
    <nav className="navbar" style={style}>
      <div className="container">
      <div className="back">
        <IconButton>
          <ArrowBackIosIcon fontSize="medium" onClick={() => navigate(-1)} className="arrow"/>
        </IconButton>
        <IconButton>
          <ArrowForwardIosIcon fontSize="medium" onClick={() => navigate(1)} className="arrow" />
        </IconButton>
      </div>
      <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li><Link to="/">Videos</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      <div className="menu-icon" onClick={()=>setShowNavbar(!showNavbar)}>
        <Hamburger />
      </div>
      </div>

    </nav>
  );
};

export default Nav;
