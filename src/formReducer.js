const CHANGE_FIELD_VALUE = "CHANGE_FIELD_VALUE";
const CHANGE_FIELD_ERROR = "CHANGE_FIELD_ERROR";
const CHANGE_FIELD_TOUCHED = "CHANGE_FIELD_TOUCHED";

const reducer = (state, action) => {
  const { value, id } = action.payload;
  switch (action.type) {
    case CHANGE_FIELD_VALUE:
      return { ...state, values: { ...state.values, [id]: value } };
    case CHANGE_FIELD_ERROR:
      return { ...state, errors: { ...state.errors, [id]: value } };
    case CHANGE_FIELD_TOUCHED:
      return { ...state, isTouched: { ...state.isTouched, [id]: value } };
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

export default reducer;
