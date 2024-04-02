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

const ConfirmListingModal = (props: Props) => {
  const { isOpen, type, onClose, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === 'confirmListing';
  const onDelete = async () => {
    try {
      await axios.delete(`/api/listings/${data.listingSlug}`);
      router.refresh();
      toast.success('Listing deleted');
      onClose();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>Delete property.</DialogHeader>
        <DialogDescription className="text-center">
          If you delete this property, all reservations will also be deleted.
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
          <Button className="w-full" onClick={() => onDelete()}>
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmListingModal;
