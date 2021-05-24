import React, { MouseEventHandler, FunctionComponent } from 'react';
import ReactModal from 'react-modal';
import ReactDOM from 'react-dom';
import styles from './modal.module.scss';

type Props = {
  text: string,
  handleSuccess: MouseEventHandler,
  handleFailure: MouseEventHandler,
  dispose: () => void,
}

const ConfirmModal: FunctionComponent<Props> = ({
  text, handleSuccess, handleFailure, dispose,
}: Props) => (
  <ReactModal
    isOpen
    className={styles.content}
    overlayClassName={styles.overlay}
  >
    <button className={styles.close} onClick={dispose}>close</button>
    <h6 className={styles.question}>{text}</h6>
    <div className={styles.actions}>
      <button
        className={styles.actionSuccess}
        onClick={(e) => {
          handleSuccess(e);
          dispose();
        }}
      >Yes
      </button>
      <button
        className={styles.actionFailure}
        onClick={(e) => {
          handleFailure(e);
          dispose();
        }}
      >No
      </button>
    </div>
  </ReactModal>
);
export const confirmModal = (text: string, handleSuccess: MouseEventHandler, handleFailure: MouseEventHandler): void => {
  const wrapper = document.body.appendChild(document.createElement('div'));
  const dispose = () => {
    ReactDOM.unmountComponentAtNode(wrapper);
    if (document.body.contains(wrapper)) {
      document.body.removeChild(wrapper);
    }
  };
  ReactDOM.render(
    <ConfirmModal
      text={text}
      handleSuccess={handleSuccess}
      handleFailure={handleFailure}
      dispose={dispose}
    />,
    wrapper,
  );
};
