import { FormEvent, useEffect, useState } from "react";
import { supabase } from "../config/supabase.config";
import { useSession } from "../context/SessionContext";
import CircularProgress from "@mui/material/CircularProgress";
import "./profile.scss";
import ReactGA from "react-ga4";

interface usersDB {
  first_name: string;
  second_name: string;
  birth_date: string;
  shipping_address: string;
  country: string;
  payment_type: string;
}

const Profile = () => {
  useEffect(() => {
    ReactGA.set({ page: window.location.href + window.location.search });
    console.log("ga ran");
  }, [window.location.href]);

  const session = useSession();
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<string>("");
  const [avatarFile, setAvatarFile] = useState<boolean>();
  const [profileForm, setProfileForm] = useState<usersDB>({
    first_name: "",
    second_name: "",
    birth_date: "",
    shipping_address: "",
    country: "",
    payment_type: "",
  });

  const handleUploadAvatar = async (event: any) => {
    const avatarFile = event.target.files[0];

    const { data, error } = await supabase.storage
      .from("UserAvatars")
      .upload(`${session?.user.id}`, avatarFile, {
        cacheControl: "3600",
        upsert: true,
      });
    if (error) {
      setError(error.message as string);
    } else setAvatarFile(true);
    return data;
  };

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setProfileForm((prevProfileForm) => {
      return {
        ...prevProfileForm,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleProfileUpdate = async (event: FormEvent) => {
    event.preventDefault();
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", session?.user.id as string);
    setLoading(true);

    if (data && data?.length > 0) {
      console.log("users exists, run update");
      const { error } = await supabase
        .from("users")
        .update({
          first_name: profileForm.first_name,
          second_name: profileForm.second_name,
          birth_date: profileForm.birth_date,
          shipping_address: profileForm.shipping_address,
          country: profileForm.country,
          payment_type: profileForm.payment_type,
        })
        .eq("user_id", session?.user.id as string)
        .select();
      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
        setLoading(false);
      }
    } else {
      console.log("user doesn't exists, running insert");
      const { error } = await supabase
        .from("users")
        .insert({
          user_id: session?.user.id,
          first_name: profileForm.first_name,
          second_name: profileForm.second_name,
          birth_date: profileForm.birth_date,
          shipping_address: profileForm.shipping_address,
          country: profileForm.country,
          payment_type: profileForm.payment_type,
        })
        .select();
      setLoading(false);
      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    }
    setLoading(false);
  };

  return (
    <div className="profile">
      <h2>Update your profile</h2>
      <div className="profile__avatar">
        <h3>You can change your avatar</h3>

        {isError && <div style={{ color: "red" }}>{isError}</div>}
        {avatarFile && <div>Avatar Uploaded Successfully!</div>}

        <input
          name="avatar"
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleUploadAvatar}
        />
      </div>

      <form className="profile__form" onSubmit={handleProfileUpdate}>
        <h3>Update your personal details</h3>
        <input
          name="first_name"
          placeholder="First name"
          type="text"
          onChange={handleOnChange}
        />
        <input
          name="second_name"
          placeholder="Last name"
          type="text"
          onChange={handleOnChange}
        />
        <input
          name="birth_date"
          placeholder="Date of birth"
          type="date"
          onChange={handleOnChange}
        />
        <input
          name="shipping_address"
          placeholder="Shipping address"
          type="text"
          onChange={handleOnChange}
        />
        <input
          name="country"
          placeholder="Country"
          type="text"
          onChange={handleOnChange}
        />
        <h3>Update your preferred payment method</h3>
        <select name="payment_type" onChange={handleOnChange}>
          <option>Paypal</option>
          <option>Bancontact</option>
          <option>Visa</option>
        </select>
        <br></br>
        <br></br>
        <button>Update</button>
        {loading && <CircularProgress />}
      </form>
      {success && <div>Profile updated!</div>}
    </div>
  );
};

export default Profile;
