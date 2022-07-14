import React from "react";

const typeValueMapping = {
  file: e => e.target.files[0],
  radio: e => e.target.checked,
  checkbox: e => e.target.checked,
  text: e => e.target.value
};

export const Input = ({
  id,
  value,
  type,
  name,
  onChange,
  error,
  placeholder = "",
  label,
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
        id={id}
        className={inputClass}
        type={type}
        value={value}
        placeholder={placeholder}
        name={name}
        checked={type == "radio" || type == "checkbox" ? checked : undefined}
        onChange={e => onChange(e, id, typeValueMapping[newType](e))}
        {...rest}
      />
      {error && <div className={errorClass}>{error}</div>}
    </div>
  );
};

export const Select = ({
  id,
  value,
  onChange,
  error,
  label,
  options = [],
  classes: { wrapperClass, inputClass, errorClass },
  ...rest
}) => {
  return (
    <div className={wrapperClass}>
      {label && <label htmlFor={id}>{label}</label>}
      <select id={id} className={inputClass} onChange={e => onChange(e, id, e.target.value)} value={value} {...rest}>
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
  classes: { wrapperClass, inputClass, errorClass },
  ...rest
}) => (
  <div className={wrapperClass}>
    {label && <label htmlFor={id}>{label}</label>}
    <textarea
      id={id}
      type="text"
      className={inputClass}
      placeholder={placeholder}
      value={value}
      name={id}
      rows={rows || 2}
      onChange={e => onChange(e, id, e.target.value)}
      {...rest}
    />
    {error && <div className={errorClass}>{error}</div>}
  </div>
);
