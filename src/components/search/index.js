import React from 'react';
import './search.scss';

export default function Seach({
  placeholder,
  imageButtonSeach,
  value,
  handleChange,
}) {
  if (placeholder === null || placeholder === undefined) {
    placeholder = '';
  }

  if (value === null || value === undefined) {
    value = '';
  }

  return (
    <div className="seach">
      {imageButtonSeach && (
        <input
          className="seach__button-seach"
          type="image"
          src={imageButtonSeach}
          name="submit"
          alt="отправить"
        />
      )}
      <input
        className="seach__input"
        type="textarea"
        placeholder={placeholder}
        value={value}
        onChange={(event) => {
          event.preventDefault();
          handleChange(event);
        }}
      />
    </div>
  );
}
