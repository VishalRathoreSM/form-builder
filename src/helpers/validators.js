const DEFAULT_EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const DEFAULT_URL_PATTERN =
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

const NON_ALPHA_NUMERIC_PATTERN = /\W/;

export const validateHelper = {
  isEmail: value => Boolean(value?.toString().match(DEFAULT_EMAIL_PATTERN)),
  isUrl: value => Boolean(value?.toString().match(DEFAULT_URL_PATTERN)),
  isNumber: value => !isNaN(Number(value)),
  isEmpty: value => typeof value == "undefined" || value?.toString().trim() === "",
  hasEqualLength: (value, len) => Boolean(value?.toString().length === len),
  hasMinLength: (value, len) => Boolean(value?.toString().length >= len),
  hasMaxLength: (value, len) => Boolean(value?.toString().length <= len),
  isAlphaNumeric: value => {
    const res = value?.toString().match(NON_ALPHA_NUMERIC_PATTERN);
    return typeof res !== "undefined" && res == null;
  },
  isReq: value => Boolean(value !== undefined && value !== null && value !== ""),
  isEqual: (value, comparisonValue) => !!value && value === comparisonValue
};

const {
  isAlphaNumeric,
  isEmail,
  isEmpty,
  isEqual,
  hasEqualLength,
  hasMaxLength,
  hasMinLength,
  isNumber,
  isReq,
  isUrl
} = validateHelper;

const definedValidations = {
  req: {
    getMsg: () => "Required",
    validator: isReq
  },
  alpha: {
    getMsg: () => "Should be Alphanumeric",
    validator: isAlphaNumeric
  },
  email: {
    getMsg: () => "Invalid Email",
    validator: isEmail
  },
  url: {
    getMsg: () => "Invalid Url",
    validator: isUrl
  },
  empty: {
    getMsg: () => "Should be Alphanumeric",
    validator: isEmpty
  },
  equal: {
    getMsg: value => `Should be equal to ${value}`,
    validator: isEqual
  },
  minLen: {
    getMsg: value => `Should be atleast ${value} characters long`,
    validator: hasMinLength
  },
  maxLen: {
    getMsg: value => `Can be max ${value} characters long`,
    validator: hasMaxLength
  },
  len: {
    getMsg: value => `Should be ${value} characters long`,
    validator: hasEqualLength
  },
  num: {
    getMsg: () => "Should be a number",
    validator: isNumber
  }
};

export default definedValidations;
