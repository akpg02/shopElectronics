import { Link } from "react-router-dom";

const UserNavigation = () => {
  return (
    <>
      <nav>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link" to="/user/history">History</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/user/password">Password</Link>
          </li>
          <div className="nav-item">
            <Link className="nav-link" to="/user/wishlist">Wishlist</Link>
          </div>
        </ul>
      </nav>
    </>
  );
};

export default UserNavigation;
