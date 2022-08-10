import { Route, Routes } from "react-router-dom";
import UserRoute from "../../routes/protected/user/user-private-route.component";
import History from "../../components/user/history/history.component";
import Password from "../../components/user/password/password.component";
import Wishlist from "../../components/user/wishlist/wishlist.component";

const User = () => {
  return (
    <Routes>
      <Route path="" element={<UserRoute />}>
        <Route path="history" element={<History />} />
        <Route path="password" element={<Password />} />
        <Route path="wishlist" element={<Wishlist />} />
      </Route>
    </Routes>
  );
};

export default User;
