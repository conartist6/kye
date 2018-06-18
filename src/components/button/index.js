import React from 'react';

import './style.css';

export default function Button({ type, children }) {
  return <button type={type}>{children}</button>;
}
