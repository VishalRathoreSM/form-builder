import React, { useCallback, useReducer } from "react";
import reducer, { changeFieldValue, changeFieldError, changeFieldTouched } from "../formReducer";
import useEventListener from "../hooks/use_event_listener";
import { Input, Select, TextArea } from "./FormFields";
import definedValidations from "../helpers/validators";
import { INPUT_TYPES } from "../constants/form";

function FormBuilder({ config }) {
  const {
    fields,
    onSubmit,
    wrapperClass,
    title: { text: heading, class: headingClass },
    submitBtn: { id: submitBtnId, class: submitBtnClass, content: submitBtnContent }
  } = config;

  const getInitialState = () => {
    const initialValues = {};
    Object.values(fields).forEach(({ id, value }) => {
      initialValues[id] = value;
    });

    return { values: initialValues, isTouched: {}, errors: {} };
  };

  const [state, dispatch] = useReducer(reducer, getInitialState());

  const listener = useCallback(
    e => (e.code === "Enter" || e.code === "NumpadEnter") && document.getElementById(submitBtnId).click(),
    [dispatch]
  );

  useEventListener("keydown", listener);

  const handleSubmit = e => {
    e.preventDefault();

    Object.keys(state.values).forEach(field => {
      validateField(field);
    });

    if (!Object.values(state.errors).some(error => !!error)) {
      onSubmit();
    }
  };

  const handleChange = (e, id, value) => {
    dispatch(changeFieldValue(id, value));
    if (!state.isTouched[id]) {
      dispatch(changeFieldTouched(id, true));
      dispatch(changeFieldError(id, ""));
    }
    // validateField(id, value);
    fields[id].onChange && fields[id].onChange(e);
  };

  const validateField = id => {
    const value = state.values[id];

    let error = "";
    (fields[id].validations || []).forEach(validation => {
      if (typeof validation == "function") {
        error = validation(value);
      } else if (typeof validation == "object") {
        const { type, validator, msg } = validation;
        if (Object.keys(definedValidations).includes(type)) {
          if (definedValidations[type].validator(value)) {
            if (msg) {
              error = msg;
            } else {
              error = definedValidations[type].msg;
            }
          }
        } else {
          error = validator(value);
        }
      } else if (Object.keys(definedValidations).includes(validation)) {
        if (definedValidations[validation].validator(value)) {
          error = definedValidations[validation].msg;
        }
      }
    });

    error && dispatch(changeFieldError(id, error));
    dispatch(changeFieldTouched(id, false));
  };

  const getFieldComponents = () => {
    const formFields = [];
    Object.values(fields).forEach(field => {
      const { id, type, value, onChange, ...restProps } = field;
      let Field = "";
      if (INPUT_TYPES.includes(field.type)) {
        Field = (
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
      }
      if (field.type == "textarea") {
        Field = (
          <TextArea
            key={id}
            id={id}
            value={state.values[id]}
            type={type}
            error={state.errors[id]}
            onChange={handleChange}
            {...restProps}
          />
        );
      }
      if (field.type == "select") {
        Field = (
          <Select
            key={id}
            id={id}
            value={state.values[id]}
            error={state.errors[id]}
            onChange={handleChange}
            {...restProps}
          />
        );
      }

      formFields.push(Field);
    });

    return formFields;
  };

  return (
    <div className={wrapperClass}>
      <form onSubmit={handleSubmit}>
        <div className={headingClass}>{heading}</div>
        {getFieldComponents().map(field => field)}

        <button id={submitBtnId} className={submitBtnClass} type="submit">
          {submitBtnContent}
        </button>
      </form>
    </div>
  );
}

export default FormBuilder;
