import { Outlet } from "react-router-dom";
import Homepage from "../../components/home/homepage.component";

const Home = () => {
  return (
    <>
      <Homepage />
      <Outlet />
    </>
  );
};

export default Home;
