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
          className="flex cursor-pointer items-center gap-3 rounded-full border-[2px] border-neutral-200 transition hover:shadow-md dark:border-neutral-800 dark:hover:bg-neutral-800 dark:hover:shadow-md dark:hover:shadow-neutral-200/20 md:p-4 md:px-2 md:py-1"
          onClick={() => onOpen("login")}
        >
          <div className="">
            <NavAvatar />
          </div>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className="flex cursor-pointer items-center gap-3 rounded-full border-[2px] border-neutral-200 p-4 transition hover:shadow-md dark:border-neutral-800 dark:hover:bg-neutral-800 md:px-2 md:py-1"
              onClick={() => onOpen("login")}
            >
              <AiOutlineMenu />
              <div className="hidden md:block">
                <NavAvatar imageUrl={profile.image} />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end">
            <DropdownMenuItem
              onClick={() => {}}
              className="flex w-auto items-center justify-between"
            >
              My trips
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {}}
              className="flex w-auto items-center justify-between"
            >
              My favorites
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {}}
              className="flex w-auto items-center justify-between"
            >
              My reservations
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {}}
              className="flex w-auto items-center justify-between"
            >
              My properties
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onOpen("rent")}
              className="flex w-auto items-center justify-between"
            >
              Airbnb your home
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onLogOut}
              className="flex w-auto items-center justify-between text-rose-400"
            >
              Log Out
              <LogOut className="h-4 w-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default Menu;
