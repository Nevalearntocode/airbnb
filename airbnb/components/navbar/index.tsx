'use client';

import React from 'react';
import Container from '../container';
import Logo from './logo';
import UserMenu from './user-menu';
import { Listing, Profile } from '@prisma/client';
import Categories from './categories';
// import CommandSearch from './command-search';
import Search from './search';
import { useModal } from '@/hooks/use-modal-store';

type Props = {
  profile: Profile | null;
  // listings: Listing[]
};

const Navbar = ({ profile }: Props) => {
  const { onOpen } = useModal();

  return (
    <div className="z-10 w-full bg-white shadow-sm dark:bg-black">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            {/* <CommandSearch listings={listings} /> */}
            <Search onClick={() => onOpen('search')} />
            <UserMenu profile={profile} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
