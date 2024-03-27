import React from "react";
import Container from "../container";
import Logo from "./logo";
import Search from "./search";
import UserMenu from "./user-menu";
import { Profile } from "@prisma/client";
import Categories from "./categories";

type Props = {
  profile: Profile | null;
};

const Navbar = ({ profile }: Props) => {
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm dark:bg-black">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu profile={profile} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
