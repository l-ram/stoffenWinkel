import { useSession } from "../../context/SessionContext";
import UserSummary from "../../components/Navigation/UserSummary";
import BasketSummary from "../../components/Navigation/BasketSummary";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../config/supabase.config";
import "./navbar.scss";
import {
  Favorite,
  Search,
  AccountCircle,
  Logout,
  Menu,
  Close,
  Home,
} from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import Logo from "../../assets/Logo";
import { Fragment, useState } from "react";

interface NavBar {}

const Navbar = ({}: NavBar) => {
  const session = useSession();
  let navigate = useNavigate();

  const [toggleMenu, setToggleMenu] = useState(false);

  const muiPink = "#ff7ed8";

  const handleEmailLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error);
    } else {
      navigate("/");
    }
  };

  return (
    <header>
      <div className="app__navbar">
        <div className="app__navbar-logo">
          <Link to="/">
            <Logo size={150} />
          </Link>
        </div>

        <div className="app__navbar-search">
          <input
            type="text"
            className="app__navbar-searchInput"
            placeholder="Search for anything"
          />

          <Search className="app__navbar-searchIcon" />
        </div>

        <ul className="app__navbar-links">
          <li>
            <Tooltip title={"Go to favourties"}>
              <IconButton>
                <Favorite
                  sx={{
                    color: muiPink,
                  }}
                />
              </IconButton>
            </Tooltip>
          </li>
          <li>
            <UserSummary handleEmailLogout={handleEmailLogout} />
          </li>
          <li></li>
          <li>
            <Link to="/basket">
              <IconButton>
                <BasketSummary />
              </IconButton>
            </Link>
          </li>
        </ul>
      </div>

      <div className="app__navbar-smallscreen">
        <Menu
          onClick={() => {
            setToggleMenu(true);
          }}
        />

        <Link to="/">
          <Logo size={100} />
        </Link>
        <div className="app__navbar-search">
          <input
            type="text"
            className="app__navbar-searchInput"
            placeholder="Search for anything"
          />

          <Search className="app__navbar-searchIcon" />
        </div>
        <Link to="/basket">
          <BasketSummary />
        </Link>

        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay">
            <Close
              className="overlay__close"
              onClick={() => {
                setToggleMenu(false);
              }}
            />
            <ul className="app__navbar-smallscreen-links">
              {session ? (
                <div>
                  <li>
                    <Link to="/products">Products</Link>
                  </li>
                  <li>
                    <Link to="/account">Account</Link>
                  </li>
                  <li>
                    <Link to="/favourites">Favourites</Link>
                  </li>
                  <li>
                    <div>
                      <Logout onClick={handleEmailLogout} /> Logout
                    </div>
                  </li>
                </div>
              ) : (
                <Fragment>
                  <li>
                    <Link to="/products">Products</Link>
                  </li>
                  <li>
                    <Link to="/loginRegister">
                      <AccountCircle
                        sx={{
                          marginBottom: "-6px",
                        }}
                      />{" "}
                      Login
                    </Link>
                  </li>
                </Fragment>
              )}
            </ul>
          </div>
        )}
      </div>

      <nav className="app__categories">
        <ul className="app__categories-links">
          <li>
            {" "}
            <Link
              color="#ffff"
              to="/"
              style={{
                color: "none",
              }}
            >
              <Home />
            </Link>
          </li>

          <li>
            {" "}
            <Link
              color="#ffff"
              to="/products"
              style={{
                color: "none",
              }}
            >
              <h2>Fabric</h2>
            </Link>
          </li>
          <li>
            {" "}
            <Link to="/products">
              <h2>Wool</h2>
            </Link>
          </li>
          <li>
            {" "}
            <Link to="/products">
              <h2>Needles</h2>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
