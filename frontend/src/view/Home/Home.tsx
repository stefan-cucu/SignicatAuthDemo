// Home page
import React from "react";
import { User, getUser} from "../../store/UserSlice";
import { useAppDispatch, useAppSelector} from "../../app/hooks";

import "./Home.css";

function Home() {
  const handleSetUser = () => {
    // Redirect to login page
    window.location.href = "http://localhost:8080/api/session";
  };

  // TO DO: Implement UI
  return (
    <div className="Home">
      <div className="container">
        <button onClick={handleSetUser}>Log in</button>
      </div>
    </div>
  );
}

export default Home;
