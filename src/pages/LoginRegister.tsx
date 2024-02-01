import { FormEvent, useState } from "react";
import { supabase } from "../config/supabase.config";
import { useNavigate } from "react-router-dom";

const LoginRegister = () => {
  let navigate = useNavigate();

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
    try {
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
      alert("Your account has been created!");
      navigate("/");
    } catch (error) {
      alert(error);
    }
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

  console.log(emailLoginData);

  //   Submit to backend
  const handleEmailLogin = async (event: FormEvent) => {
    event.preventDefault();
    console.log("login ran");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailLoginData.email,
        password: emailLoginData.password,
      });
      alert(`You are logged in!: ${data}`);
      navigate("/");
      console.log("Supabase response:", data);
    } catch (error) {
      alert(error);
    }
  };

  console.log(emailLoginData);

  return (
    <div>
      <h2>Welcome back! Sign in here</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleEmailLogin}>
        <input
          placeholder="email"
          type="email"
          name="email"
          onChange={handleEmailLoginChange}
        />

        <input
          placeholder="password"
          type="password"
          name="password"
          onChange={handleEmailLoginChange}
        />
        <button type="submit">Log in</button>
      </form>

      <span>Or sign in with your google account</span>
      <button>Sign in with Google</button>

      <h2>Don't have an account?</h2>
      <span>Register with your email</span>

      <form onSubmit={handleEmailRegister}>
        <input
          placeholder="first name"
          type="text"
          name="firstName"
          onChange={handleEmailRegisterChange}
        />

        <input
          placeholder="last name"
          type="text"
          name="lastName"
          onChange={handleEmailRegisterChange}
        />

        <input
          placeholder="email"
          type="email"
          name="email"
          onChange={handleEmailRegisterChange}
        />

        <input
          placeholder="password"
          type="password"
          name="password"
          onChange={handleEmailRegisterChange}
        />

        <button type="submit">Sign up</button>
      </form>

      <span>Or register quickly with your google account</span>
      <button>Register with Google</button>
    </div>
  );
};

export default LoginRegister;
