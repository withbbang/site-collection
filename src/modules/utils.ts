import { SHA256 } from 'crypto-js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  handleSetMessage,
  handleSetErrorBtn,
  handleSetIsErrorPopupActive,
} from 'middlewares/reduxToolkits/commonSlice';
import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { auth } from './configs';

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

/**
 * SHA256 암호화 함수
 * @param {string} value 암호화할 값
 * @returns
 */
export function handleEncryptValue(value: string) {
  try {
    return SHA256(value).toString();
  } catch (error) {
    console.error(error);
    throw Error('Value Encrypting Error');
  }
}

/**
 * 문자열 첫번째 글자만 대문자로 변환시키는 함수
 * @param {string} value 변환될 값
 * @returns {string} 변환된 값
 */
export function handleSetUpperCaseFirstCharacter(value: string): string {
  return value.replace(/^[a-z]/, (char) => char.toUpperCase());
}

/**
 * 회원가입 함수
 * @param {string} email 유저 이메일
 * @param {string} encryptedPassword 유저 암호화된 비밀번호
 * @returns
 */
export async function handleCreateUserWithEmailAndPassword(
  email: string,
  encryptedPassword: string,
) {
  try {
    return await createUserWithEmailAndPassword(auth, email, encryptedPassword);
  } catch (error: any) {
    console.error('error');
    throw Error(error.message);
  }
}

/**
 * 로그인 함수
 * @param {string} email 유저 이메일
 * @param {string} encryptedPassword 유저 암호화된 비밀번호
 * @returns
 */
export async function handleSignInWithEmailAndPassword(
  email: string,
  encryptedPassword: string,
) {
  try {
    return await signInWithEmailAndPassword(auth, email, encryptedPassword);
  } catch (error: any) {
    console.error(error);
    throw Error(error.message);
  }
}

/**
 * 이해 등급 반환 함수
 * @param {number | string} degree 이해 등급
 * @returns {string}
 */
export function handleReturnDegree(degree: number | string): string {
  switch (degree) {
    case 0:
    case '0':
      return 'Mastery';
    case 5:
    case '5':
      return 'Expert';
    case 10:
    case '10':
      return 'Advanced';
    case 15:
    case '15':
      return 'Intermediate';
    default:
      return 'Basic';
  }
}
