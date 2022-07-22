import React from "react";

const typeValueMapping = {
  file: e => e.target.files[0],
  checkbox: e => e.target.checked,
  text: e => e.target.value
};

export const Input = ({
  id,
  value,
  type,
  name,
  groupId,
  onChange = () => {},
  error,
  placeholder = "",
  label,
  initialChecked,
  checked,
  classes: { wrapperClass, inputClass, errorClass },
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
        name={name}
        checked={type == "radio" || type == "checkbox" ? checked : undefined}
        onChange={e => onChange(e, groupId || id, typeValueMapping[newType](e))}
      />
      {error && <div className={errorClass}>{error}</div>}
    </div>
  );
};

export const InputRadioGroup = ({
  id,
  name,
  value,
  error,
  classes: { wrapperClass, errorClass },
  onChange,
  label = "",
  options = []
}) => (
  <div className={wrapperClass}>
    <label>{label}</label>
    {options.map(({ id: optionId, value: optionValue, ...restOptionProps }) => (
      <Input
        {...restOptionProps}
        key={optionId}
        id={optionId}
        groupId={id}
        value={optionValue}
        name={name}
        type="radio"
        checked={value == optionValue}
        onChange={onChange}
      />
    ))}
    {error && <div className={errorClass}>{error}</div>}
  </div>
);

export const CheckboxGroup = ({
  id,
  name,
  value = {},
  error,
  classes: { wrapperClass, errorClass },
  onChange,
  label = "",
  options = []
}) => (
  <div className={wrapperClass}>
    <label>{label}</label>
    {options.map(({ id: optionId, value: optionValue, ...restOptionProps }) => (
      <Input
        {...restOptionProps}
        key={optionId}
        id={optionId}
        groupId={id}
        value={optionValue}
        name={name}
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
  options = [],
  classes: { wrapperClass, inputClass, errorClass },
  ...rest
}) => (
  <div className={wrapperClass}>
    {label && <label htmlFor={id}>{label}</label>}
    <select {...rest} id={id} className={inputClass} onChange={e => onChange(e, id, e.target.value)} value={value}>
      <option value="" disabled hidden>
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

export const TextArea = ({
  id,
  value,
  label,
  placeholder = "",
  onChange,
  error,
  rows,
  classes: { wrapperClass, inputClass, errorClass },
  ...rest
}) => (
  <div className={wrapperClass}>
    {label && <label htmlFor={id}>{label}</label>}
    <textarea
      {...rest}
      id={id}
      type="text"
      className={inputClass}
      placeholder={placeholder}
      value={value}
      name={id}
      rows={rows || 2}
      onChange={e => onChange(e, id, e.target.value)}
    />
    {error && <div className={errorClass}>{error}</div>}
  </div>
);
