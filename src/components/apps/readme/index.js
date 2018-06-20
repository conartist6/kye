import React from 'react';
import { entities } from 'potato-engine';
import Example from './example';

import './style.scss';

export default function README() {
  return (
    <div className="app readme-app">
      <h3>The Game</h3>
      <p>You've come to the right place to learn how to play Kye!</p>
      <p>You play the game as Kye, which is a green Dot. It looks like this:</p>
      <Example entity="K" />
      <p>Your objective is to eat all of the diamonds in each level. Diamonds look like this:</p>
      <Example entity="*" />
      <p>
        All you need to do to eat a diamond is to move Kye on top of it. Kye can move one square at
        a time in any of the four cardinal directions.
      </p>
      <p>
        Kye will encounter a number of other kinds of <strong>entities</strong> on her game board.
        Some of the common ones, for example, look like this:
      </p>
      <Example entities={['d', 'b', 's', 'R', 'e']} />

      <h3>Pushing</h3>
      <p>Kye is able to push many entities when she encounters them:</p>
      <Example level={['K b      ']} />
      <p>
        For an entity to be pushable in a given direction, the space beind it must be empty, which
        is to say that Kye cannot push more than one entity at a time.
      </p>
      <Example level={['K bb ']} />
      <p>
        {' '}
        Kye is also unable to pull entities, at least not without the help! More on this later.
      </p>
    </div>
  );
}
