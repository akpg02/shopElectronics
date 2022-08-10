import { useState } from "react";
import { toast } from "react-toastify";
import {
  updateUserPassword,
  getCurrentUser,
} from "../../../utils/firebase/firebase.utils";

import UserNavigation from "../../../routes/navigation/user/user-navigation.component";

function Password() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
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
      setLoading(true);
      const currentUser = await getCurrentUser();
      await updateUserPassword(currentUser, password);
      toast.success("Password updated");
      setPassword("");
      setConfirmPassword("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message);
      console.log(error.message);
    }
  };

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="mt-3">Your Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Enter new password"
          disabled={loading}
          value={password}
        />
      </div>
      <div className="form-group">
        <label className="mt-3">Confirm Password</label>
        <input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="form-control"
          placeholder="Confirm password"
          disabled={loading}
          value={confirmPassword}
        />
      </div>
      <button
        className="btn btn-primary mt-3"
        disabled={!password || password.length < 6 || loading}
      >
        Submit
      </button>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNavigation />
        </div>
        <div className="col">
          <div className="container">
            {loading ? (
              <h4 className="text-danger">Loading...</h4>
            ) : (
              <h4>Update Password</h4>
            )}
            {passwordUpdateForm()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Password;
