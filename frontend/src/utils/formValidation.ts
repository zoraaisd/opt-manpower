export const NAME_MAX_LENGTH = 30;
export const PHONE_LENGTH = 10;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const collapseSpaces = (value: string) => value.replace(/\s{2,}/g, ' ');

export const sanitizeText = (value: string) => collapseSpaces(value);

export const sanitizeName = (value: string) =>
  collapseSpaces(value.replace(/[^A-Za-z\s]/g, '')).slice(0, NAME_MAX_LENGTH);

export const sanitizeEmail = (value: string) => value.replace(/\s+/g, '').toLowerCase();

export const sanitizeDigits = (value: string, maxLength: number = PHONE_LENGTH) =>
  value.replace(/\D/g, '').slice(0, maxLength);

export const hasMultipleSpaces = (value: string) => /\s{2,}/.test(value);

export const isValidName = (value: string) => {
  const trimmedValue = value.trim();
  return (
    trimmedValue.length > 0 &&
    trimmedValue.length <= NAME_MAX_LENGTH &&
    /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(trimmedValue)
  );
};

export const isValidEmail = (value: string) => {
  const normalizedValue = sanitizeEmail(value);
  return normalizedValue.length > 0 && EMAIL_PATTERN.test(normalizedValue);
};

export const isValidPhone = (value: string) => sanitizeDigits(value).length === PHONE_LENGTH;
