import React from 'react';
import InitialOverlay from './initial-overlay';
import Game from './game';

export default function KyeApp({ input }) {
  return (
    <div className="app kye-app">
      <InitialOverlay />
      <Game input={input} />
    </div>
  );
}
