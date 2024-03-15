"use client";

import React from "react";
import Menu from "./menu";
import { Profile } from "@prisma/client";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal-store";

type Props = {
  profile: Profile | null;
};

const UserMenu = ({ profile }: Props) => {
  const { onOpen } = useModal();

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <Button
          variant={"outline"}
          onClick={() => onOpen("rent")}
          className="rounded-full"
        >
          Airbnb your home
        </Button>
        <Menu profile={profile} />
      </div>
    </div>
  );
};

export default UserMenu;
