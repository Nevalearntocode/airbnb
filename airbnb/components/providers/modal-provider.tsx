'use client';

import React, { useEffect, useState } from 'react';
import RegisterModal from '../modals/register-modal';
import LoginModal from '../modals/login-modal';
import RentModal from '../modals/rent-modal';
import RedirectModal from '../modals/redirect-modal';
import ConfirmModal from '../modals/confirm-modal';
import ConfirmGuestModal from '../modals/confirm-guest-modal';
import ConfirmListingModal from '../modals/confirm-listing-modal';
import EditModal from '../modals/edit-modal';

type Props = {};

const ModalProvider = ({}: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <RegisterModal />
      <LoginModal />
      <RentModal />
      <RedirectModal />
      <ConfirmModal />
      <ConfirmGuestModal />
      <ConfirmListingModal />
      <EditModal />
    </>
  );
};

export default ModalProvider;
