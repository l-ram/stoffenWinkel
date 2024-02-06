const Profile = () => {
  return (
    <div>
      <form>
        <input placeholder="Avatar" type="file" />
        <input placeholder="First name" type="text" />
        <input placeholder="Last name" type="text" />
        <input placeholder="Date of birth" type="date" />
        <input placeholder="Shipping address" type="text" />
        <input placeholder="Country" type="text" />
        <input placeholder="Payment type" type="text" />
      </form>
    </div>
  );
};

export default Profile;
