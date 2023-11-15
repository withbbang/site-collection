import React, { useEffect, useRef } from 'react';
import { PropState } from 'middlewares/configureReducer';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { connect } from 'react-redux';
import { Action } from 'redux';
import styles from './ErrorPopup.module.scss';

function mapStateToProps(state: PropState): CommonState {
  return {
    ...state.common,
  };
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {};
}

function ErrorPopup({
  isErrorPopupActive,
  message,
  handleErrorBtn,
}: CommonState): React.JSX.Element {
  const buttonRef = useRef(
    null,
  ) as React.MutableRefObject<HTMLButtonElement | null>;

  // FIXME: 로그인 필드에서 엔터 누르면 에러 팝업이 바로 꺼진다.
  // useEffect(() => {
  //   buttonRef.current?.focus();
  // }, [isErrorPopupActive]);

  return (
    <div
      className={
        isErrorPopupActive !== undefined && isErrorPopupActive
          ? styles.background
          : [styles.background, styles.none].join(' ')
      }
    >
      <div className={styles.modalBody}>
        <span>{message}</span>
        <div>
          <button onClick={handleErrorBtn} ref={buttonRef}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPopup);
