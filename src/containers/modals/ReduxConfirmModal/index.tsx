import React, { FunctionComponent } from 'react';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

import { closeModal, confirmModalSelector } from '@redux/modal.redux';
import { CONFIRMATION_MODAL } from '@constants/modals.constants';
import { AppState } from '@components/Store';
import styles from '../ConfirmModal/modal.module.scss';

const ReduxConfirmModal: FunctionComponent = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: AppState) => confirmModalSelector(state, CONFIRMATION_MODAL));

  const handleConfirmationSuccess = (): null => null;

  const handleConfirmationFailure = (): null => null;

  return (
    <ReactModal
      isOpen={isOpen}
      className={styles.content}
      overlayClassName={styles.overlay}
    >
      <button
        className={styles.close}
        onClick={() => {
          dispatch(closeModal({ type: CONFIRMATION_MODAL }));
        }}
      >close
      </button>
      <h6 className={styles.question}>Are you sure bla bla bla?</h6>
      <div className={styles.actions}>
        <button
          className={styles.actionSuccess}
          onClick={() => {
            handleConfirmationSuccess();
            dispatch(closeModal({ type: CONFIRMATION_MODAL }));
          }}
        >Yes
        </button>
        <button
          className={styles.actionFailure}
          onClick={() => {
            handleConfirmationFailure();
            dispatch(closeModal({ type: CONFIRMATION_MODAL }));
          }}
        >No
        </button>
      </div>
    </ReactModal>
  );
};

export default ReduxConfirmModal;
