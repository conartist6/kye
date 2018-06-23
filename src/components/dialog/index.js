import React from 'react';

import './style.scss';

export default function Dialog({ show, children, className }) {
  if (!show) {
    return null;
  }
  return <div className={'dialog ' + className}>{children}</div>;
}
Dialog.defaultProps = {
  show: true,
};
