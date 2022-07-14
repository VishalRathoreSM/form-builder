export const validateHelper = {
  isEmail: value => {
    const res = value
      .toString()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    return res !== null;
  },
  isUrl: value => {
    const res = value
      .toString()
      .match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return res !== null;
  },
  isNumber: value => {
    const res = value.toString().match(/\D/);
    return res === null;
  },
  isEmpty: value => value.toString().trim() === "",
  isLength: (value, len) => !!(value && value.toString().length === len),
  isMinLength: (value, len) => !!(value && value.toString().length >= len),
  isMaxLength: (value, len) => !!(value && value.toString().length <= len),
  isAlpha: value => {
    const res = value.toString().match(/^\W/);
    return res === null;
  },
  isReq: value => !!(value !== undefined && value !== null && value !== ""),
  isEqual: (value, comparisonValue) => !!value && value === comparisonValue
};

const { isAlpha, isEmail, isEmpty, isEqual, isLength, isMaxLength, isMinLength, isNumber, isReq, isUrl } =
  validateHelper;

const definedValidations = {
  req: {
    msg: "Required",
    validator: isReq
  },
  alpha: {
    msg: "Should be Alphanumeric",
    validator: isAlpha
  },
  email: {
    msg: "Invalid Email",
    validator: isEmail
  },
  url: {
    msg: "Invalid Url",
    validator: isUrl
  },
  empty: {
    msg: "Should be Alphanumeric",
    validator: isEmpty
  },
  equal: {
    msg: value => `Should be equal to ${value}`,
    validator: isEqual
  },
  minLen: {
    msg: value => `Should be atleast ${value} characters long`,
    validator: isMinLength
  },
  maxLen: {
    msg: value => `can be max ${value} characters long`,
    validator: isMaxLength
  },
  len: {
    msg: value => `Should be ${value} characters long`,
    validator: isLength
  },
  num: {
    msg: "Should be a number",
    validator: isNumber
  }
};

export default definedValidations;
