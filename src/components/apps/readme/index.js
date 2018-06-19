import React from 'react';
import { Entity } from 'potato-engine-components';
import { entities } from 'potato-engine';

import './style.scss';

function e(name, attribute = null) {
  const EntityType = entities[name];
  return new EntityType([], attribute);
}

export default function README() {
  return (
    <div className="app readme-app">
      <h3>The Game</h3>
      <p>You've come to the right place to learn how to play Kye!</p>
      <p>You play the game as Kye, which is a green Dot. It looks like this:</p>
      <div className="example">
        <Entity entity={e('Player')} />
      </div>
      <p>Your objective is to eat all of the diamonds in each level. Diamonds look like this:</p>
      <div className="example">
        <Entity entity={e('Diamond')} />
      </div>
      <p>
        All you need to do to eat a diamond is to move Kye on top of it. Kye can move one square at
        a time in any of the four cardinal directions.
      </p>
      <p>
        Kye will encounter a number of other kinds of <strong>entities</strong> on her game board.
        Some of the common ones, for example, look like this:
      </p>
      <div className="example">
        <Entity entity={e('Slider', 'DOWN')} />
        <Entity entity={e('Block', 'SQUARE')} />
        <Entity entity={e('Magnet', 'VERTICAL')} />
        <Entity entity={e('Sentry', 'RIGHT')} />
        <Entity entity={e('Edible')} />
      </div>

      <h3>Pushing</h3>
      <p>Kye is able to push many entities when she encounters them:</p>
      <div className="example">ex</div>
      <p>
        For an entity to be pushable in a given direction, the space beind it must be empty, which
        is to say that Kye cannot push more than one entity at a time.
      </p>
      <div className="example">ex2</div>
      <p>
        {' '}
        Kye is also unable to pull entities, at least not without the help! More on this later.
      </p>
    </div>
  );
}
