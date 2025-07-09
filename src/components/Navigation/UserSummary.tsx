import { useState } from "react";
import { useSession } from "../../context/SessionContext";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import "./userSummary.scss";
import { Logout, AccountBox, Assignment, Login } from "@mui/icons-material";

interface UserSummary {
  handleEmailLogout: () => any;
}

const UserSummary = ({ handleEmailLogout }: UserSummary) => {
  const session = useSession();
  const avatar = `https://igfmaugvvetikklloxpe.supabase.co/storage/v1/object/public/UserAvatars/${session?.user.id}`;

  const [menu, setMenu] = useState(false);

  const menuToggle = () => {
    console.log("click!");
    setMenu(true);
  };

  const UserSignedIn = () => {
    return (
      <div>
        <div
          className="userSummary"
          onClick={() => {
            !menu ? menuToggle() : setMenu(false);
          }}
        >
          <h5 className="userSummary__message">
            Welcome back {session?.user.user_metadata.first_name}!
          </h5>

          <Avatar className="userSummary__avatar" src={avatar} />
        </div>

        {menu && (
          <div className="userSummary__menu">
            <ul className="userSummary__list">
              <li>
                <Link to="/account">
                  <AccountBox
                    sx={{
                      marginBottom: "-6px",
                    }}
                  />{" "}
                  Account
                </Link>
              </li>
              <li>
                <Link to="/account/orders">
                  <Assignment
                    sx={{
                      marginBottom: "-6px",
                    }}
                  />{" "}
                  Orders
                </Link>
              </li>
              <li onClick={handleEmailLogout}>
                <Link to="/">
                  <Logout
                    sx={{
                      marginBottom: "-6px",
                    }}
                  />{" "}
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {session ? (
        <UserSignedIn />
      ) : (
        <>
          <Link to="/loginRegister">
            <Login />{" "}
            <h5 style={{ marginLeft: "5px" }}>No account? Register!</h5>
          </Link>
        </>
      )}
    </div>
  );
};

export default UserSummary;
