import React from "react";
import Container from "../container";
import Logo from "./logo";
import Search from "./search";
import UserMenu from "./user-menu";
import { User } from "@prisma/client";

type Props = {
  user: User | null;
};

const Navbar = ({ user }: Props) => {
  return (
    <div className="fixed w-full bg-white dark:bg-black z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu user={user} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
