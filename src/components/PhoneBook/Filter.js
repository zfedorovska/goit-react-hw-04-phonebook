import React from 'react';
import s from './PhoneBook.module.css';
import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => (
  <div className={s.filter}>
    <label className={s.label}>
      Filter by name
      <input
        type="text"
        className={s.input}
        value={value}
        onChange={onChange}
      />
    </label>
  </div>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
