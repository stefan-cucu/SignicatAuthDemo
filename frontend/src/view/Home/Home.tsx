// Home page
import React from "react";
import { User, getUser } from "../../store/UserSlice";
import { useAppDispatch, useAppSelector, useSessionId } from "../../app/hooks";
import { useSearchParams } from "react-router-dom";

import "./Home.css";

export interface IHome {
  error?: "error" | "abort";
}

const Home: React.FC<IHome> = (props) => {
  const handleSetUser = () => {
    // Redirect to login page
    window.location.href = "http://localhost:8080/api/session";
  };

  return (
    <div className="Home">
      <div className="container">
        <button onClick={handleSetUser}>Log in</button>
        {props.error === "error" && <p>Login error!</p>}
        {props.error === "abort" && <p>Login aborted!</p>}
      </div>
    </div>
  );
};

export default Home;
