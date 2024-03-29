import { Link, Outlet } from "react-router-dom";
import "./account.scss";
import ReactGA from "react-ga4";
import { useEffect } from "react";

const Account = () => {
  useEffect(() => {
    ReactGA.set({ page: window.location.href + window.location.search });
    console.log("ga ran");
  }, [window.location.href]);

  return (
    <div className="account">
      <nav className="account__sideBar">
        <ul>
          <li>
            <p className="account__headersTitle">My account</p>
          </li>
          <li>
            <Link to="/account/">
              <p className="account__headers">Profile</p>
            </Link>
          </li>
          <li>
            <Link to="/account/orders">
              <p className="account__headers">Order history</p>
            </Link>
          </li>
          <li>
            <Link to="/account/favourites">
              <p className="account__headers">Favourites</p>
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};

export default Account;
