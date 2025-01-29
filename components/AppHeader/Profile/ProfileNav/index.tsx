"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ProfileMenu from "./ProfileMenu";
import { useAuth } from "@/hooks/useAuth";

const ProfileNav = () => {
  const [isOpen, setIsOpened] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="pl-3">
      <button
        aria-haspopup="menu"
        aria-expanded="false"
        aria-controls="profile-menu"
        className="leading-none m-w-[12rem] flex items-center group"
        onClick={() => setIsOpened((prev) => !prev)}
      >
        <span className="max-w-[3rem] sm:max-w-[12.5rem] text-ellipsis overflow-hidden mr-1 pb-0.5 text-foreground group-hover:text-primary">
          {user?.name || user?.email}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 text-foreground ${
            isOpen ? "rotate-180" : ""
          } group-hover:text-primary`}
        />
      </button>
      <ProfileMenu shown={isOpen} />
    </nav>
  );
};

export default ProfileNav;
