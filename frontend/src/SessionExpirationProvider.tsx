// Component for handling session expiration

import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getUser, logOut, User } from "./store/UserSlice";
import React from "react";
import { useSearchParams } from "react-router-dom";

const SessionExpirationProvider: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const user: User = useAppSelector(getUser);
  const [params, setParams] = useSearchParams();

  React.useEffect(() => {
    setInterval(() => {
      if (new Date(user.expires).getTime() < new Date().getTime()) {
        dispatch(logOut());
        setParams({});
      }
    }, 1000);
  }, [user]);

  return <>{children}</>;
};

export default SessionExpirationProvider;
