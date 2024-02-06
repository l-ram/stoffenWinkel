import { Link, Outlet } from "react-router-dom";

const Account = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        padding: "1%",
      }}
    >
      <nav
        id="sideBar"
        style={{
          paddingRight: "15%",
        }}
      >
        <Link to="/account/">
          <div>Profile</div>
        </Link>
        <Link to="/account/orders">
          <div>Order history</div>
        </Link>
      </nav>

      <div id="main"></div>
      <Outlet />
    </div>
  );
};

export default Account;
