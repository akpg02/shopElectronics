import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";

import { onAuthStateChangedListener } from "./utils/firebase/firebase.utils";
import { fetchUser } from "./store/auth/auth.action";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const PrimaryNavbar = lazy(() =>
  import("./routes/navigation/primary/navigation.component")
);
const Home = lazy(() => import("./routes/home/home.component"));
const Auth = lazy(() => import("./routes/auth/auth.component"));
const User = lazy(() => import("./routes/user/user.component"));
const Admin = lazy(() => import("./routes/admin/admin.component"));
const PageNotFound = lazy(() =>
  import("./routes/page-not-found/page-not-found.component")
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        const { token } = await user.getIdTokenResult();
        await dispatch(fetchUser(token));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  const Spinner = () => (
    <div className="spinner-border text-danger" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );

  return (
    <>
      <ToastContainer />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<PrimaryNavbar />}>
            <Route index element={<Home />} />
            <Route path="auth/*" element={<Auth />} />
            <Route path="user/*" element={<User />} />
            <Route path="admin/*" element={<Admin />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
