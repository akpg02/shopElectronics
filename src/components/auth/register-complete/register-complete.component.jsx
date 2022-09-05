import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  signInWithLinkInEmail,
  updateUserPassword,
  getCurrentUser,
} from "../../../utils/firebase/firebase.utils";

import { registerUser } from "../../../store/auth/auth.action";

const RegisterComplete = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const { name, email } = JSON.parse(
      window.localStorage.getItem("emailForRegistration")
    );
    setEmail(email);
    setName(name);
  }, []);

  const handleRegisterUser = async (token) => {
    try {
      const userObj = { name, email };
      await dispatch(registerUser(token, userObj));
    } catch (error) {
      console.log(error);
    }
  };

  const completeRegistration = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords must match");
      return;
    }
    try {
      const response = await signInWithLinkInEmail(email, window.location.href);
      if (response.user.emailVerified) {
        // remove user name and email from local storage
        window.localStorage.removeItem("emailForRegistration");

        // update current user's password
        const user = await getCurrentUser();

        await updateUserPassword(user, password);

        // get user token
        let { token } = await user.getIdTokenResult();

        // added new user to database
        handleRegisterUser(token);

        // redirect
        navigate("/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const CompleteRegistrationForm = () => (
    <form onSubmit={completeRegistration}>
      <input type="email" className="form-control" value={email} disabled />
      <br />
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        placeholder="Enter Password"
      />
      <br />
      <input
        type="password"
        className="form-control"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        autoFocus
        placeholder="Confirm Password"
      />
      <br />
      <button type="submit" className="btn btn-primary mt-3">
        Complete Registeration
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {CompleteRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
