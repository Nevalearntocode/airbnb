import { create } from 'zustand';

type ModalType =
  | 'register'
  | 'login'
  | 'rent'
  | 'redirect'
  | 'confirm'
  | 'confirmGuest';

type ModalData = {
  reservationId?: string;
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
  onOpen: (type, data) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false }),
}));
