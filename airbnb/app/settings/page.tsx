import React from "react";
import { auth } from "../api/auth/[...nextauth]/options";
import { getCurrentProfile } from "@/lib/current-profile";

type Props = {};

const SettingsPage = async (props: Props) => {
  const profile = await getCurrentProfile();

  return (
    <div className="flex items-center justify-center h-screen w-full">
      {JSON.stringify(profile)}
    </div>
  );
};

export default SettingsPage;
