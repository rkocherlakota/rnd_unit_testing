import { useState, useEffect } from "react";
import { useUser } from "../UserContext";
import LoginPopUp from "./LoginPopUp";

export default function LoginBox({ handleLoginBoxClick }) {
  const { user } = useUser();
  const [isLoginPopupVisible, setLoginPopupVisible] = useState(false);

  const handleLoginBoxClickInternal = (e) => {
    e.stopPropagation();
    setLoginPopupVisible(!isLoginPopupVisible);
    // Check if handleLoginBoxClick is a function before calling it
    if (typeof handleLoginBoxClick === 'function') {
      handleLoginBoxClick();
    }
  };

  const handleDocumentClick = () => {
    setLoginPopupVisible(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className="login-box" onClick={handleLoginBoxClickInternal}>
      <img className="user-profile" src={user.picture} alt="User Profile" />
      <i className="fa-solid fa-caret-down"></i>
      {isLoginPopupVisible && <LoginPopUp />}
    </div>
  );
}
