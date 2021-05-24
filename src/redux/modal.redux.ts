import {
  createSelector,
  createSlice, SliceCaseReducers,
} from '@reduxjs/toolkit';
import { CONFIRMATION_MODAL } from '@constants/modals.constants';

export type ModalState = {
  [key: string]: boolean;
};

const initialState: ModalState = {
  [CONFIRMATION_MODAL]: false,
};

export const modalSlice = createSlice<ModalState, SliceCaseReducers<ModalState>>({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state: ModalState, action) {
      state[action.payload.type] = true;
    },
    closeModal(state: ModalState, action) {
      state[action.payload.type] = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const confirmModalSelector = createSelector<{ modal: ModalState }, string, ModalState, string, boolean>(
  (state) => state.modal,
  (_, type: string) => type,
  (modal, type) => modal[type],
);
