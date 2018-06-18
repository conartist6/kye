import React from 'react';
import File from '../file';
import { connect } from 'react-redux';
import selectParent from 'select-parent';

import './style.scss';

export function Desktop({ dispatch }) {
  return (
    <div
      className="desktop"
      onClick={evt => {
        const fileTarget = selectParent('.file', evt.target);
        if (!fileTarget) {
          dispatch({
            type: 'CLICK_DESKTOP',
          });
        }
      }}
    >
      <File name="default.kye" />
    </div>
  );
}

export default connect()(Desktop);
