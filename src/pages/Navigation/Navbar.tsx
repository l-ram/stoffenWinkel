import { useSession } from "../../context/SessionContext";
import UserSummary from "../../components/Navigation/UserSummary";
import BasketSummary from "../../components/Navigation/BasketSummary";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../config/supabase.config";

interface NavBar {}

const Navbar = ({}: NavBar) => {
  const session = useSession();
  let navigate = useNavigate();

  const handleEmailLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error);
    } else {
      navigate("/");
    }
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

      {session ? (
        <button onClick={handleEmailLogout}>Log-out</button>
      ) : (
        <Link to="/loginRegister">
          <button>Log-in</button>
        </Link>
      )}

      <UserSummary />
      <BasketSummary />
    </div>
  );
};

export default Navbar;
