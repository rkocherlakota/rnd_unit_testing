import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import grid_logo from '../../assets/img/grid.svg';

const clientId = process.env.REACT_APP_LOGIN_CLIENT_ID;

const LoginPageContent = ({ onGoogleLoginSuccess, onGoogleLoginError, loading }) => {

  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleSignInWithPasswordClick = () => {
    setShowLoginForm(true);
  };

  const handleBackToGoogleLoginClick = () => {
    setShowLoginForm(false);
  };


  return (
    <div className="login-right">
      <div className="header-container">
        <img src={grid_logo} className="grid-logo" alt="" />
        <h1 className="login-heading">Welcome to Grid Dynamics</h1>
          <p className="header-p">
            Please sign in to use software unit testing
          </p>
        <div className="sign-in-box">
          <div className="google-auth">
            {showLoginForm ? (
              <div>
                <LoginForm showGoogleSignIn={true} />
              </div>
            ) : (
              <div>
                <GoogleOAuthProvider clientId ={clientId}>
                  <GoogleLogin
                    onSuccess={onGoogleLoginSuccess}
                    onError={onGoogleLoginError}
                  />
                </GoogleOAuthProvider>
                {loading && <div className="loader">Logging...</div>}
              </div>
            )}
          </div>
          {showLoginForm ? (
            <p onClick={handleBackToGoogleLoginClick}>
              Sign in with Google
            </p>
          ) : (
            <p onClick={handleSignInWithPasswordClick}>
              Sign in with login and password
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPageContent;
