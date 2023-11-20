import React from 'react';
import { PropState } from 'middlewares/configureReducer';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { connect } from 'react-redux';
import { Action } from 'redux';
import styles from './ConfirmPopup.module.scss';

function mapStateToProps(state: PropState): CommonState {
  return {
    ...state.common,
  };
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {};
}

function ConfirmPopup({
  isConfirmPopupActive,
  message,
  handleConfirmBtn,
  handleCancelBtn,
}: CommonState): React.JSX.Element {
  return (
    <div
      className={
        isConfirmPopupActive !== undefined && isConfirmPopupActive
          ? styles.background
          : [styles.background, styles.none].join(' ')
      }
    >
      <div className={styles.modalBody}>
        <span>{message}</span>
        <div>
          <button onClick={handleCancelBtn}>Cancel</button>
          <button onClick={handleConfirmBtn}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPopup);
