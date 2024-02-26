import { FormEvent, useState } from "react";
import { supabase } from "../config/supabase.config";
import { useNavigate } from "react-router-dom";
import "./loginRegister.scss";
interface LoginRegister {}

const LoginRegister = ({}: LoginRegister) => {
  let navigate = useNavigate();

  const [error, setError] = useState<string>();

  const [emailRegisterData, setEmailRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [emailLoginData, setEmailLoginData] = useState({
    email: "",
    password: "",
  });

  const handleEmailRegisterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmailRegisterData((prevEmailRegisterData) => {
      return {
        ...prevEmailRegisterData,
        [event.target.name]: event.target.value,
      };
    });
  };

  //   Submit to backend
  const handleEmailRegister = async (event: FormEvent) => {
    event.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: emailRegisterData.email,
      password: emailRegisterData.password,
      options: {
        data: {
          first_name: emailRegisterData.firstName,
          last_name: emailRegisterData.lastName,
        },
      },
    });

    if (error) {
      setError(error.message);
    }
    navigate("/loginRegister");
  };

  const handleEmailLoginChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmailLoginData((prevEmailLoginData) => {
      return {
        ...prevEmailLoginData,
        [event.target.name]: event.target.value,
      };
    });
  };

  //   Submit to backend
  const handleEmailLogin = async (event: FormEvent) => {
    event.preventDefault();
    console.log("login ran");
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailLoginData.email,
      password: emailLoginData.password,
    });
    console.log(error?.message);
    if (error) {
      setError(error?.message);
      navigate("/loginRegister");
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <h2>Welcome back!</h2>
      {error ? <p style={{ color: "red" }}>{error}</p> : null}

      <div className="loginRegister">
        <div className="loginRegister__signin">
          <h2>Sign in here</h2>
          <span>Sign in with your email and password</span>
          <form onSubmit={handleEmailLogin}>
            <input
              placeholder="email"
              type="email"
              name="email"
              required={true}
              onChange={handleEmailLoginChange}
            />

            <input
              placeholder="password"
              type="password"
              name="password"
              required={true}
              onChange={handleEmailLoginChange}
            />
            <button type="submit">Log in</button>
          </form>
          <span>Or sign in with your google account</span>
          <button>Sign in with Google</button>
        </div>
        <div className="loginRegister__register">
          <h2>Don't have an account?</h2>
          <span>Register with your email</span>
          <form onSubmit={handleEmailRegister}>
            <input
              placeholder="first name"
              type="text"
              name="firstName"
              required={true}
              onChange={handleEmailRegisterChange}
            />

            <input
              placeholder="last name"
              type="text"
              name="lastName"
              required={true}
              onChange={handleEmailRegisterChange}
            />

            <input
              placeholder="email"
              type="email"
              name="email"
              required={true}
              onChange={handleEmailRegisterChange}
            />

            <input
              placeholder="password"
              type="password"
              name="password"
              required={true}
              onChange={handleEmailRegisterChange}
            />

            <button type="submit">Sign up</button>
          </form>
          <span>Or register quickly with your google account</span>
          <button>Register with Google</button>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
