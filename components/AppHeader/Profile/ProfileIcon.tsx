"use client";
import React from "react";
import { User2 } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

const ProfileIcon = () => {
  const { user } = useAuth();

  return (
    <>
      {user?.image ? (
        <Image
          src={user.image}
          alt="profile"
          className="h-8 w-8 rounded-full"
        />
      ) : (
        <div className="h-8 w-8 rounded-full bg-foreground flex items-center justify-center">
          <User2 className="text-accent" />
        </div>
      )}
    </>
  );
};

export default ProfileIcon;
