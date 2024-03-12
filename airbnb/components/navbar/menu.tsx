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

type Props = {};

const Menu = (props: Props) => {
  const { onOpen } = useModal();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={() => {}}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <NavAvatar />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        <DropdownMenuItem onClick={() => onOpen("login")}>
          Log In
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onOpen("register")}>
          Sign Up
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
