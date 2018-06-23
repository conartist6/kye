import React, { Component } from 'react';
import { entityTypeRegistry, Level, Game, Replayer } from 'potato-engine';
import { parseBoard } from 'kye-parser-ascii';
import { Entity, Game as GameComponent } from 'potato-engine-components';
import MagnetismPlugin from 'potato-engine-plugin-magnetism';
import DeflectionPlugin from 'potato-engine-plugin-deflection';
import selectParent from 'select-parent';

import './style.scss';

export default class Example extends Component {
  static defaultProps = {
    loop: true,
    displayOnly: true,
    wrap: 'x',
  };

  onVisibilityChange([{ isIntersecting }]) {
    if (this.props.level) {
      this._game.setPaused(!isIntersecting);
    }
  }

  componentDidMount() {
    if (this.props.level) {
      const observer = new IntersectionObserver(entries => this.onVisibilityChange(entries), {
        root: selectParent('.intersection-root', this._el),
        rootMargin: '0px',
        threshold: [0.0, 1.0],
      });

      observer.observe(this._el);
    }
  }

  render() {
    const { props } = this;
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
      const { loop, displayOnly, wrap } = props;
      const parsedBoard = parseBoard(props.level);
      const level = new Level({
        dimensions: {
          height: parsedBoard.length,
          width: parsedBoard[0].length,
          wrap,
        },
        board: parsedBoard,
        seed: 1,
      });

      this._game = new Game(
        new Replayer(level, props.replay || [], {
          loop: loop && props.replay,
          displayOnly,
          plugins: [MagnetismPlugin, DeflectionPlugin],
        }),
      );

      content = <GameComponent game={this._game} displayOnly={displayOnly} />;
    }

    return (
      <div className={`example ${props.className || ''}`} ref={ref => (this._el = ref)}>
        {content}
      </div>
    );
  }
}
