import React from 'react';
import InitialOverlay from './initial-overlay';
import Game from './game';

export default function KyeApp() {
  return (
    <div className="app kye-app">
      <InitialOverlay />
      <Game />
    </div>
  );
}
