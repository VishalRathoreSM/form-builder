const CHANGE_FIELD_VALUE = "CHANGE_FIELD_VALUE";
const CHANGE_FIELD_ERROR = "CHANGE_FIELD_ERROR";
const CHANGE_FIELD_TOUCHED = "CHANGE_FIELD_TOUCHED";
const CHANGE_IS_TOUCHED = "CHANGE_IS_TOUCHED";
const CHANGE_ERRORS = "CHANGE_ERRORS";
const RESET = "RESET";

export const getInitialState = fields => {
  const initialValues = {};
  Object.values(fields).forEach(({ id, value }) => {
    initialValues[id] = value;
  });

  return { values: initialValues, isTouched: {}, errors: {} };
};

const reducer = (state, { type, payload }) => {
  const { value, id } = payload || {};
  switch (type) {
    case CHANGE_FIELD_VALUE:
      return { ...state, values: { ...state.values, [id]: value } };
    case CHANGE_FIELD_ERROR:
      return { ...state, errors: { ...state.errors, [id]: value } };
    case CHANGE_FIELD_TOUCHED:
      return { ...state, isTouched: { ...state.isTouched, [id]: value } };
    case CHANGE_IS_TOUCHED:
      return { ...state, isTouched: payload };
    case CHANGE_ERRORS:
      return { ...state, errors: payload };
    case RESET:
      return getInitialState(payload);
  }
};

export const changeFieldValue = (id, value) => {
  return { type: CHANGE_FIELD_VALUE, payload: { id, value } };
};

export const changeFieldError = (id, error) => {
  return { type: CHANGE_FIELD_ERROR, payload: { id, value: error } };
};

export const changeFieldTouched = (id, value) => {
  return { type: CHANGE_FIELD_TOUCHED, payload: { id, value } };
};

export const changeIsTouched = isTouched => {
  return { type: CHANGE_IS_TOUCHED, payload: isTouched };
};

export const changeErrors = errors => {
  return { type: CHANGE_ERRORS, payload: errors };
};

export const reset = payload => {
  return { type: RESET, payload };
};

export default reducer;
