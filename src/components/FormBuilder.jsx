import React, { useReducer } from "react";
import { Input } from "./FormFields";

const INPUT_TYPES = ["text", "email", "password", "number"];

const reducer = (state, action) => {
  const { value, id } = action.payload;
  switch (action.type) {
    case "CHANGE_FIELD_VALUE":
      return { ...state, values: { ...state.values, [id]: value } };
    case "CHANGE_FIELD_ERROR":
      return { ...state, errors: { ...state.errors, [id]: value } };
  }
};

function FormBuilder({ config }) {
  const {
    fields,
    form: { onSubmit, wrapperClass }
  } = config;

  const handleSubmit = e => {
    e.preventDefault();
    //check for errors and also loader
    if (!Object.values(state.errors).some(error => !!error)) {
      onSubmit();
    }
  };

  const handleChange = (id, value) => {
    dispatch({ type: "CHANGE_FIELD_VALUE", payload: { id, value } });
    validateField(id, value);
    fields[id].onChange && fields[id].onChange();
  };

  const validateField = (id, value) => {
    let error = "";
    if (fields[id].type === "text") {
      const { isRequired } = fields[id];
      if (isRequired && value.length === 0) {
        error = "Required";
      }
    }
    if (error) dispatch({ type: "CHANGE_FIELD_ERROR", payload: { id, value: error } });
  };

  const initialValues = {};
  Object.values(fields).forEach(({ id, value }) => {
    initialValues[id] = value;
  });

  const initialState = { values: initialValues, isTouched: {}, errors: {} };

  const [state, dispatch] = useReducer(reducer, initialState);

  const getFieldComponents = () => {
    const formFields = [];
    Object.values(fields).forEach(field => {
      if (INPUT_TYPES.includes(field.type)) {
        const { id, type, value, onChange, ...restProps } = field;
        const Field = (
          <Input
            key={id}
            id={id}
            value={state.values[id]}
            type={type}
            error={state.errors[id]}
            onChange={handleChange}
            {...restProps}
          />
        );
        formFields.push(Field);
      }
    });

    return formFields;
  };

  return (
    <div className={wrapperClass}>
      <form onSubmit={handleSubmit}>
        Form
        {getFieldComponents().map(field => field)}
        <button type="submit">submit</button>
      </form>
    </div>
  );

  // return [Form, state];
}

export default FormBuilder;
