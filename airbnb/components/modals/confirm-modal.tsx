'use client';

import { useModal } from '@/hooks/use-modal-store';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import axios from 'axios';

type Props = {};

const ConfirmModal = (props: Props) => {
  const { isOpen, type, onClose, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === 'confirm';
  const onCancel = async (type: 'guest' | 'own') => {
    try {
      await axios.patch(`/api/reservations/${data.reservationId}`, { type });
      router.refresh();
      toast.success('Reservation cancelled!');
      onClose();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>Cancel reservation.</DialogHeader>
        <DialogDescription className="text-center">
          If you cancel this reservation, it might be taken by other people.
        </DialogDescription>
        <div className="flex w-full items-center justify-between gap-x-4">
          <Button
            variant={'destructive'}
            className="w-full"
            onClick={() => {
              router.push(`/`);
              onClose();
            }}
          >
            Return to homepage
          </Button>
          <Button className="w-full" onClick={() => onCancel('own')}>
            Proceed to cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
