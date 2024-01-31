import UserSummary from "../../components/Navigation/UserSummary";

interface NavBar {
  isSignedIn: boolean;
}

const Navbar = (props: NavBar) => {
  const { isSignedIn } = props;

  return (
    <div>
      <button>{isSignedIn ? "Log-out" : "Log-in"}</button>
      <UserSummary isSignedIn={isSignedIn} />
    </div>
  );
};

export default Navbar;
