import {
  handleSetMessage,
  handleSetErrorBtn,
  handleSetIsErrorPopupActive,
  handleSetIsConfirmPopupActive,
  handleSetConfirmBtn,
  handleSetCancelBtn,
} from 'middlewares/reduxToolkits/commonSlice';
import { Dispatch } from 'react';
import { AnyAction } from 'redux';

/**
 * 11자리 임의의 문자열 반환 함수
 * @returns {string}
 */
export function handleRandomString(): string {
  return Math.random().toString(36).slice(2, 13);
}

/**
 * YYYY-MM-DD HH:mm:SS 형식 시간 반환 함수
 * @param {string} timestamp
 * @param {string} type
 * @returns {string}
 */
export function handleConvertTimestamp(
  timestamp: string,
  type: string,
): string {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return type === 'all'
    ? `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    : type === 'date'
    ? `${year}-${month}-${day}`
    : `${hours}:${minutes}:${seconds}`;
}

export function handleSetConfirmPopup(
  dispatch: Dispatch<AnyAction>,
  message: string,
  confirmCb: () => any,
  cancelCb?: () => any,
) {
  dispatch(handleSetMessage({ message }));
  dispatch(handleSetIsConfirmPopupActive({ isConfirmPopupActive: true }));
  dispatch(
    handleSetConfirmBtn({
      callback: () => {
        dispatch(
          handleSetIsConfirmPopupActive({ isConfirmPopupActive: false }),
        );
        dispatch(handleSetMessage({ message: '' }));
        confirmCb();
      },
    }),
  );
  dispatch(
    handleSetCancelBtn({
      callback: () => {
        dispatch(
          handleSetIsConfirmPopupActive({ isConfirmPopupActive: false }),
        );
        dispatch(handleSetMessage({ message: '' }));
        cancelCb?.();
      },
    }),
  );
}

/**
 * catch 절 처리 모듈
 * @param {Dispatch<AnyAction>} dispatch 함수형 컴포넌트에서만 선언이 가능하여 파라미터로 전달받음. store action을 일으키기 위해 필요
 * @param {any} error 에러 객체
 * @param {function} cb 에러팝입 확인 버튼 추가 콜백함수
 */
export function handleSetCatchClause(
  dispatch: Dispatch<AnyAction>,
  error: any,
  cb?: () => void,
) {
  dispatch(handleSetMessage({ message: error.message }));
  dispatch(handleSetIsErrorPopupActive({ isErrorPopupActive: true }));
  dispatch(
    handleSetErrorBtn({
      callback: () => {
        dispatch(handleSetIsErrorPopupActive({ isErrorPopupActive: false }));
        dispatch(handleSetMessage({ message: '' }));
        cb?.();
      },
    }),
  );
}
