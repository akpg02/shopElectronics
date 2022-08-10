import { Route, Routes } from "react-router-dom";
import Login from "../../components/auth/login/login.component";
import Register from "../../components/auth/register-start/register-start.component";
import RegisterComplete from "../../components/auth/register-complete/register-complete.component";
import ForgotPassword from "../../components/auth/forgot-password/forgot-password.component";

const Auth = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="register/complete" element={<RegisterComplete />} />
      <Route prth="forgot/password" element={<ForgotPassword />} />
    </Routes>
  );
};

export default Auth;
