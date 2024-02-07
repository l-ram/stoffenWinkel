import { FormEvent, useState } from "react";
import { supabase } from "../config/supabase.config";
import { useSession } from "../context/SessionContext";

interface usersDB {
  first_name: string;
  second_name: string;
  birth_date: string;
  shipping_address: string;
  country: string;
  payment_type: string;
}

const Profile = () => {
  const session = useSession();

  const [profileForm, setProfileForm] = useState<usersDB>({
    first_name: "",
    second_name: "",
    birth_date: "",
    shipping_address: "",
    country: "",
    payment_type: "",
  });

  console.log(profileForm);
  const handleUploadAvatar = async (event: any) => {
    const avatarFile = event.target.files[0];

    const { data, error } = await supabase.storage
      .from("UserAvatars")
      .upload(`${session?.user.id}`, avatarFile, {
        cacheControl: "3600",
        upsert: true,
      });
    if (error) {
      alert(error.message);
    } else alert("File uploaded!");
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

    const { data } = await supabase.from("users").select();

    console.log("Check if row exists:", data);

    if (data.length < 1) {
      console.log("doesn't exist, running insert");
      const { data, error } = await supabase
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
      console.log(data);
      if (error) {
        alert(error.message);
      } else {
        alert("Profile updated!");
      }
    } else {
      const { data, error } = await supabase
        .from("users")
        .update({
          first_name: profileForm.first_name,
          second_name: profileForm.second_name,
          birth_date: profileForm.birth_date,
          shipping_address: profileForm.shipping_address,
          country: profileForm.country,
          payment_type: profileForm.payment_type,
        })
        .eq("user_id", session?.user.id)
        .select();
      console.log(data);
      if (error) {
        alert(error.message);
      } else {
        alert("Profile updated!");
      }
    }
  };

  return (
    <div>
      <h2>Update your profile</h2>

      <h3>You can change your avatar</h3>
      <input
        name="avatar"
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleUploadAvatar}
      />

      <form onSubmit={handleProfileUpdate}>
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
      </form>
    </div>
  );
};

export default Profile;
