import ProfileIcon from "./ProfileIcon";
import ProfileNav from "./ProfileNav";

const Profile = () => {
  return (
    <div className="flex items-center h-full relative min-w-[8rem]">
      <ProfileIcon />
      <ProfileNav />
    </div>
  );
};

export default Profile;
