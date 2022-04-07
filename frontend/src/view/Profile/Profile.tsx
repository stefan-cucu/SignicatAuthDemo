// Profile page
import React from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchUser, getUser, logOut, User } from "../../store/UserSlice";

import "./Profile.css";

const Profile: React.FC = () => {
    const dispatch = useAppDispatch();
    const user : User = useAppSelector(getUser);
    const [params, setParams] = useSearchParams();

    React.useEffect(() => {
        if(params.get('sessionId') !== null) {
            dispatch(fetchUser(params.get('sessionId') as string));
        }
        else if(user.loaded === false) {
            // Redirect to login page
            window.location.href = "/";
        }
    }, [user]);

    return (
        <div className="Profile">
            <div className="container">
                <h1>Profile page</h1>
                <p>First name: {user.firstName}</p>
                <p>Last name: {user.lastName}</p>
                <p>Date of birth: {user.dateOfBirth}</p>
                <button onClick={()=>{dispatch(logOut()); setParams("")}}>Log out</button>
            </div>
        </div>
    );
};

export default Profile;