import { AUTH_TEXT } from 'constants/text';

export function required(value) {
  if (!value) return AUTH_TEXT.required;

  return null;
}

export function minLength(min) {
  return function(value) {
    if (value.length < min) return AUTH_TEXT.minLengthError.replace('$NUMBER', min);

    return null;
  };
}

export function maxLength(max) {
  return function(value) {
    if (value.length > max) return AUTH_TEXT.maxLengthError.replace('$NUMBER', max);

    return null;
  };
}
