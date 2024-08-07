import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import grid_logo from '../../assets/img/grid.svg';

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
                <GoogleOAuthProvider clientId="480512305521-hnir65u47v0rc3b5rk1u2vr9pjli5bq5.apps.googleusercontent.com">
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
