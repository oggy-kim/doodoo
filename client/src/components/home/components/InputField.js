import React from 'react';

export default ({
  input,
  label,
  name,
  type,
  placeholder,
  meta: { touched, error },
}) => (
  <React.Fragment>
    <div key={name}>
      <label>{label}</label>
      <input
        {...input}
        type={type}
        autoComplete='off'
        placeholder={placeholder}
      />
    </div>
    {touched && error && <span>{error}</span>}
  </React.Fragment>
);
