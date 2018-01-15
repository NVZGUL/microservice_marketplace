export const IS_AUTH = 'IS_AUTH';

export function setAuth(text) {
  return {
    type: IS_AUTH,
    payload: text
  }
}