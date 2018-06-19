import React from 'react';
import File from '../file';
import { connect } from 'react-redux';

import './style.scss';

export function Desktop({ dispatch, desktopFiles }) {
  const icons = desktopFiles.map(file => <File file={file} key={`${file.type}/${file.name}`} />);
  return <div className="desktop">{icons}</div>;
}

function mapStateToProps({ os: state }) {
  const { desktopFiles } = state;
  return { desktopFiles };
}

export default connect(mapStateToProps)(Desktop);
