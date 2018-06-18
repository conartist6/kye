import React from 'react';
import Desktop from './desktop';

import './style.scss';

export default function OS({ children }) {
  return (
    <div className="operating-system">
      <Desktop />
      {children}
    </div>
  );
}
