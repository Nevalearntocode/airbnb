"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useModal } from "@/hooks/use-modal-store";

type Props = {};

const RentModal = ({}: Props) => {
  const { isOpen, onClose, type, onOpen } = useModal();

  const isModalOpen = type === "rent" && isOpen;

  const onSubmit = () => {};

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle>Airbnb your home</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RentModal;
