"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";

type Props = {
  imageUrl?: string;
};

const NavAvatar = ({ imageUrl }: Props) => {
  return (
    <Avatar>
      <AvatarImage src={imageUrl} />
      <AvatarFallback>
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
