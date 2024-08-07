import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import LoginBox from "./LoginBox";
import LoginPopUp from "./LoginPopUp";
import { useUser } from "../UserContext";
import logo from "../../assets/img/grid_dynamics_logo.png";
import sut_logo from "../../assets/img/grid.svg";

export default function Header() {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();

  const goToHome = () => {
    navigate("/home");
    window.location.reload();
  };
  const handleLogout = () => {
    updateUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <header className="header">
      <div className="header-grid_logo">
        <img className="grid_logo" src={logo} alt="Grid dynamics logo" />
        <h2 className="title">Grid Dynamics</h2>
      </div>

      <div className="header-sut_logo" onClick={goToHome}>
        <img
          src={sut_logo}
          alt="Software unit testing logo"
          className="sut_logo"
        />
        <h2 className="title">Software Unit Testing</h2>
      </div>

      <LoginBox/>
      {/* <LoginPopUp/> */}

      {/* <div className="logged-in-user">
        <LoginBox />

        <div className="logout-div">
        <span className="logout" onClick={handleLogout}>
          {" "}
          Logout 
        </span>
        <span class="material-symbols-outlined">logout</span>

        </div>
      </div> */}
    </header>
  );
}
