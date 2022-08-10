import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { selectCurrentUser } from "../../../store/auth/auth.selector";
import { forgotPasswordLinkInEmail } from "../../../utils/firebase/firebase.utils";

import "./forgot-password.styles.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { user } = useSelector(selectCurrentUser);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && user.token && user.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user && user.token) {
      navigate("/user/dashboard");
    }
  }, [navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGET_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };

    try {
      await forgotPasswordLinkInEmail(email, config);
      setEmail("");
      setIsLoading(false);
      toast.success(`A link has been set to ${email} to reset password`);
    } catch (error) {
      toast.error(error.message);
      console.log("Error MSG IN FORGOT PASSWORD", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="container col-md-6 offset-md-3 p-t">
      {isLoading ? (
        <h4 className="text-danger">Loading...</h4>
      ) : (
        <h4 className="mt-5">Forgot Password</h4>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mt-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          placeholder="Enter email"
        />
        <button
          className="btn btn-primary mt-3 forgot-button"
          disabled={!email}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
