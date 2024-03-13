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
import { User } from "next-auth";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

type Props = {
  user: User | null;
};

const Menu = ({ user }: Props) => {
  const { onOpen } = useModal();

  const onLogOut = () => {
    signOut();
  };

  return (
    <>
      {!user ? (
        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
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
              className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
              onClick={() => onOpen("login")}
            >
              <AiOutlineMenu />
              <div className="hidden md:block">
                <NavAvatar imageUrl={user.image} />
              </div>
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
              onClick={() => {}}
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
