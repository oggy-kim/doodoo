import React from 'react';

export default ({ type, input, label, key, meta }) => {
  return (
    <div className={`form-field ${input.name}`}>
      <label htmlFor={input.name}>{label}</label>
      <input
        {...input}
        key={key}
        type={type}
        placeholder={label}
        autoComplete='off'
      />
      <small>{meta.touched && meta.error}</small>
    </div>
  );
};
