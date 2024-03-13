"use client";

import React from "react";
import Menu from "./menu";
import { User } from "@prisma/client";

type Props = {
  user: User | null;
};

const UserMenu = ({ user }: Props) => {
  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={() => {}}
        >
          Airbnb your home
        </div>
        <Menu user={user} />
      </div>
    </div>
  );
};

export default UserMenu;
