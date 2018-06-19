import React from 'react';
import File from '../file';
import { connect } from 'react-redux';
import selectParent from 'select-parent';

import './style.scss';

export function Desktop({ dispatch, desktopFiles }) {
  const icons = desktopFiles.map(file => <File file={file} />);
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
      {icons}
    </div>
  );
}

function mapStateToProps({ os: state }) {
  const { desktopFiles } = state;
  return { desktopFiles };
}

export default connect(mapStateToProps)(Desktop);
