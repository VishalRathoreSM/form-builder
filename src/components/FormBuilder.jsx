import React, { useCallback, useEffect, useReducer, useState } from "react";
import reducer, {
  getInitialState,
  changeFieldValue,
  changeFieldError,
  changeFieldTouched,
  changeErrors,
  changeIsTouched,
  reset
} from "../reducers/form";
import useEventListener from "../hooks/use_event_listener";
import { Input, Select, TextArea } from "./FormFields";
import definedValidations from "../helpers/validators";
import { INPUT_TYPES } from "../constants/form";

const defaultArr = [];

const definedValidationsArr = Object.keys(definedValidations);

const renderField = field => field;

function FormBuilder({ config }) {
  const {
    fields,
    onSubmit,
    wrapperClass,
    title: { text: heading, class: headingClass },
    submitBtn: { id: submitBtnId, class: submitBtnClass, content: submitBtnContent }
  } = config;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, dispatch] = useReducer(reducer, fields, getInitialState);

  const listener = useCallback(e => {
    (e.code === "Enter" || e.code === "NumpadEnter") && document.getElementById(submitBtnId).click();
  }, defaultArr);

  useEventListener("keydown", listener);

  useEffect(() => {
    if (isSubmitting) {
      const hasErrors = Object.values(state.errors).some(error => !!error);
      if (!hasErrors) {
        onSubmit();
        dispatch(reset(fields));
      }
      setIsSubmitting(false);
    }
  }, [isSubmitting]);

  const handleSubmit = e => {
    e.preventDefault();

    let errors = {};
    let isTouched = {};

    Object.keys(state.values).forEach(field => {
      errors[field] = validateField(field);
      isTouched[field] = false;
    });

    dispatch(changeErrors(errors));
    dispatch(changeIsTouched(isTouched));
    setIsSubmitting(true);
  };

  const handleChange = (e, id, value) => {
    dispatch(changeFieldValue(id, value));

    const isFieldTouched = state.isTouched[id];

    if (!isFieldTouched) {
      dispatch(changeFieldTouched(id, true));
      dispatch(changeFieldError(id, ""));
    }

    fields[id].onChange && fields[id].onChange(e);
  };

  const validateField = id => {
    const value = state.values[id];

    let error = "";
    (fields[id].validations || defaultArr).forEach(validation => {
      const typeOfValidation = typeof validation;

      if (typeOfValidation == "function") {
        error = validation(value);
      } else if (typeOfValidation == "object") {
        const { type, validator, msg, args = defaultArr } = validation;

        if (definedValidationsArr.includes(type)) {
          const definedValidation = definedValidations[type];
          const isValid = definedValidation.validator(value, ...args);
          if (!isValid) {
            if (msg) {
              error = msg;
            } else {
              error = definedValidation.msg(...args);
            }
          }
        } else {
          error = validator(value, ...args);
        }
      } else if (definedValidationsArr.includes(validation)) {
        const definedValidation = definedValidations[validation];
        const isValid = definedValidation.validator(value);
        if (!isValid) {
          error = definedValidation.msg();
        }
      }
    });

    return !!error ? error : "";
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
            // --Discuss about radio and checkbox inputs--//
            checked={state.values[id]}
            error={state.errors[id]}
            onChange={handleChange}
            {...restProps}
          />
        );
      } else if (field.type === "textarea") {
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
      } else if (field.type === "select") {
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
        {getFieldComponents().map(renderField)}
        <button id={submitBtnId} className={submitBtnClass} type="submit">
          {submitBtnContent}
        </button>
      </form>
    </div>
  );
}

export default React.memo(FormBuilder);
