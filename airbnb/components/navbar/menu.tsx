"use client";

import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import NavAvatar from "./nav-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Profile } from "@prisma/client";

type Props = {
  profile: Profile | null;
};

const Menu = ({ profile }: Props) => {
  const { onOpen } = useModal();

  const onLogOut = () => {
    signOut();
  };

  return (
    <>
      {!profile ? (
        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition dark:border-none"
          onClick={() => onOpen("login")}
        >
          <div className="hidden md:block">
            <NavAvatar />
          </div>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition dark:border-none dark:hover:bg-neutral-800"
              onClick={() => onOpen("login")}
            >
              <div className="hidden md:block">
                <NavAvatar imageUrl={profile.image} />
              </div>
              <AiOutlineMenu />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="center">
            <DropdownMenuItem
              onClick={() => {}}
              className="w-auto items-center justify-between flex"
            >
              My trips
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {}}
              className="w-auto items-center justify-between flex"
            >
              My favorites
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {}}
              className="w-auto items-center justify-between flex"
            >
              My reservations
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {}}
              className="w-auto items-center justify-between flex"
            >
              My properties
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onOpen("rent")}
              className="w-auto items-center justify-between flex"
            >
              Airbnb my home
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onLogOut}
              className="w-auto items-center justify-between flex text-rose-400"
            >
              Log Out
              <LogOut className="w-4 h-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default Menu;
