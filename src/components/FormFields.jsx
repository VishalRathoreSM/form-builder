import React from "react";

export const Input = ({ id, value, type, onChange, error, ...rest }) => {
  const {
    classes: { wrapperClass, inputClass, errorClass },
    label,
    ...restProps
  } = rest;
  console.log({ rest, restProps, error });
  return (
    <div className={wrapperClass}>
      <label htmlFor={id}>{label}</label>
      <input
        className={inputClass}
        type={type}
        value={value}
        onChange={e => onChange(id, e.target.value)}
        {...restProps}
      />
      {error && <div className={errorClass}>{error}</div>}
    </div>
  );
};
