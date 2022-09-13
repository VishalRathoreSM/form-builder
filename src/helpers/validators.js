const DEFAULT_EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const DEFAULT_URL_PATTERN =
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

const DEFAULT_NUMBER_PATTERN = /\D/;

export const validateHelper = {
  isEmail: value => {
    const res = value.toString().match(DEFAULT_EMAIL_PATTERN);
    return res !== null;
  },
  isUrl: value => {
    const res = value.toString().match(DEFAULT_URL_PATTERN);
    return res !== null;
  },
  isNumber: value => {
    const res = value.toString().match(DEFAULT_NUMBER_PATTERN);
    return res === null;
  },
  isEmpty: value => value == "undefined" || value.toString().trim() === "",
  hasEqualLength: (value, len) => Boolean(value?.toString().length === len),
  hasMinLength: (value, len) => Boolean(value?.toString().length >= len),
  hasMaxLength: (value, len) => Boolean(value?.toString().length <= len),
  isAlpha: value => {
    const res = value.toString().match(/^\W/);
    return res !== null;
  },
  isReq: value => Boolean(value !== undefined && value !== null && value !== ""),
  isEqual: (value, comparisonValue) => !!value && value === comparisonValue
};

const { isAlpha, isEmail, isEmpty, isEqual, hasEqualLength, hasMaxLength, hasMinLength, isNumber, isReq, isUrl } =
  validateHelper;

const definedValidations = {
  req: {
    getMsg: () => "Required",
    validator: isReq
  },
  alpha: {
    getMsg: () => "Should be Alphanumeric",
    validator: isAlpha
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
