import UserSummary from "../../components/Navigation/UserSummary";
import { googleLogin } from "../../config/supabase.config";
import { Link } from "react-router-dom";
interface NavBar {
  isSignedIn: boolean;
}

const Navbar = (props: NavBar) => {
  const { isSignedIn } = props;

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
      <h2
        style={{
          padding: 5,
        }}
      >
        Products
      </h2>
      <h2
        style={{
          padding: 5,
        }}
      >
        Basket
      </h2>
      <Link to="/loginRegister">
        <button>{isSignedIn ? "Log-out" : "Log-in"}</button>
      </Link>
      <UserSummary isSignedIn={isSignedIn} />
    </div>
  );
};

export default Navbar;
