interface UserSummary {
  isSignedIn: boolean;
}

const UserSummary = (props: UserSummary) => {
  const { isSignedIn } = props;

  const UserSignedIn = () => {
    return (
      <>
        <img
          height="100%"
          src="https://avatars.githubusercontent.com/u/95079074?v=4"
        ></img>
        <h5>Welcome back User!</h5>
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
      {isSignedIn ? <UserSignedIn /> : <h5>No account? Register!</h5>}
    </div>
  );
};

export default UserSummary;
