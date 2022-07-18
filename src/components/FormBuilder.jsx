import React, { useEffect, useReducer, useState } from "react";
import reducer, { getInitialState, updateFieldValue, updateFieldError, setErrors, reset } from "../reducers/form";
import { CheckboxGroup, Input, InputRadioGroup, Select, TextArea } from "./FormFields";
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
    id: formId,
    title: { text: heading, class: headingClass },
    submitBtn: { id: submitBtnId, class: submitBtnClass, content: submitBtnContent }
  } = config;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, dispatch] = useReducer(reducer, fields, getInitialState);

  const { values, errors } = state;

  useEffect(() => {
    if (isSubmitting) {
      const hasErrors = Object.values(errors).some(Boolean);

      if (!hasErrors) {
        onSubmit(values);
        dispatch(reset(fields));
      }
      setIsSubmitting(false);
    }
  }, [isSubmitting]);

  const handleSubmit = e => {
    e.preventDefault();

    let errors = {};

    Object.keys(values).forEach(field => {
      errors[field] = validateField(field);
    });

    dispatch(setErrors(errors));
    setIsSubmitting(true);
  };

  const handleChange = (e, id, value) => {
    dispatch(updateFieldValue(id, value));

    const hasError = !!errors[id];

    hasError && dispatch(updateFieldError(id, ""));

    fields[id]?.onChange && fields[id].onChange(e, id, value);
  };

  const handleCheckboxGroupChange = (e, id, value) => {
    const prevValue = values[id];
    const newValue = { ...prevValue, [e.target.id]: value };
    handleChange(e, id, newValue);
  };

  const validateField = id => {
    const value = values[id];

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
      const { id, type, value, ...restProps } = field;
      const fieldValue = values[id];
      const fieldError = errors[id];
      let Field = "";
      if (type === "radio") {
        Field = (
          <InputRadioGroup
            {...restProps}
            key={id}
            id={id}
            value={fieldValue}
            error={fieldError}
            onChange={handleChange}
          />
        );
      } else if (type === "checkbox-group") {
        Field = (
          <CheckboxGroup
            {...restProps}
            key={id}
            id={id}
            value={fieldValue}
            error={fieldError}
            onChange={handleCheckboxGroupChange}
          />
        );
      } else if (INPUT_TYPES.includes(type)) {
        const isCheckbox = type == "checkbox";
        Field = (
          <Input
            {...restProps}
            key={id}
            id={id}
            value={isCheckbox ? value : fieldValue}
            type={type}
            checked={fieldValue}
            error={fieldError}
            onChange={handleChange}
          />
        );
      } else if (type === "textarea") {
        Field = (
          <TextArea
            {...restProps}
            key={id}
            id={id}
            value={fieldValue}
            type={type}
            error={fieldError}
            onChange={handleChange}
          />
        );
      } else if (type === "select") {
        Field = (
          <Select {...restProps} key={id} id={id} value={fieldValue} error={fieldError} onChange={handleChange} />
        );
      }

      formFields.push(Field);
    });

    return formFields;
  };

  return (
    <div className={wrapperClass}>
      <form onSubmit={handleSubmit} id={formId}>
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
