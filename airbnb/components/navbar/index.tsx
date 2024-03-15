import React from "react";
import Container from "../container";
import Logo from "./logo";
import Search from "./search";
import UserMenu from "./user-menu";
import { Profile } from "@prisma/client";

type Props = {
  profile: Profile | null;
};

const Navbar = ({ profile }: Props) => {
  return (
    <div className="fixed w-full bg-white dark:bg-black z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu profile={profile} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
