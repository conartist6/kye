import React from 'react';

import './style.css';

export default function Dialog({ show, children, className }) {
  if (!show) {
    return null;
  }
  return <div className={'dialog ' + className}>{children}</div>;
}
