import React from 'react'

export default function Button({ text, handleClick, disabled }) {
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`f5 no-underline inline-flex items-center pa3 ba border-box mr4 ${
        disabled
          ? 'bg-light-gray gray'
          : 'black bg-animate hover-bg-black hover-white'
      }`}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      <span className="pl1">{text}</span>
    </button>
  );
}
