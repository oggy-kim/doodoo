import React, { useState, Component } from 'react';
import { Field } from 'redux-form';
import _ from 'lodash';
import Radio from '@material-ui/core/Radio';

const COLORS = [
  '#34558B',
  '#A2553A',
  '#FFAF12',
  '#798FA8',
  '#EAAC9D',
  '#D13B40',
  '#FD823E',
];

export default () => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const renderColor = () => {
    return _.map(COLORS, (color) => {
      return (
        <div
          className='radio-color `${color}'
          style={{ backgroundColor: `${color}` }}
          key={color}
        >
          <Radio
            checked={selectedValue === `${color}`}
            color='default'
            onChange={handleChange}
            value={color}
            name='radio-button'
          />
        </div>
      );
    });
  };

  return (
    <Field name='groupColor' className='color-select' component='Radio'>
      {renderColor()}
    </Field>
  );
};
