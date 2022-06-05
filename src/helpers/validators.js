// --required--//
const isRequired = value => value.length === 0;

// // --  maxlength--//
// const isMaxLength = (value, len) => value.length > len;

// // --  minlength--//
// const isMinLength = (value, len) => value.length < len;

const definedValidations = {
  req: {
    msg: "Required",
    validator: isRequired
  }
};

export default definedValidations;
