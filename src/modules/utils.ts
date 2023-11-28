import { SHA256 } from 'crypto-js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './configs';
import { TypeKeyValueForm } from './types';

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
 * DB에 저장돼있는 value(grade, category) 값을 설명으로 변환하는 함수
 * @param {string | undefined} value 설명에 해당하는 값
 * @param {Array<any> | undefined} collection 설명과 값이 함께 들어있는 배열
 * @returns {string} 설명 반환
 */
export function handleRetrunCorrespondingDescription(
  value?: number,
  collection?: Array<any>,
): string {
  let data = '';
  let realKey;

  collection?.some((item) => {
    const keysArray = Object.keys(item);

    const fakeKey = keysArray.filter(
      (key) => `${item[key]}` === `${value}`,
    )?.[0];

    if (fakeKey) {
      [realKey] = keysArray.filter((key) => key !== fakeKey);
      data = item[realKey];
      return true;
    } else {
      return false;
    }
  });

  return data;
}

/**
 * 단일 데이터 공통 유효성 검사 하는 함수
 * @param {any} data 유효성 검사할 값
 * @returns {boolean} 유효성 검사 성공: true / 유효성 검사 실패: false
 */
export function handleCheckValidData(data: any): boolean {
  switch (data) {
    case '':
    case null:
    case undefined:
    case {}:
      return false;
    default:
      return true;
  }
}

/**
 * API 요청 전 유효성 검사 하는 함수
 * @param {TypeKeyValueForm} data 유효성 검사할 객체
 */
export function handleCheckValidForm(data: TypeKeyValueForm) {
  const keysArray = Object.keys(data);
  const valuesArray = Object.values(data);

  const index = valuesArray.findIndex((value) => !handleCheckValidData(value));

  if (index > -1)
    throw Error(
      `Empty ${handleSetUpperCaseFirstCharacter(keysArray[index])} Field`,
    );
}

/**
 * 객체 내 값 중 문자열 trim해서 반환해주는 함수
 * @param {any} params 변환될 객체
 * @returns {TypeKeyValueForm} 변환된 객체
 */
export function handleTrimData(params: any): TypeKeyValueForm {
  const parameters: TypeKeyValueForm = {};

  Object.entries(params).forEach(([key, value]) => {
    const val = value as string | number;
    parameters[key] = typeof val === 'string' ? val.trim() : val;
  });

  return parameters;
}
