"use client";

import React, { useEffect, useState } from "react";
import RegisterModal from "../modals/register-modal";
import LoginModal from "../modals/login-modal";

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
    </>
  );
};

export default ModalProvider;