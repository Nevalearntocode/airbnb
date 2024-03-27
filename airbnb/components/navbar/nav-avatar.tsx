"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";

type Props = {
  imageUrl?: string | null;
};

const NavAvatar = ({ imageUrl }: Props) => {
  return (
    <Avatar className="">
      {imageUrl && <AvatarImage src={imageUrl} className="" />}
      <AvatarFallback className="">
        <Image
          className="rounded-full"
          height={30}
          width={30}
          alt="avatar"
          src={`/images/placeholder.jpg`}
        />
      </AvatarFallback>
    </Avatar>
  );
};

export default NavAvatar;
