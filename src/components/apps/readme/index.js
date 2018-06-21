import React from 'react';
import { entities } from 'potato-engine';
import Example from './example';

import './style.scss';

function slowerReplay(replay) {
  const slowReplay = [];
  for (const item of replay) {
    if (typeof item === 'string') {
      const items = item.split('');
      for (const item of items) {
        slowReplay.push(2);
        slowReplay.push(item);
      }
    } else {
      slowReplay.push(item);
    }
  }
  return slowReplay;
}

export default function README() {
  return (
    <div className="app readme-app intersection-root">
      <h3>The Game</h3>
      <p>You've come to the right place to learn how to play Kye!</p>
      <p>You play the game as Kye, which is a green Dot. It looks like this:</p>
      <Example entity="K" />
      <p>
        Your objective is to eat all of the <strong>diamonds</strong> in each level. Diamonds look
        like this:
      </p>
      <Example entity="*" />
      <p>
        All you need to do to eat a diamond is to move Kye on top of it. Kye can move one square at
        a time in any of the four cardinal directions.
      </p>
      <p>
        Kye will encounter a number of other kinds of <strong>entities</strong> on her game board.
        Some of the common ones, for example, look like this:
      </p>
      <Example entities={['v', 'd', 'b', 's', 'R', 'e']} />
      <p>
        The entites above, from left to right, are called: <em>rocky</em>, <em>slider</em>,{' '}
        <em>block</em>, <em>magnet</em>, <em>sentry</em>, and <em>edible</em>.
      </p>

      <h3>Pushing</h3>
      <p>Kye is able to push many entities when she encounters them:</p>
      <Example level={['K b      ']} replay={slowerReplay(['rrrrrrrrrrl'.repeat(20)])} />
      <p>
        For an entity to be pushable in a given direction, the space beind it must be empty, which
        is to say that Kye cannot push more than one entity at a time.
      </p>
      <Example level={['K bb ']} replay={slowerReplay(['rrrlrrrrrrl'.repeat(20)])} />
      <p>Kye is able to push entities which are pushing back. Kye is stronger.</p>
      <Example level={['Kl    ']} replay={slowerReplay(['rrrlllrr', 1, 'll'])} />
      <p>
        {' '}
        Kye is also unable to pull entities, at least not without the help! More on this later.
      </p>
      <p>
        There is one other kind of entity which is able to push other entities: a{' '}
        <strong>sentry</strong>. A sentry attempts to push whatever it hits, and then turns around.
      </p>
      <Example level={['R  b    ']} replay={[12 * 5]} />

      <h3>Roundness</h3>
      <p>
        Entities in Kye are either square or round. This is represented visually, except for Kye.
        Kye is square, despite looking very round. Sorry.
      </p>
      <p>
        When a round entity, such as this rocky encounters another round entity, it will attempt to
        slip past it. Square entities cannot slip past anything, and nothing can slip past them.
      </p>
      <Example level={['53     15', '>  >r8   ']} replay={[9]} />

      <h3>Magnets</h3>
      <p>
        <strong>Magnets</strong> are the only way to pull entities in Kye. Magnets are pulled
        towards the player, and everything else is pulled towards magnets. Thus, you can use them to
        drag other entities around. Entities which are stuck to a magnet cannot move.
      </p>
      <Example level={['      KS>']} replay={slowerReplay(['lllllllll'.repeat(20)])} />
      <p>Magnets will be attracted to a player within a two block radius of themselves.</p>
      <Example level={[' SK ', '   S']} replay={slowerReplay(['ldru'.repeat(50)])} wrap={false} />
      <p>Magnets will also attract anything within a two block radius of themselves!</p>
      <Example
        level={[' s    ', '    S ', '   BK ']}
        replay={slowerReplay(['llllurrurdurrddl'.repeat(20)])}
        wrap={false}
      />
      <p>
        Kye magnets are polar, like real magnets, so they will not attract each other end to end.
        That said, real magnets would repel each other if pushed together. This does not happen in
        Kye.
      </p>
      <Example level={['S S']} wrap={false} replay={[25]} />

      <h3>Monsters</h3>
      <p>
        <strong>Monsters</strong> will try to eat you! You must avoid them, or better, trap or
        destroy them. They are unable to push or eat any blocks, which makes this task far easier.
      </p>
      <p>
        Monsters possess rudimentary intelligence, lightning reflexes, and a coin. When monsters
        take a turn, first they flip their coin. If they lose the toss, they move one square in a
        random direction. If they win, they seek the player. When seeking they are not smart enough
        to choose an unobstructed but indirect route. Monsters move relatively slowly, however they
        are allowed to take an extra turn whenever Kye makes a move, which means that while they may
        give the player some time to think, there's no outrunning them.
      </p>
      <p>
        Monsters are able to eat you any time you are adjacent to them, so it is not possible to
        "sneak" past one.
      </p>

      <h3>Other blocks</h3>
      <p>
        <strong>Edibles</strong> are blocks which can be eaten by the player. Monsters cannot eat
        edible blocks. Edible blocks cannot be pushed or pulled either. Diamonds are special kind of
        edible block, and follow all the same rules as other edible blocks.
      </p>
      <Example level={['S e[ * S']} replay={[100]} />
      <p>
        <strong>Turners</strong> are a kind of block which will change the direction of any rockies
        or sliders which hit them. They do not change the direction of sentries. They are labelled
        with either an "a" or a "c" to indicate whether they will turn the colliding block clockwise
        or anticlockwise
      </p>
      <Example level={[' a      ', ' >     a', 'a       ', '      a ']} replay={[128]} />
      <p>
        <strong>Timers</strong> are a kind of block which will disappear (permanently) after a
        specified amount of time. A number on them indicates that they are a timer and how much time
        they have remaining. It takes two seconds for a timer to count down one number.
      </p>
      <Example level={['}']} wrap={false} replay={[135]} />
      <p>
        <strong>Shooters</strong> spawn sliders or rockies at certain intervals.
      </p>
      <Example level={['F         ']} wrap={false} replay={[28]} className="shooter-example" />
      <p>
        <strong>One Ways</strong> appear on the ground. Monsters, rockies, and sliders cannot enter
        their space at all, and the player can only enter the square from the completely open side.
      </p>
      <p>
        I saved the best for last. <strong>Black Holes</strong> swallow anything which has the
        misfortune of falling into them -- at least if they're not busy digesting.
      </p>
    </div>
  );
}
