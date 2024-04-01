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

type Props = {};

const RedirectModal = (props: Props) => {
  const { isOpen, type, onClose } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === 'redirect';

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>You have successfully reserved this place.</DialogHeader>
        <DialogDescription className="text-center">
          Proceed to go to your trips or return to homepage
        </DialogDescription>
        <div className="flex w-full items-center justify-between gap-x-4">
          <Button
            variant={`outline`}
            className="w-full"
            onClick={() => {
              router.push(`/`);
              onClose();
            }}
          >
            Return to home page
          </Button>
          <Button
            variant={'destructive'}
            className="w-full"
            onClick={() => {
              router.push(`/trips`);
              onClose();
            }}
          >
            Proceed to trips
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RedirectModal;
