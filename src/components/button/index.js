import React from 'react';

import './style.scss';

export default function Button({ type, children }) {
  return <button type={type}>{children}</button>;
}
