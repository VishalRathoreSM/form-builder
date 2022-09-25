const UPDATE_FIELD_VALUE = "UPDATE_FIELD_VALUE";
const UPDATE_FIELD_ERROR = "UPDATE_FIELD_ERROR";
const SET_ERRORS = "SET_ERRORS";
const RESET = "RESET";

const defaultObj = {};

export const getInitialState = fields =>
  Object.values(fields).reduce(
    (res, { id, initValue = "", initialChecked, getComp }) => {
      if (!getComp) {
        res.values[id] = initialChecked ?? initValue;
      }
      return res;
    },
    { values: {}, errors: {} }
  );

const reducer = (state, { type, payload }) => {
  const { value, id } = payload || defaultObj;
  switch (type) {
    case UPDATE_FIELD_VALUE:
      return { ...state, values: { ...state.values, [id]: value } };
    case UPDATE_FIELD_ERROR:
      return { ...state, errors: { ...state.errors, [id]: value } };
    case SET_ERRORS:
      return { ...state, errors: payload };
    case RESET:
      return getInitialState(payload);
  }
};

export const updateFieldValue = (id, value) => ({ type: UPDATE_FIELD_VALUE, payload: { id, value } });

export const updateFieldError = (id, error) => ({ type: UPDATE_FIELD_ERROR, payload: { id, value: error } });

export const setErrors = errors => ({ type: SET_ERRORS, payload: errors });

export const reset = payload => ({ type: RESET, payload });

export default reducer;
