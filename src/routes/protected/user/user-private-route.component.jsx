import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { selectCurrentUser } from "../../../store/auth/auth.selector";

import LoadingCountdown from "../countdown/countdown.component";

const UserPrivateRoute = () => {
  const { user } = useSelector(selectCurrentUser);
  const [loading, setLoading] = useState(true);

  // check if user is logged in
  useEffect(() => {
    const authCheck = async () => {
      if (user && user.token) {
        setLoading(false);
      } else {
        setLoading(true);
      }
    };
    authCheck();
  }, [user]);

  return loading ? <LoadingCountdown /> : <Outlet />;
};

export default UserPrivateRoute;
