import UserSummary from "../../components/Navigation/UserSummary";
import { supabase } from "../../config/supabase.config";

interface NavBar {
  isSignedIn: boolean;
}

const Navbar = (props: NavBar) => {
  const { isSignedIn } = props;

  const googleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div>
      <button onClick={googleLogin}>{isSignedIn ? "Log-out" : "Log-in"}</button>
      <UserSummary isSignedIn={isSignedIn} />
    </div>
  );
};

export default Navbar;
