import React, { useCallback } from "react";

const defaultArr = [];
const defaultObj = {};
const defaultFunc = () => {};

const typeValueMapping = {
  file: e => e.target.files,
  checkbox: e => e.target.checked,
  text: e => e.target.value
};

export const Input = ({
  id,
  value,
  type,
  groupId,
  onChange = defaultFunc,
  error,
  placeholder = "",
  label,
  initialChecked,
  checked,
  classes: { wrapperClass, inputClass, errorClass } = defaultObj,
  ...rest
}) => {
  const isTypePresentInMapping = !!typeValueMapping[type];
  const newType = isTypePresentInMapping ? type : "text";

  return (
    <div className={wrapperClass}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        {...rest}
        id={id}
        className={inputClass}
        type={type}
        value={value}
        placeholder={placeholder}
        name={id}
        checked={checked}
        onChange={e => onChange(groupId || id, typeValueMapping[newType](e), e)}
      />
      {error && <div className={errorClass}>{error}</div>}
    </div>
  );
};

export const InputRadioGroup = ({
  id,
  value,
  error,
  classes: { wrapperClass, errorClass } = defaultObj,
  onChange,
  label = "",
  options = defaultArr
}) => (
  <div className={wrapperClass}>
    <label>{label}</label>
    {options.map(({ id: optionId, ...restOptionProps }) => (
      <Input
        {...restOptionProps}
        key={optionId}
        id={optionId}
        groupId={id}
        value={optionId}
        name={id}
        type="radio"
        checked={value == optionId}
        onChange={onChange}
      />
    ))}
    {error && <div className={errorClass}>{error}</div>}
  </div>
);

export const CheckboxGroup = ({
  id,
  value = defaultObj,
  error,
  classes: { wrapperClass, errorClass } = defaultObj,
  onChange,
  label = "",
  options = defaultArr
}) => (
  <div className={wrapperClass}>
    <label>{label}</label>
    {options.map(({ id: optionId, ...restOptionProps }) => (
      <Input
        {...restOptionProps}
        key={optionId}
        id={optionId}
        groupId={id}
        value={optionId}
        name={id}
        type="checkbox"
        checked={value[optionId]}
        onChange={onChange}
      />
    ))}
    {error && <div className={errorClass}>{error}</div>}
  </div>
);

export const Select = ({
  id,
  value,
  onChange,
  error,
  label,
  placeholder = "--Select Your Option--",
  options = defaultArr,
  classes: { wrapperClass, inputClass, errorClass } = defaultObj,
  ...rest
}) => {
  const handleChange = e => {
    onChange(id, e.target.value, e);
  };
  return (
    <div className={wrapperClass}>
      {label && <label htmlFor={id}>{label}</label>}
      <select {...rest} id={id} className={inputClass} onChange={handleChange} value={value}>
        <option key="default" value="" disabled hidden>
          {placeholder}
        </option>
        {options.map(({ value, name, ...rest }) => (
          <option key={value} value={value} {...rest}>
            {name}
          </option>
        ))}
      </select>
      {error && <div className={errorClass}>{error}</div>}
    </div>
  );
};

export const TextArea = ({
  id,
  value,
  label,
  placeholder = "",
  onChange,
  error,
  rows,
  classes: { wrapperClass, inputClass, errorClass } = defaultObj,
  ...rest
}) => {
  const handleChange = e => {
    onChange(id, e.target.value, e);
  };

  const noOfRows = rows || 2;

  return (
    <div className={wrapperClass}>
      {label && <label htmlFor={id}>{label}</label>}
      <textarea
        {...rest}
        id={id}
        className={inputClass}
        placeholder={placeholder}
        value={value}
        name={id}
        rows={noOfRows}
        onChange={handleChange}
      />
      {error && <div className={errorClass}>{error}</div>}
    </div>
  );
};
