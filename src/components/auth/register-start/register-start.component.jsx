import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { sendRegistrationEmail } from "../../../utils/firebase/firebase.utils";
import { selectCurrentUser } from "../../../store/auth/auth.selector";

import { toast } from "react-toastify";

const RegisterStart = () => {
  const navigate = useNavigate();
  const { user } = useSelector(selectCurrentUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user && user.token && user.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user && user.token) {
      navigate("/user/history");
    }
  }, [user, navigate]);

  const handleRegistration = async (e) => {
    e.preventDefault();

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    try {
      await sendRegistrationEmail(email, config);

      toast.success(
        `Email sent to ${email}. Click the link to complete your account registration.`
      );
      // save user email in local storage
      window.localStorage.setItem(
        "emailForRegistration",
        JSON.stringify({ email, name })
      );
    } catch (error) {
      toast.error(
        `Error while sending registration email. Error message: ${error.message}`
      );
    }
    setName("");
    setEmail("");
  };

  const registerForm = () => (
    <form onSubmit={handleRegistration}>
      <input
        type="text"
        className="form-control"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        autoFocus
      />

      <input
        type="email"
        className="form-control mt-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        autoFocus
      />
      <button type="submit" className="btn btn-primary mt-3">
        Register
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterStart;
