import { useState, useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../store/auth/auth.action";
import { selectCurrentUser } from "../../../store/auth/auth.selector";

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../../utils/firebase/firebase.utils";

import "./login.styles.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useSelector(selectCurrentUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const roleBasedRedirect = () => {
      if (user && user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user) {
        navigate("/user/history");
      }
    };
    roleBasedRedirect();
  }, [navigate, user]);

  const handleLoginUser = async (token) => {
    try {
      await dispatch(loginUser(token, { email }));
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithEmail = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      const { token } = await user.getIdTokenResult();
      handleLoginUser(token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setEmail("");
    setPassword("");
  };

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      const response = await signInWithGooglePopup();
      const { email } = response.user;
      const { token } = await response.user.getIdTokenResult();
      await dispatch(loginUser(token, { email }));
    } catch (error) {
      console.log(error);
    }
  };

  const loginForm = () => (
    <form onSubmit={signInWithEmail}>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
      </div>
      <Link to="/forgot/password" className="text-danger forgot-link mt-3">
        Forgot password?
      </Link>
      <button
        type="submit"
        disabled={!email || password.length < 6}
        className="btn btn-primary btn-lg btn-block mt-3 mb-3 login-button-width"
      >
        Sign In
      </button>
    </form>
  );

  return (
    <>
      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            {loading ? (
              <h4 className="text-danger">Loading...</h4>
            ) : (
              <h4>Login</h4>
            )}
            <br />
            {loginForm()}
            <button
              onClick={signInWithGoogle}
              type="submit"
              className="btn btn-danger btn-lg btn-block mt-3 mb-3 login-button-width"
            >
              Sign In with Google
            </button>
          </div>
        </div>
        <div className="text-center">
          <p>
            Don't already have an account?{" "}
            <Link to="/auth/register" className="text-danger register-link">
              Register
            </Link>
          </p>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Login;
