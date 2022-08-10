import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import { selectCurrentUser } from "../../../store/auth/auth.selector";
import { fetchAdmin } from "../../../store/auth/auth.action";

import LoadingCountdown from "../countdown/countdown.component";

const AdminPrivateRoute = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectCurrentUser);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      if (user && user.token) {
        await dispatch(fetchAdmin(user.token));
        if (user && user.token && user.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    };

    authCheck();
  }, [dispatch, user]);

  return isAdmin ? <Outlet /> : <LoadingCountdown />;
};

export default AdminPrivateRoute;
