import React from "react";

export const Input = ({
  id,
  value,
  type,
  onChange,
  error,
  placeholder = "",
  label,
  classes: { wrapperClass, inputClass, errorClass },
  ...rest
}) => {
  return (
    <div className={wrapperClass}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        className={inputClass}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e, id, type == "file" ? e.target.files[0] : e.target.value)}
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

export const InputRadio = ({ label = "", labelClass = "", name = "", checked = false, value = "", onChange }) => {
  return (
    <label className={`tab-radio ${labelClass}`}>
      <input type="radio" name={name} value={value} onChange={onChange} checked={checked}></input>
      <span className="tab-radio-value font-bold">{label}</span>
    </label>
  );
};

export const InputCheckbox = ({
  id,
  checked = false,
  value,
  type,
  onChange,
  error,
  placeholder,
  classes: { wrapperClass, inputClass, errorClass },
  label,
  ...rest
}) => {
  return (
    <div className={wrapperClass}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type="checkbox"
        className={inputClass}
        checked={checked}
        onChange={e => onChange(e, id, e.target.checked)}
        id={id}
        {...rest}
      />
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
