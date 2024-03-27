"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {};

const Logo = (props: Props) => {
  const router = useRouter();

  return (
    <Image
      alt="logo"
      className="hidden h-auto w-auto cursor-pointer md:block"
      height={100}
      width={100}
      src={`/images/logo.png`}
      priority={true}
      onClick={() => router.push(`/`)}
    />
  );
};

export default Logo;
