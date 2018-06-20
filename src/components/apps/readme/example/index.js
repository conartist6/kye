import React from 'react';
import { entityTypeRegistry, Level, Game, Replayer } from 'potato-engine';
import { parseBoard } from 'kye-parser-ascii';
import { Entity, Game as GameComponent } from 'potato-engine-components';

import './style.scss';

function slowerReplay(replay) {
  const slowReplay = [];
  for (const item of replay) {
    if (typeof item === 'string') {
      slowReplay.push(2);
    }
    slowReplay.push(item);
  }
  return slowReplay;
}

export default function Example(props) {
  let content;
  let entities = props.entities;
  if (props.entity) {
    entities = [props.entity];
  }
  if (entities) {
    entities = entities.map(entity => {
      if (typeof entity === 'string') {
        const EntityType = entityTypeRegistry.getEntityTypeBySymbol(entity);
        return new EntityType([], EntityType.attributesBySymbol.get(entity));
      }
      return entity;
    });
    content = entities.map((entity, i) => <Entity entity={entity} key={i} />);
  } else {
    const parsedBoard = parseBoard(props.level);
    const level = new Level({
      dimensions: {
        height: parsedBoard.length,
        width: parsedBoard[0].length,
        wrap: true,
      },
      board: parsedBoard,
    });

    const replayer = new Replayer(
      level,
      slowerReplay([20, 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'l']),
    ).start();
    const game = new Game(replayer);

    content = <GameComponent game={game} />;
  }

  return <div className="example">{content}</div>;
}
