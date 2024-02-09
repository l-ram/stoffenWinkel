import { useEffect, useState } from "react";
import { useSession } from "../../context/SessionContext";
import { Link } from "react-router-dom";

interface UserSummary {}

const UserSummary = ({}: UserSummary) => {
  const session = useSession();
  const avatar = `https://igfmaugvvetikklloxpe.supabase.co/storage/v1/object/public/UserAvatars/${session?.user.id}`;

  const UserSignedIn = () => {
    return (
      <>
        <img height="100%" src={avatar}></img>
        <h5>Welcome back {session?.user.user_metadata.first_name}!</h5>
        <Link to="/account">
          <h5>Account</h5>
        </Link>
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
