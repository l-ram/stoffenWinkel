import { useEffect, useState } from "react";
import UserSummary from "../../components/Navigation/UserSummary";
import { Link, useNavigate } from "react-router-dom";

interface NavBar {
  token?: {};
}

const Navbar = ({ token }: NavBar) => {
  console.log("navbar token check:", token);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setIsSignedIn(true);
    }
  }, [token]);

  const handleEmailLogout = () => {
    sessionStorage.removeItem("user_token");
    navigate("/");
  };

  return (
    <div
      style={{
        backgroundColor: "aquamarine",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link to="/">
        <h2
          style={{
            padding: 5,
          }}
        >
          Home
        </h2>
      </Link>
      <Link to="/products">
        <h2
          style={{
            padding: 5,
          }}
        >
          Products
        </h2>
      </Link>
      <Link to="/basket">
        <h2
          style={{
            padding: 5,
          }}
        >
          Basket
        </h2>
      </Link>

      {isSignedIn ? (
        <button onClick={handleEmailLogout}>Log-out</button>
      ) : (
        <Link to="/loginRegister">
          <button>{isSignedIn ? "Log-out" : "Log-in"}</button>
        </Link>
      )}

      <UserSummary token={token} isSignedIn={isSignedIn} />
    </div>
  );
};

export default Navbar;
