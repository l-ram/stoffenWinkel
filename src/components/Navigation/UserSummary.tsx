import { useSession } from "../../context/SessionContext";

interface UserSummary {}

const UserSummary = ({}: UserSummary) => {
  const session = useSession();

  const UserSignedIn = () => {
    return (
      <>
        <img
          height="100%"
          src="https://avatars.githubusercontent.com/u/95079074?v=4"
        ></img>
        <h5>
          Welcome back{" "}
          {/* {(session.user as User).user_metadata.first_name as string}! */}
        </h5>
      </>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        height: 75,
        width: 175,
        background: "pink",
      }}
    >
      {session ? <UserSignedIn /> : <h5>No account? Register!</h5>}
    </div>
  );
};

export default UserSummary;
