import { Listing } from '@prisma/client';
import { create } from 'zustand';

type ModalType =
  | 'register'
  | 'login'
  | 'rent'
  | 'redirect'
  | 'confirm'
  | 'confirmGuest'
  | 'confirmListing'
  | 'edit';

type ModalData = {
  reservationId?: string;
  listingSlug?: string;
  listing?: Listing;
};

type ModalStore = {
  data: ModalData;
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
};

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false }),
}));
