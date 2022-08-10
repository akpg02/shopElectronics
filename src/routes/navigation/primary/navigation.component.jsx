import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { FaUser, FaUserPlus } from "react-icons/fa";
import { FiSettings, FiLogOut } from "react-icons/fi";

import { selectCurrentUser } from "../../../store/auth/auth.selector";
import { logoutUser } from "../../../store/auth/auth.action";
import { signOutUser } from "../../../utils/firebase/firebase.utils";

import "./navigation.styles.css";

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(selectCurrentUser);

  const handleSignOut = () => {
    signOutUser();
    dispatch(logoutUser());
    navigate("/auth/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Shop<b>Electronics</b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {!user && (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item me-5">
                  <Link className="nav-link icon-combo" to="/auth/login">
                    <FaUser /> <span>Login</span>
                  </Link>
                </li>

                <li className="nav-item me-5">
                  <Link to="/auth/register" className="nav-link icon-combo">
                    <FaUserPlus /> <span>Register</span>
                  </Link>
                </li>
              </ul>
            )}
            {user && (
              <div className="dropdown me-3 ms-auto">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FiSettings /> {user ? user.name : user.email.split("@")[0]}
                </Link>
                <ul className="dropdown-menu dropdown-menu-md-start dropdown-menu-lg-end">
                  {user && user.role === "subscriber" && (
                    <li>
                      <Link to="/user/history" className="dropdown-item">
                        Dashboard
                      </Link>
                    </li>
                  )}
                  {user && user.role === "admin" && (
                    <li>
                      <Link to="/user/history" className="dropdown-item">
                        User Dashboard
                      </Link>
                      <Link to="/admin/dashboard" className="dropdown-item">
                        Admin Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <a
                      className="dropdown-item"
                      href="/auth/login"
                      onClick={handleSignOut}
                    >
                      <div className="icon-combo">
                        <FiLogOut /> <span>Sign Out</span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navigation;
