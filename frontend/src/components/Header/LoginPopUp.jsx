import "../Login/LoginPage.css";
import React, { useRef } from "react";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
export default function LoginPopUp({ onClose }) {
  const { user, updateUser } = useUser();
  const loginPopUpRef = useRef(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    updateUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div className="login-popup" ref={loginPopUpRef}>
      {user && (
        <div className="user">
          <img className="user-profile" src={user.picture} alt="User Profile" />
          <div className="user-creditial">
            <p className="user-fullname">{user.name}</p>

            <p className="user-email">{user.email}</p>
          </div>
        </div>
      )}
      <button className="btn logout-btn" onClick={handleLogout}>
        <span class="material-symbols-outlined">logout</span> Logout
      </button>
    </div>
  );
}
