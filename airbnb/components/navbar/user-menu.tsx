'use client';

import React from 'react';
import Menu from './menu';
import { Profile } from '@prisma/client';
import { Button } from '../ui/button';
import { useModal } from '@/hooks/use-modal-store';
import { toast } from 'sonner';

type Props = {
  profile: Profile | null;
};

const UserMenu = ({ profile }: Props) => {
  const { onOpen } = useModal();

  return (
    <div className="relative">
      <div className="flex  items-center gap-3">
        <Button
          variant={'outline'}
          onClick={() => {
            if (!profile) {
              onOpen('login');
              toast.info("Login to Airbnb your home.")
            } else {
              onOpen('rent');
            }
          }}
          className="rounded-full text-black dark:text-white"
        >
          Airbnb your home
        </Button>
        <Menu profile={profile} />
      </div>
    </div>
  );
};

export default UserMenu;
