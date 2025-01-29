import ProfileIcon from "./ProfileIcon";
import ProfileNav from "./ProfileNav";

const Profile = () => {
  return (
    <div className="flex items-center h-full relative min-w-[8rem] mr-auto lg:mr-0">
      <ProfileIcon />
      <ProfileNav />
    </div>
  );
};

export default Profile;
